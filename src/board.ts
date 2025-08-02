import { BitBoard, setBitBoardValue } from './bitboard';
import {
    NULL_MOVE,
    Move,
    PackedMove,
    Player,
    StartPosition,
    getMoveLocation,
    getMoveOrientation,
    getMovePieceType,
    getMovePlayer,
    getOrientationData,
    cornersData,
    isMoveLegal,
    cornerAttachersData,
    getLegalMovesFrom,
} from './movegen/movegen';
import { coordinateInBounds, otherPlayer } from './movegen/movegen-utils';
import { Coordinate } from './types';

const getStartPosition = (position: StartPosition): [Coordinate, Coordinate] => {
    if (position === 'middle') {
        return [
            { x: 4, y: 4 },
            { x: 9, y: 9 },
        ];
        // return [
        //     { x: 6, y: 6 },
        //     { x: 7, y: 7 },
        // ];
    } else {
        return [
            { x: 0, y: 13 },
            { x: 13, y: 0 },
        ];
    }
};

/**
 * The current state of the board.
 * Pieces stores the coordinates and orientation of all the placed pieces.
 *
 */
interface BoardState {
    /** The pieces on the board, stored with coordinates, orientation and player */
    pieces: PackedMove[];
    /** The player to move next */
    toMove: Player;

    /** The remaining pieces for each player, as a bitboard */
    playerARemaining: number;
    playerBRemaining: number;

    playerABitBoard: BitBoard;
    playerBBitBoard: BitBoard;

    startPosName: StartPosition;

    /** The number of null moves played in a row */
    nullMoveCounter: number;

    /** Cached corner moves for each player */
    playerACornerMoves: Map<number, Move[]>;
    playerBCornerMoves: Map<number, Move[]>;
}

/**
 * The initial uninitialized board state. Doesn't have the player bags.
 */
const defaultBoardState: BoardState = {
    pieces: [],
    toMove: 0,
    playerARemaining: 2 ** 21 - 1,
    playerBRemaining: 2 ** 21 - 1,
    playerABitBoard: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    playerBBitBoard: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    startPosName: 'middle',
    nullMoveCounter: 0,
    playerACornerMoves: new Map(),
    playerBCornerMoves: new Map(),
};
export class Board {
    state: BoardState;
    startPositions: [Coordinate, Coordinate];

    constructor(startPosition: StartPosition, state?: BoardState) {
        this.state = state || {
            ...structuredClone(defaultBoardState),
            startPosName: startPosition,
        };

        this.startPositions = getStartPosition(startPosition);
    }

    reset() {
        this.state = structuredClone(defaultBoardState);
    }

    gameOver(): boolean {
        return this.state.nullMoveCounter >= 2;
    }

    score(): { playerA: number; playerB: number } {
        return {
            playerA: this.state.pieces
                .filter((p) => getMovePlayer(p) === 0)
                .map((p) => getOrientationData(getMovePieceType(p), 0).length)
                .reduce((a, b) => a + b, 0),
            playerB: this.state.pieces
                .filter((p) => getMovePlayer(p) === 1)
                .map((p) => getOrientationData(getMovePieceType(p), 0).length)
                .reduce((a, b) => a + b, 0),
        };
    }

    winner(): Player | 'draw' | 'none' {
        if (!this.gameOver()) {
            return 'none';
        }

        const { playerA, playerB } = this.score();
        if (playerA > playerB) {
            return 0;
        } else if (playerB > playerA) {
            return 1;
        } else {
            return 'draw';
        }
    }

    copy() {
        const state = structuredClone(this.state);
        return new Board(state.startPosName, state);
    }

