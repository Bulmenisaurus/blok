import { BitBoard } from './bitboard';
import {
    NULL_MOVE,
    Move,
    PackedMove,
    Player,
    StartPosition,
    getMoveOrientation,
    getMovePieceType,
    getMovePlayer,
    getMoveX,
    getMoveY,
    cornersData,
    isMoveLegal,
    moveOverlaps,
    cornerAttachersData,
    getLegalMovesFrom,
    orientationBitBoarddata,
    PIECE_SIZES,
} from './movegen/movegen';
import { otherPlayer } from './movegen/movegen-utils';
import { Coordinate } from './types';

const getStartPosition = (position: StartPosition): [Coordinate, Coordinate] => {
    if (position === 'middle') {
        return [
            { x: 4, y: 4 },
            { x: 9, y: 9 },
        ];
    } else if (position === 'corner') {
        return [
            { x: 0, y: 0 },
            { x: 13, y: 13 },
        ];
    } else if (position === 'middle-blokee') {
        return [
            { x: 6, y: 7 },
            { x: 7, y: 6 },
        ];
    } else {
        throw new Error(`Unrecognized start position ${position}`);
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

    playerASquares: number;
    playerBSquares: number;
    playerAMobility: number;
    playerBMobility: number;
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
    playerASquares: 0,
    playerBSquares: 0,
    playerAMobility: 0,
    playerBMobility: 0,
};

/** Share move arrays; doMove always replaces arrays instead of mutating them. */
const cloneCornerMoves = (cache: Map<number, Move[]>): Map<number, Move[]> => {
    return new Map(cache);
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
            playerA: this.state.playerASquares,
            playerB: this.state.playerBSquares,
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
        const s = this.state;
        return new Board(s.startPosName, this.cloneState());
    }

    copyFrom(other: Board) {
        const s = other.state;
        const d = this.state;
        d.pieces = s.pieces.slice();
        d.toMove = s.toMove;
        d.playerARemaining = s.playerARemaining;
        d.playerBRemaining = s.playerBRemaining;
        for (let i = 0; i < 14; i++) {
            d.playerABitBoard[i] = s.playerABitBoard[i];
            d.playerBBitBoard[i] = s.playerBBitBoard[i];
        }
        d.startPosName = s.startPosName;
        d.nullMoveCounter = s.nullMoveCounter;
        d.playerACornerMoves = cloneCornerMoves(s.playerACornerMoves);
        d.playerBCornerMoves = cloneCornerMoves(s.playerBCornerMoves);
        d.playerASquares = s.playerASquares;
        d.playerBSquares = s.playerBSquares;
        d.playerAMobility = s.playerAMobility;
        d.playerBMobility = s.playerBMobility;
        this.startPositions = other.startPositions;
    }

    private cloneState(): BoardState {
        const s = this.state;
        return {
            pieces: s.pieces.slice(),
            toMove: s.toMove,
            playerARemaining: s.playerARemaining,
            playerBRemaining: s.playerBRemaining,
            playerABitBoard: s.playerABitBoard.slice(),
            playerBBitBoard: s.playerBBitBoard.slice(),
            startPosName: s.startPosName,
            nullMoveCounter: s.nullMoveCounter,
            playerACornerMoves: cloneCornerMoves(s.playerACornerMoves),
            playerBCornerMoves: cloneCornerMoves(s.playerBCornerMoves),
            playerASquares: s.playerASquares,
            playerBSquares: s.playerBSquares,
            playerAMobility: s.playerAMobility,
            playerBMobility: s.playerBMobility,
        };
    }

    /** Cached legal-move count for `player`, including duplicate corner listings. */
    mobility(player: Player): number {
        return player === 0 ? this.state.playerAMobility : this.state.playerBMobility;
    }

    doMove(move: Move) {
        if (move === NULL_MOVE) {
            this.state.nullMoveCounter++;
            this.skipTurn();
            return;
        }

        this.state.nullMoveCounter = 0;
        this.state.pieces.push(move);

        const player = getMovePlayer(move);
        const type = getMovePieceType(move);
        const ori = getMoveOrientation(move);
        const locX = getMoveX(move);
        const locY = getMoveY(move);
        const squares = PIECE_SIZES[type];

        if (player === 0) {
            this.state.playerARemaining &= ~(1 << type);
            this.state.playerASquares += squares;
        } else {
            this.state.playerBRemaining &= ~(1 << type);
            this.state.playerBSquares += squares;
        }

        const bitBoard = player === 0 ? this.state.playerABitBoard : this.state.playerBBitBoard;
        const pieceBitboard = orientationBitBoarddata[type][ori];
        for (let y = 0; y < pieceBitboard.length; y++) {
            bitBoard[locY + y] |= pieceBitboard[y] << locX;
        }

        const myCachedMoves =
            this.state.toMove === 0 ? this.state.playerACornerMoves : this.state.playerBCornerMoves;
        const opponentCachedMoves =
            this.state.toMove === 0 ? this.state.playerBCornerMoves : this.state.playerACornerMoves;
        const myPlayer = this.state.toMove;
        const oppPlayer = otherPlayer(myPlayer);

        const relativeCorner = cornersData[type][ori];
        for (let i = 0; i < relativeCorner.length; i++) {
            const corner = relativeCorner[i];
            const cornerIdx = corner.x + locX + (corner.y + locY) * 14;
            this.deleteCorner(myCachedMoves, myPlayer, cornerIdx);
            this.deleteCorner(opponentCachedMoves, oppPlayer, cornerIdx);
        }

        const cornerAttachers = cornerAttachersData[type][ori];
        const myRemaining =
            player === 0 ? this.state.playerARemaining : this.state.playerBRemaining;
        for (let i = 0; i < cornerAttachers.length; i++) {
            const attacher = cornerAttachers[i];
            const cx = attacher.x + locX;
            const cy = attacher.y + locY;
            if (cx < 0 || cy < 0 || cx > 13 || cy > 13) {
                continue;
            }
            const cornerIdx = cx + cy * 14;
            if (myCachedMoves.has(cornerIdx)) {
                continue;
            }

            const from = { x: cx, y: cy };
            const legalMoves: Move[] = [];
            for (let unplacedPiece = 0; unplacedPiece < 21; unplacedPiece++) {
                if ((myRemaining & (1 << unplacedPiece)) === 0) {
                    continue;
                }
                const extra = getLegalMovesFrom(from, unplacedPiece, this);
                for (let m = 0; m < extra.length; m++) {
                    legalMoves.push(extra[m]);
                }
            }
            myCachedMoves.set(cornerIdx, legalMoves);
            this.addMobility(myPlayer, legalMoves.length);
        }

        this.retainLegal(myCachedMoves, myPlayer);
        this.skipTurn();
        this.retainUnblocked(opponentCachedMoves, oppPlayer, bitBoard);
    }

    private deleteCorner(cache: Map<number, Move[]>, player: Player, cornerIdx: number) {
        const old = cache.get(cornerIdx);
        if (old === undefined) {
            return;
        }
        this.addMobility(player, -old.length);
        cache.delete(cornerIdx);
    }

    private retainLegal(cache: Map<number, Move[]>, player: Player) {
        for (const [idx, moves] of cache) {
            const kept: Move[] = [];
            for (let i = 0; i < moves.length; i++) {
                if (isMoveLegal(moves[i], this)) {
                    kept.push(moves[i]);
                }
            }
            if (kept.length !== moves.length) {
                this.addMobility(player, kept.length - moves.length);
                cache.set(idx, kept);
            }
        }
    }

    /** Opponent cache: own halo is unchanged, so only remaining + new overlap matter. */
    private retainUnblocked(cache: Map<number, Move[]>, player: Player, blocker: number[]) {
        const remaining = player === 0 ? this.state.playerARemaining : this.state.playerBRemaining;
        for (const [idx, moves] of cache) {
            const kept: Move[] = [];
            for (let i = 0; i < moves.length; i++) {
                const move = moves[i];
                if ((remaining & (1 << getMovePieceType(move))) === 0) {
                    continue;
                }
                if (moveOverlaps(move, blocker)) {
                    continue;
                }
                kept.push(move);
            }
            if (kept.length !== moves.length) {
                this.addMobility(player, kept.length - moves.length);
                cache.set(idx, kept);
            }
        }
    }

    private addMobility(player: Player, delta: number) {
        if (player === 0) {
            this.state.playerAMobility += delta;
        } else {
            this.state.playerBMobility += delta;
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
