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

// src/bitboard.ts
var getBitBoardValue = (bitBoard, c) => {
  const validYCoordinate = c.y >= 0 && c.y <= 13;
  const validXCoordinate = c.x >= 0 && c.x <= 13;
  if (!validYCoordinate || !validXCoordinate) {
    return 0;
  }
  return bitBoard[c.y] >> c.x & 1;
};
var setBitBoardValue = (bitBoard, c, value) => {
  const validYCoordinate = c.y >= 0 && c.y <= 13;
  const validXCoordinate = c.x >= 0 && c.x <= 13;
  if (!validYCoordinate || !validXCoordinate) {
    return;
  }
  if (value == 0) {
    bitBoard[c.y] &= ~(1 << c.x);
  } else {
    bitBoard[c.y] |= 1 << c.x;
  }
};

// src/movegen/piece-orientations.json
var piece_orientations_default = [[[{ x: 0, y: 2 }, { x: 0, y: 3 }, { x: 1, y: 3 }, { x: 0, y: 1 }, { x: 0, y: 0 }], [{ x: 1, y: 2 }, { x: 1, y: 3 }, { x: 0, y: 3 }, { x: 1, y: 1 }, { x: 1, y: 0 }], [{ x: 2, y: 1 }, { x: 3, y: 1 }, { x: 3, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 }], [{ x: 1, y: 1 }, { x: 0, y: 1 }, { x: 0, y: 0 }, { x: 2, y: 1 }, { x: 3, y: 1 }], [{ x: 1, y: 1 }, { x: 1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 2 }, { x: 1, y: 3 }], [{ x: 0, y: 1 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 2 }, { x: 0, y: 3 }], [{ x: 1, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 1 }, { x: 2, y: 0 }, { x: 3, y: 0 }], [{ x: 2, y: 0 }, { x: 3, y: 0 }, { x: 3, y: 1 }, { x: 1, y: 0 }, { x: 0, y: 0 }]], [[{ x: 1, y: 2 }, { x: 1, y: 3 }, { x: 0, y: 2 }, { x: 1, y: 1 }, { x: 1, y: 0 }], [{ x: 0, y: 2 }, { x: 0, y: 3 }, { x: 1, y: 2 }, { x: 0, y: 1 }, { x: 0, y: 0 }], [{ x: 2, y: 0 }, { x: 3, y: 0 }, { x: 2, y: 1 }, { x: 1, y: 0 }, { x: 0, y: 0 }], [{ x: 1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 0 }, { x: 3, y: 0 }], [{ x: 0, y: 1 }, { x: 0, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 2 }, { x: 0, y: 3 }], [{ x: 1, y: 1 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 2 }, { x: 1, y: 3 }], [{ x: 1, y: 1 }, { x: 0, y: 1 }, { x: 1, y: 0 }, { x: 2, y: 1 }, { x: 3, y: 1 }], [{ x: 2, y: 1 }, { x: 3, y: 1 }, { x: 2, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 }]], [[{ x: 1, y: 1 }, { x: 1, y: 2 }, { x: 1, y: 3 }, { x: 0, y: 1 }, { x: 0, y: 0 }], [{ x: 0, y: 1 }, { x: 0, y: 2 }, { x: 0, y: 3 }, { x: 1, y: 1 }, { x: 1, y: 0 }], [{ x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 }], [{ x: 2, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 0 }, { x: 2, y: 1 }, { x: 3, y: 1 }], [{ x: 0, y: 2 }, { x: 0, y: 1 }, { x: 0, y: 0 }, { x: 1, y: 2 }, { x: 1, y: 3 }], [{ x: 1, y: 2 }, { x: 1, y: 1 }, { x: 1, y: 0 }, { x: 0, y: 2 }, { x: 0, y: 3 }], [{ x: 2, y: 1 }, { x: 1, y: 1 }, { x: 0, y: 1 }, { x: 2, y: 0 }, { x: 3, y: 0 }], [{ x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 }, { x: 1, y: 0 }, { x: 0, y: 0 }]], [[{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 0 }], [{ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 0 }], [{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 0, y: 0 }], [{ x: 1, y: 1 }, { x: 0, y: 1 }, { x: 1, y: 0 }]], [[{ x: 0, y: 1 }, { x: 0, y: 2 }, { x: 1, y: 2 }, { x: 0, y: 0 }, { x: 1, y: 0 }], [{ x: 1, y: 1 }, { x: 1, y: 2 }, { x: 0, y: 2 }, { x: 1, y: 0 }, { x: 0, y: 0 }], [{ x: 1, y: 1 }, { x: 2, y: 1 }, { x: 2, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 0 }], [{ x: 1, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 1 }, { x: 2, y: 0 }, { x: 2, y: 1 }]], [[{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 1, y: 0 }, { x: 2, y: 0 }], [{ x: 2, y: 0 }, { x: 2, y: 1 }, { x: 2, y: 2 }, { x: 1, y: 0 }, { x: 0, y: 0 }], [{ x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 0, y: 1 }, { x: 0, y: 0 }], [{ x: 2, y: 2 }, { x: 1, y: 2 }, { x: 0, y: 2 }, { x: 2, y: 1 }, { x: 2, y: 0 }]], [[{ x: 1, y: 1 }, { x: 1, y: 2 }, { x: 0, y: 2 }, { x: 1, y: 0 }, { x: 2, y: 0 }], [{ x: 1, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 1, y: 0 }, { x: 0, y: 0 }], [{ x: 1, y: 1 }, { x: 2, y: 1 }, { x: 2, y: 2 }, { x: 0, y: 1 }, { x: 0, y: 0 }], [{ x: 1, y: 1 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 2, y: 1 }, { x: 2, y: 0 }]], [[{ x: 1, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 1 }, { x: 1, y: 0 }, { x: 0, y: 1 }]], [[{ x: 1, y: 2 }, { x: 0, y: 2 }, { x: 2, y: 2 }, { x: 1, y: 1 }, { x: 1, y: 0 }], [{ x: 2, y: 1 }, { x: 2, y: 2 }, { x: 2, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 }], [{ x: 0, y: 1 }, { x: 0, y: 2 }, { x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 1 }], [{ x: 1, y: 0 }, { x: 2, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 }]], [[{ x: 1, y: 1 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 1, y: 0 }, { x: 2, y: 0 }], [{ x: 1, y: 1 }, { x: 2, y: 1 }, { x: 2, y: 2 }, { x: 1, y: 0 }, { x: 0, y: 0 }], [{ x: 1, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 0, y: 1 }, { x: 0, y: 0 }], [{ x: 1, y: 1 }, { x: 1, y: 2 }, { x: 0, y: 2 }, { x: 2, y: 1 }, { x: 2, y: 0 }]], [[{ x: 0, y: 1 }, { x: 0, y: 2 }, { x: 1, y: 2 }, { x: 1, y: 1 }, { x: 0, y: 0 }], [{ x: 1, y: 1 }, { x: 1, y: 2 }, { x: 0, y: 2 }, { x: 0, y: 1 }, { x: 1, y: 0 }], [{ x: 1, y: 1 }, { x: 2, y: 1 }, { x: 2, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }], [{ x: 1, y: 1 }, { x: 0, y: 1 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 1 }], [{ x: 1, y: 1 }, { x: 1, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 2 }], [{ x: 0, y: 1 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 2 }], [{ x: 1, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 0 }], [{ x: 1, y: 0 }, { x: 2, y: 0 }, { x: 2, y: 1 }, { x: 1, y: 1 }, { x: 0, y: 0 }]], [[{ x: 1, y: 1 }, { x: 0, y: 1 }, { x: 1, y: 0 }, { x: 1, y: 2 }, { x: 2, y: 2 }], [{ x: 1, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 0 }, { x: 1, y: 2 }, { x: 0, y: 2 }], [{ x: 1, y: 1 }, { x: 1, y: 2 }, { x: 0, y: 1 }, { x: 2, y: 1 }, { x: 2, y: 0 }], [{ x: 1, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 1 }, { x: 0, y: 1 }, { x: 0, y: 0 }], [{ x: 1, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 2 }, { x: 1, y: 0 }, { x: 0, y: 0 }], [{ x: 1, y: 1 }, { x: 0, y: 1 }, { x: 1, y: 2 }, { x: 1, y: 0 }, { x: 2, y: 0 }], [{ x: 1, y: 1 }, { x: 1, y: 0 }, { x: 2, y: 1 }, { x: 0, y: 1 }, { x: 0, y: 2 }], [{ x: 1, y: 1 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 2, y: 1 }, { x: 2, y: 2 }]], [[{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 }]], [[{ x: 1, y: 1 }, { x: 0, y: 1 }, { x: 2, y: 1 }, { x: 2, y: 0 }], [{ x: 1, y: 1 }, { x: 2, y: 1 }, { x: 0, y: 1 }, { x: 0, y: 0 }], [{ x: 1, y: 1 }, { x: 1, y: 2 }, { x: 1, y: 0 }, { x: 0, y: 0 }], [{ x: 0, y: 1 }, { x: 0, y: 2 }, { x: 0, y: 0 }, { x: 1, y: 0 }], [{ x: 1, y: 0 }, { x: 2, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 1 }], [{ x: 1, y: 0 }, { x: 0, y: 0 }, { x: 2, y: 0 }, { x: 2, y: 1 }], [{ x: 0, y: 1 }, { x: 0, y: 0 }, { x: 0, y: 2 }, { x: 1, y: 2 }], [{ x: 1, y: 1 }, { x: 1, y: 0 }, { x: 1, y: 2 }, { x: 0, y: 2 }]], [[{ x: 1, y: 1 }, { x: 0, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 0 }], [{ x: 1, y: 1 }, { x: 1, y: 2 }, { x: 1, y: 0 }, { x: 0, y: 1 }], [{ x: 0, y: 1 }, { x: 0, y: 2 }, { x: 0, y: 0 }, { x: 1, y: 1 }], [{ x: 1, y: 0 }, { x: 2, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 1 }]], [[{ x: 1, y: 1 }, { x: 0, y: 1 }, { x: 1, y: 0 }, { x: 2, y: 0 }], [{ x: 1, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 0 }, { x: 0, y: 0 }], [{ x: 1, y: 1 }, { x: 1, y: 2 }, { x: 0, y: 1 }, { x: 0, y: 0 }], [{ x: 0, y: 1 }, { x: 0, y: 2 }, { x: 1, y: 1 }, { x: 1, y: 0 }]], [[{ x: 0, y: 0 }]], [[{ x: 0, y: 0 }, { x: 0, y: 1 }], [{ x: 0, y: 0 }, { x: 1, y: 0 }]], [[{ x: 0, y: 1 }, { x: 0, y: 2 }, { x: 0, y: 0 }], [{ x: 1, y: 0 }, { x: 2, y: 0 }, { x: 0, y: 0 }]], [[{ x: 0, y: 1 }, { x: 0, y: 2 }, { x: 0, y: 0 }, { x: 0, y: 3 }], [{ x: 1, y: 0 }, { x: 2, y: 0 }, { x: 0, y: 0 }, { x: 3, y: 0 }]], [[{ x: 0, y: 2 }, { x: 0, y: 3 }, { x: 0, y: 4 }, { x: 0, y: 1 }, { x: 0, y: 0 }], [{ x: 2, y: 0 }, { x: 3, y: 0 }, { x: 4, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 0 }]]];

