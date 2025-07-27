import { Coordinate } from '../types';
import { getBitBoardValue } from '../bitboard';

import _pieceData from './pieces.json'; // https://www.gottfriedville.net/blokus/set.png
import _orientationData from './piece-orientations.json';
import _orientationBitboardData from './piece-orientations-bitboard.json';
import _rrData from './piece-rr.json';
import _cornersData from './piece-corners.json';
import _shortBoundingBoxData from './piece-short-bounding-box.json';
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
export const orientationBitBoarddata: Readonly<number[][][]> = _orientationBitboardData;
export const RRData: Readonly<number[][]> = _rrData;
export const cornersData: Readonly<PieceData[][]> = _cornersData;
export const cornerAttachersData: Readonly<PieceData[][]> = _cornerAttachersData;
export const shortBoundingBoxData: Readonly<[number, number][][]> = _shortBoundingBoxData as [
    number,
    number,
][][];
export const getOrientationData = (pieceType: PieceType, orientation: number) => {
    return orientationData[pieceType][orientation];
};

export type StartPosition = 'middle' | 'corner';

const translateBoundingBox = (c: Coordinate, bb: BoundingBox) => {
    return {
        topLeft: { x: bb.topLeft.x + c.x, y: bb.topLeft.y + c.y },
        bottomRight: { x: bb.bottomRight.x + c.x, y: bb.bottomRight.y + c.y },
    };
};

const coordinateInBounds = (c: Coordinate) => {
    return c.x >= 0 && c.x <= 13 && c.y >= 0 && c.y <= 13;
};

const isInBounds = (pieceCoordinate: Coordinate, boundingBox: BoundingBox) => {
    const translated = translateBoundingBox(pieceCoordinate, boundingBox);
    return coordinateInBounds(translated.topLeft) && coordinateInBounds(translated.bottomRight);
};

const isMoveLegalA = (pseudoLegalMove: Move, state: Board): boolean => {
    if (pseudoLegalMove.piece === null) {
        return true;
    }

    const toMove = pseudoLegalMove.piece.player;
    const location = pseudoLegalMove.piece.location;

    const myBitBoard = [state.state.playerABitBoard, state.state.playerBBitBoard][toMove];
    const opponentBitBoard = [state.state.playerBBitBoard, state.state.playerABitBoard][toMove];

    const boundingBox = getBoundingBox(
        getOrientationData(pseudoLegalMove.piece.pieceType, pseudoLegalMove.piece.orientation)
    );
    if (!isInBounds(location, boundingBox)) {
        return false;
    }
    // this is an array of numbers, representing the piece
    // for example, [1,1,1,3] corresponds to
    // +------
    // |x
    // |x
    // |x
    // |xx
    // i.e. the L piece
    const pieceBitboard =
        orientationBitBoarddata[pseudoLegalMove.piece.pieceType][pseudoLegalMove.piece.orientation];

    // it's easier to check the opponent bitboards first: check if there is no intersection
    for (let bitboardY = 0; bitboardY < pieceBitboard.length; bitboardY++) {
        // translate the row right by the x coordinate of the piece
        const bitBoardRow = pieceBitboard[bitboardY] << location.x;
        // now compare it with the actual bitboard
        const gameRow = opponentBitBoard[bitboardY + location.y];
        if (bitBoardRow & gameRow) {
            return false;
        }
    }

    // check if there is any intersection with my bitboard
    // for this we also need to do a "halo" - checking 4 tiles around each piece
    // thus for each row, we need to add a couple more options: the row, the rows above and below it, and the row shifted left and right
    for (let bitboardY = -1; bitboardY < pieceBitboard.length + 1; bitboardY++) {
        const rowAbove = bitboardY - 1 >= 0 ? pieceBitboard[bitboardY - 1] << location.x : 0;
        const rowBelow =
            bitboardY + 1 < pieceBitboard.length ? pieceBitboard[bitboardY + 1] << location.x : 0;
        const rowCurrent =
            bitboardY >= 0 && bitboardY < pieceBitboard.length
                ? pieceBitboard[bitboardY] << location.x
                : 0;
        const rowLeftRight = (rowCurrent << 1) | (rowCurrent >> 1);

        // the total tiles we need to check for this row - all the adjacent ones
        const halo = rowAbove | rowBelow | rowCurrent | rowLeftRight;

        const gameRow = myBitBoard[bitboardY + location.y];
        if (halo & gameRow) {
            return false;
        }
    }

    return true;
};

