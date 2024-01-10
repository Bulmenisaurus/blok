import { Coordinate } from './types';
import _pieceData from './pieces.json'; // https://www.gottfriedville.net/blokus/set.png
import _permutationData from './piece-permutations.json';
import { BitBoard, getBitBoardValue, setBitBoardValue } from './bitboard';

export type PieceData = Coordinate[];

// index into the "pieceData"
export type PieceType = number;
export type Player = 0 | 1;

export const otherPlayer = (player: Player): Player => (player === 1 ? 0 : 1);

export interface PlacedPiece {
    pieceType: PieceType;
    location: Coordinate;
    player: Player;
    rotation: number;
    reflection: boolean;
}

export interface PlayerState {
    remainingPieces: Set<PieceType>;
}

export interface Move {
    piece: PlacedPiece;
}

export interface Permutation {
    rotation: number;
    reflection: boolean;
    data: PieceData;
}

export const pieceData: Readonly<PieceData[]> = _pieceData;
export const permutationData: Readonly<Permutation[][]> = _permutationData;

export const getPieceData = (pieceType: PieceType, rotation: number, reflection: boolean) => {
    let data = pieceData[pieceType];
    if (reflection) {
        data = reflect(data);
    }
    for (let i = 0; i < rotation; i++) {
        data = rotate90Deg(data);
    }

    return data;
};

export class BoardState {
    pieces: PlacedPiece[];
    toMove: Player;
    playerA: PlayerState;
    playerB: PlayerState;

    playerABitBoard: BitBoard;
    playerBBitBoard: BitBoard;