// src/movegen/piece-orientations-bitboard.json
var piece_orientations_bitboard_default = [[[1, 1, 1, 3], [2, 2, 2, 3], [8, 15], [1, 15], [3, 2, 2, 2], [3, 1, 1, 1], [15, 1], [15, 8]], [[2, 2, 3, 2], [1, 1, 3, 1], [15, 4], [15, 2], [1, 3, 1, 1], [2, 3, 2, 2], [2, 15], [4, 15]], [[1, 3, 2, 2], [2, 3, 1, 1], [14, 3], [7, 12], [1, 1, 3, 2], [2, 2, 3, 1], [12, 7], [3, 14]], [[3, 1], [3, 2], [1, 3], [2, 3]], [[3, 1, 3], [3, 2, 3], [5, 7], [7, 5]], [[7, 1, 1], [7, 4, 4], [1, 1, 7], [4, 4, 7]], [[6, 2, 3], [3, 2, 6], [1, 7, 4], [4, 7, 1]], [[2, 7, 2]], [[2, 2, 7], [4, 7, 4], [1, 7, 1], [7, 2, 2]], [[6, 3, 1], [3, 6, 4], [1, 3, 6], [4, 6, 3]], [[1, 3, 3], [2, 3, 3], [6, 7], [3, 7], [3, 3, 2], [3, 3, 1], [7, 3], [7, 6]], [[2, 3, 6], [2, 6, 3], [4, 7, 2], [1, 7, 2], [3, 6, 2], [6, 3, 2], [2, 7, 1], [2, 7, 4]], [[3, 3]], [[4, 7], [1, 7], [3, 2, 2], [3, 1, 1], [7, 1], [7, 4], [1, 1, 3], [2, 2, 3]], [[2, 7], [2, 3, 2], [1, 3, 1], [7, 2]], [[6, 3], [3, 6], [1, 3, 2], [2, 3, 1]], [[1]], [[1, 1], [3]], [[1, 1, 1], [7]], [[1, 1, 1, 1], [15]], [[1, 1, 1, 1, 1], [31]]];

// src/movegen/piece-orientations-bitboard-halo.json
var piece_orientations_bitboard_halo_default = [[[2, 7, 7, 7, 15, 6], [4, 14, 14, 14, 15, 6], [16, 62, 63, 30], [2, 31, 63, 30], [6, 15, 14, 14, 14, 4], [6, 15, 7, 7, 7, 2], [30, 63, 31, 2], [30, 63, 62, 16]], [[4, 14, 14, 15, 14, 4], [2, 7, 7, 15, 7, 2], [30, 63, 30, 8], [30, 63, 30, 4], [2, 7, 15, 7, 7, 2], [4, 14, 15, 14, 14, 4], [4, 30, 63, 30], [8, 30, 63, 30]], [[2, 7, 15, 14, 14, 4], [4, 14, 15, 7, 7, 2], [28, 62, 31, 6], [14, 31, 62, 24], [2, 7, 7, 15, 14, 4], [4, 14, 14, 15, 7, 2], [24, 62, 31, 14], [6, 31, 62, 28]], [[6, 15, 7, 2], [6, 15, 14, 4], [2, 7, 15, 6], [4, 14, 15, 6]], [[6, 15, 7, 15, 6], [6, 15, 14, 15, 6], [10, 31, 31, 14], [14, 31, 31, 10]], [[14, 31, 15, 7, 2], [14, 31, 30, 28, 8], [2, 7, 15, 31, 14], [8, 28, 30, 31, 14]], [[12, 30, 14, 15, 6], [6, 15, 14, 30, 12], [2, 15, 31, 30, 8], [8, 30, 31, 15, 2]], [[4, 14, 31, 14, 4]], [[4, 14, 14, 31, 14], [8, 30, 31, 30, 8], [2, 15, 31, 15, 2], [14, 31, 14, 14, 4]], [[12, 30, 15, 7, 2], [6, 15, 30, 28, 8], [2, 7, 15, 30, 12], [8, 28, 30, 15, 6]], [[2, 7, 15, 15, 6], [4, 14, 15, 15, 6], [12, 30, 31, 14], [6, 15, 31, 14], [6, 15, 15, 14, 4], [6, 15, 15, 7, 2], [14, 31, 15, 6], [14, 31, 30, 12]], [[4, 14, 15, 30, 12], [4, 14, 30, 15, 6], [8, 30, 31, 14, 4], [2, 15, 31, 14, 4], [6, 15, 30, 14, 4], [12, 30, 15, 14, 4], [4, 14, 31, 15, 2], [4, 14, 31, 30, 8]], [[6, 15, 15, 6]], [[8, 30, 31, 14], [2, 15, 31, 14], [6, 15, 14, 14, 4], [6, 15, 7, 7, 2], [14, 31, 15, 2], [14, 31, 30, 8], [2, 7, 7, 15, 6], [4, 14, 14, 15, 6]], [[4, 14, 31, 14], [4, 14, 15, 14, 4], [2, 7, 15, 7, 2], [14, 31, 14, 4]], [[12, 30, 15, 6], [6, 15, 30, 12], [2, 7, 15, 14, 4], [4, 14, 15, 7, 2]], [[2, 7, 2]], [[2, 7, 7, 2], [6, 15, 6]], [[2, 7, 7, 7, 2], [14, 31, 14]], [[2, 7, 7, 7, 7, 2], [30, 63, 30]], [[2, 7, 7, 7, 7, 7, 2], [62, 127, 62]]];

