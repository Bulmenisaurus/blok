import { Coordinate } from '../types';
import { getBitBoardValue } from '../bitboard';

import _pieceData from './pieces.json'; // https://www.gottfriedville.net/blokus/set.png
import _orientationData from './piece-orientations.json';
import _rrData from './piece-rr.json';
import _cornersData from './piece-corners.json';
import _cornerAttachersData from './piece-corner-attachers.json';
import { Board } from '../board';

export type PieceData = Coordinate[];

// index into the "pieceData"
export type PieceType = number;
export type Player = 0 | 1;

export const otherPlayer = (player: Player): Player => (player === 1 ? 0 : 1);

export interface PlacedPiece {
    pieceType: PieceType;
    location: Coordinate;
    player: Player;
    orientation: number;
}

export interface PlayerState {
    remainingPieces: Set<PieceType>;
}

/**
 * A move is either a placement of a piece or a transfer of the turn to the other player.
 */
export interface Move {
    piece: PlacedPiece | null;
    /** The number of null moves played in a row before this move, used to keep track in case it is undone */
    previousNullMoveCounter: number;
}

export interface Permutation {
    rotation: number;
    reflection: boolean;
    data: PieceData;
}

export const pieceData: Readonly<PieceData[]> = _pieceData;
export const orientationData: Readonly<PieceData[][]> = _orientationData;
export const RRData: Readonly<number[][]> = _rrData;
export const cornersData: Readonly<PieceData[][]> = _cornersData;
export const cornerAttachersData: Readonly<PieceData[][]> = _cornerAttachersData;

export const getOrientationData = (pieceType: PieceType, orientation: number) => {
    return orientationData[pieceType][orientation];
};

export type StartPosition = 'middle' | 'corner';

// check if a pseudo-legal move is actually legal
// - piece shares a tile with any other of my pieces or any of my opponents pieces
// - pieces is adjacent to a tile with any of my other pieces
// - all tiles of a piece end up in the board
const isMoveLegal = (pseudoLegalMove: Move, state: Board): boolean => {
    if (pseudoLegalMove.piece === null) {
        return true;
    }

    const toMove = pseudoLegalMove.piece.player;

    for (const tileA of getOrientationData(
        pseudoLegalMove.piece.pieceType,
        pseudoLegalMove.piece.orientation
    )) {
        const absA = {
            x: pseudoLegalMove.piece.location.x + tileA.x,
            y: pseudoLegalMove.piece.location.y + tileA.y,
        };
        // check piece in bounds
        const inBounds = absA.x >= 0 && absA.x <= 13 && absA.y >= 0 && absA.y <= 13;
        if (!inBounds) {
            return false;
        }

        const myBitBoard = [state.state.playerABitBoard, state.state.playerBBitBoard][toMove];
        const opponentBitBoard = [state.state.playerBBitBoard, state.state.playerABitBoard][toMove];

        const ownTileAdjacent =
            getBitBoardValue(myBitBoard, { x: absA.x + 1, y: absA.y }) ||
            getBitBoardValue(myBitBoard, { x: absA.x - 1, y: absA.y }) ||
            getBitBoardValue(myBitBoard, { x: absA.x, y: absA.y + 1 }) ||
            getBitBoardValue(myBitBoard, { x: absA.x, y: absA.y - 1 });

        const ownTileIntersect = getBitBoardValue(myBitBoard, { x: absA.x, y: absA.y });
        const opponentIntersect = getBitBoardValue(opponentBitBoard, { x: absA.x, y: absA.y });

        if (ownTileAdjacent || ownTileIntersect || opponentIntersect) {
            return false;
        }
    }

    return true;
};

interface BoundingBox {
    width: number;
    height: number;
    bottomLeft: Coordinate;
    topRight: Coordinate;
}
export const getBoundingBox = (pieceData: PieceData): BoundingBox => {
    let minX = pieceData[0].x;
    let minY = pieceData[0].y;
    let maxX = pieceData[0].x;
    let maxY = pieceData[0].y;

    for (const tile of pieceData) {
        minX = Math.min(minX, tile.x);
        minY = Math.min(minY, tile.y);
        maxX = Math.max(maxX, tile.x);
        maxY = Math.max(maxY, tile.y);
    }

    return {
        bottomLeft: { x: minX, y: minY },
        topRight: { x: maxX, y: maxY },
        width: maxX - minX + 1,
        height: maxY - minY + 1,
    };
};