    doMove(move: Move) {
        if (move === NULL_MOVE) {
            this.state.nullMoveCounter++;

            const opponentCachedMoves =
                this.state.toMove === 0
                    ? this.state.playerBCornerMoves
                    : this.state.playerACornerMoves;

            this.skipTurn();

            // 2: filter: need to filter opponent's moves, since they are the ones that move next
            for (const [idx, moves] of opponentCachedMoves) {
                const newMoves = moves.filter((m) => isMoveLegal(m, this));
                opponentCachedMoves.set(idx, newMoves);
            }
            return;
        }

        // if the move we're doing is not a null move, reset the null move counter
        this.state.nullMoveCounter = 0;

        this.state.pieces.push(move);

        if (getMovePlayer(move) === 0) {
            this.state.playerARemaining &= ~(1 << getMovePieceType(move));
        } else {
            this.state.playerBRemaining &= ~(1 << getMovePieceType(move));
        }

        // update bitboard
        const bitBoard = [this.state.playerABitBoard, this.state.playerBBitBoard][
            getMovePlayer(move)
        ];

        //TODO: use the piece bitboards, not individual tiles
        for (const tile of getOrientationData(getMovePieceType(move), getMoveOrientation(move))) {
            // mark coordinate as set
            const pieceCoord = {
                x: tile.x + getMoveLocation(move).x,
                y: tile.y + getMoveLocation(move).y,
            };
            setBitBoardValue(bitBoard, pieceCoord, 1);
        }

        // Update the corner data.
        // 1. For each of the corners of the placed piece, clear the corner moves for that corner (because there cannot be any moves there anymore)
        // 2. Filter out the moves that are no longer valid
        // 3. Add the new moves to the corner moves

        const placedPiece = getMovePieceType(move);
        const placedPieceOrientation = getMoveOrientation(move);
        const placedPieceLocation = getMoveLocation(move);
        const myCachedMoves =
            this.state.toMove === 0 ? this.state.playerACornerMoves : this.state.playerBCornerMoves;

        const opponentCachedMoves =
            this.state.toMove === 0 ? this.state.playerBCornerMoves : this.state.playerACornerMoves;

        // 1: delete the corner moves for the placed piece
        const relativeCorner = cornersData[placedPiece][placedPieceOrientation];
        for (const corner of relativeCorner) {
            const cornerCoord = {
                x: corner.x + placedPieceLocation.x,
                y: corner.y + placedPieceLocation.y,
            };
            const cornerIdx = cornerCoord.x + cornerCoord.y * 14;

            // both player's moves are invalidated for this corner
            myCachedMoves.delete(cornerIdx);
            opponentCachedMoves.delete(cornerIdx);
        }

        // 3: add new
        const cornerAttachers = cornerAttachersData[placedPiece][placedPieceOrientation];
        for (const cornerAttacher of cornerAttachers) {
            const cornerCoord = {
                x: cornerAttacher.x + placedPieceLocation.x,
                y: cornerAttacher.y + placedPieceLocation.y,
            };

            if (!coordinateInBounds(cornerCoord)) {
                continue;
            }

            const cornerIdx = cornerCoord.x + cornerCoord.y * 14;

            // might already have this corner in the cache
            if (myCachedMoves.has(cornerIdx)) {
                continue;
            }

            // otherwise, add new moves for all piece types
            const myRemaining =
                this.state.toMove === 0 ? this.state.playerARemaining : this.state.playerBRemaining;
            const legalMoves = [];

            for (let unplacedPiece = 0; unplacedPiece < 21; unplacedPiece++) {
                if (!(myRemaining & (1 << unplacedPiece))) {
                    continue;
                }

                legalMoves.push(...getLegalMovesFrom(cornerCoord, unplacedPiece, this));
            }

            myCachedMoves.set(cornerIdx, legalMoves);
        }

        this.skipTurn();

        // 2: filter: need to filter opponent's moves, since they are the ones that move next
        for (const [idx, moves] of opponentCachedMoves) {
            const newMoves = moves.filter((m) => isMoveLegal(m, this));
            opponentCachedMoves.set(idx, newMoves);
        }
    }

    skipTurn() {
        this.state.toMove = otherPlayer(this.state.toMove);
    }

    placedPieceHash(move: Move) {
        return `${move}`;
    }

    hash() {
        //TODO: can this hash just be the bitboards?
        return (
            this.state.pieces.map((p) => this.placedPieceHash(p)).join('/') +
            `+${this.state.nullMoveCounter}`
        );
    }
}
