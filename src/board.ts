import { BitBoard, setBitBoardValue } from './bitboard';
import { Move, PlacedPiece, Player, StartPosition, getOrientationData } from './movegen/movegen';
import { otherPlayer } from './movegen/movegen-utils';
import { Coordinate } from './types';

const getStartPosition = (position: StartPosition): [Coordinate, Coordinate] => {
    if (position === 'middle') {
        // return [
        //     { x: 4, y: 4 },
        //     { x: 9, y: 9 },
        // ];
        return [
            { x: 6, y: 6 },
            { x: 7, y: 7 },
        ];
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
    pieces: PlacedPiece[];
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
                .filter((p) => p.player === 0)
                .map((p) => getOrientationData(p.pieceType, 0).length)
                .reduce((a, b) => a + b, 0),
            playerB: this.state.pieces
                .filter((p) => p.player === 1)
                .map((p) => getOrientationData(p.pieceType, 0).length)
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
        const piece = move.piece;
        if (piece === null) {
            this.state.nullMoveCounter++;
            this.skipTurn();
            return;
        }

        // if the move we're doing is not a null move, reset the null move counter
        this.state.nullMoveCounter = 0;

        this.state.pieces.push(piece);
        if (piece.player === 0) {
            this.state.playerARemaining &= ~(1 << piece.pieceType);
        } else {
            this.state.playerBRemaining &= ~(1 << piece.pieceType);
        }

        // update bitboard
        const bitBoard = [this.state.playerABitBoard, this.state.playerBBitBoard][piece.player];

        //TODO: use the piece bitboards, not individual tiles
        for (const tile of getOrientationData(piece.pieceType, piece.orientation)) {
            // mark coordinate as set
            const pieceCoord = {
                x: tile.x + piece.location.x,
                y: tile.y + piece.location.y,
            };
            setBitBoardValue(bitBoard, pieceCoord, 1);
        }

        this.skipTurn();
    }

    skipTurn() {
        this.state.toMove = otherPlayer(this.state.toMove);
    }

    undoMove(move: Move) {
        const piece = move.piece;
        this.state.nullMoveCounter = move.previousNullMoveCounter;

        if (piece === null) {
            this.skipTurn();
            return;
        }

        const moveIndex = this.state.pieces.findIndex((p) => {
            return (
                p.location.x === piece.location.x &&
                p.location.y === piece.location.y &&
                piece.pieceType === p.pieceType // just in case
            );
        });

        if (moveIndex === -1) {
            console.error('Err with move: ', move);
            throw new Error(`could not identify piece`);
        }

        this.state.pieces.splice(moveIndex, 1);

        if (piece.player === 0) {
            this.state.playerARemaining |= 1 << piece.pieceType;
        } else {
            this.state.playerBRemaining |= 1 << piece.pieceType;
        }

        // update bitboard
        const bitBoard = [this.state.playerABitBoard, this.state.playerBBitBoard][piece.player];

        for (const tile of getOrientationData(piece.pieceType, piece.orientation)) {
            // mark coordinate as unset
            const pieceCoord = {
                x: tile.x + piece.location.x,
                y: tile.y + piece.location.y,
            };
            setBitBoardValue(bitBoard, pieceCoord, 0);
        }

        this.skipTurn();
    }

    placedPieceHash(piece: PlacedPiece) {
        return `${piece.pieceType}-${piece.location.x}-${piece.location.y}-${piece.orientation}`;
    }

    hash() {
        //TODO: can this hash just be the bitboards?
        return (
            this.state.pieces.map((p) => this.placedPieceHash(p)).join('/') +
            `+${this.state.nullMoveCounter}`
        );
    }
}
