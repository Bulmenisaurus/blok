"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/movegen/data.ts
var fs = __toESM(require("fs"));

// src/movegen/pieces.json
var pieces_default = [
  [
    { x: 0, y: 2 },
    { x: 0, y: 3 },
    { x: 1, y: 3 },
    { x: 0, y: 1 },
    { x: 0, y: 0 }
  ],
  [
    { x: 1, y: 2 },
    { x: 1, y: 3 },
    { x: 0, y: 2 },
    { x: 1, y: 1 },
    { x: 1, y: 0 }
  ],
  [
    { x: 1, y: 1 },
    { x: 1, y: 2 },
    { x: 1, y: 3 },
    { x: 0, y: 1 },
    { x: 0, y: 0 }
  ],
  [
    { x: 0, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 0 }
  ],
  [
    { x: 0, y: 1 },
    { x: 0, y: 2 },
    { x: 1, y: 2 },
    { x: 0, y: 0 },
    { x: 1, y: 0 }
  ],
  [
    { x: 0, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: 2 },
    { x: 1, y: 0 },
    { x: 2, y: 0 }
  ],
  [
    { x: 1, y: 1 },
    { x: 1, y: 2 },
    { x: 0, y: 2 },
    { x: 1, y: 0 },
    { x: 2, y: 0 }
  ],
  [
    { x: 1, y: 1 },
    { x: 1, y: 2 },
    { x: 2, y: 1 },
    { x: 1, y: 0 },
    { x: 0, y: 1 }
  ],
  [
    { x: 1, y: 2 },
    { x: 0, y: 2 },
    { x: 2, y: 2 },
    { x: 1, y: 1 },
    { x: 1, y: 0 }
  ],
  [
    { x: 1, y: 1 },
    { x: 0, y: 1 },
    { x: 0, y: 2 },
    { x: 1, y: 0 },
    { x: 2, y: 0 }
  ],
  [
    { x: 0, y: 1 },
    { x: 0, y: 2 },
    { x: 1, y: 2 },
    { x: 1, y: 1 },
    { x: 0, y: 0 }
  ],
  [
    { x: 1, y: 1 },
    { x: 0, y: 1 },
    { x: 1, y: 0 },
    { x: 1, y: 2 },
    { x: 2, y: 2 }
  ],
  [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 1, y: 1 },
    { x: 0, y: 1 }
  ],
  [
    { x: 1, y: 1 },
    { x: 0, y: 1 },
    { x: 2, y: 1 },
    { x: 2, y: 0 }
  ],
  [
    { x: 1, y: 1 },
    { x: 0, y: 1 },
    { x: 2, y: 1 },
    { x: 1, y: 0 }
  ],
  [
    { x: 1, y: 1 },
    { x: 0, y: 1 },
    { x: 1, y: 0 },
    { x: 2, y: 0 }
  ],
  [{ x: 0, y: 0 }],
  [
    { x: 0, y: 0 },
    { x: 0, y: 1 }
  ],
  [
    { x: 0, y: 1 },
    { x: 0, y: 2 },
    { x: 0, y: 0 }
  ],
  [
    { x: 0, y: 1 },
    { x: 0, y: 2 },
    { x: 0, y: 0 },
    { x: 0, y: 3 }
  ],
  [
    { x: 0, y: 2 },
    { x: 0, y: 3 },
    { x: 0, y: 4 },
    { x: 0, y: 1 },
    { x: 0, y: 0 }
  ]
];

// src/movegen/movegen-utils.ts
var getBoundingBox = (pieceData2) => {
  let minX = pieceData2[0].x;
  let minY = pieceData2[0].y;
  let maxX = pieceData2[0].x;
  let maxY = pieceData2[0].y;
  for (const tile of pieceData2) {
    minX = Math.min(minX, tile.x);
    minY = Math.min(minY, tile.y);
    maxX = Math.max(maxX, tile.x);
    maxY = Math.max(maxY, tile.y);
  }
  return {
    topLeft: { x: minX, y: minY },
    bottomRight: { x: maxX, y: maxY },
    width: maxX - minX + 1,
    height: maxY - minY + 1
  };
};