// Should perform the same check as isMoveLegal, but using the bitboards
const isMoveLegalB = (pseudoLegalMove: Move, state: Board): boolean => {
    if (pseudoLegalMove.piece === null) {
        return true;
    }

    const toMove = pseudoLegalMove.piece.player;
    const location = pseudoLegalMove.piece.location;

    const myBitBoard = [state.state.playerABitBoard, state.state.playerBBitBoard][toMove];
    const opponentBitBoard = [state.state.playerBBitBoard, state.state.playerABitBoard][toMove];

    const shortBoundingBox =
        shortBoundingBoxData[pseudoLegalMove.piece.pieceType][pseudoLegalMove.piece.orientation];
    const bottomRightBB = {
        x: location.x + shortBoundingBox[0],
        y: location.y + shortBoundingBox[1],
    };
    if (!coordinateInBounds(bottomRightBB) || !coordinateInBounds(location)) {
        return false;
    }
    // this is an array of numbers, representing the piece
    // for example, [1,1,1,3] corresponds to
    // +------
    // |x
    // |x
    // |x
    // |xx
    // i.e. the L piece
    const pieceBitboard =
        orientationBitBoarddata[pseudoLegalMove.piece.pieceType][pseudoLegalMove.piece.orientation];

    // it's easier to check the opponent bitboards first: check if there is no intersection
    for (let bitboardY = 0; bitboardY < pieceBitboard.length; bitboardY++) {
        // translate the row right by the x coordinate of the piece
        const bitBoardRow = pieceBitboard[bitboardY] << location.x;
        // now compare it with the actual bitboard
        const gameRow = opponentBitBoard[bitboardY + location.y];
        if (bitBoardRow & gameRow) {
            return false;
        }
    }

    // check if there is any intersection with my bitboard
    // for this we also need to do a "halo" - checking 4 tiles around each piece
    // thus for each row, we need to add a couple more options: the row, the rows above and below it, and the row shifted left and right
    for (let bitboardY = -1; bitboardY < pieceBitboard.length + 1; bitboardY++) {
        const rowAbove = bitboardY - 1 >= 0 ? pieceBitboard[bitboardY - 1] << location.x : 0;
        const rowBelow =
            bitboardY + 1 < pieceBitboard.length ? pieceBitboard[bitboardY + 1] << location.x : 0;
        const rowCurrent =
            bitboardY >= 0 && bitboardY < pieceBitboard.length
                ? pieceBitboard[bitboardY] << location.x
                : 0;
        const rowLeftRight = (rowCurrent << 1) | (rowCurrent >> 1);

        // the total tiles we need to check for this row - all the adjacent ones
        const halo = rowAbove | rowBelow | rowCurrent | rowLeftRight;

        const gameRow = myBitBoard[bitboardY + location.y];
        if (halo & gameRow) {
            return false;
        }
    }

    return true;
};

interface BoundingBox {
    width: number;
    height: number;
    topLeft: Coordinate;
    bottomRight: Coordinate;
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
        topLeft: { x: minX, y: minY },
        bottomRight: { x: maxX, y: maxY },
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

    // return moves.filter((p) => {
    //     const l1 = isMoveLegalA(p, state);
    //     const l2 = isMoveLegalB(p, state);
    //     if (l1 !== l2) {
    //         debugger;
    //         console.error('moves disagree');

    //         isMoveLegalA(p, state);
    //         isMoveLegalB(p, state);
    //     }
    //     return l1;
    // });
    return moves.filter((p) => isMoveLegalB(p, state));
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
    return moves.filter((p) => isMoveLegalA(p, board));
};

export const getAllLegalMoves = (board: Board): Move[] => {
    //for all of my already placed pieces:
    //  - find their "corner attachers" (filter out occupied ones)
    //  - for each of the "corner attachers":
    //      - for each of my non-placed pieces
    //          - for each orientation of that non-placed piece
    //              - check if that orientation of that piece in that location intersects or is adjacent to any other piece

    if (board.gameOver()) {
        return [];
    }

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
