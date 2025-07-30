import { Coordinate } from './types';

export type BitBoard = number[];
export type Bit = 0 | 1;

export const getBitBoardValue = (bitBoard: BitBoard, c: Coordinate): Bit => {
    const validYCoordinate = c.y >= 0 && c.y <= 13;
    const validXCoordinate = c.x >= 0 && c.x <= 13;
    if (!validYCoordinate || !validXCoordinate) {
        return 0;
    }

    return ((bitBoard[c.y] >> c.x) & 1) as Bit;
};

//TODO: might we want to separate out setBit and unsetBit?
export const setBitBoardValue = (bitBoard: BitBoard, c: Coordinate, value: Bit) => {
    const validYCoordinate = c.y >= 0 && c.y <= 13;
    const validXCoordinate = c.x >= 0 && c.x <= 13;
    if (!validYCoordinate || !validXCoordinate) {
        return;
    }

    // is there a way to do this without branching
    if (value == 0) {
        bitBoard[c.y] &= ~(1 << c.x);
    } else {
        bitBoard[c.y] |= 1 << c.x;
    }
};
