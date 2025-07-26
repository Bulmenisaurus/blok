"use strict";
(() => {
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

  // src/movegen/pieces.json
  var pieces_default = [
    [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 0, y: -1 },
      { x: 0, y: -2 }
    ],
    [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: -1, y: 0 },
      { x: 0, y: -1 },
      { x: 0, y: -2 }
    ],
    [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: 2 },
      { x: -1, y: 0 },
      { x: -1, y: -1 }
    ],
    [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 0 }
    ],
    [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 0, y: -1 },
      { x: 1, y: -1 }
    ],
    [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: 2 },
      { x: 1, y: 0 },
      { x: 2, y: 0 }
    ],
    [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: -1, y: 1 },
      { x: 0, y: -1 },
      { x: 1, y: -1 }
    ],
    [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 0 },
      { x: 0, y: -1 },
      { x: -1, y: 0 }
    ],
    [
      { x: 0, y: 0 },
      { x: -1, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: -1 },
      { x: 0, y: -2 }
    ],
    [
      { x: 0, y: 0 },
      { x: -1, y: 0 },
      { x: -1, y: 1 },
      { x: 0, y: -1 },
      { x: 1, y: -1 }
    ],
    [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 1, y: 0 },
      { x: 0, y: -1 }
    ],
    [
      { x: 0, y: 0 },
      { x: -1, y: 0 },
      { x: 0, y: -1 },
      { x: 0, y: 1 },
      { x: 1, y: 1 }
    ],
    [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 0, y: 1 }
    ],
    [
      { x: 0, y: 0 },
      { x: -1, y: 0 },
      { x: 1, y: 0 },
      { x: 1, y: -1 }
    ],
    [
      { x: 0, y: 0 },
      { x: -1, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: -1 }
    ],
    [
      { x: 0, y: 0 },
      { x: -1, y: 0 },
      { x: 0, y: -1 },
      { x: 1, y: -1 }
    ],
    [{ x: 0, y: 0 }],
    [
      { x: 0, y: 0 },
      { x: 0, y: 1 }
    ],
    [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: -1 }
    ],
    [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: -1 },
      { x: 0, y: 2 }
    ],
    [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: 2 },
      { x: 0, y: -1 },
      { x: 0, y: -2 }
    ]
  ];

  // src/movegen/piece-orientations.json
  var piece_orientations_default = [[[{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 0, y: -1 }, { x: 0, y: -2 }], [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 1 }, { x: 0, y: -1 }, { x: 0, y: -2 }], [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: -1 }, { x: -1, y: 0 }, { x: -2, y: 0 }], [{ x: 0, y: 0 }, { x: -1, y: 0 }, { x: -1, y: -1 }, { x: 1, y: 0 }, { x: 2, y: 0 }], [{ x: 0, y: 0 }, { x: 0, y: -1 }, { x: -1, y: -1 }, { x: 0, y: 1 }, { x: 0, y: 2 }], [{ x: 0, y: 0 }, { x: 0, y: -1 }, { x: 1, y: -1 }, { x: 0, y: 1 }, { x: 0, y: 2 }], [{ x: 0, y: 0 }, { x: -1, y: 0 }, { x: -1, y: 1 }, { x: 1, y: 0 }, { x: 2, y: 0 }], [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: -1, y: 0 }, { x: -2, y: 0 }]], [[{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 0 }, { x: 0, y: -1 }, { x: 0, y: -2 }], [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 0 }, { x: 0, y: -1 }, { x: 0, y: -2 }], [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 0 }, { x: -2, y: 0 }], [{ x: 0, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 0 }, { x: 2, y: 0 }], [{ x: 0, y: 0 }, { x: 0, y: -1 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }], [{ x: 0, y: 0 }, { x: 0, y: -1 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }], [{ x: 0, y: 0 }, { x: -1, y: 0 }, { x: 0, y: -1 }, { x: 1, y: 0 }, { x: 2, y: 0 }], [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: -1 }, { x: -1, y: 0 }, { x: -2, y: 0 }]], [[{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: -1, y: 0 }, { x: -1, y: -1 }], [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 1, y: 0 }, { x: 1, y: -1 }], [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 1 }], [{ x: 0, y: 0 }, { x: -1, y: 0 }, { x: -2, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }], [{ x: 0, y: 0 }, { x: 0, y: -1 }, { x: 0, y: -2 }, { x: 1, y: 0 }, { x: 1, y: 1 }], [{ x: 0, y: 0 }, { x: 0, y: -1 }, { x: 0, y: -2 }, { x: -1, y: 0 }, { x: -1, y: 1 }], [{ x: 0, y: 0 }, { x: -1, y: 0 }, { x: -2, y: 0 }, { x: 0, y: -1 }, { x: 1, y: -1 }], [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 0, y: -1 }, { x: -1, y: -1 }]], [[{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 0 }], [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 0 }], [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: -1 }], [{ x: 0, y: 0 }, { x: -1, y: 0 }, { x: 0, y: -1 }]], [[{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 0, y: -1 }, { x: 1, y: -1 }], [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 1 }, { x: 0, y: -1 }, { x: -1, y: -1 }], [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: -1 }, { x: -1, y: 0 }, { x: -1, y: -1 }], [{ x: 0, y: 0 }, { x: -1, y: 0 }, { x: -1, y: 1 }, { x: 1, y: 0 }, { x: 1, y: 1 }]], [[{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 1, y: 0 }, { x: 2, y: 0 }], [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: -1, y: 0 }, { x: -2, y: 0 }], [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 0, y: -1 }, { x: 0, y: -2 }], [{ x: 0, y: 0 }, { x: -1, y: 0 }, { x: -2, y: 0 }, { x: 0, y: -1 }, { x: 0, y: -2 }]], [[{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 1 }, { x: 0, y: -1 }, { x: 1, y: -1 }], [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 0, y: -1 }, { x: -1, y: -1 }], [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: -1, y: 0 }, { x: -1, y: -1 }], [{ x: 0, y: 0 }, { x: -1, y: 0 }, { x: -1, y: 1 }, { x: 1, y: 0 }, { x: 1, y: -1 }]], [[{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 0 }, { x: 0, y: -1 }, { x: -1, y: 0 }]], [[{ x: 0, y: 0 }, { x: -1, y: 0 }, { x: 1, y: 0 }, { x: 0, y: -1 }, { x: 0, y: -2 }], [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 }, { x: -1, y: 0 }, { x: -2, y: 0 }], [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 }, { x: 1, y: 0 }, { x: 2, y: 0 }], [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }]], [[{ x: 0, y: 0 }, { x: -1, y: 0 }, { x: -1, y: 1 }, { x: 0, y: -1 }, { x: 1, y: -1 }], [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: -1 }, { x: -1, y: -1 }], [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: -1, y: 0 }, { x: -1, y: -1 }], [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 1 }, { x: 1, y: 0 }, { x: 1, y: -1 }]], [[{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 1, y: 0 }, { x: 0, y: -1 }], [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 1 }, { x: -1, y: 0 }, { x: 0, y: -1 }], [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: -1 }, { x: 0, y: -1 }, { x: -1, y: 0 }], [{ x: 0, y: 0 }, { x: -1, y: 0 }, { x: -1, y: -1 }, { x: 0, y: -1 }, { x: 1, y: 0 }], [{ x: 0, y: 0 }, { x: 0, y: -1 }, { x: -1, y: -1 }, { x: -1, y: 0 }, { x: 0, y: 1 }], [{ x: 0, y: 0 }, { x: 0, y: -1 }, { x: 1, y: -1 }, { x: 1, y: 0 }, { x: 0, y: 1 }], [{ x: 0, y: 0 }, { x: -1, y: 0 }, { x: -1, y: 1 }, { x: 0, y: 1 }, { x: 1, y: 0 }], [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 }, { x: -1, y: 0 }]], [[{ x: 0, y: 0 }, { x: -1, y: 0 }, { x: 0, y: -1 }, { x: 0, y: 1 }, { x: 1, y: 1 }], [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: -1 }, { x: 0, y: 1 }, { x: -1, y: 1 }], [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 0 }, { x: 1, y: 0 }, { x: 1, y: -1 }], [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 0 }, { x: -1, y: 0 }, { x: -1, y: -1 }], [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 }, { x: -1, y: -1 }], [{ x: 0, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 }, { x: 1, y: -1 }], [{ x: 0, y: 0 }, { x: 0, y: -1 }, { x: 1, y: 0 }, { x: -1, y: 0 }, { x: -1, y: 1 }], [{ x: 0, y: 0 }, { x: 0, y: -1 }, { x: -1, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }]], [[{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 }]], [[{ x: 0, y: 0 }, { x: -1, y: 0 }, { x: 1, y: 0 }, { x: 1, y: -1 }], [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: -1, y: 0 }, { x: -1, y: -1 }], [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 }, { x: -1, y: -1 }], [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 }, { x: 1, y: -1 }], [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: -1, y: 0 }, { x: -1, y: 1 }], [{ x: 0, y: 0 }, { x: -1, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }], [{ x: 0, y: 0 }, { x: 0, y: -1 }, { x: 0, y: 1 }, { x: 1, y: 1 }], [{ x: 0, y: 0 }, { x: 0, y: -1 }, { x: 0, y: 1 }, { x: -1, y: 1 }]], [[{ x: 0, y: 0 }, { x: -1, y: 0 }, { x: 1, y: 0 }, { x: 0, y: -1 }], [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 }, { x: -1, y: 0 }], [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 }, { x: 1, y: 0 }], [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }]], [[{ x: 0, y: 0 }, { x: -1, y: 0 }, { x: 0, y: -1 }, { x: 1, y: -1 }], [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: -1 }, { x: -1, y: -1 }], [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 0 }, { x: -1, y: -1 }], [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 0 }, { x: 1, y: -1 }]], [[{ x: 0, y: 0 }]], [[{ x: 0, y: 0 }, { x: 0, y: 1 }], [{ x: 0, y: 0 }, { x: 1, y: 0 }]], [[{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 }], [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: -1, y: 0 }]], [[{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 }, { x: 0, y: 2 }], [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: -1, y: 0 }, { x: 2, y: 0 }]], [[{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 0, y: -1 }, { x: 0, y: -2 }], [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: -1, y: 0 }, { x: -2, y: 0 }]]];

  // src/movegen/piece-corners.json
  var piece_corners_default = [[[{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 0, y: -2 }], [{ x: 0, y: 1 }, { x: -1, y: 1 }, { x: 0, y: -2 }], [{ x: 1, y: 0 }, { x: 1, y: -1 }, { x: -2, y: 0 }], [{ x: -1, y: 0 }, { x: -1, y: -1 }, { x: 2, y: 0 }], [{ x: 0, y: -1 }, { x: -1, y: -1 }, { x: 0, y: 2 }], [{ x: 0, y: -1 }, { x: 1, y: -1 }, { x: 0, y: 2 }], [{ x: -1, y: 0 }, { x: -1, y: 1 }, { x: 2, y: 0 }], [{ x: 1, y: 0 }, { x: 1, y: 1 }, { x: -2, y: 0 }]], [[{ x: 0, y: 1 }, { x: -1, y: 0 }, { x: 0, y: -2 }], [{ x: 0, y: 1 }, { x: 1, y: 0 }, { x: 0, y: -2 }], [{ x: 1, y: 0 }, { x: 0, y: 1 }, { x: -2, y: 0 }], [{ x: -1, y: 0 }, { x: 0, y: 1 }, { x: 2, y: 0 }], [{ x: 0, y: -1 }, { x: 1, y: 0 }, { x: 0, y: 2 }], [{ x: 0, y: -1 }, { x: -1, y: 0 }, { x: 0, y: 2 }], [{ x: -1, y: 0 }, { x: 0, y: -1 }, { x: 2, y: 0 }], [{ x: 1, y: 0 }, { x: 0, y: -1 }, { x: -2, y: 0 }]], [[{ x: 0, y: 0 }, { x: 0, y: 2 }, { x: -1, y: 0 }, { x: -1, y: -1 }], [{ x: 0, y: 0 }, { x: 0, y: 2 }, { x: 1, y: 0 }, { x: 1, y: -1 }], [{ x: 0, y: 0 }, { x: 2, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 1 }], [{ x: 0, y: 0 }, { x: -2, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }], [{ x: 0, y: 0 }, { x: 0, y: -2 }, { x: 1, y: 0 }, { x: 1, y: 1 }], [{ x: 0, y: 0 }, { x: 0, y: -2 }, { x: -1, y: 0 }, { x: -1, y: 1 }], [{ x: 0, y: 0 }, { x: -2, y: 0 }, { x: 0, y: -1 }, { x: 1, y: -1 }], [{ x: 0, y: 0 }, { x: 2, y: 0 }, { x: 0, y: -1 }, { x: -1, y: -1 }]], [[{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 0 }], [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 0 }], [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: -1 }], [{ x: 0, y: 0 }, { x: -1, y: 0 }, { x: 0, y: -1 }]], [[{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 0, y: -1 }, { x: 1, y: -1 }], [{ x: 0, y: 1 }, { x: -1, y: 1 }, { x: 0, y: -1 }, { x: -1, y: -1 }], [{ x: 1, y: 0 }, { x: 1, y: -1 }, { x: -1, y: 0 }, { x: -1, y: -1 }], [{ x: -1, y: 0 }, { x: -1, y: 1 }, { x: 1, y: 0 }, { x: 1, y: 1 }]], [[{ x: 0, y: 0 }, { x: 0, y: 2 }, { x: 2, y: 0 }], [{ x: 0, y: 0 }, { x: 0, y: 2 }, { x: -2, y: 0 }], [{ x: 0, y: 0 }, { x: 2, y: 0 }, { x: 0, y: -2 }], [{ x: 0, y: 0 }, { x: -2, y: 0 }, { x: 0, y: -2 }]], [[{ x: 0, y: 1 }, { x: -1, y: 1 }, { x: 0, y: -1 }, { x: 1, y: -1 }], [{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 0, y: -1 }, { x: -1, y: -1 }], [{ x: 1, y: 0 }, { x: 1, y: 1 }, { x: -1, y: 0 }, { x: -1, y: -1 }], [{ x: -1, y: 0 }, { x: -1, y: 1 }, { x: 1, y: 0 }, { x: 1, y: -1 }]], [[{ x: 0, y: 1 }, { x: 1, y: 0 }, { x: 0, y: -1 }, { x: -1, y: 0 }]], [[{ x: -1, y: 0 }, { x: 1, y: 0 }, { x: 0, y: -2 }], [{ x: 0, y: 1 }, { x: 0, y: -1 }, { x: -2, y: 0 }], [{ x: 0, y: 1 }, { x: 0, y: -1 }, { x: 2, y: 0 }], [{ x: 1, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 2 }]], [[{ x: 0, y: 0 }, { x: -1, y: 0 }, { x: -1, y: 1 }, { x: 0, y: -1 }, { x: 1, y: -1 }], [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: -1 }, { x: -1, y: -1 }], [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: -1, y: 0 }, { x: -1, y: -1 }], [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 1 }, { x: 1, y: 0 }, { x: 1, y: -1 }]], [[{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 1, y: 0 }, { x: 0, y: -1 }], [{ x: 0, y: 1 }, { x: -1, y: 1 }, { x: -1, y: 0 }, { x: 0, y: -1 }], [{ x: 1, y: 0 }, { x: 1, y: -1 }, { x: 0, y: -1 }, { x: -1, y: 0 }], [{ x: -1, y: 0 }, { x: -1, y: -1 }, { x: 0, y: -1 }, { x: 1, y: 0 }], [{ x: 0, y: -1 }, { x: -1, y: -1 }, { x: -1, y: 0 }, { x: 0, y: 1 }], [{ x: 0, y: -1 }, { x: 1, y: -1 }, { x: 1, y: 0 }, { x: 0, y: 1 }], [{ x: -1, y: 0 }, { x: -1, y: 1 }, { x: 0, y: 1 }, { x: 1, y: 0 }], [{ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 }, { x: -1, y: 0 }]], [[{ x: -1, y: 0 }, { x: 0, y: -1 }, { x: 0, y: 1 }, { x: 1, y: 1 }], [{ x: 1, y: 0 }, { x: 0, y: -1 }, { x: 0, y: 1 }, { x: -1, y: 1 }], [{ x: 0, y: 1 }, { x: -1, y: 0 }, { x: 1, y: 0 }, { x: 1, y: -1 }], [{ x: 0, y: 1 }, { x: 1, y: 0 }, { x: -1, y: 0 }, { x: -1, y: -1 }], [{ x: 1, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 }, { x: -1, y: -1 }], [{ x: -1, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 }, { x: 1, y: -1 }], [{ x: 0, y: -1 }, { x: 1, y: 0 }, { x: -1, y: 0 }, { x: -1, y: 1 }], [{ x: 0, y: -1 }, { x: -1, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }]], [[{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 }]], [[{ x: -1, y: 0 }, { x: 1, y: 0 }, { x: 1, y: -1 }], [{ x: 1, y: 0 }, { x: -1, y: 0 }, { x: -1, y: -1 }], [{ x: 0, y: 1 }, { x: 0, y: -1 }, { x: -1, y: -1 }], [{ x: 0, y: 1 }, { x: 0, y: -1 }, { x: 1, y: -1 }], [{ x: 1, y: 0 }, { x: -1, y: 0 }, { x: -1, y: 1 }], [{ x: -1, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }], [{ x: 0, y: -1 }, { x: 0, y: 1 }, { x: 1, y: 1 }], [{ x: 0, y: -1 }, { x: 0, y: 1 }, { x: -1, y: 1 }]], [[{ x: -1, y: 0 }, { x: 1, y: 0 }, { x: 0, y: -1 }], [{ x: 0, y: 1 }, { x: 0, y: -1 }, { x: -1, y: 0 }], [{ x: 0, y: 1 }, { x: 0, y: -1 }, { x: 1, y: 0 }], [{ x: 1, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }]], [[{ x: 0, y: 0 }, { x: -1, y: 0 }, { x: 0, y: -1 }, { x: 1, y: -1 }], [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: -1 }, { x: -1, y: -1 }], [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 0 }, { x: -1, y: -1 }], [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 0 }, { x: 1, y: -1 }]], [[{ x: 0, y: 0 }]], [[{ x: 0, y: 0 }, { x: 0, y: 1 }], [{ x: 0, y: 0 }, { x: 1, y: 0 }]], [[{ x: 0, y: 1 }, { x: 0, y: -1 }], [{ x: 1, y: 0 }, { x: -1, y: 0 }]], [[{ x: 0, y: -1 }, { x: 0, y: 2 }], [{ x: -1, y: 0 }, { x: 2, y: 0 }]], [[{ x: 0, y: 2 }, { x: 0, y: -2 }], [{ x: 2, y: 0 }, { x: -2, y: 0 }]]];

  // src/movegen/piece-corner-attachers.json
  var piece_corner_attachers_default = [[[{ x: -1, y: 2 }, { x: 2, y: 2 }, { x: 2, y: 0 }, { x: 1, y: -3 }, { x: -1, y: -3 }], [{ x: 1, y: 2 }, { x: -2, y: 0 }, { x: -2, y: 2 }, { x: 1, y: -3 }, { x: -1, y: -3 }], [{ x: 2, y: 1 }, { x: 2, y: -2 }, { x: 0, y: -2 }, { x: -3, y: -1 }, { x: -3, y: 1 }], [{ x: -2, y: 1 }, { x: 0, y: -2 }, { x: -2, y: -2 }, { x: 3, y: 1 }, { x: 3, y: -1 }], [{ x: 1, y: -2 }, { x: -2, y: -2 }, { x: -2, y: 0 }, { x: 1, y: 3 }, { x: -1, y: 3 }], [{ x: -1, y: -2 }, { x: 2, y: 0 }, { x: 2, y: -2 }, { x: 1, y: 3 }, { x: -1, y: 3 }], [{ x: -2, y: -1 }, { x: 0, y: 2 }, { x: -2, y: 2 }, { x: 3, y: 1 }, { x: 3, y: -1 }], [{ x: 2, y: -1 }, { x: 2, y: 2 }, { x: 0, y: 2 }, { x: -3, y: -1 }, { x: -3, y: 1 }]], [[{ x: 1, y: 2 }, { x: -1, y: 2 }, { x: -2, y: -1 }, { x: -2, y: 1 }, { x: 1, y: -3 }, { x: -1, y: -3 }], [{ x: 1, y: 2 }, { x: -1, y: 2 }, { x: 2, y: 1 }, { x: 2, y: -1 }, { x: 1, y: -3 }, { x: -1, y: -3 }], [{ x: 2, y: 1 }, { x: 2, y: -1 }, { x: 1, y: 2 }, { x: -1, y: 2 }, { x: -3, y: -1 }, { x: -3, y: 1 }], [{ x: -2, y: -1 }, { x: -2, y: 1 }, { x: 1, y: 2 }, { x: -1, y: 2 }, { x: 3, y: 1 }, { x: 3, y: -1 }], [{ x: 1, y: -2 }, { x: -1, y: -2 }, { x: 2, y: 1 }, { x: 2, y: -1 }, { x: 1, y: 3 }, { x: -1, y: 3 }], [{ x: 1, y: -2 }, { x: -1, y: -2 }, { x: -2, y: -1 }, { x: -2, y: 1 }, { x: 1, y: 3 }, { x: -1, y: 3 }], [{ x: -2, y: -1 }, { x: -2, y: 1 }, { x: 1, y: -2 }, { x: -1, y: -2 }, { x: 3, y: 1 }, { x: 3, y: -1 }], [{ x: 2, y: 1 }, { x: 2, y: -1 }, { x: 1, y: -2 }, { x: -1, y: -2 }, { x: -3, y: -1 }, { x: -3, y: 1 }]], [[{ x: 1, y: -1 }, { x: 1, y: 3 }, { x: -1, y: 3 }, { x: -2, y: 1 }, { x: 0, y: -2 }, { x: -2, y: -2 }], [{ x: -1, y: -1 }, { x: 1, y: 3 }, { x: -1, y: 3 }, { x: 2, y: 1 }, { x: 2, y: -2 }, { x: 0, y: -2 }], [{ x: -1, y: -1 }, { x: 3, y: 1 }, { x: 3, y: -1 }, { x: 1, y: 2 }, { x: -2, y: 0 }, { x: -2, y: 2 }], [{ x: 1, y: -1 }, { x: -3, y: -1 }, { x: -3, y: 1 }, { x: -1, y: 2 }, { x: 2, y: 2 }, { x: 2, y: 0 }], [{ x: -1, y: 1 }, { x: 1, y: -3 }, { x: -1, y: -3 }, { x: 2, y: -1 }, { x: 2, y: 2 }, { x: 0, y: 2 }], [{ x: 1, y: 1 }, { x: 1, y: -3 }, { x: -1, y: -3 }, { x: -2, y: -1 }, { x: 0, y: 2 }, { x: -2, y: 2 }], [{ x: 1, y: 1 }, { x: -3, y: -1 }, { x: -3, y: 1 }, { x: -1, y: -2 }, { x: 2, y: 0 }, { x: 2, y: -2 }], [{ x: -1, y: 1 }, { x: 3, y: 1 }, { x: 3, y: -1 }, { x: 1, y: -2 }, { x: -2, y: -2 }, { x: -2, y: 0 }]], [[{ x: -1, y: -1 }, { x: 1, y: 2 }, { x: -1, y: 2 }, { x: 2, y: 1 }, { x: 2, y: -1 }], [{ x: 1, y: -1 }, { x: 1, y: 2 }, { x: -1, y: 2 }, { x: -2, y: -1 }, { x: -2, y: 1 }], [{ x: -1, y: 1 }, { x: 2, y: 1 }, { x: 2, y: -1 }, { x: 1, y: -2 }, { x: -1, y: -2 }], [{ x: 1, y: 1 }, { x: -2, y: -1 }, { x: -2, y: 1 }, { x: 1, y: -2 }, { x: -1, y: -2 }]], [[{ x: -1, y: 2 }, { x: 2, y: 2 }, { x: 2, y: 0 }, { x: -1, y: -2 }, { x: 2, y: -2 }], [{ x: 1, y: 2 }, { x: -2, y: 0 }, { x: -2, y: 2 }, { x: 1, y: -2 }, { x: -2, y: -2 }], [{ x: 2, y: 1 }, { x: 2, y: -2 }, { x: 0, y: -2 }, { x: -2, y: 1 }, { x: -2, y: -2 }], [{ x: -2, y: -1 }, { x: 0, y: 2 }, { x: -2, y: 2 }, { x: 2, y: -1 }, { x: 2, y: 2 }]], [[{ x: -1, y: -1 }, { x: 1, y: 3 }, { x: -1, y: 3 }, { x: 3, y: 1 }, { x: 3, y: -1 }], [{ x: 1, y: -1 }, { x: 1, y: 3 }, { x: -1, y: 3 }, { x: -3, y: -1 }, { x: -3, y: 1 }], [{ x: -1, y: 1 }, { x: 3, y: 1 }, { x: 3, y: -1 }, { x: 1, y: -3 }, { x: -1, y: -3 }], [{ x: 1, y: 1 }, { x: -3, y: -1 }, { x: -3, y: 1 }, { x: 1, y: -3 }, { x: -1, y: -3 }]], [[{ x: 1, y: 2 }, { x: -2, y: 0 }, { x: -2, y: 2 }, { x: -1, y: -2 }, { x: 2, y: 0 }, { x: 2, y: -2 }], [{ x: -1, y: 2 }, { x: 2, y: 2 }, { x: 2, y: 0 }, { x: 1, y: -2 }, { x: -2, y: -2 }, { x: -2, y: 0 }], [{ x: 2, y: -1 }, { x: 2, y: 2 }, { x: 0, y: 2 }, { x: -2, y: 1 }, { x: 0, y: -2 }, { x: -2, y: -2 }], [{ x: -2, y: -1 }, { x: 0, y: 2 }, { x: -2, y: 2 }, { x: 2, y: 1 }, { x: 2, y: -2 }, { x: 0, y: -2 }]], [[{ x: 1, y: 2 }, { x: -1, y: 2 }, { x: 2, y: 1 }, { x: 2, y: -1 }, { x: 1, y: -2 }, { x: -1, y: -2 }, { x: -2, y: -1 }, { x: -2, y: 1 }]], [[{ x: -2, y: -1 }, { x: -2, y: 1 }, { x: 2, y: 1 }, { x: 2, y: -1 }, { x: 1, y: -3 }, { x: -1, y: -3 }], [{ x: 1, y: 2 }, { x: -1, y: 2 }, { x: 1, y: -2 }, { x: -1, y: -2 }, { x: -3, y: -1 }, { x: -3, y: 1 }], [{ x: 1, y: 2 }, { x: -1, y: 2 }, { x: 1, y: -2 }, { x: -1, y: -2 }, { x: 3, y: 1 }, { x: 3, y: -1 }], [{ x: 2, y: 1 }, { x: 2, y: -1 }, { x: -2, y: -1 }, { x: -2, y: 1 }, { x: 1, y: 3 }, { x: -1, y: 3 }]], [[{ x: 1, y: 1 }, { x: -2, y: -1 }, { x: 0, y: 2 }, { x: -2, y: 2 }, { x: -1, y: -2 }, { x: 2, y: 0 }, { x: 2, y: -2 }], [{ x: -1, y: 1 }, { x: 2, y: -1 }, { x: 2, y: 2 }, { x: 0, y: 2 }, { x: 1, y: -2 }, { x: -2, y: -2 }, { x: -2, y: 0 }], [{ x: 1, y: -1 }, { x: -1, y: 2 }, { x: 2, y: 2 }, { x: 2, y: 0 }, { x: -2, y: 1 }, { x: 0, y: -2 }, { x: -2, y: -2 }], [{ x: -1, y: -1 }, { x: 1, y: 2 }, { x: -2, y: 0 }, { x: -2, y: 2 }, { x: 2, y: 1 }, { x: 2, y: -2 }, { x: 0, y: -2 }]], [[{ x: -1, y: 2 }, { x: 2, y: 2 }, { x: 2, y: -1 }, { x: 1, y: -2 }, { x: -1, y: -2 }], [{ x: 1, y: 2 }, { x: -2, y: 2 }, { x: -2, y: -1 }, { x: 1, y: -2 }, { x: -1, y: -2 }], [{ x: 2, y: 1 }, { x: 2, y: -2 }, { x: -1, y: -2 }, { x: -2, y: -1 }, { x: -2, y: 1 }], [{ x: -2, y: 1 }, { x: -2, y: -2 }, { x: 1, y: -2 }, { x: 2, y: 1 }, { x: 2, y: -1 }], [{ x: 1, y: -2 }, { x: -2, y: -2 }, { x: -2, y: 1 }, { x: 1, y: 2 }, { x: -1, y: 2 }], [{ x: -1, y: -2 }, { x: 2, y: -2 }, { x: 2, y: 1 }, { x: 1, y: 2 }, { x: -1, y: 2 }], [{ x: -2, y: -1 }, { x: -2, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 1 }, { x: 2, y: -1 }], [{ x: 2, y: -1 }, { x: 2, y: 2 }, { x: -1, y: 2 }, { x: -2, y: -1 }, { x: -2, y: 1 }]], [[{ x: -2, y: -1 }, { x: -2, y: 1 }, { x: 1, y: -2 }, { x: -1, y: -2 }, { x: -1, y: 2 }, { x: 2, y: 2 }, { x: 2, y: 0 }], [{ x: 2, y: 1 }, { x: 2, y: -1 }, { x: 1, y: -2 }, { x: -1, y: -2 }, { x: 1, y: 2 }, { x: -2, y: 0 }, { x: -2, y: 2 }], [{ x: 1, y: 2 }, { x: -1, y: 2 }, { x: -2, y: -1 }, { x: -2, y: 1 }, { x: 2, y: 1 }, { x: 2, y: -2 }, { x: 0, y: -2 }], [{ x: 1, y: 2 }, { x: -1, y: 2 }, { x: 2, y: 1 }, { x: 2, y: -1 }, { x: -2, y: 1 }, { x: 0, y: -2 }, { x: -2, y: -2 }], [{ x: 2, y: 1 }, { x: 2, y: -1 }, { x: 1, y: 2 }, { x: -1, y: 2 }, { x: 1, y: -2 }, { x: -2, y: -2 }, { x: -2, y: 0 }], [{ x: -2, y: -1 }, { x: -2, y: 1 }, { x: 1, y: 2 }, { x: -1, y: 2 }, { x: -1, y: -2 }, { x: 2, y: 0 }, { x: 2, y: -2 }], [{ x: 1, y: -2 }, { x: -1, y: -2 }, { x: 2, y: 1 }, { x: 2, y: -1 }, { x: -2, y: -1 }, { x: 0, y: 2 }, { x: -2, y: 2 }], [{ x: 1, y: -2 }, { x: -1, y: -2 }, { x: -2, y: -1 }, { x: -2, y: 1 }, { x: 2, y: -1 }, { x: 2, y: 2 }, { x: 0, y: 2 }]], [[{ x: -1, y: -1 }, { x: 2, y: -1 }, { x: 2, y: 2 }, { x: -1, y: 2 }]], [[{ x: -2, y: -1 }, { x: -2, y: 1 }, { x: 2, y: 1 }, { x: 2, y: -2 }, { x: 0, y: -2 }], [{ x: 2, y: 1 }, { x: 2, y: -1 }, { x: -2, y: 1 }, { x: 0, y: -2 }, { x: -2, y: -2 }], [{ x: 1, y: 2 }, { x: -1, y: 2 }, { x: 1, y: -2 }, { x: -2, y: -2 }, { x: -2, y: 0 }], [{ x: 1, y: 2 }, { x: -1, y: 2 }, { x: -1, y: -2 }, { x: 2, y: 0 }, { x: 2, y: -2 }], [{ x: 2, y: 1 }, { x: 2, y: -1 }, { x: -2, y: -1 }, { x: 0, y: 2 }, { x: -2, y: 2 }], [{ x: -2, y: -1 }, { x: -2, y: 1 }, { x: 2, y: -1 }, { x: 2, y: 2 }, { x: 0, y: 2 }], [{ x: 1, y: -2 }, { x: -1, y: -2 }, { x: -1, y: 2 }, { x: 2, y: 2 }, { x: 2, y: 0 }], [{ x: 1, y: -2 }, { x: -1, y: -2 }, { x: 1, y: 2 }, { x: -2, y: 0 }, { x: -2, y: 2 }]], [[{ x: -2, y: -1 }, { x: -2, y: 1 }, { x: 2, y: 1 }, { x: 2, y: -1 }, { x: 1, y: -2 }, { x: -1, y: -2 }], [{ x: 1, y: 2 }, { x: -1, y: 2 }, { x: 1, y: -2 }, { x: -1, y: -2 }, { x: -2, y: -1 }, { x: -2, y: 1 }], [{ x: 1, y: 2 }, { x: -1, y: 2 }, { x: 1, y: -2 }, { x: -1, y: -2 }, { x: 2, y: 1 }, { x: 2, y: -1 }], [{ x: 2, y: 1 }, { x: 2, y: -1 }, { x: -2, y: -1 }, { x: -2, y: 1 }, { x: 1, y: 2 }, { x: -1, y: 2 }]], [[{ x: 1, y: 1 }, { x: -2, y: -1 }, { x: -2, y: 1 }, { x: -1, y: -2 }, { x: 2, y: 0 }, { x: 2, y: -2 }], [{ x: -1, y: 1 }, { x: 2, y: 1 }, { x: 2, y: -1 }, { x: 1, y: -2 }, { x: -2, y: -2 }, { x: -2, y: 0 }], [{ x: 1, y: -1 }, { x: 1, y: 2 }, { x: -1, y: 2 }, { x: -2, y: 1 }, { x: 0, y: -2 }, { x: -2, y: -2 }], [{ x: -1, y: -1 }, { x: 1, y: 2 }, { x: -1, y: 2 }, { x: 2, y: 1 }, { x: 2, y: -2 }, { x: 0, y: -2 }]], [[{ x: 1, y: 1 }, { x: 1, y: -1 }, { x: -1, y: -1 }, { x: -1, y: 1 }]], [[{ x: 1, y: -1 }, { x: -1, y: -1 }, { x: 1, y: 2 }, { x: -1, y: 2 }], [{ x: -1, y: -1 }, { x: -1, y: 1 }, { x: 2, y: 1 }, { x: 2, y: -1 }]], [[{ x: 1, y: 2 }, { x: -1, y: 2 }, { x: 1, y: -2 }, { x: -1, y: -2 }], [{ x: 2, y: 1 }, { x: 2, y: -1 }, { x: -2, y: -1 }, { x: -2, y: 1 }]], [[{ x: 1, y: -2 }, { x: -1, y: -2 }, { x: 1, y: 3 }, { x: -1, y: 3 }], [{ x: -2, y: -1 }, { x: -2, y: 1 }, { x: 3, y: 1 }, { x: 3, y: -1 }]], [[{ x: 1, y: 3 }, { x: -1, y: 3 }, { x: 1, y: -3 }, { x: -1, y: -3 }], [{ x: 3, y: 1 }, { x: 3, y: -1 }, { x: -3, y: -1 }, { x: -3, y: 1 }]]];

  // src/movegen/movegen.ts
  var otherPlayer = (player) => player === 1 ? 0 : 1;
  var pieceData = pieces_default;
  var orientationData = piece_orientations_default;
  var cornersData = piece_corners_default;
  var cornerAttachersData = piece_corner_attachers_default;
  var getOrientationData = (pieceType, orientation) => {
    return orientationData[pieceType][orientation];
  };
  var isMoveLegal = (pseudoLegalMove, state) => {
    const toMove = pseudoLegalMove.piece.player;
    for (const tileA of getOrientationData(
      pseudoLegalMove.piece.pieceType,
      pseudoLegalMove.piece.orientation
    )) {
      const absA = {
        x: pseudoLegalMove.piece.location.x + tileA.x,
        y: pseudoLegalMove.piece.location.y + tileA.y
      };
      const inBounds = absA.x >= 0 && absA.x <= 13 && absA.y >= 0 && absA.y <= 13;
      if (!inBounds) {
        return false;
      }
      const myBitBoard = [state.playerABitBoard, state.playerBBitBoard][toMove];
      const opponentBitBoard = [state.playerBBitBoard, state.playerABitBoard][toMove];
      const ownTileAdjacent = getBitBoardValue(myBitBoard, { x: absA.x + 1, y: absA.y }) || getBitBoardValue(myBitBoard, { x: absA.x - 1, y: absA.y }) || getBitBoardValue(myBitBoard, { x: absA.x, y: absA.y + 1 }) || getBitBoardValue(myBitBoard, { x: absA.x, y: absA.y - 1 });
      const ownTileIntersect = getBitBoardValue(myBitBoard, { x: absA.x, y: absA.y });
      const opponentIntersect = getBitBoardValue(opponentBitBoard, { x: absA.x, y: absA.y });
      if (ownTileAdjacent || ownTileIntersect || opponentIntersect) {
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
          player: state.toMove,
          pieceType: piece,
          orientation: i
        };
        moves.push({ piece: placedPiece });
      }
    }
    return moves.filter((p) => isMoveLegal(p, state));
  };
  var generateFirstMove = (board) => {
    const myState = board.toMove === 0 ? board.playerA : board.playerB;
    const startPos = board.startPositions[board.toMove];
    const moves = [];
    for (const piece of myState.remainingPieces) {
      for (let i = 0; i < orientationData[piece].length; i++) {
        const pieceTiles = orientationData[piece][i];
        for (const tile of pieceTiles) {
          const pieceMiddle = { x: startPos.x - tile.x, y: startPos.y - tile.y };
          let placedPiece = {
            location: pieceMiddle,
            player: board.toMove,
            pieceType: piece,
            orientation: i
          };
          moves.push({ piece: placedPiece });
        }
      }
    }
    return moves.filter((p) => isMoveLegal(p, board));
  };
  var getAllLegalMoves = (board) => {
    const myPlacedPieces = board.pieces.filter((p) => p.player === board.toMove);
    if (myPlacedPieces.length === 0) {
      return generateFirstMove(board);
    }
    const myState = board.toMove === 0 ? board.playerA : board.playerB;
    const moves = [];
    for (const placedPiece of myPlacedPieces) {
      const cornerAttachers = cornerAttachersData[placedPiece.pieceType][placedPiece.orientation];
      for (const cornerAttacher of cornerAttachers) {
        const cornerAbsolute = {
          x: cornerAttacher.x + placedPiece.location.x,
          y: cornerAttacher.y + placedPiece.location.y
        };
        const playerATile = getBitBoardValue(board.playerABitBoard, cornerAbsolute);
        const playerBTile = getBitBoardValue(board.playerBBitBoard, cornerAbsolute);
        if (playerATile || playerBTile) {
          continue;
        }
        for (const unplacedPiece of myState.remainingPieces) {
          moves.push(...getLegalMovesFrom(cornerAbsolute, unplacedPiece, board));
        }
      }
    }
    return moves;
  };

  // src/board.ts
  var Board = class {
    constructor(startPosition) {
      this.pieces = [];
      this.playerA = {
        remainingPieces: /* @__PURE__ */ new Set()
      };
      this.playerABitBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      this.playerB = {
        remainingPieces: /* @__PURE__ */ new Set()
      };
      this.playerBBitBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      for (let i = 0; i < pieceData.length; i++) {
        this.playerA.remainingPieces.add(i);
        this.playerB.remainingPieces.add(i);
      }
      this.toMove = 0;
      this.startPosName = startPosition;
      if (startPosition === "middle") {
        this.startPositions = [
          { x: 4, y: 4 },
          { x: 9, y: 9 }
        ];
      } else {
        this.startPositions = [
          { x: 0, y: 13 },
          { x: 13, y: 0 }
        ];
      }
    }
    doMove(move) {
      this.pieces.push(move.piece);
      if (move.piece.player === 0) {
        this.playerA.remainingPieces.delete(move.piece.pieceType);
      } else {
        this.playerB.remainingPieces.delete(move.piece.pieceType);
      }
      const bitBoard = [this.playerABitBoard, this.playerBBitBoard][move.piece.player];
      for (const tile of getOrientationData(move.piece.pieceType, move.piece.orientation)) {
        const pieceCoord = {
          x: tile.x + move.piece.location.x,
          y: tile.y + move.piece.location.y
        };
        setBitBoardValue(bitBoard, pieceCoord, 1);
      }
      this.toMove = otherPlayer(this.toMove);
    }
    skipTurn() {
      this.toMove = otherPlayer(this.toMove);
    }
    undoMove(move) {
      const moveIndex = this.pieces.findIndex((p) => {
        return p.location.x === move.piece.location.x && p.location.y === move.piece.location.y && move.piece.pieceType === p.pieceType;
      });
      if (moveIndex === -1) {
        console.error("Err with move: ", move);
        throw new Error(`could not identify piece`);
      }
      this.pieces.splice(moveIndex, 1);
      if (move.piece.player === 0) {
        this.playerA.remainingPieces.add(move.piece.pieceType);
      } else {
        this.playerB.remainingPieces.add(move.piece.pieceType);
      }
      const bitBoard = [this.playerABitBoard, this.playerBBitBoard][move.piece.player];
      for (const tile of getOrientationData(move.piece.pieceType, move.piece.orientation)) {
        const pieceCoord = {
          x: tile.x + move.piece.location.x,
          y: tile.y + move.piece.location.y
        };
        setBitBoardValue(bitBoard, pieceCoord, 0);
      }
      this.toMove = otherPlayer(this.toMove);
    }
  };

  // src/minmax/bot.ts
  var recursiveBoardSearchAlphaBeta = (depth, board, alpha, beta) => {
    if (depth === 0) {
      return evaluate(board);
    }
    let moves = getAllLegalMoves(board);
    moves = moves.slice(Math.max(0, moves.length - 50));
    if (moves.length === 0) {
      return evaluate(board);
    }
    for (const move of moves) {
      board.doMove(move);
      const evaluation = -recursiveBoardSearchAlphaBeta(depth - 1, board, -beta, -alpha);
      board.undoMove(move);
      if (evaluation >= beta) {
        return beta;
      }
      alpha = Math.max(alpha, evaluation);
    }
    return alpha;
  };
  var evaluate = (board) => {
    const pAMobility = getAllLegalMoves(board).length / 100;
    board.skipTurn();
    const pBMobility = getAllLegalMoves(board).length / 100;
    board.skipTurn();
    const evaluation = countPlayerScore(board.playerA) - countPlayerScore(board.playerB) + (pAMobility - pBMobility);
    const perspective = board.toMove === 0 ? 1 : -1;
    return evaluation * perspective;
  };
  var countPlayerScore = (player) => {
    let score = 1e3;
    for (const remainingPiece of player.remainingPieces) {
      const pieceTile = getOrientationData(remainingPiece, 0);
      score -= pieceTile.length;
    }
    return score;
  };

  // src/worker.ts
  onmessage = (e) => {
    const board = new Board(e.data.startPos);
    for (const piece of e.data.boardStateMoves) {
      board.doMove({
        piece
      });
    }
    let bestMove = void 0;
    let bestMoveScore = -Infinity;
    for (const move of e.data.searchMoves) {
      board.doMove(move);
      let ourScore = 0;
      const depth = 2;
      const opponentScore = recursiveBoardSearchAlphaBeta(depth, board, -Infinity, Infinity);
      ourScore = -opponentScore;
      board.undoMove(move);
      if (ourScore > bestMoveScore) {
        bestMoveScore = ourScore;
        bestMove = move;
      }
    }
    if (bestMove === void 0) {
      postMessage(null);
    } else {
      postMessage({
        move: bestMove,
        score: bestMoveScore
      });
    }
  };
})();
