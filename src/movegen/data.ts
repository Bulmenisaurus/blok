import * as fs from 'fs';

/** Generate the data according to docs/orientations.md
 *
 * For each piece, generate the eight RRs
 * Create a dictionary of each of the eight RRs to an orientation
 * Create a file saving each orientation
 */

//pieceData is pieces.json
import { PieceData, PieceType, getBoundingBox, pieceData } from './movegen';
import { Coordinate } from '../types';

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

const getPieceData = (pieceType: PieceType, rotation: number, reflection: boolean) => {
    let data = pieceData[pieceType];
    for (let i = 0; i < rotation; i++) {
        data = rotate90Deg(data);
    }
    if (reflection) {
        data = reflect(data);
    }

    // Normalize coordinates every time. This might be a little stupid but it's better for bitboards.
    return normalize(data);
};

interface OrientationData {
    orientations: PieceData[];
    orientationDict: number[];
}

const createOrientationDictPiece = (type: PieceType): OrientationData => {
    /*
        For each RR:
        Check if it is not already in the list of RRs, if it is not, add it
    */
    let i = 0;
    const RRs: PieceData[] = [];

    // generate each RR
    for (let rotation = 0; rotation < 4; rotation++) {
        for (const flip of [false, true]) {
            const RR = getPieceData(type, rotation, flip);
            RRs.push(RR);
            i++;
        }
    }

    // list of orientation
    const orientationDict = [0, 0, 0, 0, 0, 0, 0, 0];
    let currentOrientationIdx = 0;
    const orientations: PieceData[] = [];
    // orientationDict[0] is guaranteed to be 0, as the first item is always not encountered and will have a orientation of 0
    for (let i = 0; i < 8; i++) {
        // check each of the orientations before it
        let encountered = false;
        for (let j = 0; j < i; j++) {
            // i'th RR is equal to a previously encountered j'th rr
            // so they must both point to the same orientation
            if (pieceDataEqual(RRs[i], RRs[j])) {
                orientationDict[i] = orientationDict[j];
                encountered = true;
            }
        }

        // this rr has never been seen before, it is a orientation

        if (!encountered) {
            orientationDict[i] = currentOrientationIdx;
            currentOrientationIdx++;
            orientations.push(RRs[i]);
        }
    }

    return { orientationDict, orientations };
};

