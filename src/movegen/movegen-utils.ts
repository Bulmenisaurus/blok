// Defines various useful utility functions for move generation that do not directly generate lists of moves

import { Coordinate } from '../types';
import { PieceData, Player } from './movegen';

export const otherPlayer = (player: Player): Player => (player === 1 ? 0 : 1);

export const coordinateInBounds = (c: Coordinate) => {
    return c.x >= 0 && c.x <= 13 && c.y >= 0 && c.y <= 13;
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
