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
} from './movegen';
import { Coordinate } from './types';

export class BoardState {
    pieces: PlacedPiece[];
    toMove: Player;
    playerA: PlayerState;
    playerB: PlayerState;

    playerABitBoard: BitBoard;
    playerBBitBoard: BitBoard;

    startPosName: StartPosition;
    startPositions: [Coordinate, Coordinate];

    constructor(startPosition: StartPosition) {
        this.pieces = [];
        this.playerA = {
            remainingPieces: new Set(),
        };

        this.playerABitBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        this.playerB = {
            remainingPieces: new Set(),
        };

        this.playerBBitBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        for (let i = 0; i < pieceData.length; i++) {
            this.playerA.remainingPieces.add(i);
            this.playerB.remainingPieces.add(i);
        }

        this.toMove = 0;

        this.startPosName = startPosition;
        if (startPosition === 'middle') {
            this.startPositions = [
                { x: 4, y: 4 },
                { x: 9, y: 9 },
            ];
        } else {
            this.startPositions = [
                { x: 0, y: 13 },
                { x: 13, y: 0 },
            ];
        }
    }

    doMove(move: Move) {
        this.pieces.push(move.piece);
        if (move.piece.player === 0) {
            this.playerA.remainingPieces.delete(move.piece.pieceType);
        } else {
            this.playerB.remainingPieces.delete(move.piece.pieceType);
        }

        // update bitboard
        const bitBoard = [this.playerABitBoard, this.playerBBitBoard][move.piece.player];

        for (const tile of getOrientationData(move.piece.pieceType, move.piece.orientation)) {
            // mark coordinate as set
            const pieceCoord = {
                x: tile.x + move.piece.location.x,
                y: tile.y + move.piece.location.y,
            };
            setBitBoardValue(bitBoard, pieceCoord, 1);
        }

        this.toMove = otherPlayer(this.toMove);
    }

    skipTurn() {
        this.toMove = otherPlayer(this.toMove);
    }

    undoMove(move: Move) {
        const moveIndex = this.pieces.findIndex((p) => {
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

        this.pieces.splice(moveIndex, 1);

        if (move.piece.player === 0) {
            this.playerA.remainingPieces.add(move.piece.pieceType);
        } else {
            this.playerB.remainingPieces.add(move.piece.pieceType);
        }

        // update bitboard
        const bitBoard = [this.playerABitBoard, this.playerBBitBoard][move.piece.player];

        for (const tile of getOrientationData(move.piece.pieceType, move.piece.orientation)) {
            // mark coordinate as set
            const pieceCoord = {
                x: tile.x + move.piece.location.x,
                y: tile.y + move.piece.location.y,
            };
            setBitBoardValue(bitBoard, pieceCoord, 0);
        }

        this.toMove = otherPlayer(this.toMove);
    }
}