const coordPresent = (coords: Coordinate[], check: Coordinate) => {
    for (const c of coords) {
        if (c.x === check.x && c.y === check.y) {
            return true;
        }
    }

    return false;
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

const normalize = (p: PieceData) => {
    const boundingBox = getBoundingBox(p);

    return p.map((c) => ({ x: c.x - boundingBox.topLeft.x, y: c.y - boundingBox.topLeft.y }));
};

const pieceDataEqual = (piece1: PieceData, piece2: PieceData) => {
    // translate the piece data, because we just need the overall shape
    let p1 = normalize(piece1);
    let p2 = normalize(piece2);

    // uses the property that if A and B are finite sets A ⊂ B ∧ |A| = |B| ⇔ A = B

    // |A| = |B|
    if (p1.length !== p2.length) {
        return false;
    }

    // A ⊂ B
    for (const c1 of p1) {
        let itemFound = false;
        for (const c2 of p2) {
            const eq = c1.x === c2.x && c1.y == c2.y;

            if (eq) {
                itemFound = true;
            }
        }

        if (!itemFound) {
            return false;
        }
    }

    return true;
};

// given a piece orientation, return a row-by-row bitboard
const orientationToBitboard = (orientation: PieceData): number[] => {
    if (orientation.some((c) => c.x < 0 || c.y < 0)) {
        console.log(orientation);

        throw new Error('Orientation has negative coordinates, cannot convert to bitboard');
    }

    const size = getBoundingBox(orientation);

    if (size.topLeft.x !== 0 || size.topLeft.y !== 0) {
        throw new Error('Orientation has non-zero top-left corner, cannot convert to bitboard');
    }

    const bitboard = Array(size.height).fill(0);

    for (const c of orientation) {
        bitboard[c.y] |= 1 << c.x;
    }

    return bitboard;
};

// "smear" the bitboard a bit, so that every bit adjacent to a bit in the bitboard is also set
// NOTE: also shifts everything to the right!!!!!!!! (so that lower bits are not lost)
const haloBitboard = (bitboard: number[]): number[] => {
    // necessarily add one more row above and below
    const halo = Array(bitboard.length + 2).fill(0);
    const shift = 1;

    for (let bitboardY = -1; bitboardY < bitboard.length + 1; bitboardY++) {
        const rowAbove = bitboardY - 1 >= 0 ? bitboard[bitboardY - 1] << shift : 0;
        const rowBelow = bitboardY + 1 < bitboard.length ? bitboard[bitboardY + 1] << shift : 0;
        const rowCurrent =
            bitboardY >= 0 && bitboardY < bitboard.length ? bitboard[bitboardY] << shift : 0;
        const rowLeftRight = (rowCurrent << 1) | (rowCurrent >> 1);

        // the total tiles we need to check for this row - all the adjacent ones
        // const halo = rowAbove | rowBelow | rowCurrent | rowLeftRight;

        halo[bitboardY + 1] = rowAbove | rowBelow | rowCurrent | rowLeftRight;
    }

    return halo;
};

const getBitboardDataHalo = (bitboardData: number[][][]): number[][][] => {
    return bitboardData.map((piece) => piece.map((orientation) => haloBitboard(orientation)));
};

const orientationDataToBitboardData = (orientationData: PieceData[][]) => {
    const bitboardData = [];
    for (const piece of orientationData) {
        const pieceBitboardData = [];
        for (const orientation of piece) {
            pieceBitboardData.push(orientationToBitboard(orientation));
        }
        bitboardData.push(pieceBitboardData);
    }
    return bitboardData;
};

// we don't need to store all to information that BoundingBox provides.
// because we normalize the piece data, one of the corners is always {x: 0, y: 0}
const getShortBoundingBox = (piece: PieceData): [number, number] => {
    const boundingbox = getBoundingBox(piece);
    // topleft
    if (!(boundingbox.topLeft.x === 0 && boundingbox.topLeft.y === 0)) {
        console.error(piece, boundingbox);
        throw new Error(
            `Expected top left to be (0,0), instead got ${JSON.stringify(boundingbox.topLeft)}`
        );
    }

    return [boundingbox.bottomRight.x, boundingbox.bottomRight.y];
};

const main = () => {
    const orientationData: PieceData[][] = [];
    const orientationDicts: number[][] = [];
    const corner: PieceData[][] = [];
    const cornerAttacher: PieceData[][] = [];
    const shortBoundingBox: [number, number][][] = [];
    for (let pieceType = 0; pieceType < 21; pieceType++) {
        const { orientationDict, orientations } = createOrientationDictPiece(pieceType);
        orientationData.push(orientations);
        orientationDicts.push(orientationDict);
        corner.push(orientations.map((o) => getCorners(o)));
        cornerAttacher.push(orientations.map((o) => getCornerAttachers(o)));
        shortBoundingBox.push(orientations.map((o) => getShortBoundingBox(o)));
    }

    const handler = (err: any) => {
        if (err !== null) {
            console.error(err);
        }
    };

    fs.writeFile('./src/movegen/piece-orientations.json', JSON.stringify(orientationData), handler);

    const bitboards = orientationDataToBitboardData(orientationData);
    const bitboardsHalo = getBitboardDataHalo(bitboards);
    fs.writeFile(
        './src/movegen/piece-orientations-bitboard.json',
        JSON.stringify(bitboards),
        handler
    );

    fs.writeFile(
        './src/movegen/piece-orientations-bitboard-halo.json',
        JSON.stringify(bitboardsHalo),
        handler
    );

    fs.writeFile('./src/movegen/piece-rr.json', JSON.stringify(orientationDicts), handler);

    fs.writeFile('./src/movegen/piece-corners.json', JSON.stringify(corner), handler);

    fs.writeFile(
        './src/movegen/piece-corner-attachers.json',
        JSON.stringify(cornerAttacher),
        handler
    );

    fs.writeFile(
        './src/movegen/piece-short-bounding-box.json',
        JSON.stringify(shortBoundingBox),
        handler
    );
};

main();
