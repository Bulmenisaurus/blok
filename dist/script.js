"use strict";
(() => {
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

  // src/movegen/piece-orientations.json
  var piece_orientations_default = [[[{ x: 0, y: 2 }, { x: 0, y: 3 }, { x: 1, y: 3 }, { x: 0, y: 1 }, { x: 0, y: 0 }], [{ x: 1, y: 2 }, { x: 1, y: 3 }, { x: 0, y: 3 }, { x: 1, y: 1 }, { x: 1, y: 0 }], [{ x: 2, y: 1 }, { x: 3, y: 1 }, { x: 3, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 }], [{ x: 1, y: 1 }, { x: 0, y: 1 }, { x: 0, y: 0 }, { x: 2, y: 1 }, { x: 3, y: 1 }], [{ x: 1, y: 1 }, { x: 1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 2 }, { x: 1, y: 3 }], [{ x: 0, y: 1 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 2 }, { x: 0, y: 3 }], [{ x: 1, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 1 }, { x: 2, y: 0 }, { x: 3, y: 0 }], [{ x: 2, y: 0 }, { x: 3, y: 0 }, { x: 3, y: 1 }, { x: 1, y: 0 }, { x: 0, y: 0 }]], [[{ x: 1, y: 2 }, { x: 1, y: 3 }, { x: 0, y: 2 }, { x: 1, y: 1 }, { x: 1, y: 0 }], [{ x: 0, y: 2 }, { x: 0, y: 3 }, { x: 1, y: 2 }, { x: 0, y: 1 }, { x: 0, y: 0 }], [{ x: 2, y: 0 }, { x: 3, y: 0 }, { x: 2, y: 1 }, { x: 1, y: 0 }, { x: 0, y: 0 }], [{ x: 1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 0 }, { x: 3, y: 0 }], [{ x: 0, y: 1 }, { x: 0, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 2 }, { x: 0, y: 3 }], [{ x: 1, y: 1 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 2 }, { x: 1, y: 3 }], [{ x: 1, y: 1 }, { x: 0, y: 1 }, { x: 1, y: 0 }, { x: 2, y: 1 }, { x: 3, y: 1 }], [{ x: 2, y: 1 }, { x: 3, y: 1 }, { x: 2, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 }]], [[{ x: 1, y: 1 }, { x: 1, y: 2 }, { x: 1, y: 3 }, { x: 0, y: 1 }, { x: 0, y: 0 }], [{ x: 0, y: 1 }, { x: 0, y: 2 }, { x: 0, y: 3 }, { x: 1, y: 1 }, { x: 1, y: 0 }], [{ x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 }], [{ x: 2, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 0 }, { x: 2, y: 1 }, { x: 3, y: 1 }], [{ x: 0, y: 2 }, { x: 0, y: 1 }, { x: 0, y: 0 }, { x: 1, y: 2 }, { x: 1, y: 3 }], [{ x: 1, y: 2 }, { x: 1, y: 1 }, { x: 1, y: 0 }, { x: 0, y: 2 }, { x: 0, y: 3 }], [{ x: 2, y: 1 }, { x: 1, y: 1 }, { x: 0, y: 1 }, { x: 2, y: 0 }, { x: 3, y: 0 }], [{ x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 }, { x: 1, y: 0 }, { x: 0, y: 0 }]], [[{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 0 }], [{ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 0 }], [{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 0, y: 0 }], [{ x: 1, y: 1 }, { x: 0, y: 1 }, { x: 1, y: 0 }]], [[{ x: 0, y: 1 }, { x: 0, y: 2 }, { x: 1, y: 2 }, { x: 0, y: 0 }, { x: 1, y: 0 }], [{ x: 1, y: 1 }, { x: 1, y: 2 }, { x: 0, y: 2 }, { x: 1, y: 0 }, { x: 0, y: 0 }], [{ x: 1, y: 1 }, { x: 2, y: 1 }, { x: 2, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 0 }], [{ x: 1, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 1 }, { x: 2, y: 0 }, { x: 2, y: 1 }]], [[{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 1, y: 0 }, { x: 2, y: 0 }], [{ x: 2, y: 0 }, { x: 2, y: 1 }, { x: 2, y: 2 }, { x: 1, y: 0 }, { x: 0, y: 0 }], [{ x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 0, y: 1 }, { x: 0, y: 0 }], [{ x: 2, y: 2 }, { x: 1, y: 2 }, { x: 0, y: 2 }, { x: 2, y: 1 }, { x: 2, y: 0 }]], [[{ x: 1, y: 1 }, { x: 1, y: 2 }, { x: 0, y: 2 }, { x: 1, y: 0 }, { x: 2, y: 0 }], [{ x: 1, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 1, y: 0 }, { x: 0, y: 0 }], [{ x: 1, y: 1 }, { x: 2, y: 1 }, { x: 2, y: 2 }, { x: 0, y: 1 }, { x: 0, y: 0 }], [{ x: 1, y: 1 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 2, y: 1 }, { x: 2, y: 0 }]], [[{ x: 1, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 1 }, { x: 1, y: 0 }, { x: 0, y: 1 }]], [[{ x: 1, y: 2 }, { x: 0, y: 2 }, { x: 2, y: 2 }, { x: 1, y: 1 }, { x: 1, y: 0 }], [{ x: 2, y: 1 }, { x: 2, y: 2 }, { x: 2, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 }], [{ x: 0, y: 1 }, { x: 0, y: 2 }, { x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 1 }], [{ x: 1, y: 0 }, { x: 2, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 }]], [[{ x: 1, y: 1 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 1, y: 0 }, { x: 2, y: 0 }], [{ x: 1, y: 1 }, { x: 2, y: 1 }, { x: 2, y: 2 }, { x: 1, y: 0 }, { x: 0, y: 0 }], [{ x: 1, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 0, y: 1 }, { x: 0, y: 0 }], [{ x: 1, y: 1 }, { x: 1, y: 2 }, { x: 0, y: 2 }, { x: 2, y: 1 }, { x: 2, y: 0 }]], [[{ x: 0, y: 1 }, { x: 0, y: 2 }, { x: 1, y: 2 }, { x: 1, y: 1 }, { x: 0, y: 0 }], [{ x: 1, y: 1 }, { x: 1, y: 2 }, { x: 0, y: 2 }, { x: 0, y: 1 }, { x: 1, y: 0 }], [{ x: 1, y: 1 }, { x: 2, y: 1 }, { x: 2, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }], [{ x: 1, y: 1 }, { x: 0, y: 1 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 1 }], [{ x: 1, y: 1 }, { x: 1, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 2 }], [{ x: 0, y: 1 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 2 }], [{ x: 1, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 0 }], [{ x: 1, y: 0 }, { x: 2, y: 0 }, { x: 2, y: 1 }, { x: 1, y: 1 }, { x: 0, y: 0 }]], [[{ x: 1, y: 1 }, { x: 0, y: 1 }, { x: 1, y: 0 }, { x: 1, y: 2 }, { x: 2, y: 2 }], [{ x: 1, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 0 }, { x: 1, y: 2 }, { x: 0, y: 2 }], [{ x: 1, y: 1 }, { x: 1, y: 2 }, { x: 0, y: 1 }, { x: 2, y: 1 }, { x: 2, y: 0 }], [{ x: 1, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 1 }, { x: 0, y: 1 }, { x: 0, y: 0 }], [{ x: 1, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 2 }, { x: 1, y: 0 }, { x: 0, y: 0 }], [{ x: 1, y: 1 }, { x: 0, y: 1 }, { x: 1, y: 2 }, { x: 1, y: 0 }, { x: 2, y: 0 }], [{ x: 1, y: 1 }, { x: 1, y: 0 }, { x: 2, y: 1 }, { x: 0, y: 1 }, { x: 0, y: 2 }], [{ x: 1, y: 1 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 2, y: 1 }, { x: 2, y: 2 }]], [[{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 }]], [[{ x: 1, y: 1 }, { x: 0, y: 1 }, { x: 2, y: 1 }, { x: 2, y: 0 }], [{ x: 1, y: 1 }, { x: 2, y: 1 }, { x: 0, y: 1 }, { x: 0, y: 0 }], [{ x: 1, y: 1 }, { x: 1, y: 2 }, { x: 1, y: 0 }, { x: 0, y: 0 }], [{ x: 0, y: 1 }, { x: 0, y: 2 }, { x: 0, y: 0 }, { x: 1, y: 0 }], [{ x: 1, y: 0 }, { x: 2, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 1 }], [{ x: 1, y: 0 }, { x: 0, y: 0 }, { x: 2, y: 0 }, { x: 2, y: 1 }], [{ x: 0, y: 1 }, { x: 0, y: 0 }, { x: 0, y: 2 }, { x: 1, y: 2 }], [{ x: 1, y: 1 }, { x: 1, y: 0 }, { x: 1, y: 2 }, { x: 0, y: 2 }]], [[{ x: 1, y: 1 }, { x: 0, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 0 }], [{ x: 1, y: 1 }, { x: 1, y: 2 }, { x: 1, y: 0 }, { x: 0, y: 1 }], [{ x: 0, y: 1 }, { x: 0, y: 2 }, { x: 0, y: 0 }, { x: 1, y: 1 }], [{ x: 1, y: 0 }, { x: 2, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 1 }]], [[{ x: 1, y: 1 }, { x: 0, y: 1 }, { x: 1, y: 0 }, { x: 2, y: 0 }], [{ x: 1, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 0 }, { x: 0, y: 0 }], [{ x: 1, y: 1 }, { x: 1, y: 2 }, { x: 0, y: 1 }, { x: 0, y: 0 }], [{ x: 0, y: 1 }, { x: 0, y: 2 }, { x: 1, y: 1 }, { x: 1, y: 0 }]], [[{ x: 0, y: 0 }]], [[{ x: 0, y: 0 }, { x: 0, y: 1 }], [{ x: 0, y: 0 }, { x: 1, y: 0 }]], [[{ x: 0, y: 1 }, { x: 0, y: 2 }, { x: 0, y: 0 }], [{ x: 1, y: 0 }, { x: 2, y: 0 }, { x: 0, y: 0 }]], [[{ x: 0, y: 1 }, { x: 0, y: 2 }, { x: 0, y: 0 }, { x: 0, y: 3 }], [{ x: 1, y: 0 }, { x: 2, y: 0 }, { x: 0, y: 0 }, { x: 3, y: 0 }]], [[{ x: 0, y: 2 }, { x: 0, y: 3 }, { x: 0, y: 4 }, { x: 0, y: 1 }, { x: 0, y: 0 }], [{ x: 2, y: 0 }, { x: 3, y: 0 }, { x: 4, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 0 }]]];

  // src/movegen/piece-orientations-bitboard.json
  var piece_orientations_bitboard_default = [[[1, 1, 1, 3], [2, 2, 2, 3], [8, 15], [1, 15], [3, 2, 2, 2], [3, 1, 1, 1], [15, 1], [15, 8]], [[2, 2, 3, 2], [1, 1, 3, 1], [15, 4], [15, 2], [1, 3, 1, 1], [2, 3, 2, 2], [2, 15], [4, 15]], [[1, 3, 2, 2], [2, 3, 1, 1], [14, 3], [7, 12], [1, 1, 3, 2], [2, 2, 3, 1], [12, 7], [3, 14]], [[3, 1], [3, 2], [1, 3], [2, 3]], [[3, 1, 3], [3, 2, 3], [5, 7], [7, 5]], [[7, 1, 1], [7, 4, 4], [1, 1, 7], [4, 4, 7]], [[6, 2, 3], [3, 2, 6], [1, 7, 4], [4, 7, 1]], [[2, 7, 2]], [[2, 2, 7], [4, 7, 4], [1, 7, 1], [7, 2, 2]], [[6, 3, 1], [3, 6, 4], [1, 3, 6], [4, 6, 3]], [[1, 3, 3], [2, 3, 3], [6, 7], [3, 7], [3, 3, 2], [3, 3, 1], [7, 3], [7, 6]], [[2, 3, 6], [2, 6, 3], [4, 7, 2], [1, 7, 2], [3, 6, 2], [6, 3, 2], [2, 7, 1], [2, 7, 4]], [[3, 3]], [[4, 7], [1, 7], [3, 2, 2], [3, 1, 1], [7, 1], [7, 4], [1, 1, 3], [2, 2, 3]], [[2, 7], [2, 3, 2], [1, 3, 1], [7, 2]], [[6, 3], [3, 6], [1, 3, 2], [2, 3, 1]], [[1]], [[1, 1], [3]], [[1, 1, 1], [7]], [[1, 1, 1, 1], [15]], [[1, 1, 1, 1, 1], [31]]];

  // src/movegen/piece-orientations-bitboard-halo.json
  var piece_orientations_bitboard_halo_default = [[[2, 7, 7, 7, 15, 6], [4, 14, 14, 14, 15, 6], [16, 62, 63, 30], [2, 31, 63, 30], [6, 15, 14, 14, 14, 4], [6, 15, 7, 7, 7, 2], [30, 63, 31, 2], [30, 63, 62, 16]], [[4, 14, 14, 15, 14, 4], [2, 7, 7, 15, 7, 2], [30, 63, 30, 8], [30, 63, 30, 4], [2, 7, 15, 7, 7, 2], [4, 14, 15, 14, 14, 4], [4, 30, 63, 30], [8, 30, 63, 30]], [[2, 7, 15, 14, 14, 4], [4, 14, 15, 7, 7, 2], [28, 62, 31, 6], [14, 31, 62, 24], [2, 7, 7, 15, 14, 4], [4, 14, 14, 15, 7, 2], [24, 62, 31, 14], [6, 31, 62, 28]], [[6, 15, 7, 2], [6, 15, 14, 4], [2, 7, 15, 6], [4, 14, 15, 6]], [[6, 15, 7, 15, 6], [6, 15, 14, 15, 6], [10, 31, 31, 14], [14, 31, 31, 10]], [[14, 31, 15, 7, 2], [14, 31, 30, 28, 8], [2, 7, 15, 31, 14], [8, 28, 30, 31, 14]], [[12, 30, 14, 15, 6], [6, 15, 14, 30, 12], [2, 15, 31, 30, 8], [8, 30, 31, 15, 2]], [[4, 14, 31, 14, 4]], [[4, 14, 14, 31, 14], [8, 30, 31, 30, 8], [2, 15, 31, 15, 2], [14, 31, 14, 14, 4]], [[12, 30, 15, 7, 2], [6, 15, 30, 28, 8], [2, 7, 15, 30, 12], [8, 28, 30, 15, 6]], [[2, 7, 15, 15, 6], [4, 14, 15, 15, 6], [12, 30, 31, 14], [6, 15, 31, 14], [6, 15, 15, 14, 4], [6, 15, 15, 7, 2], [14, 31, 15, 6], [14, 31, 30, 12]], [[4, 14, 15, 30, 12], [4, 14, 30, 15, 6], [8, 30, 31, 14, 4], [2, 15, 31, 14, 4], [6, 15, 30, 14, 4], [12, 30, 15, 14, 4], [4, 14, 31, 15, 2], [4, 14, 31, 30, 8]], [[6, 15, 15, 6]], [[8, 30, 31, 14], [2, 15, 31, 14], [6, 15, 14, 14, 4], [6, 15, 7, 7, 2], [14, 31, 15, 2], [14, 31, 30, 8], [2, 7, 7, 15, 6], [4, 14, 14, 15, 6]], [[4, 14, 31, 14], [4, 14, 15, 14, 4], [2, 7, 15, 7, 2], [14, 31, 14, 4]], [[12, 30, 15, 6], [6, 15, 30, 12], [2, 7, 15, 14, 4], [4, 14, 15, 7, 2]], [[2, 7, 2]], [[2, 7, 7, 2], [6, 15, 6]], [[2, 7, 7, 7, 2], [14, 31, 14]], [[2, 7, 7, 7, 7, 2], [30, 63, 30]], [[2, 7, 7, 7, 7, 7, 2], [62, 127, 62]]];

  // src/movegen/piece-rr.json
  var piece_rr_default = [[0, 1, 2, 3, 4, 5, 6, 7], [0, 1, 2, 3, 4, 5, 6, 7], [0, 1, 2, 3, 4, 5, 6, 7], [0, 1, 2, 3, 3, 2, 1, 0], [0, 1, 2, 2, 1, 0, 3, 3], [0, 1, 2, 3, 3, 2, 1, 0], [0, 1, 2, 3, 0, 1, 2, 3], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 1, 2, 3, 3, 2, 1], [0, 1, 2, 3, 3, 2, 1, 0], [0, 1, 2, 3, 4, 5, 6, 7], [0, 1, 2, 3, 4, 5, 6, 7], [0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 2, 3, 4, 5, 6, 7], [0, 0, 1, 2, 3, 3, 2, 1], [0, 1, 2, 3, 0, 1, 2, 3], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 1, 1, 0, 0, 1, 1], [0, 0, 1, 1, 0, 0, 1, 1], [0, 0, 1, 1, 0, 0, 1, 1], [0, 0, 1, 1, 0, 0, 1, 1]];

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
  var NULL_MOVE = 63488;
  var serializePlacedPiece = (placedPiece) => {
    return placedPiece.orientation | placedPiece.location.y << 3 | placedPiece.location.x << 7 | placedPiece.pieceType << 11 | placedPiece.player << 16;
  };
  var pieceData = pieces_default;
  var orientationData = piece_orientations_default;
  var orientationBitBoarddata = piece_orientations_bitboard_default;
  var orientationBitBoardHaloData = piece_orientations_bitboard_halo_default;
  var RRData = piece_rr_default;
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
  var generateFirstMove = (board) => {
    const startPos2 = board.startPositions[board.state.toMove];
    if (board.state.nullMoveCounter !== 0) {
      throw new Error("Null move counter is not 0 at the beginning of the game?");
    }
    const moves = [];
    for (let piece = 0; piece < 21; piece++) {
      for (let i = 0; i < orientationData[piece].length; i++) {
        const pieceTiles = orientationData[piece][i];
        for (const tile of pieceTiles) {
          const pieceMiddle = { x: startPos2.x - tile.x, y: startPos2.y - tile.y };
          let placedPiece = {
            location: pieceMiddle,
            player: board.state.toMove,
            pieceType: piece,
            orientation: i
          };
          if (board.state.startPosName === "middle-blokee" && !isMoveBlokeeLegal(placedPiece, pieceTiles)) {
            continue;
          }
          moves.push(serializePlacedPiece(placedPiece));
        }
      }
    }
    return moves.filter((p) => isMoveLegal(p, board));
  };
  var getAllLegalMoves = (board) => {
    if (board.gameOver()) {
      return [];
    }
    const myPlacedPieces = board.state.pieces.filter(
      (p) => getMovePlayer(p) === board.state.toMove
    );
    if (myPlacedPieces.length === 0) {
      return generateFirstMove(board);
    }
    let moves = [];
    if (board.state.toMove === 0) {
      moves = Array.from(board.state.playerACornerMoves.values()).flat();
    } else {
      moves = Array.from(board.state.playerBCornerMoves.values()).flat();
    }
    const uniqueMoves = Array.from(new Set(moves));
    if (uniqueMoves.length === 0) {
      uniqueMoves.push(NULL_MOVE);
    }
    return uniqueMoves;
  };

  // src/mcts/mcts-bot.ts
  var findMove = async (board, workers, lastMove) => {
    const move = await workers.findMove(getAllLegalMoves(board), board, lastMove);
    return move;
  };

  // src/renderer.ts
  var render = (canvas, ctx, boardState, previewPiece) => {
    canvas.width = 500;
    canvas.height = 500;
    drawBackground(ctx);
    startPos(ctx, boardState.startPositions[0]);
    startPos(ctx, boardState.startPositions[1]);
    for (const piece of boardState.state.pieces) {
      renderPiece(ctx, piece);
    }
    if (previewPiece !== void 0) {
      renderPiece(ctx, previewPiece, true);
    }
    drawGridLines(ctx);
  };
  var drawBackground = (ctx) => {
    ctx.fillStyle = "#ccc";
    ctx.fillRect(0, 0, 500, 500);
  };
  var drawGridLines = (ctx) => {
    for (let i = 0; i < 13; i++) {
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#fff";
      ctx.beginPath();
      ctx.moveTo(0, 500 / 14 * (i + 1));
      ctx.lineTo(500, 500 / 14 * (i + 1));
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(500 / 14 * (i + 1), 0);
      ctx.lineTo(500 / 14 * (i + 1), 500);
      ctx.stroke();
    }
  };
  var startPos = (ctx, c) => {
    const cellSize = 500 / 14;
    const cellTopLeftX = c.x * cellSize;
    const cellTopLeftY = c.y * cellSize;
    const cellMiddleX = cellTopLeftX + cellSize / 2;
    const cellMiddleY = cellTopLeftY + cellSize / 2;
    ctx.beginPath();
    ctx.arc(cellMiddleX, cellMiddleY, cellSize * 0.2, 0, Math.PI * 2);
    ctx.fillStyle = "#aaa";
    ctx.fill();
  };
  var renderPiece = (ctx, piece, preview) => {
    for (const tile of getOrientationData(getMovePieceType(piece), getMoveOrientation(piece))) {
      const tileCoordinate = {
        x: tile.x + getMoveLocation(piece).x,
        y: tile.y + getMoveLocation(piece).y
      };
      renderTile(ctx, tileCoordinate, getMovePlayer(piece), preview);
    }
  };
  var renderTile = (ctx, location, player, preview) => {
    const cellWidth = 500 / 14;
    const tileX = location.x * cellWidth;
    const tileY = location.y * cellWidth;
    if (preview) {
      ctx.fillStyle = ["rgba(30, 120, 0, 0.5)", "rgba(255, 0, 0, 0.5)"][player];
    } else {
      ctx.fillStyle = ["green", "red"][player];
    }
    ctx.beginPath();
    ctx.rect(tileX, tileY, cellWidth, cellWidth);
    ctx.fill();
  };

  // src/util.ts
  var getAppMode = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const appModeParam = urlParams.get("debug") || "ai";
    return appModeParam;
  };

  // src/interactiveCanvas.ts
  var InteractiveCanvas = class {
    constructor(board, workers, shouldPlaySound, userPlayer) {
      this.carouselCanvases = [];
      /** The current selected piece, will be shown on hover */
      this.selectedPiece = null;
      /** Current position of the mouse, update on mousemove */
      this.mousePosition = { x: 0, y: 0 };
      /** Current rotation of the piece */
      this.selectedPieceRotation = 0;
      /** Whether the piece is horizontally flipped or not */
      this.selectedPieceFlipped = false;
      /** The list of moves played this game, used to update the bot */
      this.playedMoves = [];
      const canvas = document.getElementById("canvas");
      const ctx = canvas.getContext("2d");
      this.userPlayer = userPlayer === "green" ? 0 : 1;
      this.canvas = canvas;
      this.ctx = ctx;
      this.board = board;
      this.workers = workers;
      this.carousel = document.getElementById("blocks-carousel");
      this.initCarousel();
      this.legalMoves = getAllLegalMoves(board);
      this.updateUI();
      this.canvas.addEventListener("mousemove", (e) => this.mouseMove(e));
      this.canvas.addEventListener("click", (e) => this.click(e));
      window.addEventListener("keydown", (e) => this.keyDown(e));
      window.requestAnimationFrame(() => this.drawLoop());
      if (shouldPlaySound) {
        this.moveAlertSound = new Audio("./audio/bell.mp3");
      }
      const skipButton = document.getElementById("skip-button");
      skipButton.addEventListener("click", () => {
        const skipMove = NULL_MOVE;
        if (!this.isMoveLegal(skipMove)) {
          console.error("Illegal skip move");
          return;
        }
        this.onUserCompleteTurn(skipMove);
      });
      this.onMoveReady();
    }
    /**
     * Called after a move has been played or at the beginning
     * The board state is assumed to have been update already
     */
    onMoveReady() {
      if (this.board.gameOver()) {
        return;
      }
      const botPlayer = otherPlayer(this.userPlayer);
      const toPlay = this.board.state.toMove;
      const appStatus = getAppMode();
      if (toPlay === botPlayer) {
        if (appStatus === "ai") {
          this.botMove();
        } else {
          const moves = getAllLegalMoves(this.board);
          const randomMove = moves[0];
          this.board.doMove(randomMove);
          this.playedMoves.push(randomMove);
          this.legalMoves = getAllLegalMoves(this.board);
          this.updateUI();
        }
      } else {
      }
    }
    /**
     * Sends the signal to the ai to play a move
     */
    botMove() {
      const lastMove = this.playedMoves.at(-1);
      findMove(this.board, this.workers, lastMove).then((move) => {
        if (this.moveAlertSound) {
          this.moveAlertSound.play();
        }
        if (move === void 0) {
          console.log("no bot move");
          this.board.skipTurn();
        } else {
          this.board.doMove(move);
          this.playedMoves.push(move);
        }
        this.legalMoves = getAllLegalMoves(this.board);
        this.updateUI();
      });
    }
    mouseMove(e) {
      const canvasWidth = this.canvas.getBoundingClientRect().width;
      const canvasHeight = this.canvas.getBoundingClientRect().height;
      const mouseBoardC = {
        x: Math.floor(14 * e.offsetX / canvasWidth),
        y: Math.floor(14 * e.offsetY / canvasHeight)
      };
      this.mousePosition = mouseBoardC;
    }
    click(e) {
      if (this.selectedPiece === null) {
        console.log("tried placing without selecting any piece");
        return;
      }
      const rotationReflection = 2 * this.selectedPieceRotation + (this.selectedPieceFlipped ? 1 : 0);
      const orientation = RRData[this.selectedPiece][rotationReflection];
      const move = serializePlacedPiece({
        location: this.mousePosition,
        pieceType: this.selectedPiece,
        player: this.userPlayer,
        orientation
      });
      if (!this.isMoveLegal(move)) {
        console.error("Illegal move");
        return;
      }
      this.onUserCompleteTurn(move);
    }
    keyDown(e) {
      if (e.key === "Escape") {
        this.selectedPiece = null;
      }
      if (e.key.toLowerCase() === "r") {
        if (e.shiftKey) {
          this.selectedPieceRotation += 3;
        } else {
          this.selectedPieceRotation += 1;
        }
        this.selectedPieceRotation %= 4;
      }
      if (e.key === "f") {
        this.selectedPieceFlipped = !this.selectedPieceFlipped;
      }
      if (e.key === "?") {
        const move = this.legalMoves[Math.floor(Math.random() * this.legalMoves.length)];
        this.onUserCompleteTurn(move);
      }
    }
    // Everything that needs to be done after the player chose a valid move:
    // Play it
    // Update UI
    // Alert bot
    onUserCompleteTurn(move) {
      if (this.board.state.toMove !== this.userPlayer) {
        throw new Error("calm down buddy, not your turn.");
      }
      this.board.doMove(move);
      this.playedMoves.push(move);
      this.selectedPiece = null;
      this.updateUI();
      this.onMoveReady();
    }
    initCarousel() {
      const pieceOrder = [
        20,
        0,
        1,
        2,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        19,
        11,
        12,
        13,
        14,
        15,
        18,
        3,
        17,
        16
      ];
      for (const pieceType of pieceOrder) {
        const piece = getOrientationData(pieceType, 0);
        const pieceCanvas = this.carouselPiecePreview(piece);
        this.carousel.append(pieceCanvas);
        this.carouselCanvases[pieceType] = pieceCanvas;
        pieceCanvas.addEventListener("click", () => {
          if (this.selectedPiece === pieceType) {
            this.selectedPiece = null;
          } else {
            this.selectedPiece = pieceType;
          }
        });
      }
    }
    updateCarouselVisibility() {
      const myPiecesRemaining = [
        this.board.state.playerARemaining,
        this.board.state.playerBRemaining
      ][this.userPlayer];
      for (const [pieceType, piece] of pieceData.entries()) {
        const visible = myPiecesRemaining & 1 << pieceType;
        this.carouselCanvases[pieceType].classList.toggle("hidden", !visible);
      }
    }
    carouselPiecePreview(piece) {
      const pieceCanvas = document.createElement("canvas");
      const pieceCtx = pieceCanvas.getContext("2d");
      const pieceBoundingBox = getBoundingBox(piece);
      pieceCanvas.width = pieceBoundingBox.width * 100;
      pieceCanvas.height = pieceBoundingBox.height * 100;
      pieceCanvas.style.height = `${pieceBoundingBox.height * 20}%`;
      for (const tile of piece) {
        const shiftedCoords = {
          x: tile.x - pieceBoundingBox.topLeft.x,
          y: tile.y - pieceBoundingBox.topLeft.y
        };
        const canvasCoords = {
          x: shiftedCoords.x * 100,
          y: shiftedCoords.y * 100
        };
        pieceCtx.beginPath();
        pieceCtx.rect(canvasCoords.x, canvasCoords.y, 100, 100);
        pieceCtx.fillStyle = this.userPlayer === 0 ? "green" : "red";
        pieceCtx.fill();
      }
      const numRows = pieceBoundingBox.height;
      const numCols = pieceBoundingBox.width;
      for (let i = 0; i < numRows; i++) {
        pieceCtx.lineWidth = 5;
        pieceCtx.strokeStyle = "#fff";
        pieceCtx.beginPath();
        pieceCtx.moveTo(0, pieceCanvas.height / numRows * (i + 1));
        pieceCtx.lineTo(pieceCanvas.width, pieceCanvas.height / numRows * (i + 1));
        pieceCtx.stroke();
      }
      for (let i = 0; i < numCols; i++) {
        pieceCtx.beginPath();
        pieceCtx.moveTo(pieceCanvas.width / numCols * (i + 1), 0);
        pieceCtx.lineTo(pieceCanvas.width / numCols * (i + 1), pieceCanvas.height);
        pieceCtx.stroke();
      }
      return pieceCanvas;
    }
    drawLoop() {
      let piecePreview;
      if (this.selectedPiece !== null) {
        const rotationReflection = 2 * this.selectedPieceRotation + (this.selectedPieceFlipped ? 1 : 0);
        const orientation = RRData[this.selectedPiece][rotationReflection];
        piecePreview = {
          location: this.mousePosition,
          pieceType: this.selectedPiece,
          player: this.userPlayer,
          orientation
        };
      }
      render(
        this.canvas,
        this.ctx,
        this.board,
        piecePreview ? serializePlacedPiece(piecePreview) : void 0
      );
      window.requestAnimationFrame(() => this.drawLoop());
    }
    score() {
      return this.board.score();
    }
    updateUI() {
      console.log("updating UI, player to move", this.board.state.toMove);
      this.updateScore();
      this.updateMessage();
      this.updateCarouselVisibility();
    }
    updateMessage() {
      const messageUser = document.getElementById("message-user");
      const messageCPU = document.getElementById("message-cpu");
      const messageSkip = document.getElementById("message-skip");
      const messageGame = document.getElementById("message-gameover");
      messageUser.style.display = "none";
      messageCPU.style.display = "none";
      messageSkip.style.display = "none";
      messageGame.style.display = "none";
      if (this.board.gameOver()) {
        messageGame.style.display = "block";
        return;
      }
      if (this.board.state.toMove !== this.userPlayer) {
        messageCPU.style.display = "block";
      } else {
        if (this.isMoveLegal(NULL_MOVE)) {
          messageSkip.style.display = "block";
        } else {
          messageUser.style.display = "block";
        }
      }
    }
    updateScore() {
      const userScore = document.querySelector("#user-score-container > .score");
      const botScore = document.querySelector("#bot-score-container > .score");
      const { playerA, playerB } = this.score();
      userScore.innerText = playerA.toString();
      botScore.innerText = playerB.toString();
      const canSkip = this.legalMoves.includes(NULL_MOVE);
      const skipButton = document.getElementById("skip-button");
      skipButton.disabled = !canSkip;
      if (this.board.gameOver()) {
        const winner = this.board.winner();
        if (winner === "draw") {
          alert("Game is a draw");
        } else {
          const winnerName = winner === 0 ? "Green" : "Red";
          alert(`Player ${winnerName} wins!`);
        }
      }
    }
    isMoveLegal(move) {
      return this.legalMoves.includes(move);
    }
  };

  // src/workerManager.ts
  var WorkerManager = class {
    constructor(options) {
      this.workers = [];
      this.difficulty = options.difficulty;
      this.numWorkers = options.numThreads;
      for (let i = 0; i < this.numWorkers; i++) {
        this.workers.push(new Worker("./dist/worker.js"));
      }
    }
    // simplified version of findMove that just uses one worker
    async findMove(moves, board, lastMove) {
      const request = this.workerRequest(this.workers[0], board, moves, lastMove);
      const response = await request;
      return response?.move;
    }
    /*
        async findMove(moves: Move[], board: Board, lastMove: Move): Promise<WorkerResponse> {
            const workerTasks: Move[][] = [];
    
            for (let i = 0; i < this.numWorkers; i++) {
                workerTasks.push([]);
            }
    
            for (let i = 0; i < moves.length; i++) {
                workerTasks[i % this.numWorkers].push(moves[i]);
            }
    
            const requests: Promise<WorkerResponse>[] = [];
    
            for (let i = 0; i < this.numWorkers; i++) {
                requests.push(this.workerRequest(this.workers[i], board, workerTasks[i], lastMove));
            }
    
            console.log(requests);
            const responses = await Promise.all(requests);
    
            let bestResponse: WorkerResponse = null;
    
            for (const response of responses) {
                if (response === null) {
                    continue;
                }
    
                if (bestResponse === null) {
                    bestResponse = response;
                }
    
                if (response.score > bestResponse.score) {
                    bestResponse = response;
                }
            }
    
            return bestResponse;
        }
        */
    init(board) {
      for (const worker of this.workers) {
        this.workerInit(worker, board);
      }
    }
    workerInit(worker, board) {
      const initMessage = {
        type: "init",
        startPos: board.state.startPosName,
        difficulty: this.difficulty
      };
      worker.postMessage(initMessage);
    }
    workerRequest(worker, board, task, lastMove) {
      const responsePromise = new Promise((resolve) => {
        worker.onmessage = (message2) => {
          resolve(message2.data);
          worker.onmessage = null;
        };
      });
      const message = {
        type: "move",
        lastMove,
        searchMoves: task,
        startPos: board.state.startPosName
      };
      worker.postMessage(message);
      return responsePromise;
    }
  };

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

  // src/wsManager.ts
  var WSManager = class {
    constructor() {
      this.ws = new WebSocket("ws://127.0.0.1:8080");
      this.intialized = new Promise((resolve) => {
        this.ws.onopen = () => {
          console.log("ws opened");
          resolve();
        };
      });
      this.ws.onclose = () => {
        console.log("ws closed");
      };
      this.ws.onerror = (event) => {
        console.log("Error: ", event);
      };
    }
    async init() {
      await this.intialized;
      this.ws.send(
        JSON.stringify({
          type: "init"
        })
      );
    }
    async findMove(moves, board, lastMove) {
      await this.intialized;
      const start = Date.now();
      const responsePromise = new Promise((resolve) => {
        this.ws.onmessage = (event) => {
          console.log("ws message", event.data);
          const data = JSON.parse(event.data);
          if (data.type === "move") {
            this.ws.onmessage = null;
            const end = Date.now();
            console.log(`findMove took ${end - start}ms`);
            resolve(data.move);
          }
        };
      });
      this.ws.send(
        JSON.stringify({
          type: "findMove",
          move: lastMove
        })
      );
      return responsePromise;
    }
  };

  // src/script.ts
  var main = () => {
    const popupContainer = document.getElementById("popup-bg");
    const startPos2 = document.getElementById("start-pos");
    const player = document.getElementById("play-as");
    const difficulty = document.getElementById("difficulty");
    const threads = document.getElementById("threads");
    const sound = document.getElementById("sound");
    const local = document.getElementById("local");
    const submitButton = document.getElementById("play");
    const browserNumThreads = navigator.hardwareConcurrency || 1;
    for (let i = 1; i <= browserNumThreads; i++) {
      const optionElement = document.createElement("option");
      optionElement.value = `${i}`;
      optionElement.innerText = `${i}`;
      if (i === 1) {
        optionElement.selected = true;
      }
      threads.append(optionElement);
    }
    submitButton.addEventListener("click", () => {
      popupContainer.style.display = "none";
      window.addEventListener("beforeunload", (e) => {
        e.preventDefault();
        return false;
      });
      const userNumThreads = parseInt(threads.value);
      const startPosition = startPos2.value;
      const shouldPlaySound = sound.checked;
      const boardState = new Board(startPosition);
      let controller;
      if (local.checked) {
        controller = new WSManager();
      } else {
        controller = new WorkerManager({
          numThreads: userNumThreads,
          difficulty: difficulty.value
        });
      }
      controller.init(boardState);
      const interactiveCanvas = new InteractiveCanvas(
        boardState,
        controller,
        shouldPlaySound,
        player.value
      );
      const urlParams = new URLSearchParams(window.location.search);
      const debugMode = urlParams.get("debug") === "true";
      if (getAppMode() !== "perf") {
        return;
      }
      const statistics = { a: 0, b: 0, tie: 0 };
      const moveamounts = [];
      const startTime = performance.now();
      for (let i = 0; i < 1e3; i++) {
        while (!boardState.gameOver()) {
          const legalMoves = getAllLegalMoves(boardState);
          if (legalMoves.length === 0) {
            break;
          }
          moveamounts.push(legalMoves.length);
          const randomMove = legalMoves[Math.floor(Math.random() * legalMoves.length)];
          boardState.doMove(randomMove);
        }
        const score = boardState.score();
        if (score.playerA > score.playerB) {
          statistics.a++;
        } else if (score.playerA < score.playerB) {
          statistics.b++;
        } else {
          statistics.tie++;
        }
        boardState.reset();
      }
      const endTime = performance.now();
      console.log(`Time taken: ${endTime - startTime} milliseconds`);
      console.log(statistics);
      console.log(
        "Average move amount",
        moveamounts.reduce((a, b) => a + b, 0) / moveamounts.length
      );
    });
  };
  main();
})();