// src/movegen/movegen.ts
var pieceData = pieces_default;

// src/movegen/data.ts
var rotateCoord90Deg = (c) => {
  return { x: c.y, y: -c.x };
};
var rotate90Deg = (pieceData2) => {
  return pieceData2.map((c) => rotateCoord90Deg(c));
};
var reflect = (pieceData2) => {
  return pieceData2.map((p) => ({ x: -p.x, y: p.y }));
};
var getPieceData = (pieceType, rotation, reflection) => {
  let data = pieceData[pieceType];
  for (let i = 0; i < rotation; i++) {
    data = rotate90Deg(data);
  }
  if (reflection) {
    data = reflect(data);
  }
  return normalize(data);
};
var createOrientationDictPiece = (type) => {
  let i = 0;
  const RRs = [];
  for (let rotation = 0; rotation < 4; rotation++) {
    for (const flip of [false, true]) {
      const RR = getPieceData(type, rotation, flip);
      RRs.push(RR);
      i++;
    }
  }
  const orientationDict = [0, 0, 0, 0, 0, 0, 0, 0];
  let currentOrientationIdx = 0;
  const orientations = [];
  for (let i2 = 0; i2 < 8; i2++) {
    let encountered = false;
    for (let j = 0; j < i2; j++) {
      if (pieceDataEqual(RRs[i2], RRs[j])) {
        orientationDict[i2] = orientationDict[j];
        encountered = true;
      }
    }
    if (!encountered) {
      orientationDict[i2] = currentOrientationIdx;
      currentOrientationIdx++;
      orientations.push(RRs[i2]);
    }
  }
  return { orientationDict, orientations };
};
var coordPresent = (coords, check) => {
  for (const c of coords) {
    if (c.x === check.x && c.y === check.y) {
      return true;
    }
  }
  return false;
};
var getCorners = (piece) => {
  let corners = piece;
  corners = corners.filter((c) => {
    let neighborLeft = coordPresent(piece, { x: c.x - 1, y: c.y });
    let neighborRight = coordPresent(piece, { x: c.x + 1, y: c.y });
    return !(neighborLeft && neighborRight);
  });
  corners = corners.filter((c) => {
    let neighborTop = coordPresent(piece, { x: c.x, y: c.y + 1 });
    let neighborBottom = coordPresent(piece, { x: c.x, y: c.y - 1 });
    return !(neighborTop && neighborBottom);
  });
  return corners;
};
var getCornerAttachers = (piece) => {
  let corners = [];
  for (const tile of piece) {
    [
      { x: tile.x + 1, y: tile.y + 1 },
      // ↗
      { x: tile.x + 1, y: tile.y - 1 },
      // ↘
      { x: tile.x - 1, y: tile.y - 1 },
      // ↙
      { x: tile.x - 1, y: tile.y + 1 }
      // ↖
    ].forEach((c) => {
      if (!coordPresent(corners, c)) {
        corners.push(c);
      }
    });
  }
  corners = corners.filter(
    (c) => [
      { x: c.x + 1, y: c.y },
      // →
      { x: c.x, y: c.y - 1 },
      // ↓
      { x: c.x - 1, y: c.y },
      // ←
      { x: c.x, y: c.y + 1 }
      // ↑
    ].every((adjacent) => !coordPresent(piece, adjacent))
  );
  corners = corners.filter((c) => !coordPresent(piece, c));
  return corners;
};
var normalize = (p) => {
  const boundingBox = getBoundingBox(p);
  return p.map((c) => ({ x: c.x - boundingBox.topLeft.x, y: c.y - boundingBox.topLeft.y }));
};
var pieceDataEqual = (piece1, piece2) => {
  let p1 = normalize(piece1);
  let p2 = normalize(piece2);
  if (p1.length !== p2.length) {
    return false;
  }
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
var orientationToBitboard = (orientation) => {
  if (orientation.some((c) => c.x < 0 || c.y < 0)) {
    console.log(orientation);
    throw new Error("Orientation has negative coordinates, cannot convert to bitboard");
  }
  const size = getBoundingBox(orientation);
  if (size.topLeft.x !== 0 || size.topLeft.y !== 0) {
    throw new Error("Orientation has non-zero top-left corner, cannot convert to bitboard");
  }
  const bitboard = Array(size.height).fill(0);
  for (const c of orientation) {
    bitboard[c.y] |= 1 << c.x;
  }
  return bitboard;
};
var haloBitboard = (bitboard) => {
  const halo = Array(bitboard.length + 2).fill(0);
  const shift = 1;
  for (let bitboardY = -1; bitboardY < bitboard.length + 1; bitboardY++) {
    const rowAbove = bitboardY - 1 >= 0 ? bitboard[bitboardY - 1] << shift : 0;
    const rowBelow = bitboardY + 1 < bitboard.length ? bitboard[bitboardY + 1] << shift : 0;
    const rowCurrent = bitboardY >= 0 && bitboardY < bitboard.length ? bitboard[bitboardY] << shift : 0;
    const rowLeftRight = rowCurrent << 1 | rowCurrent >> 1;
    halo[bitboardY + 1] = rowAbove | rowBelow | rowCurrent | rowLeftRight;
  }
  return halo;
};
var getBitboardDataHalo = (bitboardData) => {
  return bitboardData.map((piece) => piece.map((orientation) => haloBitboard(orientation)));
};
var orientationDataToBitboardData = (orientationData) => {
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
var getShortBoundingBox = (piece) => {
  const boundingbox = getBoundingBox(piece);
  if (!(boundingbox.topLeft.x === 0 && boundingbox.topLeft.y === 0)) {
    console.error(piece, boundingbox);
    throw new Error(
      `Expected top left to be (0,0), instead got ${JSON.stringify(boundingbox.topLeft)}`
    );
  }
  return [boundingbox.bottomRight.x, boundingbox.bottomRight.y];
};
var main = () => {
  const orientationData = [];
  const orientationDicts = [];
  const corner = [];
  const cornerAttacher = [];
  const shortBoundingBox = [];
  for (let pieceType = 0; pieceType < 21; pieceType++) {
    const { orientationDict, orientations } = createOrientationDictPiece(pieceType);
    orientationData.push(orientations);
    orientationDicts.push(orientationDict);
    corner.push(orientations.map((o) => getCorners(o)));
    cornerAttacher.push(orientations.map((o) => getCornerAttachers(o)));
    shortBoundingBox.push(orientations.map((o) => getShortBoundingBox(o)));
  }
  const handler = (err) => {
    if (err !== null) {
      console.error(err);
    }
  };
  fs.writeFile("./src/movegen/piece-orientations.json", JSON.stringify(orientationData), handler);
  const bitboards = orientationDataToBitboardData(orientationData);
  const bitboardsHalo = getBitboardDataHalo(bitboards);
  fs.writeFile(
    "./src/movegen/piece-orientations-bitboard.json",
    JSON.stringify(bitboards),
    handler
  );
  fs.writeFile(
    "./src/movegen/piece-orientations-bitboard-halo.json",
    JSON.stringify(bitboardsHalo),
    handler
  );
  fs.writeFile("./src/movegen/piece-rr.json", JSON.stringify(orientationDicts), handler);
  fs.writeFile("./src/movegen/piece-corners.json", JSON.stringify(corner), handler);
  fs.writeFile(
    "./src/movegen/piece-corner-attachers.json",
    JSON.stringify(cornerAttacher),
    handler
  );
  fs.writeFile(
    "./src/movegen/piece-short-bounding-box.json",
    JSON.stringify(shortBoundingBox),
    handler
  );
};
main();
