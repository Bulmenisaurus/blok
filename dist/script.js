"use strict";
(() => {
  // src/pieces.json
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

  // src/piece-permutations.json
  var piece_permutations_default = [
    [{ data: [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 1 }, { x: 0, y: -1 }, { x: 0, y: -2 }], rotation: 0, reflection: true }, { data: [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 0, y: -1 }, { x: 0, y: -2 }], rotation: 0, reflection: false }, { data: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: -1, y: 0 }, { x: -2, y: 0 }], rotation: 1, reflection: true }, { data: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: -1 }, { x: -1, y: 0 }, { x: -2, y: 0 }], rotation: 1, reflection: false }, { data: [{ x: 0, y: 0 }, { x: 0, y: -1 }, { x: 1, y: -1 }, { x: 0, y: 1 }, { x: 0, y: 2 }], rotation: 2, reflection: true }, { data: [{ x: 0, y: 0 }, { x: 0, y: -1 }, { x: -1, y: -1 }, { x: 0, y: 1 }, { x: 0, y: 2 }], rotation: 2, reflection: false }, { data: [{ x: 0, y: 0 }, { x: -1, y: 0 }, { x: -1, y: -1 }, { x: 1, y: 0 }, { x: 2, y: 0 }], rotation: 3, reflection: true }, { data: [{ x: 0, y: 0 }, { x: -1, y: 0 }, { x: -1, y: 1 }, { x: 1, y: 0 }, { x: 2, y: 0 }], rotation: 3, reflection: false }],
    [{ data: [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 0 }, { x: 0, y: -1 }, { x: 0, y: -2 }], rotation: 0, reflection: true }, { data: [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 0 }, { x: 0, y: -1 }, { x: 0, y: -2 }], rotation: 0, reflection: false }, { data: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: -1 }, { x: -1, y: 0 }, { x: -2, y: 0 }], rotation: 1, reflection: true }, { data: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 0 }, { x: -2, y: 0 }], rotation: 1, reflection: false }, { data: [{ x: 0, y: 0 }, { x: 0, y: -1 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }], rotation: 2, reflection: true }, { data: [{ x: 0, y: 0 }, { x: 0, y: -1 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }], rotation: 2, reflection: false }, { data: [{ x: 0, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 0 }, { x: 2, y: 0 }], rotation: 3, reflection: true }, { data: [{ x: 0, y: 0 }, { x: -1, y: 0 }, { x: 0, y: -1 }, { x: 1, y: 0 }, { x: 2, y: 0 }], rotation: 3, reflection: false }],
    [{ data: [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 1, y: 0 }, { x: 1, y: -1 }], rotation: 0, reflection: true }, { data: [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: -1, y: 0 }, { x: -1, y: -1 }], rotation: 0, reflection: false }, { data: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 0, y: -1 }, { x: -1, y: -1 }], rotation: 1, reflection: true }, { data: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 1 }], rotation: 1, reflection: false }, { data: [{ x: 0, y: 0 }, { x: 0, y: -1 }, { x: 0, y: -2 }, { x: -1, y: 0 }, { x: -1, y: 1 }], rotation: 2, reflection: true }, { data: [{ x: 0, y: 0 }, { x: 0, y: -1 }, { x: 0, y: -2 }, { x: 1, y: 0 }, { x: 1, y: 1 }], rotation: 2, reflection: false }, { data: [{ x: 0, y: 0 }, { x: -1, y: 0 }, { x: -2, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }], rotation: 3, reflection: true }, { data: [{ x: 0, y: 0 }, { x: -1, y: 0 }, { x: -2, y: 0 }, { x: 0, y: -1 }, { x: 1, y: -1 }], rotation: 3, reflection: false }],
    [{ data: [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 0 }], rotation: 0, reflection: true }, { data: [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 0 }], rotation: 0, reflection: false }, { data: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: -1 }], rotation: 1, reflection: false }, { data: [{ x: 0, y: 0 }, { x: 0, y: -1 }, { x: -1, y: 0 }], rotation: 2, reflection: false }],
    [{ data: [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 1 }, { x: 0, y: -1 }, { x: -1, y: -1 }], rotation: 0, reflection: true }, { data: [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 0, y: -1 }, { x: 1, y: -1 }], rotation: 0, reflection: false }, { data: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: -1, y: 0 }, { x: -1, y: 1 }], rotation: 1, reflection: true }, { data: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: -1 }, { x: -1, y: 0 }, { x: -1, y: -1 }], rotation: 1, reflection: false }],
    [{ data: [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: -1, y: 0 }, { x: -2, y: 0 }], rotation: 0, reflection: true }, { data: [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 1, y: 0 }, { x: 2, y: 0 }], rotation: 0, reflection: false }, { data: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 0, y: -1 }, { x: 0, y: -2 }], rotation: 1, reflection: false }, { data: [{ x: 0, y: 0 }, { x: 0, y: -1 }, { x: 0, y: -2 }, { x: -1, y: 0 }, { x: -2, y: 0 }], rotation: 2, reflection: false }],
    [{ data: [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 0, y: -1 }, { x: -1, y: -1 }], rotation: 0, reflection: true }, { data: [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 1 }, { x: 0, y: -1 }, { x: 1, y: -1 }], rotation: 0, reflection: false }, { data: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: -1 }, { x: -1, y: 0 }, { x: -1, y: 1 }], rotation: 1, reflection: true }, { data: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: -1, y: 0 }, { x: -1, y: -1 }], rotation: 1, reflection: false }],
    [{ data: [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 0 }, { x: 0, y: -1 }, { x: 1, y: 0 }], rotation: 0, reflection: true }],
    [{ data: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: -1, y: 0 }, { x: 0, y: -1 }, { x: 0, y: -2 }], rotation: 0, reflection: true }, { data: [{ x: 0, y: 0 }, { x: 0, y: -1 }, { x: 0, y: 1 }, { x: -1, y: 0 }, { x: -2, y: 0 }], rotation: 1, reflection: true }, { data: [{ x: 0, y: 0 }, { x: -1, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }], rotation: 2, reflection: true }, { data: [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 }, { x: 1, y: 0 }, { x: 2, y: 0 }], rotation: 3, reflection: true }],
    [{ data: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: -1 }, { x: -1, y: -1 }], rotation: 0, reflection: true }, { data: [{ x: 0, y: 0 }, { x: -1, y: 0 }, { x: -1, y: 1 }, { x: 0, y: -1 }, { x: 1, y: -1 }], rotation: 0, reflection: false }, { data: [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: -1, y: 0 }, { x: -1, y: -1 }], rotation: 1, reflection: false }, { data: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: -1 }, { x: 0, y: 1 }, { x: -1, y: 1 }], rotation: 2, reflection: false }],
    [{ data: [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 1 }, { x: -1, y: 0 }, { x: 0, y: -1 }], rotation: 0, reflection: true }, { data: [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 1, y: 0 }, { x: 0, y: -1 }], rotation: 0, reflection: false }, { data: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 }, { x: -1, y: 0 }], rotation: 1, reflection: true }, { data: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: -1 }, { x: 0, y: -1 }, { x: -1, y: 0 }], rotation: 1, reflection: false }, { data: [{ x: 0, y: 0 }, { x: 0, y: -1 }, { x: 1, y: -1 }, { x: 1, y: 0 }, { x: 0, y: 1 }], rotation: 2, reflection: true }, { data: [{ x: 0, y: 0 }, { x: 0, y: -1 }, { x: -1, y: -1 }, { x: -1, y: 0 }, { x: 0, y: 1 }], rotation: 2, reflection: false }, { data: [{ x: 0, y: 0 }, { x: -1, y: 0 }, { x: -1, y: -1 }, { x: 0, y: -1 }, { x: 1, y: 0 }], rotation: 3, reflection: true }, { data: [{ x: 0, y: 0 }, { x: -1, y: 0 }, { x: -1, y: 1 }, { x: 0, y: 1 }, { x: 1, y: 0 }], rotation: 3, reflection: false }],
    [{ data: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: -1 }, { x: 0, y: 1 }, { x: -1, y: 1 }], rotation: 0, reflection: true }, { data: [{ x: 0, y: 0 }, { x: -1, y: 0 }, { x: 0, y: -1 }, { x: 0, y: 1 }, { x: 1, y: 1 }], rotation: 0, reflection: false }, { data: [{ x: 0, y: 0 }, { x: 0, y: -1 }, { x: -1, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }], rotation: 1, reflection: true }, { data: [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 0 }, { x: 1, y: 0 }, { x: 1, y: -1 }], rotation: 1, reflection: false }, { data: [{ x: 0, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 }, { x: 1, y: -1 }], rotation: 2, reflection: true }, { data: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 }, { x: -1, y: -1 }], rotation: 2, reflection: false }, { data: [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 0 }, { x: -1, y: 0 }, { x: -1, y: -1 }], rotation: 3, reflection: true }, { data: [{ x: 0, y: 0 }, { x: 0, y: -1 }, { x: 1, y: 0 }, { x: -1, y: 0 }, { x: -1, y: 1 }], rotation: 3, reflection: false }],
    [{ data: [{ x: 0, y: 0 }, { x: -1, y: 0 }, { x: -1, y: 1 }, { x: 0, y: 1 }], rotation: 0, reflection: true }],
    [{ data: [{ x: 0, y: 0 }, { x: -1, y: 0 }, { x: 1, y: 0 }, { x: 1, y: -1 }], rotation: 0, reflection: false }, { data: [{ x: 0, y: 0 }, { x: 0, y: -1 }, { x: 0, y: 1 }, { x: -1, y: 1 }], rotation: 1, reflection: true }, { data: [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 }, { x: -1, y: -1 }], rotation: 1, reflection: false }, { data: [{ x: 0, y: 0 }, { x: -1, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }], rotation: 2, reflection: true }, { data: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: -1, y: 0 }, { x: -1, y: 1 }], rotation: 2, reflection: false }, { data: [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 }, { x: 1, y: -1 }], rotation: 3, reflection: true }, { data: [{ x: 0, y: 0 }, { x: 0, y: -1 }, { x: 0, y: 1 }, { x: 1, y: 1 }], rotation: 3, reflection: false }],
    [{ data: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: -1, y: 0 }, { x: 0, y: -1 }], rotation: 0, reflection: true }, { data: [{ x: 0, y: 0 }, { x: 0, y: -1 }, { x: 0, y: 1 }, { x: -1, y: 0 }], rotation: 1, reflection: true }, { data: [{ x: 0, y: 0 }, { x: -1, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }], rotation: 2, reflection: true }, { data: [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 }, { x: 1, y: 0 }], rotation: 3, reflection: true }],
    [{ data: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: -1 }, { x: -1, y: -1 }], rotation: 0, reflection: true }, { data: [{ x: 0, y: 0 }, { x: -1, y: 0 }, { x: 0, y: -1 }, { x: 1, y: -1 }], rotation: 0, reflection: false }, { data: [{ x: 0, y: 0 }, { x: 0, y: -1 }, { x: -1, y: 0 }, { x: -1, y: 1 }], rotation: 1, reflection: true }, { data: [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 0 }, { x: -1, y: -1 }], rotation: 1, reflection: false }],
    [{ data: [{ x: 0, y: 0 }], rotation: 0, reflection: true }],
    [{ data: [{ x: 0, y: 0 }, { x: 0, y: 1 }], rotation: 0, reflection: false }, { data: [{ x: 0, y: 0 }, { x: 1, y: 0 }], rotation: 1, reflection: true }],
    [{ data: [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 }], rotation: 0, reflection: false }, { data: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: -1, y: 0 }], rotation: 1, reflection: true }],
    [{ data: [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 }, { x: 0, y: 2 }], rotation: 0, reflection: false }, { data: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: -1, y: 0 }, { x: 2, y: 0 }], rotation: 1, reflection: true }],
    [{ data: [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 0, y: -1 }, { x: 0, y: -2 }], rotation: 0, reflection: false }, { data: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: -1, y: 0 }, { x: -2, y: 0 }], rotation: 1, reflection: true }]
  ];

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

  // src/movegen.ts
  var otherPlayer = (player) => player === 1 ? 0 : 1;
  var pieceData = pieces_default;
  var permutationData = piece_permutations_default;
  var getPieceData = (pieceType, rotation, reflection) => {
    let data = pieceData[pieceType];
    for (let i = 0; i < rotation; i++) {
      data = rotate90Deg(data);
    }
    if (reflection) {
      data = reflect(data);
    }
    return data;
  };
  var BoardState = class {
    constructor() {
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
    }
    doMove(move) {
      this.pieces.push(move.piece);
      if (move.piece.player === 0) {
        this.playerA.remainingPieces.delete(move.piece.pieceType);
      } else {
        this.playerB.remainingPieces.delete(move.piece.pieceType);
      }
      const bitBoard = [this.playerABitBoard, this.playerBBitBoard][move.piece.player];
      for (const tile of getPieceData(
        move.piece.pieceType,
        move.piece.rotation,
        move.piece.reflection
      )) {
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
      for (const tile of getPieceData(
        move.piece.pieceType,
        move.piece.rotation,
        move.piece.reflection
      )) {
        const pieceCoord = {
          x: tile.x + move.piece.location.x,
          y: tile.y + move.piece.location.y
        };
        setBitBoardValue(bitBoard, pieceCoord, 0);
      }
      this.toMove = otherPlayer(this.toMove);
    }
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
  var coordPresent = (coords, check) => {
    for (const c of coords) {
      if (c.x === check.x && c.y === check.y) {
        return true;
      }
    }
    return false;
  };
  var isMoveLegal = (pseudoLegalMove, state) => {
    const toMove = pseudoLegalMove.piece.player;
    for (const tileA of getPieceData(
      pseudoLegalMove.piece.pieceType,
      pseudoLegalMove.piece.rotation,
      pseudoLegalMove.piece.reflection
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
  var rotateCoord90Deg = (c) => {
    return { x: c.y, y: -c.x };
  };
  var rotate90Deg = (pieceData2) => {
    return pieceData2.map((c) => rotateCoord90Deg(c));
  };
  var reflect = (pieceData2) => {
    return pieceData2.map((p) => ({ x: -p.x, y: p.y }));
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
      bottomLeft: { x: minX, y: minY },
      topRight: { x: maxX, y: maxY },
      width: maxX - minX + 1,
      height: maxY - minY + 1
    };
  };
  var getLegalMovesFrom = (from, piece, state) => {
    const moves = [];
    for (const permutation of permutationData[piece]) {
      for (const corner of getCorners(permutation.data)) {
        const pieceMiddle = { x: from.x - corner.x, y: from.y - corner.y };
        let placedPiece = {
          location: pieceMiddle,
          player: state.toMove,
          pieceType: piece,
          rotation: permutation.rotation,
          reflection: permutation.reflection
        };
        moves.push({ piece: placedPiece });
      }
    }
    return moves.filter((p) => isMoveLegal(p, state));
  };
  var getAllLegalMoves = (board) => {
    const myPlacedPieces = board.pieces.filter((p) => p.player === board.toMove);
    if (myPlacedPieces.length === 0) {
      if (board.toMove === 0) {
        return [
          {
            piece: {
              pieceType: 5,
              location: { x: 4, y: 4 },
              player: 0,
              rotation: 0,
              reflection: false
            }
          }
        ];
      } else {
        return [
          {
            piece: {
              pieceType: 0,
              location: { x: 9, y: 9 },
              player: 1,
              rotation: 0,
              reflection: false
            }
          }
        ];
      }
    }
    const myState = board.toMove === 0 ? board.playerA : board.playerB;
    const moves = [];
    for (const placedPiece of myPlacedPieces) {
      const pieceData2 = getPieceData(
        placedPiece.pieceType,
        placedPiece.rotation,
        placedPiece.reflection
      );
      for (const cornerAttacher of getCornerAttachers(pieceData2)) {
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

  // src/bot.ts
  var findMove = async (board, workers, overrideDepth) => {
    const startTime = Date.now();
    const allMoves = getAllLegalMoves(board).slice(0, 50);
    const filteredMoves = allMoves.filter((m) => {
      if (board.pieces.length < 5 && getPieceData(m.piece.pieceType, 0, false).length !== 5) {
        return false;
      }
      return true;
    });
    const response = await workers.findMove(filteredMoves, board);
    const endTime = Date.now();
    console.log(`Took ${endTime - startTime}ms to evaluate positions. Bestmove ${response?.score}`);
    if (response === null) {
      return void 0;
    } else {
      return response.move;
    }
  };

  // src/renderer.ts
  var render = (canvas, ctx, boardState, previewPiece) => {
    canvas.width = 500;
    canvas.height = 500;
    drawBackground(ctx);
    startPos(ctx, { x: 4, y: 4 });
    startPos(ctx, { x: 9, y: 9 });
    for (const piece of boardState.pieces) {
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
    for (const tile of getPieceData(piece.pieceType, piece.rotation, piece.reflection)) {
      const tileCoordinate = {
        x: tile.x + piece.location.x,
        y: tile.y + piece.location.y
      };
      renderTile(ctx, tileCoordinate, piece.player, preview);
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

  // src/interactiveCanvas.ts
  var InteractiveCanvas = class {
    constructor(board, workers) {
      const canvas = document.getElementById("canvas");
      const ctx = canvas.getContext("2d");
      this.canvas = canvas;
      this.ctx = ctx;
      this.board = board;
      this.workers = workers;
      this.carousel = document.getElementById("blocks-carousel");
      this.carouselCanvases = [];
      this.initCarousel();
      this.selectedPiece = null;
      this.mousePosition = { x: 0, y: 0 };
      this.selectedPieceRotation = 0;
      this.selectedPieceFlipped = false;
      this.canvas.addEventListener("mousemove", (e) => {
        this.mouseMove(e);
      });
      this.canvas.addEventListener("click", (e) => {
        this.click(e);
      });
      window.addEventListener("keydown", (e) => {
        this.keyDown(e);
      });
      window.requestAnimationFrame(() => this.drawLoop());
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
      const move = {
        piece: {
          location: this.mousePosition,
          pieceType: this.selectedPiece,
          player: 0,
          rotation: this.selectedPieceRotation,
          reflection: this.selectedPieceFlipped
        }
      };
      this.board.doMove(move);
      this.updateCarouselVisibility();
      this.updateScore();
      this.selectedPiece = null;
      this.selectedPieceRotation = 0;
      const botMove = findMove(this.board, this.workers).then((move2) => {
        if (move2 === void 0) {
          console.log("no bot move");
          this.board.skipTurn();
        } else {
          this.board.doMove(move2);
        }
        this.updateScore();
      });
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
        const piece = getPieceData(pieceType, 0, false);
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
      for (const [pieceType, piece] of pieceData.entries()) {
        if (this.board.playerA.remainingPieces.has(pieceType)) {
          this.carouselCanvases[pieceType].classList.remove("hidden");
        } else {
          this.carouselCanvases[pieceType].classList.add("hidden");
        }
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
          x: tile.x - pieceBoundingBox.bottomLeft.x,
          y: tile.y - pieceBoundingBox.bottomLeft.y
        };
        const canvasCoords = {
          x: shiftedCoords.x * 100,
          y: shiftedCoords.y * 100
        };
        pieceCtx.beginPath();
        pieceCtx.rect(canvasCoords.x, canvasCoords.y, 100, 100);
        pieceCtx.fillStyle = "green";
        pieceCtx.fill();
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
      }
      return pieceCanvas;
    }
    drawLoop() {
      let piecePreview;
      if (this.selectedPiece !== null) {
        piecePreview = {
          location: this.mousePosition,
          pieceType: this.selectedPiece,
          player: 0,
          rotation: this.selectedPieceRotation,
          reflection: this.selectedPieceFlipped
        };
      }
      render(this.canvas, this.ctx, this.board, piecePreview);
      window.requestAnimationFrame(() => this.drawLoop());
    }
    score() {
      return {
        playerA: this.board.pieces.filter((p) => p.player === 0).map((p) => getPieceData(p.pieceType, 0, false).length).reduce((a, b) => a + b, 0),
        playerB: this.board.pieces.filter((p) => p.player === 1).map((p) => getPieceData(p.pieceType, 0, false).length).reduce((a, b) => a + b, 0)
      };
    }
    updateScore() {
      const userScore = document.querySelector("#user-score-container > .score");
      const botScore = document.querySelector("#bot-score-container > .score");
      const { playerA, playerB } = this.score();
      userScore.innerText = playerA.toString();
      botScore.innerText = playerB.toString();
    }
  };

  // src/workerManager.ts
  var WorkerManager = class {
    constructor() {
      this.workers = [];
      this.numWorkers = navigator.hardwareConcurrency;
      for (let i = 0; i < this.numWorkers; i++) {
        this.workers.push(new Worker("./dist/worker.js"));
      }
    }
    async findMove(moves, board) {
      const workerTasks = [];
      for (let i = 0; i < this.numWorkers; i++) {
        workerTasks.push([]);
      }
      for (let i = 0; i < moves.length; i++) {
        workerTasks[i % this.numWorkers].push(moves[i]);
      }
      const requests = [];
      for (let i = 0; i < this.numWorkers; i++) {
        requests.push(this.workerRequest(this.workers[i], board, workerTasks[i]));
      }
      console.log(requests);
      const responses = await Promise.all(requests);
      let bestResponse = null;
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
    workerRequest(worker, board, task) {
      const responsePromise = new Promise((resolve) => {
        worker.onmessage = (message2) => {
          resolve(message2.data);
          worker.onmessage = null;
        };
      });
      const message = { boardStateMoves: board.pieces, searchMoves: task };
      worker.postMessage(message);
      return responsePromise;
    }
  };

  // src/script.ts
  var main = () => {
    const boardState = new BoardState();
    const workers = new WorkerManager();
    const interactiveCanvas = new InteractiveCanvas(boardState, workers);
  };
  main();
})();