// src/movegen/piece-corners.json
var piece_corners_default = [[[{ x: 0, y: 3 }, { x: 1, y: 3 }, { x: 0, y: 0 }], [{ x: 1, y: 3 }, { x: 0, y: 3 }, { x: 1, y: 0 }], [{ x: 3, y: 1 }, { x: 3, y: 0 }, { x: 0, y: 1 }], [{ x: 0, y: 1 }, { x: 0, y: 0 }, { x: 3, y: 1 }], [{ x: 1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 3 }], [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 3 }], [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 3, y: 0 }], [{ x: 3, y: 0 }, { x: 3, y: 1 }, { x: 0, y: 0 }]], [[{ x: 1, y: 3 }, { x: 0, y: 2 }, { x: 1, y: 0 }], [{ x: 0, y: 3 }, { x: 1, y: 2 }, { x: 0, y: 0 }], [{ x: 3, y: 0 }, { x: 2, y: 1 }, { x: 0, y: 0 }], [{ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 3, y: 0 }], [{ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 3 }], [{ x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 3 }], [{ x: 0, y: 1 }, { x: 1, y: 0 }, { x: 3, y: 1 }], [{ x: 3, y: 1 }, { x: 2, y: 0 }, { x: 0, y: 1 }]], [[{ x: 1, y: 1 }, { x: 1, y: 3 }, { x: 0, y: 1 }, { x: 0, y: 0 }], [{ x: 0, y: 1 }, { x: 0, y: 3 }, { x: 1, y: 1 }, { x: 1, y: 0 }], [{ x: 1, y: 0 }, { x: 3, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 }], [{ x: 2, y: 0 }, { x: 0, y: 0 }, { x: 2, y: 1 }, { x: 3, y: 1 }], [{ x: 0, y: 2 }, { x: 0, y: 0 }, { x: 1, y: 2 }, { x: 1, y: 3 }], [{ x: 1, y: 2 }, { x: 1, y: 0 }, { x: 0, y: 2 }, { x: 0, y: 3 }], [{ x: 2, y: 1 }, { x: 0, y: 1 }, { x: 2, y: 0 }, { x: 3, y: 0 }], [{ x: 1, y: 1 }, { x: 3, y: 1 }, { x: 1, y: 0 }, { x: 0, y: 0 }]], [[{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 0 }], [{ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 0 }], [{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 0, y: 0 }], [{ x: 1, y: 1 }, { x: 0, y: 1 }, { x: 1, y: 0 }]], [[{ x: 0, y: 2 }, { x: 1, y: 2 }, { x: 0, y: 0 }, { x: 1, y: 0 }], [{ x: 1, y: 2 }, { x: 0, y: 2 }, { x: 1, y: 0 }, { x: 0, y: 0 }], [{ x: 2, y: 1 }, { x: 2, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 0 }], [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 2, y: 0 }, { x: 2, y: 1 }]], [[{ x: 0, y: 0 }, { x: 0, y: 2 }, { x: 2, y: 0 }], [{ x: 2, y: 0 }, { x: 2, y: 2 }, { x: 0, y: 0 }], [{ x: 0, y: 2 }, { x: 2, y: 2 }, { x: 0, y: 0 }], [{ x: 2, y: 2 }, { x: 0, y: 2 }, { x: 2, y: 0 }]], [[{ x: 1, y: 2 }, { x: 0, y: 2 }, { x: 1, y: 0 }, { x: 2, y: 0 }], [{ x: 1, y: 2 }, { x: 2, y: 2 }, { x: 1, y: 0 }, { x: 0, y: 0 }], [{ x: 2, y: 1 }, { x: 2, y: 2 }, { x: 0, y: 1 }, { x: 0, y: 0 }], [{ x: 0, y: 1 }, { x: 0, y: 2 }, { x: 2, y: 1 }, { x: 2, y: 0 }]], [[{ x: 1, y: 2 }, { x: 2, y: 1 }, { x: 1, y: 0 }, { x: 0, y: 1 }]], [[{ x: 0, y: 2 }, { x: 2, y: 2 }, { x: 1, y: 0 }], [{ x: 2, y: 2 }, { x: 2, y: 0 }, { x: 0, y: 1 }], [{ x: 0, y: 2 }, { x: 0, y: 0 }, { x: 2, y: 1 }], [{ x: 2, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 2 }]], [[{ x: 1, y: 1 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 1, y: 0 }, { x: 2, y: 0 }], [{ x: 1, y: 1 }, { x: 2, y: 1 }, { x: 2, y: 2 }, { x: 1, y: 0 }, { x: 0, y: 0 }], [{ x: 1, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 0, y: 1 }, { x: 0, y: 0 }], [{ x: 1, y: 1 }, { x: 1, y: 2 }, { x: 0, y: 2 }, { x: 2, y: 1 }, { x: 2, y: 0 }]], [[{ x: 0, y: 2 }, { x: 1, y: 2 }, { x: 1, y: 1 }, { x: 0, y: 0 }], [{ x: 1, y: 2 }, { x: 0, y: 2 }, { x: 0, y: 1 }, { x: 1, y: 0 }], [{ x: 2, y: 1 }, { x: 2, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }], [{ x: 0, y: 1 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 1 }], [{ x: 1, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 2 }], [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 2 }], [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 0 }], [{ x: 2, y: 0 }, { x: 2, y: 1 }, { x: 1, y: 1 }, { x: 0, y: 0 }]], [[{ x: 0, y: 1 }, { x: 1, y: 0 }, { x: 1, y: 2 }, { x: 2, y: 2 }], [{ x: 2, y: 1 }, { x: 1, y: 0 }, { x: 1, y: 2 }, { x: 0, y: 2 }], [{ x: 1, y: 2 }, { x: 0, y: 1 }, { x: 2, y: 1 }, { x: 2, y: 0 }], [{ x: 1, y: 2 }, { x: 2, y: 1 }, { x: 0, y: 1 }, { x: 0, y: 0 }], [{ x: 2, y: 1 }, { x: 1, y: 2 }, { x: 1, y: 0 }, { x: 0, y: 0 }], [{ x: 0, y: 1 }, { x: 1, y: 2 }, { x: 1, y: 0 }, { x: 2, y: 0 }], [{ x: 1, y: 0 }, { x: 2, y: 1 }, { x: 0, y: 1 }, { x: 0, y: 2 }], [{ x: 1, y: 0 }, { x: 0, y: 1 }, { x: 2, y: 1 }, { x: 2, y: 2 }]], [[{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 }]], [[{ x: 0, y: 1 }, { x: 2, y: 1 }, { x: 2, y: 0 }], [{ x: 2, y: 1 }, { x: 0, y: 1 }, { x: 0, y: 0 }], [{ x: 1, y: 2 }, { x: 1, y: 0 }, { x: 0, y: 0 }], [{ x: 0, y: 2 }, { x: 0, y: 0 }, { x: 1, y: 0 }], [{ x: 2, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 1 }], [{ x: 0, y: 0 }, { x: 2, y: 0 }, { x: 2, y: 1 }], [{ x: 0, y: 0 }, { x: 0, y: 2 }, { x: 1, y: 2 }], [{ x: 1, y: 0 }, { x: 1, y: 2 }, { x: 0, y: 2 }]], [[{ x: 0, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 0 }], [{ x: 1, y: 2 }, { x: 1, y: 0 }, { x: 0, y: 1 }], [{ x: 0, y: 2 }, { x: 0, y: 0 }, { x: 1, y: 1 }], [{ x: 2, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 1 }]], [[{ x: 1, y: 1 }, { x: 0, y: 1 }, { x: 1, y: 0 }, { x: 2, y: 0 }], [{ x: 1, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 0 }, { x: 0, y: 0 }], [{ x: 1, y: 1 }, { x: 1, y: 2 }, { x: 0, y: 1 }, { x: 0, y: 0 }], [{ x: 0, y: 1 }, { x: 0, y: 2 }, { x: 1, y: 1 }, { x: 1, y: 0 }]], [[{ x: 0, y: 0 }]], [[{ x: 0, y: 0 }, { x: 0, y: 1 }], [{ x: 0, y: 0 }, { x: 1, y: 0 }]], [[{ x: 0, y: 2 }, { x: 0, y: 0 }], [{ x: 2, y: 0 }, { x: 0, y: 0 }]], [[{ x: 0, y: 0 }, { x: 0, y: 3 }], [{ x: 0, y: 0 }, { x: 3, y: 0 }]], [[{ x: 0, y: 4 }, { x: 0, y: 0 }], [{ x: 4, y: 0 }, { x: 0, y: 0 }]]];