    constructor() {
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

        for (const tile of getPieceData(
            move.piece.pieceType,
            move.piece.rotation,
            move.piece.reflection
        )) {
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

        for (const tile of getPieceData(
            move.piece.pieceType,
            move.piece.rotation,
            move.piece.reflection
        )) {
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

const getCornerAttachers = (piece: PieceData): Coordinate[] => {
    // the set of all coordinates that are:
    // - diagonally adjacent to a tile in the piece
    // - not adjacent to a tile in the piece
    // - not occupied by a tile in the piece

    let corners: Coordinate[] = [];

    // diagonally adjacent
    for (const tile of piece) {
        [
            { x: tile.x + 1, y: tile.y + 1 }, // ↗
            { x: tile.x + 1, y: tile.y - 1 }, // ↘
            { x: tile.x - 1, y: tile.y - 1 }, // ↙
            { x: tile.x - 1, y: tile.y + 1 }, // ↖
        ].forEach((c) => {
            if (!coordPresent(corners, c)) {
                corners.push(c);
            }
        });
    }

    // not adjacent
    corners = corners.filter((c) =>
        [
            { x: c.x + 1, y: c.y }, // →
            { x: c.x, y: c.y - 1 }, // ↓
            { x: c.x - 1, y: c.y }, // ←
            { x: c.x, y: c.y + 1 }, // ↑
        ].every((adjacent) => !coordPresent(piece, adjacent))
    );

    // not occupied
    corners = corners.filter((c) => !coordPresent(piece, c));

    return corners;
};

const getCorners = (piece: PieceData): Coordinate[] => {
    // the set of all coordinates that are:
    // - part of the piece
    // - don't have an adjacent tile above and below
    // - don't have an adjacent tile to left and right

    // part of the piece
    let corners: Coordinate[] = piece;

    // don't have a neighbor to left and right
    corners = corners.filter((c) => {
        let neighborLeft = coordPresent(piece, { x: c.x - 1, y: c.y });
        let neighborRight = coordPresent(piece, { x: c.x + 1, y: c.y });

        return !(neighborLeft && neighborRight);
    });

    // don't have a neighbor to the top and bottom
    corners = corners.filter((c) => {
        let neighborTop = coordPresent(piece, { x: c.x, y: c.y + 1 });
        let neighborBottom = coordPresent(piece, { x: c.x, y: c.y - 1 });

        return !(neighborTop && neighborBottom);
    });

    return corners;
};

const coordPresent = (coords: Coordinate[], check: Coordinate) => {
    for (const c of coords) {
        if (c.x === check.x && c.y === check.y) {
            return true;
        }
    }

    return false;
};

// check if a pseudo-legal move is actually legal
// - piece shares a tile with any other of my pieces or any of my opponents pieces
// - pieces is adjacent to a tile with any of my other pieces
// - all tiles of a piece end up in the board
const isMoveLegal = (pseudoLegalMove: Move, state: BoardState): boolean => {
    const toMove = pseudoLegalMove.piece.player;

    for (const tileA of getPieceData(
        pseudoLegalMove.piece.pieceType,
        pseudoLegalMove.piece.rotation,
        pseudoLegalMove.piece.reflection
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

        const myBitBoard = [state.playerABitBoard, state.playerBBitBoard][toMove];
        const opponentBitBoard = [state.playerBBitBoard, state.playerABitBoard][toMove];

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

const rotateCoord90Deg = (c: Coordinate) => {
    // https://math.stackexchange.com/a/1330166
    return { x: c.y, y: -c.x };
};

const rotate90Deg = (pieceData: PieceData): PieceData => {
    return pieceData.map((c) => rotateCoord90Deg(c));
};

const reflect = (pieceData: PieceData): PieceData => {
    return pieceData.map((p) => ({ x: -p.x, y: p.y }));
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

const getLegalMovesFrom = (from: Coordinate, piece: PieceType, state: BoardState): Move[] => {
    const moves: Move[] = [];

    for (const permutation of permutationData[piece]) {
        for (const corner of getCorners(permutation.data)) {
            // position of the (0,0) tile
            const pieceMiddle = { x: from.x - corner.x, y: from.y - corner.y };
            let placedPiece: PlacedPiece = {
                location: pieceMiddle,
                player: state.toMove,
                pieceType: piece,
                rotation: permutation.rotation,
                reflection: permutation.reflection,
            };

            moves.push({ piece: placedPiece });
        }
    }

    return moves.filter((p) => isMoveLegal(p, state));
};

export const getAllLegalMoves = (board: BoardState): Move[] => {
    //for all of my already placed pieces:
    //  - find their "corner attachers" (filter out occupied ones)
    //  - for each of the "corner attachers":
    //      - for each of my non-placed pieces
    //          - for each orientation of that non-placed piece
    //              - check if that orientation of that piece in that location intersects or is adjacent to any other piece

    const myPlacedPieces = board.pieces.filter((p) => p.player === board.toMove);

    // first move
    if (myPlacedPieces.length === 0) {
        if (board.toMove === 0) {
            return [
                {
                    piece: {
                        pieceType: 5,
                        location: { x: 4, y: 4 },
                        player: 0,
                        rotation: 0,
                        reflection: false,
                    },
                },
            ];
        } else {
            return [
                {
                    piece: {
                        pieceType: 0,
                        location: { x: 9, y: 9 },
                        player: 1,
                        rotation: 0,
                        reflection: false,
                    },
                },
            ];
        }
    }

    const myState = board.toMove === 0 ? board.playerA : board.playerB;
    const moves: Move[] = [];

    for (const placedPiece of myPlacedPieces) {
        const pieceData = getPieceData(
            placedPiece.pieceType,
            placedPiece.rotation,
            placedPiece.reflection
        );
        for (const cornerAttacher of getCornerAttachers(pieceData)) {
            const cornerAbsolute: Coordinate = {
                x: cornerAttacher.x + placedPiece.location.x,
                y: cornerAttacher.y + placedPiece.location.y,
            };
            for (const unplacedPiece of myState.remainingPieces) {
                moves.push(...getLegalMovesFrom(cornerAbsolute, unplacedPiece, board));
            }
        }
    }

    return moves;
};
