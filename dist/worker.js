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

  // src/movegen/piece-corners.json
  var piece_corners_default = [[[{ x: 0, y: 3 }, { x: 1, y: 3 }, { x: 0, y: 0 }], [{ x: 1, y: 3 }, { x: 0, y: 3 }, { x: 1, y: 0 }], [{ x: 3, y: 1 }, { x: 3, y: 0 }, { x: 0, y: 1 }], [{ x: 0, y: 1 }, { x: 0, y: 0 }, { x: 3, y: 1 }], [{ x: 1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 3 }], [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 3 }], [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 3, y: 0 }], [{ x: 3, y: 0 }, { x: 3, y: 1 }, { x: 0, y: 0 }]], [[{ x: 1, y: 3 }, { x: 0, y: 2 }, { x: 1, y: 0 }], [{ x: 0, y: 3 }, { x: 1, y: 2 }, { x: 0, y: 0 }], [{ x: 3, y: 0 }, { x: 2, y: 1 }, { x: 0, y: 0 }], [{ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 3, y: 0 }], [{ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 3 }], [{ x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 3 }], [{ x: 0, y: 1 }, { x: 1, y: 0 }, { x: 3, y: 1 }], [{ x: 3, y: 1 }, { x: 2, y: 0 }, { x: 0, y: 1 }]], [[{ x: 1, y: 1 }, { x: 1, y: 3 }, { x: 0, y: 1 }, { x: 0, y: 0 }], [{ x: 0, y: 1 }, { x: 0, y: 3 }, { x: 1, y: 1 }, { x: 1, y: 0 }], [{ x: 1, y: 0 }, { x: 3, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 }], [{ x: 2, y: 0 }, { x: 0, y: 0 }, { x: 2, y: 1 }, { x: 3, y: 1 }], [{ x: 0, y: 2 }, { x: 0, y: 0 }, { x: 1, y: 2 }, { x: 1, y: 3 }], [{ x: 1, y: 2 }, { x: 1, y: 0 }, { x: 0, y: 2 }, { x: 0, y: 3 }], [{ x: 2, y: 1 }, { x: 0, y: 1 }, { x: 2, y: 0 }, { x: 3, y: 0 }], [{ x: 1, y: 1 }, { x: 3, y: 1 }, { x: 1, y: 0 }, { x: 0, y: 0 }]], [[{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 0 }], [{ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 0 }], [{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 0, y: 0 }], [{ x: 1, y: 1 }, { x: 0, y: 1 }, { x: 1, y: 0 }]], [[{ x: 0, y: 2 }, { x: 1, y: 2 }, { x: 0, y: 0 }, { x: 1, y: 0 }], [{ x: 1, y: 2 }, { x: 0, y: 2 }, { x: 1, y: 0 }, { x: 0, y: 0 }], [{ x: 2, y: 1 }, { x: 2, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 0 }], [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 2, y: 0 }, { x: 2, y: 1 }]], [[{ x: 0, y: 0 }, { x: 0, y: 2 }, { x: 2, y: 0 }], [{ x: 2, y: 0 }, { x: 2, y: 2 }, { x: 0, y: 0 }], [{ x: 0, y: 2 }, { x: 2, y: 2 }, { x: 0, y: 0 }], [{ x: 2, y: 2 }, { x: 0, y: 2 }, { x: 2, y: 0 }]], [[{ x: 1, y: 2 }, { x: 0, y: 2 }, { x: 1, y: 0 }, { x: 2, y: 0 }], [{ x: 1, y: 2 }, { x: 2, y: 2 }, { x: 1, y: 0 }, { x: 0, y: 0 }], [{ x: 2, y: 1 }, { x: 2, y: 2 }, { x: 0, y: 1 }, { x: 0, y: 0 }], [{ x: 0, y: 1 }, { x: 0, y: 2 }, { x: 2, y: 1 }, { x: 2, y: 0 }]], [[{ x: 1, y: 2 }, { x: 2, y: 1 }, { x: 1, y: 0 }, { x: 0, y: 1 }]], [[{ x: 0, y: 2 }, { x: 2, y: 2 }, { x: 1, y: 0 }], [{ x: 2, y: 2 }, { x: 2, y: 0 }, { x: 0, y: 1 }], [{ x: 0, y: 2 }, { x: 0, y: 0 }, { x: 2, y: 1 }], [{ x: 2, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 2 }]], [[{ x: 1, y: 1 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 1, y: 0 }, { x: 2, y: 0 }], [{ x: 1, y: 1 }, { x: 2, y: 1 }, { x: 2, y: 2 }, { x: 1, y: 0 }, { x: 0, y: 0 }], [{ x: 1, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 0, y: 1 }, { x: 0, y: 0 }], [{ x: 1, y: 1 }, { x: 1, y: 2 }, { x: 0, y: 2 }, { x: 2, y: 1 }, { x: 2, y: 0 }]], [[{ x: 0, y: 2 }, { x: 1, y: 2 }, { x: 1, y: 1 }, { x: 0, y: 0 }], [{ x: 1, y: 2 }, { x: 0, y: 2 }, { x: 0, y: 1 }, { x: 1, y: 0 }], [{ x: 2, y: 1 }, { x: 2, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }], [{ x: 0, y: 1 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 1 }], [{ x: 1, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 2 }], [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 2 }], [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 0 }], [{ x: 2, y: 0 }, { x: 2, y: 1 }, { x: 1, y: 1 }, { x: 0, y: 0 }]], [[{ x: 0, y: 1 }, { x: 1, y: 0 }, { x: 1, y: 2 }, { x: 2, y: 2 }], [{ x: 2, y: 1 }, { x: 1, y: 0 }, { x: 1, y: 2 }, { x: 0, y: 2 }], [{ x: 1, y: 2 }, { x: 0, y: 1 }, { x: 2, y: 1 }, { x: 2, y: 0 }], [{ x: 1, y: 2 }, { x: 2, y: 1 }, { x: 0, y: 1 }, { x: 0, y: 0 }], [{ x: 2, y: 1 }, { x: 1, y: 2 }, { x: 1, y: 0 }, { x: 0, y: 0 }], [{ x: 0, y: 1 }, { x: 1, y: 2 }, { x: 1, y: 0 }, { x: 2, y: 0 }], [{ x: 1, y: 0 }, { x: 2, y: 1 }, { x: 0, y: 1 }, { x: 0, y: 2 }], [{ x: 1, y: 0 }, { x: 0, y: 1 }, { x: 2, y: 1 }, { x: 2, y: 2 }]], [[{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 }]], [[{ x: 0, y: 1 }, { x: 2, y: 1 }, { x: 2, y: 0 }], [{ x: 2, y: 1 }, { x: 0, y: 1 }, { x: 0, y: 0 }], [{ x: 1, y: 2 }, { x: 1, y: 0 }, { x: 0, y: 0 }], [{ x: 0, y: 2 }, { x: 0, y: 0 }, { x: 1, y: 0 }], [{ x: 2, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 1 }], [{ x: 0, y: 0 }, { x: 2, y: 0 }, { x: 2, y: 1 }], [{ x: 0, y: 0 }, { x: 0, y: 2 }, { x: 1, y: 2 }], [{ x: 1, y: 0 }, { x: 1, y: 2 }, { x: 0, y: 2 }]], [[{ x: 0, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 0 }], [{ x: 1, y: 2 }, { x: 1, y: 0 }, { x: 0, y: 1 }], [{ x: 0, y: 2 }, { x: 0, y: 0 }, { x: 1, y: 1 }], [{ x: 2, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 1 }]], [[{ x: 1, y: 1 }, { x: 0, y: 1 }, { x: 1, y: 0 }, { x: 2, y: 0 }], [{ x: 1, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 0 }, { x: 0, y: 0 }], [{ x: 1, y: 1 }, { x: 1, y: 2 }, { x: 0, y: 1 }, { x: 0, y: 0 }], [{ x: 0, y: 1 }, { x: 0, y: 2 }, { x: 1, y: 1 }, { x: 1, y: 0 }]], [[{ x: 0, y: 0 }]], [[{ x: 0, y: 0 }, { x: 0, y: 1 }], [{ x: 0, y: 0 }, { x: 1, y: 0 }]], [[{ x: 0, y: 2 }, { x: 0, y: 0 }], [{ x: 2, y: 0 }, { x: 0, y: 0 }]], [[{ x: 0, y: 0 }, { x: 0, y: 3 }], [{ x: 0, y: 0 }, { x: 3, y: 0 }]], [[{ x: 0, y: 4 }, { x: 0, y: 0 }], [{ x: 4, y: 0 }, { x: 0, y: 0 }]]];

  // src/movegen/piece-short-bounding-box.json
  var piece_short_bounding_box_default = [[[1, 3], [1, 3], [3, 1], [3, 1], [1, 3], [1, 3], [3, 1], [3, 1]], [[1, 3], [1, 3], [3, 1], [3, 1], [1, 3], [1, 3], [3, 1], [3, 1]], [[1, 3], [1, 3], [3, 1], [3, 1], [1, 3], [1, 3], [3, 1], [3, 1]], [[1, 1], [1, 1], [1, 1], [1, 1]], [[1, 2], [1, 2], [2, 1], [2, 1]], [[2, 2], [2, 2], [2, 2], [2, 2]], [[2, 2], [2, 2], [2, 2], [2, 2]], [[2, 2]], [[2, 2], [2, 2], [2, 2], [2, 2]], [[2, 2], [2, 2], [2, 2], [2, 2]], [[1, 2], [1, 2], [2, 1], [2, 1], [1, 2], [1, 2], [2, 1], [2, 1]], [[2, 2], [2, 2], [2, 2], [2, 2], [2, 2], [2, 2], [2, 2], [2, 2]], [[1, 1]], [[2, 1], [2, 1], [1, 2], [1, 2], [2, 1], [2, 1], [1, 2], [1, 2]], [[2, 1], [1, 2], [1, 2], [2, 1]], [[2, 1], [2, 1], [1, 2], [1, 2]], [[0, 0]], [[0, 1], [1, 0]], [[0, 2], [2, 0]], [[0, 3], [3, 0]], [[0, 4], [4, 0]]];

  // src/movegen/piece-corner-attachers.json
  var piece_corner_attachers_default = [[[{ x: -1, y: 4 }, { x: 2, y: 4 }, { x: 2, y: 2 }, { x: 1, y: -1 }, { x: -1, y: -1 }], [{ x: 2, y: 4 }, { x: -1, y: 2 }, { x: -1, y: 4 }, { x: 2, y: -1 }, { x: 0, y: -1 }], [{ x: 4, y: 2 }, { x: 4, y: -1 }, { x: 2, y: -1 }, { x: -1, y: 0 }, { x: -1, y: 2 }], [{ x: -1, y: 2 }, { x: 1, y: -1 }, { x: -1, y: -1 }, { x: 4, y: 2 }, { x: 4, y: 0 }], [{ x: 2, y: -1 }, { x: -1, y: -1 }, { x: -1, y: 1 }, { x: 2, y: 4 }, { x: 0, y: 4 }], [{ x: -1, y: -1 }, { x: 2, y: 1 }, { x: 2, y: -1 }, { x: 1, y: 4 }, { x: -1, y: 4 }], [{ x: -1, y: -1 }, { x: 1, y: 2 }, { x: -1, y: 2 }, { x: 4, y: 1 }, { x: 4, y: -1 }], [{ x: 4, y: -1 }, { x: 4, y: 2 }, { x: 2, y: 2 }, { x: -1, y: -1 }, { x: -1, y: 1 }]], [[{ x: 2, y: 4 }, { x: 0, y: 4 }, { x: -1, y: 1 }, { x: -1, y: 3 }, { x: 2, y: -1 }, { x: 0, y: -1 }], [{ x: 1, y: 4 }, { x: -1, y: 4 }, { x: 2, y: 3 }, { x: 2, y: 1 }, { x: 1, y: -1 }, { x: -1, y: -1 }], [{ x: 4, y: 1 }, { x: 4, y: -1 }, { x: 3, y: 2 }, { x: 1, y: 2 }, { x: -1, y: -1 }, { x: -1, y: 1 }], [{ x: -1, y: -1 }, { x: -1, y: 1 }, { x: 2, y: 2 }, { x: 0, y: 2 }, { x: 4, y: 1 }, { x: 4, y: -1 }], [{ x: 1, y: -1 }, { x: -1, y: -1 }, { x: 2, y: 2 }, { x: 2, y: 0 }, { x: 1, y: 4 }, { x: -1, y: 4 }], [{ x: 2, y: -1 }, { x: 0, y: -1 }, { x: -1, y: 0 }, { x: -1, y: 2 }, { x: 2, y: 4 }, { x: 0, y: 4 }], [{ x: -1, y: 0 }, { x: -1, y: 2 }, { x: 2, y: -1 }, { x: 0, y: -1 }, { x: 4, y: 2 }, { x: 4, y: 0 }], [{ x: 4, y: 2 }, { x: 4, y: 0 }, { x: 3, y: -1 }, { x: 1, y: -1 }, { x: -1, y: 0 }, { x: -1, y: 2 }]], [[{ x: 2, y: 0 }, { x: 2, y: 4 }, { x: 0, y: 4 }, { x: -1, y: 2 }, { x: 1, y: -1 }, { x: -1, y: -1 }], [{ x: -1, y: 0 }, { x: 1, y: 4 }, { x: -1, y: 4 }, { x: 2, y: 2 }, { x: 2, y: -1 }, { x: 0, y: -1 }], [{ x: 0, y: -1 }, { x: 4, y: 1 }, { x: 4, y: -1 }, { x: 2, y: 2 }, { x: -1, y: 0 }, { x: -1, y: 2 }], [{ x: 3, y: -1 }, { x: -1, y: -1 }, { x: -1, y: 1 }, { x: 1, y: 2 }, { x: 4, y: 2 }, { x: 4, y: 0 }], [{ x: -1, y: 3 }, { x: 1, y: -1 }, { x: -1, y: -1 }, { x: 2, y: 1 }, { x: 2, y: 4 }, { x: 0, y: 4 }], [{ x: 2, y: 3 }, { x: 2, y: -1 }, { x: 0, y: -1 }, { x: -1, y: 1 }, { x: 1, y: 4 }, { x: -1, y: 4 }], [{ x: 3, y: 2 }, { x: -1, y: 0 }, { x: -1, y: 2 }, { x: 1, y: -1 }, { x: 4, y: 1 }, { x: 4, y: -1 }], [{ x: 0, y: 2 }, { x: 4, y: 2 }, { x: 4, y: 0 }, { x: 2, y: -1 }, { x: -1, y: -1 }, { x: -1, y: 1 }]], [[{ x: -1, y: -1 }, { x: 1, y: 2 }, { x: -1, y: 2 }, { x: 2, y: 1 }, { x: 2, y: -1 }], [{ x: 2, y: -1 }, { x: 2, y: 2 }, { x: 0, y: 2 }, { x: -1, y: -1 }, { x: -1, y: 1 }], [{ x: -1, y: 2 }, { x: 2, y: 2 }, { x: 2, y: 0 }, { x: 1, y: -1 }, { x: -1, y: -1 }], [{ x: 2, y: 2 }, { x: -1, y: 0 }, { x: -1, y: 2 }, { x: 2, y: -1 }, { x: 0, y: -1 }]], [[{ x: -1, y: 3 }, { x: 2, y: 3 }, { x: 2, y: 1 }, { x: -1, y: -1 }, { x: 2, y: -1 }], [{ x: 2, y: 3 }, { x: -1, y: 1 }, { x: -1, y: 3 }, { x: 2, y: -1 }, { x: -1, y: -1 }], [{ x: 3, y: 2 }, { x: 3, y: -1 }, { x: 1, y: -1 }, { x: -1, y: 2 }, { x: -1, y: -1 }], [{ x: -1, y: -1 }, { x: 1, y: 2 }, { x: -1, y: 2 }, { x: 3, y: -1 }, { x: 3, y: 2 }]], [[{ x: -1, y: -1 }, { x: 1, y: 3 }, { x: -1, y: 3 }, { x: 3, y: 1 }, { x: 3, y: -1 }], [{ x: 3, y: -1 }, { x: 3, y: 3 }, { x: 1, y: 3 }, { x: -1, y: -1 }, { x: -1, y: 1 }], [{ x: -1, y: 3 }, { x: 3, y: 3 }, { x: 3, y: 1 }, { x: 1, y: -1 }, { x: -1, y: -1 }], [{ x: 3, y: 3 }, { x: -1, y: 1 }, { x: -1, y: 3 }, { x: 3, y: -1 }, { x: 1, y: -1 }]], [[{ x: 2, y: 3 }, { x: -1, y: 1 }, { x: -1, y: 3 }, { x: 0, y: -1 }, { x: 3, y: 1 }, { x: 3, y: -1 }], [{ x: 0, y: 3 }, { x: 3, y: 3 }, { x: 3, y: 1 }, { x: 2, y: -1 }, { x: -1, y: -1 }, { x: -1, y: 1 }], [{ x: 3, y: 0 }, { x: 3, y: 3 }, { x: 1, y: 3 }, { x: -1, y: 2 }, { x: 1, y: -1 }, { x: -1, y: -1 }], [{ x: -1, y: 0 }, { x: 1, y: 3 }, { x: -1, y: 3 }, { x: 3, y: 2 }, { x: 3, y: -1 }, { x: 1, y: -1 }]], [[{ x: 2, y: 3 }, { x: 0, y: 3 }, { x: 3, y: 2 }, { x: 3, y: 0 }, { x: 2, y: -1 }, { x: 0, y: -1 }, { x: -1, y: 0 }, { x: -1, y: 2 }]], [[{ x: -1, y: 1 }, { x: -1, y: 3 }, { x: 3, y: 3 }, { x: 3, y: 1 }, { x: 2, y: -1 }, { x: 0, y: -1 }], [{ x: 3, y: 3 }, { x: 1, y: 3 }, { x: 3, y: -1 }, { x: 1, y: -1 }, { x: -1, y: 0 }, { x: -1, y: 2 }], [{ x: 1, y: 3 }, { x: -1, y: 3 }, { x: 1, y: -1 }, { x: -1, y: -1 }, { x: 3, y: 2 }, { x: 3, y: 0 }], [{ x: 3, y: 1 }, { x: 3, y: -1 }, { x: -1, y: -1 }, { x: -1, y: 1 }, { x: 2, y: 3 }, { x: 0, y: 3 }]], [[{ x: 2, y: 2 }, { x: -1, y: 0 }, { x: 1, y: 3 }, { x: -1, y: 3 }, { x: 0, y: -1 }, { x: 3, y: 1 }, { x: 3, y: -1 }], [{ x: 0, y: 2 }, { x: 3, y: 0 }, { x: 3, y: 3 }, { x: 1, y: 3 }, { x: 2, y: -1 }, { x: -1, y: -1 }, { x: -1, y: 1 }], [{ x: 2, y: 0 }, { x: 0, y: 3 }, { x: 3, y: 3 }, { x: 3, y: 1 }, { x: -1, y: 2 }, { x: 1, y: -1 }, { x: -1, y: -1 }], [{ x: 0, y: 0 }, { x: 2, y: 3 }, { x: -1, y: 1 }, { x: -1, y: 3 }, { x: 3, y: 2 }, { x: 3, y: -1 }, { x: 1, y: -1 }]], [[{ x: -1, y: 3 }, { x: 2, y: 3 }, { x: 2, y: 0 }, { x: 1, y: -1 }, { x: -1, y: -1 }], [{ x: 2, y: 3 }, { x: -1, y: 3 }, { x: -1, y: 0 }, { x: 2, y: -1 }, { x: 0, y: -1 }], [{ x: 3, y: 2 }, { x: 3, y: -1 }, { x: 0, y: -1 }, { x: -1, y: 0 }, { x: -1, y: 2 }], [{ x: -1, y: 2 }, { x: -1, y: -1 }, { x: 2, y: -1 }, { x: 3, y: 2 }, { x: 3, y: 0 }], [{ x: 2, y: -1 }, { x: -1, y: -1 }, { x: -1, y: 2 }, { x: 2, y: 3 }, { x: 0, y: 3 }], [{ x: -1, y: -1 }, { x: 2, y: -1 }, { x: 2, y: 2 }, { x: 1, y: 3 }, { x: -1, y: 3 }], [{ x: -1, y: -1 }, { x: -1, y: 2 }, { x: 2, y: 2 }, { x: 3, y: 1 }, { x: 3, y: -1 }], [{ x: 3, y: -1 }, { x: 3, y: 2 }, { x: 0, y: 2 }, { x: -1, y: -1 }, { x: -1, y: 1 }]], [[{ x: -1, y: 0 }, { x: -1, y: 2 }, { x: 2, y: -1 }, { x: 0, y: -1 }, { x: 0, y: 3 }, { x: 3, y: 3 }, { x: 3, y: 1 }], [{ x: 3, y: 2 }, { x: 3, y: 0 }, { x: 2, y: -1 }, { x: 0, y: -1 }, { x: 2, y: 3 }, { x: -1, y: 1 }, { x: -1, y: 3 }], [{ x: 2, y: 3 }, { x: 0, y: 3 }, { x: -1, y: 0 }, { x: -1, y: 2 }, { x: 3, y: 2 }, { x: 3, y: -1 }, { x: 1, y: -1 }], [{ x: 2, y: 3 }, { x: 0, y: 3 }, { x: 3, y: 2 }, { x: 3, y: 0 }, { x: -1, y: 2 }, { x: 1, y: -1 }, { x: -1, y: -1 }], [{ x: 3, y: 2 }, { x: 3, y: 0 }, { x: 2, y: 3 }, { x: 0, y: 3 }, { x: 2, y: -1 }, { x: -1, y: -1 }, { x: -1, y: 1 }], [{ x: -1, y: 0 }, { x: -1, y: 2 }, { x: 2, y: 3 }, { x: 0, y: 3 }, { x: 0, y: -1 }, { x: 3, y: 1 }, { x: 3, y: -1 }], [{ x: 2, y: -1 }, { x: 0, y: -1 }, { x: 3, y: 2 }, { x: 3, y: 0 }, { x: -1, y: 0 }, { x: 1, y: 3 }, { x: -1, y: 3 }], [{ x: 2, y: -1 }, { x: 0, y: -1 }, { x: -1, y: 0 }, { x: -1, y: 2 }, { x: 3, y: 0 }, { x: 3, y: 3 }, { x: 1, y: 3 }]], [[{ x: -1, y: -1 }, { x: 2, y: -1 }, { x: 2, y: 2 }, { x: -1, y: 2 }]], [[{ x: -1, y: 0 }, { x: -1, y: 2 }, { x: 3, y: 2 }, { x: 3, y: -1 }, { x: 1, y: -1 }], [{ x: 3, y: 2 }, { x: 3, y: 0 }, { x: -1, y: 2 }, { x: 1, y: -1 }, { x: -1, y: -1 }], [{ x: 2, y: 3 }, { x: 0, y: 3 }, { x: 2, y: -1 }, { x: -1, y: -1 }, { x: -1, y: 1 }], [{ x: 1, y: 3 }, { x: -1, y: 3 }, { x: -1, y: -1 }, { x: 2, y: 1 }, { x: 2, y: -1 }], [{ x: 3, y: 1 }, { x: 3, y: -1 }, { x: -1, y: -1 }, { x: 1, y: 2 }, { x: -1, y: 2 }], [{ x: -1, y: -1 }, { x: -1, y: 1 }, { x: 3, y: -1 }, { x: 3, y: 2 }, { x: 1, y: 2 }], [{ x: 1, y: -1 }, { x: -1, y: -1 }, { x: -1, y: 3 }, { x: 2, y: 3 }, { x: 2, y: 1 }], [{ x: 2, y: -1 }, { x: 0, y: -1 }, { x: 2, y: 3 }, { x: -1, y: 1 }, { x: -1, y: 3 }]], [[{ x: -1, y: 0 }, { x: -1, y: 2 }, { x: 3, y: 2 }, { x: 3, y: 0 }, { x: 2, y: -1 }, { x: 0, y: -1 }], [{ x: 2, y: 3 }, { x: 0, y: 3 }, { x: 2, y: -1 }, { x: 0, y: -1 }, { x: -1, y: 0 }, { x: -1, y: 2 }], [{ x: 1, y: 3 }, { x: -1, y: 3 }, { x: 1, y: -1 }, { x: -1, y: -1 }, { x: 2, y: 2 }, { x: 2, y: 0 }], [{ x: 3, y: 1 }, { x: 3, y: -1 }, { x: -1, y: -1 }, { x: -1, y: 1 }, { x: 2, y: 2 }, { x: 0, y: 2 }]], [[{ x: 2, y: 2 }, { x: -1, y: 0 }, { x: -1, y: 2 }, { x: 0, y: -1 }, { x: 3, y: 1 }, { x: 3, y: -1 }], [{ x: 0, y: 2 }, { x: 3, y: 2 }, { x: 3, y: 0 }, { x: 2, y: -1 }, { x: -1, y: -1 }, { x: -1, y: 1 }], [{ x: 2, y: 0 }, { x: 2, y: 3 }, { x: 0, y: 3 }, { x: -1, y: 2 }, { x: 1, y: -1 }, { x: -1, y: -1 }], [{ x: -1, y: 0 }, { x: 1, y: 3 }, { x: -1, y: 3 }, { x: 2, y: 2 }, { x: 2, y: -1 }, { x: 0, y: -1 }]], [[{ x: 1, y: 1 }, { x: 1, y: -1 }, { x: -1, y: -1 }, { x: -1, y: 1 }]], [[{ x: 1, y: -1 }, { x: -1, y: -1 }, { x: 1, y: 2 }, { x: -1, y: 2 }], [{ x: -1, y: -1 }, { x: -1, y: 1 }, { x: 2, y: 1 }, { x: 2, y: -1 }]], [[{ x: 1, y: 3 }, { x: -1, y: 3 }, { x: 1, y: -1 }, { x: -1, y: -1 }], [{ x: 3, y: 1 }, { x: 3, y: -1 }, { x: -1, y: -1 }, { x: -1, y: 1 }]], [[{ x: 1, y: -1 }, { x: -1, y: -1 }, { x: 1, y: 4 }, { x: -1, y: 4 }], [{ x: -1, y: -1 }, { x: -1, y: 1 }, { x: 4, y: 1 }, { x: 4, y: -1 }]], [[{ x: 1, y: 5 }, { x: -1, y: 5 }, { x: 1, y: -1 }, { x: -1, y: -1 }], [{ x: 5, y: 1 }, { x: 5, y: -1 }, { x: -1, y: -1 }, { x: -1, y: 1 }]]];

  // src/movegen/movegen.ts
  var MOVE_ORIENTATION_MASK = 7;
  var MOVE_Y_MASK = 120;
  var MOVE_X_MASK = 1920;
  var MOVE_TYPE_MASK = 63488;
  var MOVE_PLAYER_BIT = 65536;
  var getMoveOrientation = (packedMove) => {
    return packedMove & MOVE_ORIENTATION_MASK;
  };
  var getMoveX = (packedMove) => {
    return (packedMove & MOVE_X_MASK) >> 7;
  };
  var getMoveY = (packedMove) => {
    return (packedMove & MOVE_Y_MASK) >> 3;
  };
  var getMovePieceType = (packedMove) => {
    return (packedMove & MOVE_TYPE_MASK) >> 11;
  };
  var getMovePlayer = (packedMove) => {
    return (packedMove & MOVE_PLAYER_BIT) >> 16;
  };
  var NULL_MOVE = 63488;
  var serializePlacedPiece = (placedPiece) => {
    return placedPiece.orientation | placedPiece.location.y << 3 | placedPiece.location.x << 7 | placedPiece.pieceType << 11 | placedPiece.player << 16;
  };
  var pieceData = pieces_default;
  var orientationData = piece_orientations_default;
  var orientationBitBoarddata = piece_orientations_bitboard_default;
  var orientationBitBoardHaloData = piece_orientations_bitboard_halo_default;
  var cornersData = piece_corners_default;
  var cornerAttachersData = piece_corner_attachers_default;
  var shortBoundingBoxData = piece_short_bounding_box_default;
  var PIECE_SIZES = pieceData.map((p) => p.length);
  var PIECE_WEIGHTS = PIECE_SIZES.map((s) => 1 << Math.min(s, 8));
  var isMoveLegal = (pseudoLegalMove, state) => {
    if (pseudoLegalMove === NULL_MOVE) {
      return true;
    }
    const player = (pseudoLegalMove & MOVE_PLAYER_BIT) >> 16;
    const type = (pseudoLegalMove & MOVE_TYPE_MASK) >> 11;
    const ori = pseudoLegalMove & MOVE_ORIENTATION_MASK;
    const x = (pseudoLegalMove & MOVE_X_MASK) >> 7;
    const y = (pseudoLegalMove & MOVE_Y_MASK) >> 3;
    const remaining = player === 0 ? state.state.playerARemaining : state.state.playerBRemaining;
    if ((remaining & 1 << type) === 0) {
      return false;
    }
    const myBitBoard = player === 0 ? state.state.playerABitBoard : state.state.playerBBitBoard;
    const opponentBitBoard = player === 0 ? state.state.playerBBitBoard : state.state.playerABitBoard;
    const shortBoundingBox = shortBoundingBoxData[type][ori];
    const brx = x + shortBoundingBox[0];
    const bry = y + shortBoundingBox[1];
    if (x < 0 || y < 0 || x > 13 || y > 13 || brx < 0 || bry < 0 || brx > 13 || bry > 13) {
      return false;
    }
    const pieceBitboard = orientationBitBoarddata[type][ori];
    for (let bitboardY = 0; bitboardY < pieceBitboard.length; bitboardY++) {
      if (pieceBitboard[bitboardY] << x & opponentBitBoard[bitboardY + y]) {
        return false;
      }
    }
    const haloData = orientationBitBoardHaloData[type][ori];
    const myLen = myBitBoard.length;
    for (let bitboardY = 0; bitboardY < pieceBitboard.length + 2; bitboardY++) {
      const row = y + bitboardY - 1;
      if (row < 0 || row >= myLen) {
        continue;
      }
      if (haloData[bitboardY] << x & myBitBoard[row] << 1) {
        return false;
      }
    }
    return true;
  };
  var moveOverlaps = (move, bitboard) => {
    if (move === NULL_MOVE) {
      return false;
    }
    const type = (move & MOVE_TYPE_MASK) >> 11;
    const ori = move & MOVE_ORIENTATION_MASK;
    const x = (move & MOVE_X_MASK) >> 7;
    const y = (move & MOVE_Y_MASK) >> 3;
    const pieceBitboard = orientationBitBoarddata[type][ori];
    for (let bitboardY = 0; bitboardY < pieceBitboard.length; bitboardY++) {
      if (pieceBitboard[bitboardY] << x & bitboard[bitboardY + y]) {
        return true;
      }
    }
    return false;
  };
  var getLegalMovesFrom = (from, piece, state) => {
    const moves = [];
    const player = state.state.toMove;
    const fromX = from.x;
    const fromY = from.y;
    const orientations = orientationData[piece];
    for (let i = 0; i < orientations.length; i++) {
      const orientationCorners = cornersData[piece][i];
      for (let c = 0; c < orientationCorners.length; c++) {
        const corner = orientationCorners[c];
        const mx = fromX - corner.x;
        const my = fromY - corner.y;
        if (mx < 0 || my < 0 || mx > 13 || my > 13) {
          continue;
        }
        const move = i | my << 3 | mx << 7 | piece << 11 | player << 16;
        if (isMoveLegal(move, state)) {
          moves.push(move);
        }
      }
    }
    return moves;
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
  var START_SQUARES = {
    middle: [
      { x: 4, y: 4 },
      { x: 9, y: 9 }
    ],
    corner: [
      { x: 0, y: 0 },
      { x: 13, y: 13 }
    ],
    "middle-blokee": [
      { x: 6, y: 7 },
      { x: 7, y: 6 }
    ]
  };
  var firstMoveCandidates = (startPosName, player) => {
    const startPos = START_SQUARES[startPosName][player];
    const moves = [];
    for (let piece = 0; piece < 21; piece++) {
      for (let i = 0; i < orientationData[piece].length; i++) {
        const pieceTiles = orientationData[piece][i];
        for (let t = 0; t < pieceTiles.length; t++) {
          const tile = pieceTiles[t];
          const mx = startPos.x - tile.x;
          const my = startPos.y - tile.y;
          if (mx < 0 || my < 0 || mx > 13 || my > 13) {
            continue;
          }
          const placedPiece = {
            location: { x: mx, y: my },
            player,
            pieceType: piece,
            orientation: i
          };
          if (startPosName === "middle-blokee" && !isMoveBlokeeLegal(placedPiece, pieceTiles)) {
            continue;
          }
          moves.push(serializePlacedPiece(placedPiece));
        }
      }
    }
    return moves;
  };
  var FIRST_MOVE_CANDIDATES = {
    middle: [firstMoveCandidates("middle", 0), firstMoveCandidates("middle", 1)],
    corner: [firstMoveCandidates("corner", 0), firstMoveCandidates("corner", 1)],
    "middle-blokee": [
      firstMoveCandidates("middle-blokee", 0),
      firstMoveCandidates("middle-blokee", 1)
    ]
  };
  var EMPTY_FIRST_LEGAL = {};
  var generateFirstMove = (board2) => {
    const candidates = FIRST_MOVE_CANDIDATES[board2.state.startPosName][board2.state.toMove];
    if (board2.state.pieces.length === 0) {
      const key = `${board2.state.startPosName}:${board2.state.toMove}`;
      const cached = EMPTY_FIRST_LEGAL[key];
      if (cached !== void 0) {
        return cached.slice();
      }
      const legal2 = [];
      for (let i = 0; i < candidates.length; i++) {
        if (isMoveLegal(candidates[i], board2)) {
          legal2.push(candidates[i]);
        }
      }
      EMPTY_FIRST_LEGAL[key] = legal2;
      return legal2.slice();
    }
    const legal = [];
    for (let i = 0; i < candidates.length; i++) {
      if (isMoveLegal(candidates[i], board2)) {
        legal.push(candidates[i]);
      }
    }
    return legal;
  };
  var getAllLegalMoves = (board2) => {
    if (board2.gameOver()) {
      return [];
    }
    const myRemaining = board2.state.toMove === 0 ? board2.state.playerARemaining : board2.state.playerBRemaining;
    if (myRemaining === 2097151) {
      return generateFirstMove(board2);
    }
    const cache = board2.state.toMove === 0 ? board2.state.playerACornerMoves : board2.state.playerBCornerMoves;
    const uniqueMoves = uniqueMovesFromCache(cache);
    if (uniqueMoves.length === 0) {
      uniqueMoves.push(NULL_MOVE);
    }
    return uniqueMoves;
  };
  var MOVE_SEEN = new Uint32Array(1 << 17);
  var MOVE_SEEN_EPOCH = 1;
  var uniqueMovesFromCache = (cache) => {
    MOVE_SEEN_EPOCH++;
    if (MOVE_SEEN_EPOCH === 4294967295) {
      MOVE_SEEN.fill(0);
      MOVE_SEEN_EPOCH = 1;
    }
    const uniqueMoves = [];
    for (const moves of cache.values()) {
      for (let i = 0; i < moves.length; i++) {
        const move = moves[i];
        if (MOVE_SEEN[move] !== MOVE_SEEN_EPOCH) {
          MOVE_SEEN[move] = MOVE_SEEN_EPOCH;
          uniqueMoves.push(move);
        }
      }
    }
    return uniqueMoves;
  };
  var sizeWeight = (move) => {
    if (move === NULL_MOVE) {
      return 2;
    }
    return PIECE_WEIGHTS[getMovePieceType(move)];
  };
  var pickSizeWeightedFromList = (plays) => {
    if (plays.length === 1) {
      return plays[0];
    }
    let total = 0;
    for (const move of plays) {
      total += sizeWeight(move);
    }
    let r = Math.floor(Math.random() * total);
    for (const move of plays) {
      const w = sizeWeight(move);
      if (r < w) {
        return move;
      }
      r -= w;
    }
    return plays[plays.length - 1];
  };
  var pickSizeWeightedMove = (board2) => {
    if (board2.gameOver()) {
      return NULL_MOVE;
    }
    const myRemaining = board2.state.toMove === 0 ? board2.state.playerARemaining : board2.state.playerBRemaining;
    if (myRemaining === 2097151) {
      return pickSizeWeightedFromList(getAllLegalMoves(board2));
    }
    const cache = board2.state.toMove === 0 ? board2.state.playerACornerMoves : board2.state.playerBCornerMoves;
    let total = 0;
    for (const moves of cache.values()) {
      for (let i = 0; i < moves.length; i++) {
        total += PIECE_WEIGHTS[getMovePieceType(moves[i])];
      }
    }
    if (total === 0) {
      return NULL_MOVE;
    }
    let r = Math.random() * total | 0;
    for (const moves of cache.values()) {
      for (let i = 0; i < moves.length; i++) {
        const move = moves[i];
        const w = PIECE_WEIGHTS[getMovePieceType(move)];
        if (r < w) {
          return move;
        }
        r -= w;
      }
    }
    return NULL_MOVE;
  };

  // src/movegen/movegen-utils.ts
  var otherPlayer = (player) => player === 1 ? 0 : 1;

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
    playerBCornerMoves: /* @__PURE__ */ new Map(),
    playerASquares: 0,
    playerBSquares: 0,
    playerAMobility: 0,
    playerBMobility: 0
  };
  var cloneCornerMoves = (cache) => {
    return new Map(cache);
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
        playerA: this.state.playerASquares,
        playerB: this.state.playerBSquares
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
      const s = this.state;
      return new _Board(s.startPosName, this.cloneState());
    }
    copyFrom(other) {
      const s = other.state;
      const d = this.state;
      d.pieces = s.pieces.slice();
      d.toMove = s.toMove;
      d.playerARemaining = s.playerARemaining;
      d.playerBRemaining = s.playerBRemaining;
      for (let i = 0; i < 14; i++) {
        d.playerABitBoard[i] = s.playerABitBoard[i];
        d.playerBBitBoard[i] = s.playerBBitBoard[i];
      }
      d.startPosName = s.startPosName;
      d.nullMoveCounter = s.nullMoveCounter;
      d.playerACornerMoves = cloneCornerMoves(s.playerACornerMoves);
      d.playerBCornerMoves = cloneCornerMoves(s.playerBCornerMoves);
      d.playerASquares = s.playerASquares;
      d.playerBSquares = s.playerBSquares;
      d.playerAMobility = s.playerAMobility;
      d.playerBMobility = s.playerBMobility;
      this.startPositions = other.startPositions;
    }
    cloneState() {
      const s = this.state;
      return {
        pieces: s.pieces.slice(),
        toMove: s.toMove,
        playerARemaining: s.playerARemaining,
        playerBRemaining: s.playerBRemaining,
        playerABitBoard: s.playerABitBoard.slice(),
        playerBBitBoard: s.playerBBitBoard.slice(),
        startPosName: s.startPosName,
        nullMoveCounter: s.nullMoveCounter,
        playerACornerMoves: cloneCornerMoves(s.playerACornerMoves),
        playerBCornerMoves: cloneCornerMoves(s.playerBCornerMoves),
        playerASquares: s.playerASquares,
        playerBSquares: s.playerBSquares,
        playerAMobility: s.playerAMobility,
        playerBMobility: s.playerBMobility
      };
    }
    /** Cached legal-move count for `player`, including duplicate corner listings. */
    mobility(player) {
      return player === 0 ? this.state.playerAMobility : this.state.playerBMobility;
    }
    doMove(move) {
      if (move === NULL_MOVE) {
        this.state.nullMoveCounter++;
        this.skipTurn();
        return;
      }
      this.state.nullMoveCounter = 0;
      this.state.pieces.push(move);
      const player = getMovePlayer(move);
      const type = getMovePieceType(move);
      const ori = getMoveOrientation(move);
      const locX = getMoveX(move);
      const locY = getMoveY(move);
      const squares = PIECE_SIZES[type];
      if (player === 0) {
        this.state.playerARemaining &= ~(1 << type);
        this.state.playerASquares += squares;
      } else {
        this.state.playerBRemaining &= ~(1 << type);
        this.state.playerBSquares += squares;
      }
      const bitBoard = player === 0 ? this.state.playerABitBoard : this.state.playerBBitBoard;
      const pieceBitboard = orientationBitBoarddata[type][ori];
      for (let y = 0; y < pieceBitboard.length; y++) {
        bitBoard[locY + y] |= pieceBitboard[y] << locX;
      }
      const myCachedMoves = this.state.toMove === 0 ? this.state.playerACornerMoves : this.state.playerBCornerMoves;
      const opponentCachedMoves = this.state.toMove === 0 ? this.state.playerBCornerMoves : this.state.playerACornerMoves;
      const myPlayer = this.state.toMove;
      const oppPlayer = otherPlayer(myPlayer);
      const relativeCorner = cornersData[type][ori];
      for (let i = 0; i < relativeCorner.length; i++) {
        const corner = relativeCorner[i];
        const cornerIdx = corner.x + locX + (corner.y + locY) * 14;
        this.deleteCorner(myCachedMoves, myPlayer, cornerIdx);
        this.deleteCorner(opponentCachedMoves, oppPlayer, cornerIdx);
      }
      const cornerAttachers = cornerAttachersData[type][ori];
      const myRemaining = player === 0 ? this.state.playerARemaining : this.state.playerBRemaining;
      for (let i = 0; i < cornerAttachers.length; i++) {
        const attacher = cornerAttachers[i];
        const cx = attacher.x + locX;
        const cy = attacher.y + locY;
        if (cx < 0 || cy < 0 || cx > 13 || cy > 13) {
          continue;
        }
        const cornerIdx = cx + cy * 14;
        if (myCachedMoves.has(cornerIdx)) {
          continue;
        }
        const from = { x: cx, y: cy };
        const legalMoves = [];
        for (let unplacedPiece = 0; unplacedPiece < 21; unplacedPiece++) {
          if ((myRemaining & 1 << unplacedPiece) === 0) {
            continue;
          }
          const extra = getLegalMovesFrom(from, unplacedPiece, this);
          for (let m = 0; m < extra.length; m++) {
            legalMoves.push(extra[m]);
          }
        }
        myCachedMoves.set(cornerIdx, legalMoves);
        this.addMobility(myPlayer, legalMoves.length);
      }
      this.retainLegal(myCachedMoves, myPlayer);
      this.skipTurn();
      this.retainUnblocked(opponentCachedMoves, oppPlayer, bitBoard);
    }
    deleteCorner(cache, player, cornerIdx) {
      const old = cache.get(cornerIdx);
      if (old === void 0) {
        return;
      }
      this.addMobility(player, -old.length);
      cache.delete(cornerIdx);
    }
    retainLegal(cache, player) {
      for (const [idx, moves] of cache) {
        const kept = [];
        for (let i = 0; i < moves.length; i++) {
          if (isMoveLegal(moves[i], this)) {
            kept.push(moves[i]);
          }
        }
        if (kept.length !== moves.length) {
          this.addMobility(player, kept.length - moves.length);
          cache.set(idx, kept);
        }
      }
    }
    /** Opponent cache: own halo is unchanged, so only remaining + new overlap matter. */
    retainUnblocked(cache, player, blocker) {
      const remaining = player === 0 ? this.state.playerARemaining : this.state.playerBRemaining;
      for (const [idx, moves] of cache) {
        const kept = [];
        for (let i = 0; i < moves.length; i++) {
          const move = moves[i];
          if ((remaining & 1 << getMovePieceType(move)) === 0) {
            continue;
          }
          if (moveOverlaps(move, blocker)) {
            continue;
          }
          kept.push(move);
        }
        if (kept.length !== moves.length) {
          this.addMobility(player, kept.length - moves.length);
          cache.set(idx, kept);
        }
      }
    }
    addMobility(player, delta) {
      if (player === 0) {
        this.state.playerAMobility += delta;
      } else {
        this.state.playerBMobility += delta;
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
  var MonteCarloNode = class _MonteCarloNode {
    constructor(idx, parentIdx, unexpandedPlays, prior) {
      this.own_idx = idx;
      this.n_plays = 0;
      this.n_wins = 0;
      this.parent_idx = parentIdx;
      this.prior = prior;
      this.children = unexpandedPlays.map((play) => ({ play, node: null }));
      this.n_expanded = 0;
    }
    expand(play, unexpandedPlays, new_idx, prior) {
      const slot = this.children.find((c) => c.play === play && c.node === null);
      if (slot === void 0) {
        throw new Error("Play not found or already expanded");
      }
      slot.node = new_idx;
      this.n_expanded += 1;
      return new _MonteCarloNode(new_idx, this.own_idx, unexpandedPlays, prior);
    }
    isFullyExpanded() {
      return this.n_expanded === this.children.length;
    }
    isLeaf() {
      return this.children.length === 0;
    }
    getPUCT(cPuct, parentNPlays) {
      const n = this.n_plays;
      const q = n > 0 ? this.n_wins / n : 0;
      return q + cPuct * this.prior * Math.sqrt(parentNPlays) / (1 + n);
    }
  };

  // src/mcts/MonteCarlo.ts
  var PUCT_C = 1.5;
  var PW_C = 4;
  var PW_ALPHA = 0.5;
  var MonteCarlo = class {
    constructor() {
      this.all_nodes = [];
      this.iterations = 0;
      this.scratch = null;
    }
    clear() {
      this.all_nodes = [];
      this.iterations = 0;
    }
    /** From given state, run MCTS until `timeoutMs` elapses. */
    runSearch(state, timeoutMs) {
      this.startSearch(state);
      const deadline = Date.now() + timeoutMs;
      let i = 0;
      while (true) {
        this.iterate(state);
        i++;
        if ((i & 7) === 0 && Date.now() >= deadline) {
          break;
        }
      }
    }
    startSearch(state) {
      this.clear();
      if (this.scratch === null) {
        this.scratch = state.copy();
      }
      this.makeRoot(state);
    }
    /** One select / expand / simulate / backprop iteration from `root`. */
    iterate(root) {
      const treeState = this.scratch === null ? root.copy() : this.scratch;
      this.scratch = treeState;
      treeState.copyFrom(root);
      const nodeIdx = this.select(treeState);
      if (!this.all_nodes[nodeIdx].isLeaf() && !treeState.gameOver()) {
        const newIdx = this.expand(nodeIdx, treeState);
        const player = treeState.state.toMove;
        const expander = otherPlayer(player);
        const mobH = mobilityHeuristic(treeState, expander);
        this.simulate(treeState);
        this.backpropagate(newIdx, treeState.score(), player, mobH);
      } else {
        this.backpropagate(nodeIdx, treeState.score(), treeState.state.toMove, null);
      }
      this.iterations += 1;
    }
    makeRoot(state) {
      if (this.all_nodes.length !== 0) {
        throw new Error(
          "Search started from a non empty tree. Was the tree not cleared between searches?"
        );
      }
      const unexpandedPlays = getAllLegalMoves(state);
      this.all_nodes.push(new MonteCarloNode(0, null, unexpandedPlays, 1));
    }
    bestPlay() {
      return this.bestPlayInfo().move;
    }
    bestPlayInfo() {
      const node = this.all_nodes[0];
      let bestPlay;
      let maxPlays = 0;
      let q = 0.5;
      for (const child of node.children) {
        if (child.node === null) {
          continue;
        }
        const childNode = this.all_nodes[child.node];
        if (childNode.n_plays > maxPlays || bestPlay === void 0) {
          bestPlay = child.play;
          maxPlays = childNode.n_plays;
          q = childNode.n_plays > 0 ? childNode.n_wins / childNode.n_plays : 0.5;
        }
      }
      if (bestPlay === void 0) {
        bestPlay = node.children[0]?.play;
      }
      if (bestPlay === void 0) {
        throw new Error("No best play found. Was bestPlay called on a leaf node?");
      }
      return {
        move: bestPlay,
        visits: maxPlays,
        q,
        iterations: this.iterations,
        nodes: this.all_nodes.length
      };
    }
    select(state) {
      let idx = 0;
      while (true) {
        if (this.all_nodes[idx].isLeaf() || this.shouldExpand(idx)) {
          return idx;
        }
        const child = this.bestChild(idx);
        state.doMove(child.play);
        idx = child.node;
      }
    }
    shouldExpand(idx) {
      const node = this.all_nodes[idx];
      if (node.isFullyExpanded()) {
        return false;
      }
      if (node.n_expanded === 0) {
        return true;
      }
      const k = PW_C * Math.pow(Math.max(node.n_plays, 1), PW_ALPHA);
      return node.n_expanded < k;
    }
    bestChild(idx) {
      const node = this.all_nodes[idx];
      const parentN = node.n_plays;
      let best;
      let bestUcb = -Infinity;
      for (const child of node.children) {
        if (child.node === null) {
          continue;
        }
        const ucb = this.all_nodes[child.node].getPUCT(PUCT_C, parentN);
        if (ucb > bestUcb) {
          bestUcb = ucb;
          best = child;
        }
      }
      if (best === void 0 || best.node === null) {
        throw new Error("No best play found. Was select called on a leaf node?");
      }
      return best;
    }
    expand(nodeIdx, currentState) {
      const parent = this.all_nodes[nodeIdx];
      const newIdx = this.all_nodes.length;
      const randomMove = pickUnexpandedWeighted(parent);
      currentState.doMove(randomMove);
      const childPlays = getAllLegalMoves(currentState);
      const prior = sizePrior(parent.children, randomMove);
      const childNode = parent.expand(randomMove, childPlays, newIdx, prior);
      this.all_nodes.push(childNode);
      return newIdx;
    }
    simulate(currentState) {
      while (!currentState.gameOver()) {
        currentState.doMove(pickSizeWeightedMove(currentState));
      }
    }
    backpropagate(nodeIdx, squares, playerToMove, mobilityH) {
      const expander = otherPlayer(playerToMove);
      const value = (playerToWin) => {
        const term = squareValue(squares, playerToWin);
        if (mobilityH === null) {
          return term;
        }
        if (playerToWin === expander) {
          return 0.75 * term + 0.25 * mobilityH;
        }
        return 0.75 * term + 0.25 * (1 - mobilityH);
      };
      let idx = nodeIdx;
      let player = playerToMove;
      while (true) {
        const node = this.all_nodes[idx];
        node.n_plays += 1;
        node.n_wins += value(otherPlayer(player));
        if (node.parent_idx === null) {
          break;
        }
        idx = node.parent_idx;
        player = otherPlayer(player);
      }
    }
    getStats() {
      const node = this.all_nodes[0];
      return {
        n_plays: node.n_plays,
        n_wins: node.n_wins
      };
    }
  };
  function squareValue(squares, playerToWin) {
    const diff = playerToWin === 0 ? squares.playerA - squares.playerB : squares.playerB - squares.playerA;
    return 0.5 + 0.5 * Math.tanh(diff / 12);
  }
  function mobilityHeuristic(state, playerToWin) {
    const my = state.mobility(playerToWin);
    const opp = state.mobility(otherPlayer(playerToWin));
    return 0.5 + 0.5 * Math.tanh((my - opp) / 100);
  }
  function sizePrior(children, play) {
    let total = 0;
    let wPlay = 1;
    for (let i = 0; i < children.length; i++) {
      const w = sizeWeight(children[i].play);
      total += w;
      if (children[i].play === play) {
        wPlay = w;
      }
    }
    return total === 0 ? 1 : wPlay / total;
  }
  function pickUnexpandedWeighted(node) {
    let total = 0;
    for (let i = 0; i < node.children.length; i++) {
      if (node.children[i].node === null) {
        total += sizeWeight(node.children[i].play);
      }
    }
    let r = Math.random() * total;
    let last = node.children[0].play;
    for (let i = 0; i < node.children.length; i++) {
      if (node.children[i].node !== null) {
        continue;
      }
      last = node.children[i].play;
      const w = sizeWeight(last);
      if (r < w) {
        return last;
      }
      r -= w;
    }
    return last;
  }

  // src/worker.ts
  var board;
  var mcts;
  var difficulty = "easy";
  onmessage = (e) => {
    if (e.data.type === "init") {
      console.log("initialization");
      board = new Board(e.data.startPos);
      mcts = new MonteCarlo();
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
    const timeout = {
      easy: 2e3,
      medium: 1e4,
      hard: 2e4
    }[difficulty];
    console.log("running mcts", timeout, "ms");
    const start = Date.now();
    mcts.runSearch(board, timeout);
    try {
      const info = mcts.bestPlayInfo();
      const bestMove = info.move;
      const score = info.q;
      console.log(
        `mcts: iterations=${info.iterations} score=${score.toFixed(3)} visits=${info.visits} bestmove=${bestMove} took ${Date.now() - start} ms`
      );
      mcts.clear();
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