// src/movegen/piece-short-bounding-box.json
var piece_short_bounding_box_default = [[[1, 3], [1, 3], [3, 1], [3, 1], [1, 3], [1, 3], [3, 1], [3, 1]], [[1, 3], [1, 3], [3, 1], [3, 1], [1, 3], [1, 3], [3, 1], [3, 1]], [[1, 3], [1, 3], [3, 1], [3, 1], [1, 3], [1, 3], [3, 1], [3, 1]], [[1, 1], [1, 1], [1, 1], [1, 1]], [[1, 2], [1, 2], [2, 1], [2, 1]], [[2, 2], [2, 2], [2, 2], [2, 2]], [[2, 2], [2, 2], [2, 2], [2, 2]], [[2, 2]], [[2, 2], [2, 2], [2, 2], [2, 2]], [[2, 2], [2, 2], [2, 2], [2, 2]], [[1, 2], [1, 2], [2, 1], [2, 1], [1, 2], [1, 2], [2, 1], [2, 1]], [[2, 2], [2, 2], [2, 2], [2, 2], [2, 2], [2, 2], [2, 2], [2, 2]], [[1, 1]], [[2, 1], [2, 1], [1, 2], [1, 2], [2, 1], [2, 1], [1, 2], [1, 2]], [[2, 1], [1, 2], [1, 2], [2, 1]], [[2, 1], [2, 1], [1, 2], [1, 2]], [[0, 0]], [[0, 1], [1, 0]], [[0, 2], [2, 0]], [[0, 3], [3, 0]], [[0, 4], [4, 0]]];