const getLegalMovesFrom = (from: Coordinate, piece: PieceType, state: Board): Move[] => {
    const moves: Move[] = [];

    // go over each orientation
    for (let i = 0; i < orientationData[piece].length; i++) {
        const orientationCorners = cornersData[piece][i];

        // each corner of the orientation
        for (const corner of orientationCorners) {
            // position of the (0,0) tile
            const pieceMiddle = { x: from.x - corner.x, y: from.y - corner.y };
            let placedPiece: PlacedPiece = {
                location: pieceMiddle,
                player: state.state.toMove,
                pieceType: piece,
                orientation: i,
            };

            moves.push({
                piece: placedPiece,
                previousNullMoveCounter: state.state.nullMoveCounter,
            });
        }
    }

    return moves.filter((p) => isMoveLegal(p, state));
};

const generateFirstMove = (board: Board): Move[] => {
    const myState = board.state.toMove === 0 ? board.state.playerA : board.state.playerB;
    const startPos = board.startPositions[board.state.toMove];

    const moves: Move[] = [];
    for (const piece of myState.remainingPieces) {
        // go over each orientation
        for (let i = 0; i < orientationData[piece].length; i++) {
            const pieceTiles = orientationData[piece][i];

            // each tile of the piece, center it over the starting position
            for (const tile of pieceTiles) {
                // position of the (0,0) tile
                const pieceMiddle = { x: startPos.x - tile.x, y: startPos.y - tile.y };
                let placedPiece: PlacedPiece = {
                    location: pieceMiddle,
                    player: board.state.toMove,
                    pieceType: piece,
                    orientation: i,
                };

                if (board.state.nullMoveCounter !== 0) {
                    throw new Error('Null move counter is not 0 at the beginning of the game?');
                }

                moves.push({
                    piece: placedPiece,
                    previousNullMoveCounter: board.state.nullMoveCounter,
                });
            }
        }
    }
    return moves.filter((p) => isMoveLegal(p, board));
};

export const getAllLegalMoves = (board: Board): Move[] => {
    //for all of my already placed pieces:
    //  - find their "corner attachers" (filter out occupied ones)
    //  - for each of the "corner attachers":
    //      - for each of my non-placed pieces
    //          - for each orientation of that non-placed piece
    //              - check if that orientation of that piece in that location intersects or is adjacent to any other piece

    const myPlacedPieces = board.state.pieces.filter((p) => p.player === board.state.toMove);

    if (myPlacedPieces.length === 0) {
        return generateFirstMove(board);
    }

    const myState = board.state.toMove === 0 ? board.state.playerA : board.state.playerB;
    const moves: Move[] = [];

    for (const placedPiece of myPlacedPieces) {
        const cornerAttachers = cornerAttachersData[placedPiece.pieceType][placedPiece.orientation];
        for (const cornerAttacher of cornerAttachers) {
            const cornerAbsolute: Coordinate = {
                x: cornerAttacher.x + placedPiece.location.x,
                y: cornerAttacher.y + placedPiece.location.y,
            };

            // corner attacher must be unoccupied for us to place something there

            const playerATile = getBitBoardValue(board.state.playerABitBoard, cornerAbsolute);
            const playerBTile = getBitBoardValue(board.state.playerBBitBoard, cornerAbsolute);
            if (playerATile || playerBTile) {
                continue;
            }

            for (const unplacedPiece of myState.remainingPieces) {
                moves.push(...getLegalMovesFrom(cornerAbsolute, unplacedPiece, board));
            }
        }
    }

    if (moves.length === 0) {
        moves.push({ piece: null, previousNullMoveCounter: board.state.nullMoveCounter });
    }

    return moves;
};
