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
  var recursiveBoardSearchAlphaBeta = (depth, board, alpha, beta) => {
    if (depth === 0) {
      return evaluate(board);
    }
    const moves = getAllLegalMoves(board).slice(0, 50);
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
    const pAMobility = getAllLegalMoves(board).length / 20;
    board.skipTurn();
    const pBMobility = getAllLegalMoves(board).length / 20;
    board.skipTurn();
    const evaluation = countPlayerScore(board.playerA) - countPlayerScore(board.playerB) + (pAMobility - pBMobility);
    const perspective = board.toMove === 0 ? 1 : -1;
    return evaluation * perspective;
  };
  var countPlayerScore = (player) => {
    let score = 1e3;
    for (const remainingPiece of player.remainingPieces) {
      const pieceTile = getPieceData(remainingPiece, 0, false);
      score -= pieceTile.length;
    }
    return score;
  };

  // src/worker.ts
  onmessage = (e) => {
    const board = new BoardState();
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