// src/movegen/piece-corner-attachers.json
var piece_corner_attachers_default = [[[{ x: -1, y: 4 }, { x: 2, y: 4 }, { x: 2, y: 2 }, { x: 1, y: -1 }, { x: -1, y: -1 }], [{ x: 2, y: 4 }, { x: -1, y: 2 }, { x: -1, y: 4 }, { x: 2, y: -1 }, { x: 0, y: -1 }], [{ x: 4, y: 2 }, { x: 4, y: -1 }, { x: 2, y: -1 }, { x: -1, y: 0 }, { x: -1, y: 2 }], [{ x: -1, y: 2 }, { x: 1, y: -1 }, { x: -1, y: -1 }, { x: 4, y: 2 }, { x: 4, y: 0 }], [{ x: 2, y: -1 }, { x: -1, y: -1 }, { x: -1, y: 1 }, { x: 2, y: 4 }, { x: 0, y: 4 }], [{ x: -1, y: -1 }, { x: 2, y: 1 }, { x: 2, y: -1 }, { x: 1, y: 4 }, { x: -1, y: 4 }], [{ x: -1, y: -1 }, { x: 1, y: 2 }, { x: -1, y: 2 }, { x: 4, y: 1 }, { x: 4, y: -1 }], [{ x: 4, y: -1 }, { x: 4, y: 2 }, { x: 2, y: 2 }, { x: -1, y: -1 }, { x: -1, y: 1 }]], [[{ x: 2, y: 4 }, { x: 0, y: 4 }, { x: -1, y: 1 }, { x: -1, y: 3 }, { x: 2, y: -1 }, { x: 0, y: -1 }], [{ x: 1, y: 4 }, { x: -1, y: 4 }, { x: 2, y: 3 }, { x: 2, y: 1 }, { x: 1, y: -1 }, { x: -1, y: -1 }], [{ x: 4, y: 1 }, { x: 4, y: -1 }, { x: 3, y: 2 }, { x: 1, y: 2 }, { x: -1, y: -1 }, { x: -1, y: 1 }], [{ x: -1, y: -1 }, { x: -1, y: 1 }, { x: 2, y: 2 }, { x: 0, y: 2 }, { x: 4, y: 1 }, { x: 4, y: -1 }], [{ x: 1, y: -1 }, { x: -1, y: -1 }, { x: 2, y: 2 }, { x: 2, y: 0 }, { x: 1, y: 4 }, { x: -1, y: 4 }], [{ x: 2, y: -1 }, { x: 0, y: -1 }, { x: -1, y: 0 }, { x: -1, y: 2 }, { x: 2, y: 4 }, { x: 0, y: 4 }], [{ x: -1, y: 0 }, { x: -1, y: 2 }, { x: 2, y: -1 }, { x: 0, y: -1 }, { x: 4, y: 2 }, { x: 4, y: 0 }], [{ x: 4, y: 2 }, { x: 4, y: 0 }, { x: 3, y: -1 }, { x: 1, y: -1 }, { x: -1, y: 0 }, { x: -1, y: 2 }]], [[{ x: 2, y: 0 }, { x: 2, y: 4 }, { x: 0, y: 4 }, { x: -1, y: 2 }, { x: 1, y: -1 }, { x: -1, y: -1 }], [{ x: -1, y: 0 }, { x: 1, y: 4 }, { x: -1, y: 4 }, { x: 2, y: 2 }, { x: 2, y: -1 }, { x: 0, y: -1 }], [{ x: 0, y: -1 }, { x: 4, y: 1 }, { x: 4, y: -1 }, { x: 2, y: 2 }, { x: -1, y: 0 }, { x: -1, y: 2 }], [{ x: 3, y: -1 }, { x: -1, y: -1 }, { x: -1, y: 1 }, { x: 1, y: 2 }, { x: 4, y: 2 }, { x: 4, y: 0 }], [{ x: -1, y: 3 }, { x: 1, y: -1 }, { x: -1, y: -1 }, { x: 2, y: 1 }, { x: 2, y: 4 }, { x: 0, y: 4 }], [{ x: 2, y: 3 }, { x: 2, y: -1 }, { x: 0, y: -1 }, { x: -1, y: 1 }, { x: 1, y: 4 }, { x: -1, y: 4 }], [{ x: 3, y: 2 }, { x: -1, y: 0 }, { x: -1, y: 2 }, { x: 1, y: -1 }, { x: 4, y: 1 }, { x: 4, y: -1 }], [{ x: 0, y: 2 }, { x: 4, y: 2 }, { x: 4, y: 0 }, { x: 2, y: -1 }, { x: -1, y: -1 }, { x: -1, y: 1 }]], [[{ x: -1, y: -1 }, { x: 1, y: 2 }, { x: -1, y: 2 }, { x: 2, y: 1 }, { x: 2, y: -1 }], [{ x: 2, y: -1 }, { x: 2, y: 2 }, { x: 0, y: 2 }, { x: -1, y: -1 }, { x: -1, y: 1 }], [{ x: -1, y: 2 }, { x: 2, y: 2 }, { x: 2, y: 0 }, { x: 1, y: -1 }, { x: -1, y: -1 }], [{ x: 2, y: 2 }, { x: -1, y: 0 }, { x: -1, y: 2 }, { x: 2, y: -1 }, { x: 0, y: -1 }]], [[{ x: -1, y: 3 }, { x: 2, y: 3 }, { x: 2, y: 1 }, { x: -1, y: -1 }, { x: 2, y: -1 }], [{ x: 2, y: 3 }, { x: -1, y: 1 }, { x: -1, y: 3 }, { x: 2, y: -1 }, { x: -1, y: -1 }], [{ x: 3, y: 2 }, { x: 3, y: -1 }, { x: 1, y: -1 }, { x: -1, y: 2 }, { x: -1, y: -1 }], [{ x: -1, y: -1 }, { x: 1, y: 2 }, { x: -1, y: 2 }, { x: 3, y: -1 }, { x: 3, y: 2 }]], [[{ x: -1, y: -1 }, { x: 1, y: 3 }, { x: -1, y: 3 }, { x: 3, y: 1 }, { x: 3, y: -1 }], [{ x: 3, y: -1 }, { x: 3, y: 3 }, { x: 1, y: 3 }, { x: -1, y: -1 }, { x: -1, y: 1 }], [{ x: -1, y: 3 }, { x: 3, y: 3 }, { x: 3, y: 1 }, { x: 1, y: -1 }, { x: -1, y: -1 }], [{ x: 3, y: 3 }, { x: -1, y: 1 }, { x: -1, y: 3 }, { x: 3, y: -1 }, { x: 1, y: -1 }]], [[{ x: 2, y: 3 }, { x: -1, y: 1 }, { x: -1, y: 3 }, { x: 0, y: -1 }, { x: 3, y: 1 }, { x: 3, y: -1 }], [{ x: 0, y: 3 }, { x: 3, y: 3 }, { x: 3, y: 1 }, { x: 2, y: -1 }, { x: -1, y: -1 }, { x: -1, y: 1 }], [{ x: 3, y: 0 }, { x: 3, y: 3 }, { x: 1, y: 3 }, { x: -1, y: 2 }, { x: 1, y: -1 }, { x: -1, y: -1 }], [{ x: -1, y: 0 }, { x: 1, y: 3 }, { x: -1, y: 3 }, { x: 3, y: 2 }, { x: 3, y: -1 }, { x: 1, y: -1 }]], [[{ x: 2, y: 3 }, { x: 0, y: 3 }, { x: 3, y: 2 }, { x: 3, y: 0 }, { x: 2, y: -1 }, { x: 0, y: -1 }, { x: -1, y: 0 }, { x: -1, y: 2 }]], [[{ x: -1, y: 1 }, { x: -1, y: 3 }, { x: 3, y: 3 }, { x: 3, y: 1 }, { x: 2, y: -1 }, { x: 0, y: -1 }], [{ x: 3, y: 3 }, { x: 1, y: 3 }, { x: 3, y: -1 }, { x: 1, y: -1 }, { x: -1, y: 0 }, { x: -1, y: 2 }], [{ x: 1, y: 3 }, { x: -1, y: 3 }, { x: 1, y: -1 }, { x: -1, y: -1 }, { x: 3, y: 2 }, { x: 3, y: 0 }], [{ x: 3, y: 1 }, { x: 3, y: -1 }, { x: -1, y: -1 }, { x: -1, y: 1 }, { x: 2, y: 3 }, { x: 0, y: 3 }]], [[{ x: 2, y: 2 }, { x: -1, y: 0 }, { x: 1, y: 3 }, { x: -1, y: 3 }, { x: 0, y: -1 }, { x: 3, y: 1 }, { x: 3, y: -1 }], [{ x: 0, y: 2 }, { x: 3, y: 0 }, { x: 3, y: 3 }, { x: 1, y: 3 }, { x: 2, y: -1 }, { x: -1, y: -1 }, { x: -1, y: 1 }], [{ x: 2, y: 0 }, { x: 0, y: 3 }, { x: 3, y: 3 }, { x: 3, y: 1 }, { x: -1, y: 2 }, { x: 1, y: -1 }, { x: -1, y: -1 }], [{ x: 0, y: 0 }, { x: 2, y: 3 }, { x: -1, y: 1 }, { x: -1, y: 3 }, { x: 3, y: 2 }, { x: 3, y: -1 }, { x: 1, y: -1 }]], [[{ x: -1, y: 3 }, { x: 2, y: 3 }, { x: 2, y: 0 }, { x: 1, y: -1 }, { x: -1, y: -1 }], [{ x: 2, y: 3 }, { x: -1, y: 3 }, { x: -1, y: 0 }, { x: 2, y: -1 }, { x: 0, y: -1 }], [{ x: 3, y: 2 }, { x: 3, y: -1 }, { x: 0, y: -1 }, { x: -1, y: 0 }, { x: -1, y: 2 }], [{ x: -1, y: 2 }, { x: -1, y: -1 }, { x: 2, y: -1 }, { x: 3, y: 2 }, { x: 3, y: 0 }], [{ x: 2, y: -1 }, { x: -1, y: -1 }, { x: -1, y: 2 }, { x: 2, y: 3 }, { x: 0, y: 3 }], [{ x: -1, y: -1 }, { x: 2, y: -1 }, { x: 2, y: 2 }, { x: 1, y: 3 }, { x: -1, y: 3 }], [{ x: -1, y: -1 }, { x: -1, y: 2 }, { x: 2, y: 2 }, { x: 3, y: 1 }, { x: 3, y: -1 }], [{ x: 3, y: -1 }, { x: 3, y: 2 }, { x: 0, y: 2 }, { x: -1, y: -1 }, { x: -1, y: 1 }]], [[{ x: -1, y: 0 }, { x: -1, y: 2 }, { x: 2, y: -1 }, { x: 0, y: -1 }, { x: 0, y: 3 }, { x: 3, y: 3 }, { x: 3, y: 1 }], [{ x: 3, y: 2 }, { x: 3, y: 0 }, { x: 2, y: -1 }, { x: 0, y: -1 }, { x: 2, y: 3 }, { x: -1, y: 1 }, { x: -1, y: 3 }], [{ x: 2, y: 3 }, { x: 0, y: 3 }, { x: -1, y: 0 }, { x: -1, y: 2 }, { x: 3, y: 2 }, { x: 3, y: -1 }, { x: 1, y: -1 }], [{ x: 2, y: 3 }, { x: 0, y: 3 }, { x: 3, y: 2 }, { x: 3, y: 0 }, { x: -1, y: 2 }, { x: 1, y: -1 }, { x: -1, y: -1 }], [{ x: 3, y: 2 }, { x: 3, y: 0 }, { x: 2, y: 3 }, { x: 0, y: 3 }, { x: 2, y: -1 }, { x: -1, y: -1 }, { x: -1, y: 1 }], [{ x: -1, y: 0 }, { x: -1, y: 2 }, { x: 2, y: 3 }, { x: 0, y: 3 }, { x: 0, y: -1 }, { x: 3, y: 1 }, { x: 3, y: -1 }], [{ x: 2, y: -1 }, { x: 0, y: -1 }, { x: 3, y: 2 }, { x: 3, y: 0 }, { x: -1, y: 0 }, { x: 1, y: 3 }, { x: -1, y: 3 }], [{ x: 2, y: -1 }, { x: 0, y: -1 }, { x: -1, y: 0 }, { x: -1, y: 2 }, { x: 3, y: 0 }, { x: 3, y: 3 }, { x: 1, y: 3 }]], [[{ x: -1, y: -1 }, { x: 2, y: -1 }, { x: 2, y: 2 }, { x: -1, y: 2 }]], [[{ x: -1, y: 0 }, { x: -1, y: 2 }, { x: 3, y: 2 }, { x: 3, y: -1 }, { x: 1, y: -1 }], [{ x: 3, y: 2 }, { x: 3, y: 0 }, { x: -1, y: 2 }, { x: 1, y: -1 }, { x: -1, y: -1 }], [{ x: 2, y: 3 }, { x: 0, y: 3 }, { x: 2, y: -1 }, { x: -1, y: -1 }, { x: -1, y: 1 }], [{ x: 1, y: 3 }, { x: -1, y: 3 }, { x: -1, y: -1 }, { x: 2, y: 1 }, { x: 2, y: -1 }], [{ x: 3, y: 1 }, { x: 3, y: -1 }, { x: -1, y: -1 }, { x: 1, y: 2 }, { x: -1, y: 2 }], [{ x: -1, y: -1 }, { x: -1, y: 1 }, { x: 3, y: -1 }, { x: 3, y: 2 }, { x: 1, y: 2 }], [{ x: 1, y: -1 }, { x: -1, y: -1 }, { x: -1, y: 3 }, { x: 2, y: 3 }, { x: 2, y: 1 }], [{ x: 2, y: -1 }, { x: 0, y: -1 }, { x: 2, y: 3 }, { x: -1, y: 1 }, { x: -1, y: 3 }]], [[{ x: -1, y: 0 }, { x: -1, y: 2 }, { x: 3, y: 2 }, { x: 3, y: 0 }, { x: 2, y: -1 }, { x: 0, y: -1 }], [{ x: 2, y: 3 }, { x: 0, y: 3 }, { x: 2, y: -1 }, { x: 0, y: -1 }, { x: -1, y: 0 }, { x: -1, y: 2 }], [{ x: 1, y: 3 }, { x: -1, y: 3 }, { x: 1, y: -1 }, { x: -1, y: -1 }, { x: 2, y: 2 }, { x: 2, y: 0 }], [{ x: 3, y: 1 }, { x: 3, y: -1 }, { x: -1, y: -1 }, { x: -1, y: 1 }, { x: 2, y: 2 }, { x: 0, y: 2 }]], [[{ x: 2, y: 2 }, { x: -1, y: 0 }, { x: -1, y: 2 }, { x: 0, y: -1 }, { x: 3, y: 1 }, { x: 3, y: -1 }], [{ x: 0, y: 2 }, { x: 3, y: 2 }, { x: 3, y: 0 }, { x: 2, y: -1 }, { x: -1, y: -1 }, { x: -1, y: 1 }], [{ x: 2, y: 0 }, { x: 2, y: 3 }, { x: 0, y: 3 }, { x: -1, y: 2 }, { x: 1, y: -1 }, { x: -1, y: -1 }], [{ x: -1, y: 0 }, { x: 1, y: 3 }, { x: -1, y: 3 }, { x: 2, y: 2 }, { x: 2, y: -1 }, { x: 0, y: -1 }]], [[{ x: 1, y: 1 }, { x: 1, y: -1 }, { x: -1, y: -1 }, { x: -1, y: 1 }]], [[{ x: 1, y: -1 }, { x: -1, y: -1 }, { x: 1, y: 2 }, { x: -1, y: 2 }], [{ x: -1, y: -1 }, { x: -1, y: 1 }, { x: 2, y: 1 }, { x: 2, y: -1 }]], [[{ x: 1, y: 3 }, { x: -1, y: 3 }, { x: 1, y: -1 }, { x: -1, y: -1 }], [{ x: 3, y: 1 }, { x: 3, y: -1 }, { x: -1, y: -1 }, { x: -1, y: 1 }]], [[{ x: 1, y: -1 }, { x: -1, y: -1 }, { x: 1, y: 4 }, { x: -1, y: 4 }], [{ x: -1, y: -1 }, { x: -1, y: 1 }, { x: 4, y: 1 }, { x: 4, y: -1 }]], [[{ x: 1, y: 5 }, { x: -1, y: 5 }, { x: 1, y: -1 }, { x: -1, y: -1 }], [{ x: 5, y: 1 }, { x: 5, y: -1 }, { x: -1, y: -1 }, { x: -1, y: 1 }]]];

