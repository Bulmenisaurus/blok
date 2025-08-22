"use strict";
(() => {
  // src/bitboard.ts
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

  // src/movegen/movegen-utils.ts
  var otherPlayer = (player) => player === 1 ? 0 : 1;
  var coordinateInBounds = (c) => {
    return c.x >= 0 && c.x <= 13 && c.y >= 0 && c.y <= 13;
  };

  // src/movegen/movegen.ts
  var MOVE_ORIENTATION_MASK = 7;
  var MOVE_Y_MASK = 120;
  var MOVE_X_MASK = 1920;
  var MOVE_TYPE_MASK = 63488;
  var MOVE_PLAYER_BIT = 65536;
  var getMoveOrientation = (packedMove) => {
    return packedMove & MOVE_ORIENTATION_MASK;
  };
  var getMoveLocation = (packedMove) => {
    const x = (packedMove & MOVE_X_MASK) >> 7;
    const y = (packedMove & MOVE_Y_MASK) >> 3;
    return { x, y };
  };
  var getMovePieceType = (packedMove) => {
    return (packedMove & MOVE_TYPE_MASK) >> 11;
  };
  var getMovePlayer = (packedMove) => {
    const player = (packedMove & MOVE_PLAYER_BIT) >> 16;
    return player;
  };
  var NULL_MOVE = 30720;
  var serializePlacedPiece = (placedPiece) => {
    return placedPiece.orientation | placedPiece.location.y << 3 | placedPiece.location.x << 7 | placedPiece.pieceType << 11 | placedPiece.player << 16;
  };
  var orientationData = piece_orientations_default;
  var orientationBitBoarddata = piece_orientations_bitboard_default;
  var orientationBitBoardHaloData = piece_orientations_bitboard_halo_default;
  var cornersData = piece_corners_default;
  var cornerAttachersData = piece_corner_attachers_default;
  var shortBoundingBoxData = piece_short_bounding_box_default;
  var getOrientationData = (pieceType, orientation) => {
    return orientationData[pieceType][orientation];
  };
  var isMoveLegal = (pseudoLegalMove, state) => {
    if (pseudoLegalMove === NULL_MOVE) {
      return true;
    }
    const toMove = getMovePlayer(pseudoLegalMove);
    const location = getMoveLocation(pseudoLegalMove);
    const myPlacedPiece = [state.state.playerARemaining, state.state.playerBRemaining][toMove];
    if (!(myPlacedPiece & 1 << getMovePieceType(pseudoLegalMove))) {
      return false;
    }
    const myBitBoard = [state.state.playerABitBoard, state.state.playerBBitBoard][toMove];
    const opponentBitBoard = [state.state.playerBBitBoard, state.state.playerABitBoard][toMove];
    const shortBoundingBox = shortBoundingBoxData[getMovePieceType(pseudoLegalMove)][getMoveOrientation(pseudoLegalMove)];
    const bottomRightBB = {
      x: location.x + shortBoundingBox[0],
      y: location.y + shortBoundingBox[1]
    };
    if (!coordinateInBounds(bottomRightBB) || !coordinateInBounds(location)) {
      return false;
    }
    const pieceBitboard = orientationBitBoarddata[getMovePieceType(pseudoLegalMove)][getMoveOrientation(pseudoLegalMove)];
    for (let bitboardY = 0; bitboardY < pieceBitboard.length; bitboardY++) {
      const bitBoardRow = pieceBitboard[bitboardY] << location.x;
      const gameRow = opponentBitBoard[bitboardY + location.y];
      if (bitBoardRow & gameRow) {
        return false;
      }
    }
    const haloData = orientationBitBoardHaloData[getMovePieceType(pseudoLegalMove)][getMoveOrientation(pseudoLegalMove)];
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
        if (!coordinateInBounds(pieceMiddle)) {
          continue;
        }
        let placedPiece = {
          location: pieceMiddle,
          player: state.state.toMove,
          pieceType: piece,
          orientation: i
        };
        const move = serializePlacedPiece(placedPiece);
        moves.push(move);
      }
    }
    return moves.filter((p) => isMoveLegal(p, state));
  };
  var isMoveBlokeeLegal = (move, pieceTiles) => {
    return pieceTiles.every((relCoord) => {
      const absolute = { x: relCoord.x + move.location.x, y: relCoord.y + move.location.y };
      if (move.player === 0) {
        return absolute.x <= 6 && absolute.y > 6;
      } else {
        return absolute.x > 6 && absolute.y <= 6;
      }
    });
  };
  var generateFirstMove = (board2) => {
    const startPos = board2.startPositions[board2.state.toMove];
    if (board2.state.nullMoveCounter !== 0) {
      throw new Error("Null move counter is not 0 at the beginning of the game?");
    }
    const moves = [];
    for (let piece = 0; piece < 21; piece++) {
      for (let i = 0; i < orientationData[piece].length; i++) {
        const pieceTiles = orientationData[piece][i];
        for (const tile of pieceTiles) {
          const pieceMiddle = { x: startPos.x - tile.x, y: startPos.y - tile.y };
          let placedPiece = {
            location: pieceMiddle,
            player: board2.state.toMove,
            pieceType: piece,
            orientation: i
          };
          if (board2.state.startPosName === "middle-blokee" && !isMoveBlokeeLegal(placedPiece, pieceTiles)) {
            continue;
          }
          moves.push(serializePlacedPiece(placedPiece));
        }
      }
    }
    return moves.filter((p) => isMoveLegal(p, board2));
  };
  var getAllLegalMoves = (board2) => {
    if (board2.gameOver()) {
      return [];
    }
    const myPlacedPieces = board2.state.pieces.filter(
      (p) => getMovePlayer(p) === board2.state.toMove
    );
    if (myPlacedPieces.length === 0) {
      return generateFirstMove(board2);
    }
    let moves = [];
    if (board2.state.toMove === 0) {
      moves = Array.from(board2.state.playerACornerMoves.values()).flat();
    } else {
      moves = Array.from(board2.state.playerBCornerMoves.values()).flat();
    }
    const uniqueMoves = Array.from(new Set(moves));
    if (uniqueMoves.length === 0) {
      uniqueMoves.push(NULL_MOVE);
    }
    return uniqueMoves;
  };

  // src/board.ts
  var getStartPosition = (position) => {
    if (position === "middle") {
      return [
        { x: 4, y: 4 },
        { x: 9, y: 9 }
      ];
    } else if (position === "corner") {
      return [
        { x: 0, y: 0 },
        { x: 13, y: 13 }
      ];
    } else if (position === "middle-blokee") {
      return [
        { x: 6, y: 7 },
        { x: 7, y: 6 }
      ];
    } else {
      throw new Error(`Unrecognized start position ${position}`);
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
    nullMoveCounter: 0,
    playerACornerMoves: /* @__PURE__ */ new Map(),
    playerBCornerMoves: /* @__PURE__ */ new Map()
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
        playerA: this.state.pieces.filter((p) => getMovePlayer(p) === 0).map((p) => getOrientationData(getMovePieceType(p), 0).length).reduce((a, b) => a + b, 0),
        playerB: this.state.pieces.filter((p) => getMovePlayer(p) === 1).map((p) => getOrientationData(getMovePieceType(p), 0).length).reduce((a, b) => a + b, 0)
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
      if (move === NULL_MOVE) {
        this.state.nullMoveCounter++;
        const opponentCachedMoves2 = this.state.toMove === 0 ? this.state.playerBCornerMoves : this.state.playerACornerMoves;
        this.skipTurn();
        for (const [idx, moves] of opponentCachedMoves2) {
          const newMoves = moves.filter((m) => isMoveLegal(m, this));
          opponentCachedMoves2.set(idx, newMoves);
        }
        return;
      }
      this.state.nullMoveCounter = 0;
      this.state.pieces.push(move);
      if (getMovePlayer(move) === 0) {
        this.state.playerARemaining &= ~(1 << getMovePieceType(move));
      } else {
        this.state.playerBRemaining &= ~(1 << getMovePieceType(move));
      }
      const bitBoard = [this.state.playerABitBoard, this.state.playerBBitBoard][getMovePlayer(move)];
      for (const tile of getOrientationData(getMovePieceType(move), getMoveOrientation(move))) {
        const pieceCoord = {
          x: tile.x + getMoveLocation(move).x,
          y: tile.y + getMoveLocation(move).y
        };
        setBitBoardValue(bitBoard, pieceCoord, 1);
      }
      const placedPiece = getMovePieceType(move);
      const placedPieceOrientation = getMoveOrientation(move);
      const placedPieceLocation = getMoveLocation(move);
      const myCachedMoves = this.state.toMove === 0 ? this.state.playerACornerMoves : this.state.playerBCornerMoves;
      const opponentCachedMoves = this.state.toMove === 0 ? this.state.playerBCornerMoves : this.state.playerACornerMoves;
      const relativeCorner = cornersData[placedPiece][placedPieceOrientation];
      for (const corner of relativeCorner) {
        const cornerCoord = {
          x: corner.x + placedPieceLocation.x,
          y: corner.y + placedPieceLocation.y
        };
        const cornerIdx = cornerCoord.x + cornerCoord.y * 14;
        myCachedMoves.delete(cornerIdx);
        opponentCachedMoves.delete(cornerIdx);
      }
      const cornerAttachers = cornerAttachersData[placedPiece][placedPieceOrientation];
      for (const cornerAttacher of cornerAttachers) {
        const cornerCoord = {
          x: cornerAttacher.x + placedPieceLocation.x,
          y: cornerAttacher.y + placedPieceLocation.y
        };
        if (!coordinateInBounds(cornerCoord)) {
          continue;
        }
        const cornerIdx = cornerCoord.x + cornerCoord.y * 14;
        if (myCachedMoves.has(cornerIdx)) {
          continue;
        }
        const myRemaining = this.state.toMove === 0 ? this.state.playerARemaining : this.state.playerBRemaining;
        const legalMoves = [];
        for (let unplacedPiece = 0; unplacedPiece < 21; unplacedPiece++) {
          if (!(myRemaining & 1 << unplacedPiece)) {
            continue;
          }
          legalMoves.push(...getLegalMovesFrom(cornerCoord, unplacedPiece, this));
        }
        myCachedMoves.set(cornerIdx, legalMoves);
      }
      this.skipTurn();
      for (const [idx, moves] of opponentCachedMoves) {
        const newMoves = moves.filter((m) => isMoveLegal(m, this));
        opponentCachedMoves.set(idx, newMoves);
      }
    }
    skipTurn() {
      this.state.toMove = otherPlayer(this.state.toMove);
    }
    placedPieceHash(move) {
      return `${move}`;
    }
    hash() {
      return this.state.pieces.map((p) => this.placedPieceHash(p)).join("/") + `+${this.state.nullMoveCounter}`;
    }
  };

  // src/mcts/MonteCarloNode.ts
  var moveHash = (move) => {
    return `${move}`;
  };
  var MonteCarloNode = class _MonteCarloNode {
    constructor(idx, parent, parentIdx, play, state, unexpandedPlays) {
      this.own_idx = idx;
      this.play = play;
      this.state = state;
      this.n_plays = 0;
      this.n_wins = 0;
      this.parent = parent;
      this.parent_idx = parentIdx;
      this.children = /* @__PURE__ */ new Map();
      this.children_idx = /* @__PURE__ */ new Map();
      for (let play2 of unexpandedPlays) {
        this.children.set(moveHash(play2), { play: play2, node: null });
        this.children_idx.set(moveHash(play2), { play: play2, node: null });
      }
    }
    /** Get the MonteCarloNode corresponding to the given play. */
    childNode(play, all_nodes) {
      let child = this.children.get(moveHash(play));
      if (child === void 0) {
        throw new Error("Child not found");
      }
      if (child.node === null) {
        throw new Error("Child not expanded");
      }
      return child.node;
    }
    /** Expand the specified child play and return the new child node. */
    expand(play, childState, unexpandedPlays, new_idx) {
      if (!this.children.has(moveHash(play))) {
        throw new Error("Child not found");
      }
      let childNode = new _MonteCarloNode(
        new_idx,
        this,
        this.own_idx,
        play,
        childState,
        unexpandedPlays
      );
      this.children.set(moveHash(play), { play, node: childNode });
      this.children_idx.set(moveHash(play), { play, node: new_idx });
      return childNode;
    }
    /** Get all legal plays from this node. */
    allPlays() {
      return Array.from(this.children.values()).map((child) => child.play);
    }
    /** Get all unexpanded legal plays from this node. */
    unexpandedPlays() {
      return Array.from(this.children.values()).filter((child) => child.node === null).map((child) => child.play);
    }
    /** Whether this node is fully expanded. */
    isFullyExpanded() {
      return Array.from(this.children.values()).every((child) => child.node !== null);
    }
    /** Whether this node is terminal in the game tree, 
      NOT INCLUSIVE of termination due to winning. */
    isLeaf() {
      return this.children.size === 0;
    }
    /** Get the UCB1 value for this node.
     * Not defined for the root node.
     */
    getUCB1(biasParam) {
      if (this.parent === null) {
        throw new Error("UCB1 not defined for root node");
      }
      return this.n_wins / this.n_plays + Math.sqrt(biasParam * Math.log(this.parent.n_plays) / this.n_plays);
    }
  };

  // src/mcts/MonteCarlo.ts
  var MonteCarlo = class {
    constructor(game, UCB1ExploreParam = 2) {
      this.game = game;
      this.UCB1ExploreParam = UCB1ExploreParam;
      this.all_nodes = [];
      this.root_node_idx = -1;
    }
    /** From given state, repeatedly run MCTS to build statistics. Timeout in ms. */
    runSearch(state, difficulty2) {
      this.makeNode(state);
      const start = Date.now();
      const timeout = {
        easy: 2e3,
        medium: 1e4,
        hard: 2e4
      }[difficulty2];
      const searchDepth = {
        easy: 1e3,
        medium: 5e3,
        hard: 15e3
      }[difficulty2];
      let i = 0;
      for (; i < searchDepth || Date.now() < start + timeout; i++) {
        let node = this.select(state);
        let winner = node.state.winner();
        if (node.isLeaf() === false && winner === "none") {
          node = this.expand(node);
          winner = this.simulate(node);
        }
        this.backpropagate(node, winner);
      }
      console.log("runSearch", i, "took", Date.now() - start, "ms");
    }
    // Creates a new node from which to start a search
    // Since I clear the entire tree after every search, this will always create a root node
    makeNode(state) {
      let unexpandedPlays = getAllLegalMoves(state);
      const new_idx = this.all_nodes.length;
      if (new_idx !== 0) {
        throw new Error(
          "Search started from a non empty tree. Was the tree not cleared between searches?"
        );
      }
      this.root_node_idx = 0;
      let node = new MonteCarloNode(new_idx, null, null, null, state, unexpandedPlays);
      this.all_nodes.push(node);
      return this.all_nodes.length - 1;
    }
    /** Get the best move from available statistics. */
    bestPlay(state) {
      if (!this.all_nodes[this.root_node_idx].isFullyExpanded()) {
        throw new Error("Not enough information!");
      }
      let node = this.all_nodes[this.root_node_idx];
      let allPlays = node.allPlays();
      let bestPlay;
      let max = -Infinity;
      for (let play of allPlays) {
        let childNode = node.childNode(play, this.all_nodes);
        if (childNode.n_plays === 0) {
          continue;
        }
        if (childNode.n_plays > max) {
          bestPlay = play;
          max = childNode.n_plays;
        }
      }
      if (bestPlay === void 0) {
        throw new Error("No best play found. Was bestPlay called on a leaf node?");
      }
      return bestPlay;
    }
    /** Phase 1, Selection: Select until not fully expanded OR leaf */
    select(state) {
      let node = this.all_nodes[this.root_node_idx];
      while (node.isFullyExpanded() && !node.isLeaf()) {
        let plays = node.allPlays();
        let bestPlay;
        let bestUCB1 = -Infinity;
        for (let play of plays) {
          let childUCB1 = node.childNode(play, this.all_nodes).getUCB1(this.UCB1ExploreParam);
          if (childUCB1 > bestUCB1) {
            bestPlay = play;
            bestUCB1 = childUCB1;
          }
        }
        if (bestPlay === void 0) {
          throw new Error("No best play found. Was select called on a leaf node?");
        }
        node = node.childNode(bestPlay, this.all_nodes);
      }
      return node;
    }
    /** Phase 2, Expansion: Expand a random unexpanded child node */
    expand(node) {
      let plays = node.unexpandedPlays();
      let randomMove = plays[Math.floor(Math.random() * plays.length)];
      const childState = node.state.copy();
      childState.doMove(randomMove);
      let childUnexpandedPlays = getAllLegalMoves(childState);
      const new_idx = this.all_nodes.length;
      let childNode = node.expand(randomMove, childState, childUnexpandedPlays, new_idx);
      this.all_nodes.push(childNode);
      return childNode;
    }
    /** Phase 3, Simulation: Play game to terminal state, return winner */
    simulate(node) {
      let state = node.state.copy();
      let winner = state.winner();
      while (winner === "none") {
        let plays = getAllLegalMoves(state);
        let play = plays[Math.floor(Math.random() * plays.length)];
        state.doMove(play);
        winner = state.winner();
      }
      return winner;
    }
    /** Phase 4, Backpropagation: Update ancestor statistics */
    backpropagate(node, winner) {
      let currentNode = node;
      while (currentNode !== null) {
        currentNode.n_plays += 1;
        if (otherPlayer(currentNode.state.state.toMove) === winner) {
          currentNode.n_wins += 1;
        }
        currentNode = currentNode.parent;
      }
    }
    getStats(state) {
      let node = this.all_nodes[this.root_node_idx];
      let stats = {
        n_plays: node.n_plays,
        n_wins: node.n_wins,
        children: []
      };
      for (let child of node.children.values()) {
        if (child.node === null) {
          stats.children.push({ play: child.play, n_plays: null, n_wins: null });
        } else {
          stats.children.push({
            play: child.play,
            n_plays: child.node.n_plays,
            n_wins: child.node.n_wins
          });
        }
      }
      return stats;
    }
  };

  // src/worker.ts
  var board;
  var mcts;
  var difficulty = "easy";
  onmessage = (e) => {
    if (e.data.type === "init") {
      console.log("initialization");
      board = new Board(e.data.startPos);
      mcts = new MonteCarlo(board);
      difficulty = e.data.difficulty;
      return;
    }
    if (board === void 0 || mcts === void 0) {
      throw new Error("No initialization! :(");
    }
    if (e.data.lastMove !== void 0) {
      board.doMove(e.data.lastMove);
    }
    if (board.gameOver()) {
      throw new Error("why are you bothering me? The game is over.");
    }
    const moves = getAllLegalMoves(board);
    if (moves.length === 1) {
      const bestMove = moves[0];
      board.doMove(bestMove);
      postMessage({ move: bestMove, score: 0 });
      return;
    }
    console.log("running mcts");
    console.log("running 5k search");
    mcts.runSearch(board, difficulty);
    try {
      const bestMove = mcts.bestPlay(board);
      const stats = mcts.getStats(board);
      const bestMoveStats = stats.children.find(
        (child) => child.play && bestMove && child.play === bestMove
      );
      console.log("clearing");
      mcts.all_nodes = [];
      const score = bestMoveStats ? (bestMoveStats.n_wins ?? 0) / (bestMoveStats.n_plays ?? 0) : 0;
      board.doMove(bestMove);
      postMessage({
        move: bestMove,
        score
      });
    } catch (error) {
      console.error("MCTS failed to find best move:", error);
      postMessage(null);
    }
  };
})();
