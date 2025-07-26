import { BitBoard, setBitBoardValue } from './bitboard';
import {
    Move,
    PlacedPiece,
    Player,
    PlayerState,
    StartPosition,
    getOrientationData,
    otherPlayer,
    pieceData,
} from './movegen/movegen';
import { Coordinate } from './types';

const getStartPosition = (position: StartPosition): [Coordinate, Coordinate] => {
    if (position === 'middle') {
        return [
            { x: 4, y: 4 },
            { x: 9, y: 9 },
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

    /** The remaining pieces for each player */
    playerA: PlayerState;
    playerB: PlayerState;

    playerABitBoard: BitBoard;
    playerBBitBoard: BitBoard;

    startPosName: StartPosition;
    startPositions: [Coordinate, Coordinate];
}

/**
 * The initial uninitialized board state. Doesn't have the player bags.
 */
const defaultBoardState: BoardState = {
    pieces: [],
    toMove: 0,
    playerA: { remainingPieces: new Set() },
    playerB: { remainingPieces: new Set() },
    playerABitBoard: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    playerBBitBoard: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    startPosName: 'middle',
    startPositions: [
        { x: 4, y: 4 },
        { x: 9, y: 9 },
    ],
};
export class Board {
    state: BoardState;
    startPositions: [Coordinate, Coordinate];

    constructor(startPosition: StartPosition, state?: BoardState) {
        this.state = state || {
            ...defaultBoardState,
            startPosName: startPosition,
        };

        for (let i = 0; i < pieceData.length; i++) {
            this.state.playerA.remainingPieces.add(i);
            this.state.playerB.remainingPieces.add(i);
        }

        this.startPositions = getStartPosition(startPosition);
    }

    copy() {
        const state = window.structuredClone(this.state);
        return new Board(state.startPosName, state);
    }

    doMove(move: Move) {
        this.state.pieces.push(move.piece);
        if (move.piece.player === 0) {
            this.state.playerA.remainingPieces.delete(move.piece.pieceType);
        } else {
            this.state.playerB.remainingPieces.delete(move.piece.pieceType);
        }

        // update bitboard
        const bitBoard = [this.state.playerABitBoard, this.state.playerBBitBoard][
            move.piece.player
        ];

        for (const tile of getOrientationData(move.piece.pieceType, move.piece.orientation)) {
            // mark coordinate as set
            const pieceCoord = {
                x: tile.x + move.piece.location.x,
                y: tile.y + move.piece.location.y,
            };
            setBitBoardValue(bitBoard, pieceCoord, 1);
        }

        this.state.toMove = otherPlayer(this.state.toMove);
    }

    /**
     * Currently used when the player has no legal moves to transfer to the other player.
     */
    skipTurn() {
        this.state.toMove = otherPlayer(this.state.toMove);
    }

    undoMove(move: Move) {
        const moveIndex = this.state.pieces.findIndex((p) => {
            return (
                p.location.x === move.piece.location.x &&
                p.location.y === move.piece.location.y &&
                move.piece.pieceType === p.pieceType // just in case
            );
        });

        if (moveIndex === -1) {
            console.error('Err with move: ', move);
            throw new Error(`could not identify piece`);
        }

        this.state.pieces.splice(moveIndex, 1);

        if (move.piece.player === 0) {
            this.state.playerA.remainingPieces.add(move.piece.pieceType);
        } else {
            this.state.playerB.remainingPieces.add(move.piece.pieceType);
        }

        // update bitboard
        const bitBoard = [this.state.playerABitBoard, this.state.playerBBitBoard][
            move.piece.player
        ];

        for (const tile of getOrientationData(move.piece.pieceType, move.piece.orientation)) {
            // mark coordinate as unset
            const pieceCoord = {
                x: tile.x + move.piece.location.x,
                y: tile.y + move.piece.location.y,
            };
            setBitBoardValue(bitBoard, pieceCoord, 0);
        }

        this.state.toMove = otherPlayer(this.state.toMove);
    }
}