// src/movegen/movegen.ts
var otherPlayer = (player) => player === 1 ? 0 : 1;
var orientationData = piece_orientations_default;
var orientationBitBoarddata = piece_orientations_bitboard_default;
var orientationBitBoardHaloData = piece_orientations_bitboard_halo_default;
var cornersData = piece_corners_default;
var cornerAttachersData = piece_corner_attachers_default;
var shortBoundingBoxData = piece_short_bounding_box_default;
var getOrientationData = (pieceType, orientation) => {
  return orientationData[pieceType][orientation];
};
var coordinateInBounds = (c) => {
  return c.x >= 0 && c.x <= 13 && c.y >= 0 && c.y <= 13;
};
var isMoveLegalA = (pseudoLegalMove, state) => {
  if (pseudoLegalMove.piece === null) {
    return true;
  }
  const toMove = pseudoLegalMove.piece.player;
  const location = pseudoLegalMove.piece.location;
  const myBitBoard = [state.state.playerABitBoard, state.state.playerBBitBoard][toMove];
  const opponentBitBoard = [state.state.playerBBitBoard, state.state.playerABitBoard][toMove];
  const shortBoundingBox = shortBoundingBoxData[pseudoLegalMove.piece.pieceType][pseudoLegalMove.piece.orientation];
  const bottomRightBB = {
    x: location.x + shortBoundingBox[0],
    y: location.y + shortBoundingBox[1]
  };
  if (!coordinateInBounds(bottomRightBB) || !coordinateInBounds(location)) {
    return false;
  }
  const pieceBitboard = orientationBitBoarddata[pseudoLegalMove.piece.pieceType][pseudoLegalMove.piece.orientation];
  for (let bitboardY = 0; bitboardY < pieceBitboard.length; bitboardY++) {
    const bitBoardRow = pieceBitboard[bitboardY] << location.x;
    const gameRow = opponentBitBoard[bitboardY + location.y];
    if (bitBoardRow & gameRow) {
      return false;
    }
  }
  for (let bitboardY = -1; bitboardY < pieceBitboard.length + 1; bitboardY++) {
    const rowAbove = bitboardY - 1 >= 0 ? pieceBitboard[bitboardY - 1] << location.x : 0;
    const rowBelow = bitboardY + 1 < pieceBitboard.length ? pieceBitboard[bitboardY + 1] << location.x : 0;
    const rowCurrent = bitboardY >= 0 && bitboardY < pieceBitboard.length ? pieceBitboard[bitboardY] << location.x : 0;
    const rowLeftRight = rowCurrent << 1 | rowCurrent >> 1;
    const halo = rowAbove | rowBelow | rowCurrent | rowLeftRight;
    const gameRow = myBitBoard[bitboardY + location.y];
    if (halo & gameRow) {
      return false;
    }
  }
  return true;
};
var isMoveLegalB = (pseudoLegalMove, state) => {
  if (pseudoLegalMove.piece === null) {
    return true;
  }
  const toMove = pseudoLegalMove.piece.player;
  const location = pseudoLegalMove.piece.location;
  const myBitBoard = [state.state.playerABitBoard, state.state.playerBBitBoard][toMove];
  const opponentBitBoard = [state.state.playerBBitBoard, state.state.playerABitBoard][toMove];
  const shortBoundingBox = shortBoundingBoxData[pseudoLegalMove.piece.pieceType][pseudoLegalMove.piece.orientation];
  const bottomRightBB = {
    x: location.x + shortBoundingBox[0],
    y: location.y + shortBoundingBox[1]
  };
  if (!coordinateInBounds(bottomRightBB) || !coordinateInBounds(location)) {
    return false;
  }
  const pieceBitboard = orientationBitBoarddata[pseudoLegalMove.piece.pieceType][pseudoLegalMove.piece.orientation];
  for (let bitboardY = 0; bitboardY < pieceBitboard.length; bitboardY++) {
    const bitBoardRow = pieceBitboard[bitboardY] << location.x;
    const gameRow = opponentBitBoard[bitboardY + location.y];
    if (bitBoardRow & gameRow) {
      return false;
    }
  }
  const haloData = orientationBitBoardHaloData[pseudoLegalMove.piece.pieceType][pseudoLegalMove.piece.orientation];
  for (let bitboardY = 0; bitboardY < pieceBitboard.length + 2; bitboardY++) {
    if (location.y + bitboardY - 1 < 0 || location.y + bitboardY - 1 >= myBitBoard.length) {
      continue;
    }
    const cachedHalo = haloData[bitboardY] << location.x;
    const gameRow = myBitBoard[bitboardY + location.y - 1] << 1;
    if (cachedHalo & gameRow) {
      return false;
    }
  }
  return true;
};
var getLegalMovesFrom = (from, piece, state) => {
  const moves = [];
  for (let i = 0; i < orientationData[piece].length; i++) {
    const orientationCorners = cornersData[piece][i];
    for (const corner of orientationCorners) {
      const pieceMiddle = { x: from.x - corner.x, y: from.y - corner.y };
      let placedPiece = {
        location: pieceMiddle,
        player: state.state.toMove,
        pieceType: piece,
        orientation: i
      };
      moves.push({
        piece: placedPiece,
        previousNullMoveCounter: state.state.nullMoveCounter
      });
    }
  }
  return moves.filter((p) => isMoveLegalB(p, state));
};
var generateFirstMove = (board) => {
  const myState = board.state.toMove === 0 ? board.state.playerARemaining : board.state.playerBRemaining;
  const startPos = board.startPositions[board.state.toMove];
  const moves = [];
  for (let piece = 0; piece < 21; piece++) {
    if (!(myState & 1 << piece)) {
      continue;
    }
    for (let i = 0; i < orientationData[piece].length; i++) {
      const pieceTiles = orientationData[piece][i];
      for (const tile of pieceTiles) {
        const pieceMiddle = { x: startPos.x - tile.x, y: startPos.y - tile.y };
        let placedPiece = {
          location: pieceMiddle,
          player: board.state.toMove,
          pieceType: piece,
          orientation: i
        };
        if (board.state.nullMoveCounter !== 0) {
          throw new Error("Null move counter is not 0 at the beginning of the game?");
        }
        moves.push({
          piece: placedPiece,
          previousNullMoveCounter: board.state.nullMoveCounter
        });
      }
    }
  }
  return moves.filter((p) => isMoveLegalA(p, board));
};
var getAllLegalMoves = (board) => {
  if (board.gameOver()) {
    return [];
  }
  const myPlacedPieces = board.state.pieces.filter((p) => p.player === board.state.toMove);
  if (myPlacedPieces.length === 0) {
    return generateFirstMove(board).slice(0, 20);
  }
  const myState = board.state.toMove === 0 ? board.state.playerARemaining : board.state.playerBRemaining;
  const moves = [];
  for (const placedPiece of myPlacedPieces) {
    const cornerAttachers = cornerAttachersData[placedPiece.pieceType][placedPiece.orientation];
    for (const cornerAttacher of cornerAttachers) {
      const cornerAbsolute = {
        x: cornerAttacher.x + placedPiece.location.x,
        y: cornerAttacher.y + placedPiece.location.y
      };
      const playerATile = getBitBoardValue(board.state.playerABitBoard, cornerAbsolute);
      const playerBTile = getBitBoardValue(board.state.playerBBitBoard, cornerAbsolute);
      if (playerATile || playerBTile) {
        continue;
      }
      for (let unplacedPiece = 0; unplacedPiece < 21; unplacedPiece++) {
        if (!(myState & 1 << unplacedPiece)) {
          continue;
        }
        moves.push(...getLegalMovesFrom(cornerAbsolute, unplacedPiece, board));
      }
    }
  }
  if (moves.length === 0) {
    moves.push({ piece: null, previousNullMoveCounter: board.state.nullMoveCounter });
  }
  return moves.slice(0, 20);
};

// src/benchmark.ts
var fs = __toESM(require("fs"));
var readline = __toESM(require("readline"));

// src/board.ts
var getStartPosition = (position) => {
  if (position === "middle") {
    return [
      { x: 4, y: 4 },
      { x: 9, y: 9 }
    ];
  } else {
    return [
      { x: 0, y: 13 },
      { x: 13, y: 0 }
    ];
  }
};
var defaultBoardState = {
  pieces: [],
  toMove: 0,
  playerARemaining: 2 ** 21 - 1,
  playerBRemaining: 2 ** 21 - 1,
  playerABitBoard: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  playerBBitBoard: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  startPosName: "middle",
  startPositions: [
    { x: 4, y: 4 },
    { x: 9, y: 9 }
  ],
  nullMoveCounter: 0
};
var Board = class _Board {
  constructor(startPosition, state) {
    this.state = state || {
      ...structuredClone(defaultBoardState),
      startPosName: startPosition
    };
    this.startPositions = getStartPosition(startPosition);
  }
  reset() {
    this.state = structuredClone(defaultBoardState);
  }
  gameOver() {
    return this.state.nullMoveCounter >= 2;
  }
  score() {
    return {
      playerA: this.state.pieces.filter((p) => p.player === 0).map((p) => getOrientationData(p.pieceType, 0).length).reduce((a, b) => a + b, 0),
      playerB: this.state.pieces.filter((p) => p.player === 1).map((p) => getOrientationData(p.pieceType, 0).length).reduce((a, b) => a + b, 0)
    };
  }
  winner() {
    if (!this.gameOver()) {
      return "none";
    }
    const { playerA, playerB } = this.score();
    if (playerA > playerB) {
      return 0;
    } else if (playerB > playerA) {
      return 1;
    } else {
      return "draw";
    }
  }
  copy() {
    const state = structuredClone(this.state);
    return new _Board(state.startPosName, state);
  }
  doMove(move) {
    const piece = move.piece;
    if (piece === null) {
      this.state.nullMoveCounter++;
      this.skipTurn();
      return;
    }
    this.state.nullMoveCounter = 0;
    this.state.pieces.push(piece);
    if (piece.player === 0) {
      this.state.playerARemaining &= ~(1 << piece.pieceType);
    } else {
      this.state.playerBRemaining &= ~(1 << piece.pieceType);
    }
    const bitBoard = [this.state.playerABitBoard, this.state.playerBBitBoard][piece.player];
    for (const tile of getOrientationData(piece.pieceType, piece.orientation)) {
      const pieceCoord = {
        x: tile.x + piece.location.x,
        y: tile.y + piece.location.y
      };
      setBitBoardValue(bitBoard, pieceCoord, 1);
    }
    this.skipTurn();
  }
  /**
   * Currently used when the player has no legal moves to transfer to the other player.
   */
  skipTurn() {
    this.state.toMove = otherPlayer(this.state.toMove);
  }
  undoMove(move) {
    const piece = move.piece;
    this.state.nullMoveCounter = move.previousNullMoveCounter;
    if (piece === null) {
      this.skipTurn();
      return;
    }
    const moveIndex = this.state.pieces.findIndex((p) => {
      return p.location.x === piece.location.x && p.location.y === piece.location.y && piece.pieceType === p.pieceType;
    });
    if (moveIndex === -1) {
      console.error("Err with move: ", move);
      throw new Error(`could not identify piece`);
    }
    this.state.pieces.splice(moveIndex, 1);
    if (piece.player === 0) {
      this.state.playerARemaining |= 1 << piece.pieceType;
    } else {
      this.state.playerBRemaining |= 1 << piece.pieceType;
    }
    const bitBoard = [this.state.playerABitBoard, this.state.playerBBitBoard][piece.player];
    for (const tile of getOrientationData(piece.pieceType, piece.orientation)) {
      const pieceCoord = {
        x: tile.x + piece.location.x,
        y: tile.y + piece.location.y
      };
      setBitBoardValue(bitBoard, pieceCoord, 0);
    }
    this.skipTurn();
  }
  placedPieceHash(piece) {
    return `${piece.pieceType}-${piece.location.x}-${piece.location.y}-${piece.orientation}`;
  }
  hash() {
    return this.state.pieces.map((p) => this.placedPieceHash(p)).join("/");
  }
};

// src/benchmark.ts
var recursiveMoveGen = (board, depth) => {
  if (depth <= 0) {
    return;
  }
  const moves = getAllLegalMoves(board).slice(0, 50);
  for (const move of moves) {
    board.doMove(move);
    recursiveMoveGen(board, depth - 1);
    board.undoMove(move);
  }
};
var bench = (moves, name) => {
  const timing = [];
  for (let i = 0; i < 5; i++) {
    const startTime = /* @__PURE__ */ new Date();
    const board = new Board("middle");
    for (const move of moves) {
      board.doMove(move);
    }
    recursiveMoveGen(board, 3);
    const endTime = /* @__PURE__ */ new Date();
    const diff = endTime.getTime() - startTime.getTime();
    console.log(`[${i + 1}/5] ${name} ${diff}ms`);
    timing.push(diff);
  }
  return timing.reduce((a, b) => a + b, 0) / timing.length;
};
var benchStart = () => {
  const moves = [{ "piece": { "location": { "x": 4, "y": 5 }, "pieceType": 6, "player": 0, "orientation": 0 } }, { "piece": { "pieceType": 0, "location": { "x": 9, "y": 9 }, "player": 1, "orientation": 0 } }];
  return bench(moves, "start");
};
var benchMiddle = () => {
  const moves = [{ "piece": { "location": { "x": 5, "y": 5 }, "pieceType": 6, "player": 0, "orientation": 2 } }, { "piece": { "pieceType": 0, "location": { "x": 9, "y": 9 }, "player": 1, "orientation": 0 } }, { "piece": { "location": { "x": 7, "y": 9 }, "pieceType": 8, "player": 0, "orientation": 0 } }, { "piece": { "location": { "x": 8, "y": 12 }, "player": 1, "pieceType": 10, "orientation": 0 } }, { "piece": { "location": { "x": 5, "y": 2 }, "pieceType": 7, "player": 0, "orientation": 0 } }, { "piece": { "location": { "x": 12, "y": 10 }, "player": 1, "pieceType": 4, "orientation": 1 } }, { "piece": { "location": { "x": 8, "y": 3 }, "pieceType": 9, "player": 0, "orientation": 0 } }, { "piece": { "location": { "x": 11, "y": 6 }, "player": 1, "pieceType": 1, "orientation": 3 } }, { "piece": { "location": { "x": 4, "y": 8 }, "pieceType": 11, "player": 0, "orientation": 2 } }, { "piece": { "location": { "x": 12, "y": 13 }, "player": 1, "pieceType": 13, "orientation": 0 } }];
  return bench(moves, "middle");
};
var benchEnd = () => {
  const moves = [{ "piece": { "location": { "x": 5, "y": 5 }, "pieceType": 6, "player": 0, "orientation": 2 } }, { "piece": { "pieceType": 0, "location": { "x": 9, "y": 9 }, "player": 1, "orientation": 0 } }, { "piece": { "location": { "x": 5, "y": 2 }, "pieceType": 7, "player": 0, "orientation": 0 } }, { "piece": { "location": { "x": 8, "y": 12 }, "player": 1, "pieceType": 8, "orientation": 2 } }, { "piece": { "location": { "x": 7, "y": 8 }, "pieceType": 10, "player": 0, "orientation": 0 } }, { "piece": { "location": { "x": 12, "y": 10 }, "player": 1, "pieceType": 4, "orientation": 1 } }, { "piece": { "location": { "x": 9, "y": 5 }, "pieceType": 11, "player": 0, "orientation": 6 } }, { "piece": { "location": { "x": 11, "y": 6 }, "player": 1, "pieceType": 1, "orientation": 3 } }, { "piece": { "location": { "x": 13, "y": 4 }, "pieceType": 8, "player": 0, "orientation": 1 } }, { "piece": { "location": { "x": 12, "y": 13 }, "player": 1, "pieceType": 13, "orientation": 0 } }, { "piece": { "location": { "x": 10, "y": 2 }, "pieceType": 14, "player": 0, "orientation": 3 } }, { "piece": { "location": { "x": 13, "y": 8 }, "player": 1, "pieceType": 16, "orientation": 0 } }, { "piece": { "location": { "x": 8, "y": 1 }, "pieceType": 15, "player": 0, "orientation": 0 } }, { "piece": { "location": { "x": 6, "y": 10 }, "player": 1, "pieceType": 14, "orientation": 2 } }, { "piece": { "location": { "x": 2, "y": 7 }, "pieceType": 9, "player": 0, "orientation": 0 } }, { "piece": { "location": { "x": 3, "y": 12 }, "player": 1, "pieceType": 20, "orientation": 1 } }, { "piece": { "location": { "x": 1, "y": 3 }, "pieceType": 2, "player": 0, "orientation": 2 } }, { "piece": { "location": { "x": 4, "y": 8 }, "player": 1, "pieceType": 2, "orientation": 1 } }];
  return bench(moves, "end");
};
var question = (int, questionText) => {
  const response = new Promise((resolve) => {
    int.question(questionText, (response2) => {
      resolve(response2);
    });
  });
  return response;
};
var main = async () => {
  const start = benchStart();
  const middle = benchMiddle();
  const end = benchEnd();
  console.log(`${start.toFixed(1)}ms start; ${middle.toFixed(1)}ms mid; ${end.toFixed(1)}ms end`);
  const readlineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  const saveB = await question(
    readlineInterface,
    "Would you like to save these benchmarks? [y/n]\n"
  );
  if (saveB !== "y") {
    process.exit();
  }
  const benchName = await question(
    readlineInterface,
    "What would you like to name this benchmark?\n"
  );
  const previousBenches = JSON.parse(fs.readFileSync("benchmarks.json").toString());
  const benchMark = { name: benchName, timings: [start, middle, end] };
  fs.writeFileSync("benchmarks.json", JSON.stringify([...previousBenches, benchMark]));
  process.exit();
};
main();
