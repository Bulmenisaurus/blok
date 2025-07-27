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
var piece_orientations_default = [
  [
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
      { x: -1, y: 1 },
      { x: 0, y: -1 },
      { x: 0, y: -2 }
    ],
    [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 1, y: -1 },
      { x: -1, y: 0 },
      { x: -2, y: 0 }
    ],
    [
      { x: 0, y: 0 },
      { x: -1, y: 0 },
      { x: -1, y: -1 },
      { x: 1, y: 0 },
      { x: 2, y: 0 }
    ],
    [
      { x: 0, y: 0 },
      { x: 0, y: -1 },
      { x: -1, y: -1 },
      { x: 0, y: 1 },
      { x: 0, y: 2 }
    ],
    [
      { x: 0, y: 0 },
      { x: 0, y: -1 },
      { x: 1, y: -1 },
      { x: 0, y: 1 },
      { x: 0, y: 2 }
    ],
    [
      { x: 0, y: 0 },
      { x: -1, y: 0 },
      { x: -1, y: 1 },
      { x: 1, y: 0 },
      { x: 2, y: 0 }
    ],
    [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: -1, y: 0 },
      { x: -2, y: 0 }
    ]
  ],
  [
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
      { x: 1, y: 0 },
      { x: 0, y: -1 },
      { x: 0, y: -2 }
    ],
    [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: -1, y: 0 },
      { x: -2, y: 0 }
    ],
    [
      { x: 0, y: 0 },
      { x: -1, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 0 },
      { x: 2, y: 0 }
    ],
    [
      { x: 0, y: 0 },
      { x: 0, y: -1 },
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: 2 }
    ],
    [
      { x: 0, y: 0 },
      { x: 0, y: -1 },
      { x: -1, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: 2 }
    ],
    [
      { x: 0, y: 0 },
      { x: -1, y: 0 },
      { x: 0, y: -1 },
      { x: 1, y: 0 },
      { x: 2, y: 0 }
    ],
    [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: -1 },
      { x: -1, y: 0 },
      { x: -2, y: 0 }
    ]
  ],
  [
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
      { x: 0, y: 2 },
      { x: 1, y: 0 },
      { x: 1, y: -1 }
    ],
    [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 0, y: 1 },
      { x: -1, y: 1 }
    ],
    [
      { x: 0, y: 0 },
      { x: -1, y: 0 },
      { x: -2, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 }
    ],
    [
      { x: 0, y: 0 },
      { x: 0, y: -1 },
      { x: 0, y: -2 },
      { x: 1, y: 0 },
      { x: 1, y: 1 }
    ],
    [
      { x: 0, y: 0 },
      { x: 0, y: -1 },
      { x: 0, y: -2 },
      { x: -1, y: 0 },
      { x: -1, y: 1 }
    ],
    [
      { x: 0, y: 0 },
      { x: -1, y: 0 },
      { x: -2, y: 0 },
      { x: 0, y: -1 },
      { x: 1, y: -1 }
    ],
    [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 0, y: -1 },
      { x: -1, y: -1 }
    ]
  ],
  [
    [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 0 }
    ],
    [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: -1, y: 0 }
    ],
    [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: -1 }
    ],
    [
      { x: 0, y: 0 },
      { x: -1, y: 0 },
      { x: 0, y: -1 }
    ]
  ],
  [
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
      { x: -1, y: 1 },
      { x: 0, y: -1 },
      { x: -1, y: -1 }
    ],
    [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 1, y: -1 },
      { x: -1, y: 0 },
      { x: -1, y: -1 }
    ],
    [
      { x: 0, y: 0 },
      { x: -1, y: 0 },
      { x: -1, y: 1 },
      { x: 1, y: 0 },
      { x: 1, y: 1 }
    ]
  ],
  [
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
      { x: 0, y: 2 },
      { x: -1, y: 0 },
      { x: -2, y: 0 }
    ],
    [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 0, y: -1 },
      { x: 0, y: -2 }
    ],
    [
      { x: 0, y: 0 },
      { x: -1, y: 0 },
      { x: -2, y: 0 },
      { x: 0, y: -1 },
      { x: 0, y: -2 }
    ]
  ],
  [
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
      { x: 1, y: 1 },
      { x: 0, y: -1 },
      { x: -1, y: -1 }
    ],
    [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: -1, y: 0 },
      { x: -1, y: -1 }
    ],
    [
      { x: 0, y: 0 },
      { x: -1, y: 0 },
      { x: -1, y: 1 },
      { x: 1, y: 0 },
      { x: 1, y: -1 }
    ]
  ],
  [
    [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 0 },
      { x: 0, y: -1 },
      { x: -1, y: 0 }
    ]
  ],
  [
    [
      { x: 0, y: 0 },
      { x: -1, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: -1 },
      { x: 0, y: -2 }
    ],
    [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: -1 },
      { x: -1, y: 0 },
      { x: -2, y: 0 }
    ],
    [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: -1 },
      { x: 1, y: 0 },
      { x: 2, y: 0 }
    ],
    [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: -1, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: 2 }
    ]
  ],
  [
    [
      { x: 0, y: 0 },
      { x: -1, y: 0 },
      { x: -1, y: 1 },
      { x: 0, y: -1 },
      { x: 1, y: -1 }
    ],
    [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 0, y: -1 },
      { x: -1, y: -1 }
    ],
    [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: -1, y: 0 },
      { x: -1, y: -1 }
    ],
    [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: -1, y: 1 },
      { x: 1, y: 0 },
      { x: 1, y: -1 }
    ]
  ],
  [
    [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 1, y: 0 },
      { x: 0, y: -1 }
    ],
    [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: -1, y: 1 },
      { x: -1, y: 0 },
      { x: 0, y: -1 }
    ],
    [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 1, y: -1 },
      { x: 0, y: -1 },
      { x: -1, y: 0 }
    ],
    [
      { x: 0, y: 0 },
      { x: -1, y: 0 },
      { x: -1, y: -1 },
      { x: 0, y: -1 },
      { x: 1, y: 0 }
    ],
    [
      { x: 0, y: 0 },
      { x: 0, y: -1 },
      { x: -1, y: -1 },
      { x: -1, y: 0 },
      { x: 0, y: 1 }
    ],
    [
      { x: 0, y: 0 },
      { x: 0, y: -1 },
      { x: 1, y: -1 },
      { x: 1, y: 0 },
      { x: 0, y: 1 }
    ],
    [
      { x: 0, y: 0 },
      { x: -1, y: 0 },
      { x: -1, y: 1 },
      { x: 0, y: 1 },
      { x: 1, y: 0 }
    ],
    [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 0, y: 1 },
      { x: -1, y: 0 }
    ]
  ],
  [
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
      { x: 0, y: -1 },
      { x: 0, y: 1 },
      { x: -1, y: 1 }
    ],
    [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: -1, y: 0 },
      { x: 1, y: 0 },
      { x: 1, y: -1 }
    ],
    [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 0 },
      { x: -1, y: 0 },
      { x: -1, y: -1 }
    ],
    [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: -1 },
      { x: -1, y: -1 }
    ],
    [
      { x: 0, y: 0 },
      { x: -1, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: -1 },
      { x: 1, y: -1 }
    ],
    [
      { x: 0, y: 0 },
      { x: 0, y: -1 },
      { x: 1, y: 0 },
      { x: -1, y: 0 },
      { x: -1, y: 1 }
    ],
    [
      { x: 0, y: 0 },
      { x: 0, y: -1 },
      { x: -1, y: 0 },
      { x: 1, y: 0 },
      { x: 1, y: 1 }
    ]
  ],
  [
    [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 0, y: 1 }
    ]
  ],
  [
    [
      { x: 0, y: 0 },
      { x: -1, y: 0 },
      { x: 1, y: 0 },
      { x: 1, y: -1 }
    ],
    [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: -1, y: 0 },
      { x: -1, y: -1 }
    ],
    [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: -1 },
      { x: -1, y: -1 }
    ],
    [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: -1 },
      { x: 1, y: -1 }
    ],
    [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: -1, y: 0 },
      { x: -1, y: 1 }
    ],
    [
      { x: 0, y: 0 },
      { x: -1, y: 0 },
      { x: 1, y: 0 },
      { x: 1, y: 1 }
    ],
    [
      { x: 0, y: 0 },
      { x: 0, y: -1 },
      { x: 0, y: 1 },
      { x: 1, y: 1 }
    ],
    [
      { x: 0, y: 0 },
      { x: 0, y: -1 },
      { x: 0, y: 1 },
      { x: -1, y: 1 }
    ]
  ],
  [
    [
      { x: 0, y: 0 },
      { x: -1, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: -1 }
    ],
    [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: -1 },
      { x: -1, y: 0 }
    ],
    [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: -1 },
      { x: 1, y: 0 }
    ],
    [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: -1, y: 0 },
      { x: 0, y: 1 }
    ]
  ],
  [
    [
      { x: 0, y: 0 },
      { x: -1, y: 0 },
      { x: 0, y: -1 },
      { x: 1, y: -1 }
    ],
    [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: -1 },
      { x: -1, y: -1 }
    ],
    [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: -1, y: 0 },
      { x: -1, y: -1 }
    ],
    [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 0 },
      { x: 1, y: -1 }
    ]
  ],
  [[{ x: 0, y: 0 }]],
  [
    [
      { x: 0, y: 0 },
      { x: 0, y: 1 }
    ],
    [
      { x: 0, y: 0 },
      { x: 1, y: 0 }
    ]
  ],
  [
    [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: -1 }
    ],
    [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: -1, y: 0 }
    ]
  ],
  [
    [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: -1 },
      { x: 0, y: 2 }
    ],
    [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: -1, y: 0 },
      { x: 2, y: 0 }
    ]
  ],
  [
    [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: 2 },
      { x: 0, y: -1 },
      { x: 0, y: -2 }
    ],
    [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: -1, y: 0 },
      { x: -2, y: 0 }
    ]
  ]
];

// src/movegen/piece-corners.json
var piece_corners_default = [[[{ x: 0, y: 3 }, { x: 1, y: 3 }, { x: 0, y: 0 }], [{ x: 0, y: 3 }, { x: -1, y: 3 }, { x: 0, y: 0 }], [{ x: 3, y: 0 }, { x: 3, y: -1 }, { x: 0, y: 0 }], [{ x: -3, y: 0 }, { x: -3, y: -1 }, { x: 0, y: 0 }], [{ x: 0, y: -3 }, { x: -1, y: -3 }, { x: 0, y: 0 }], [{ x: 0, y: -3 }, { x: 1, y: -3 }, { x: 0, y: 0 }], [{ x: -3, y: 0 }, { x: -3, y: 1 }, { x: 0, y: 0 }], [{ x: 3, y: 0 }, { x: 3, y: 1 }, { x: 0, y: 0 }]], [[{ x: 1, y: 3 }, { x: 0, y: 2 }, { x: 1, y: 0 }], [{ x: -1, y: 3 }, { x: 0, y: 2 }, { x: -1, y: 0 }], [{ x: 3, y: -1 }, { x: 2, y: 0 }, { x: 0, y: -1 }], [{ x: -3, y: -1 }, { x: -2, y: 0 }, { x: 0, y: -1 }], [{ x: -1, y: -3 }, { x: 0, y: -2 }, { x: -1, y: 0 }], [{ x: 1, y: -3 }, { x: 0, y: -2 }, { x: 1, y: 0 }], [{ x: -3, y: 1 }, { x: -2, y: 0 }, { x: 0, y: 1 }], [{ x: 3, y: 1 }, { x: 2, y: 0 }, { x: 0, y: 1 }]], [[{ x: 1, y: 1 }, { x: 1, y: 3 }, { x: 0, y: 1 }, { x: 0, y: 0 }], [{ x: -1, y: 1 }, { x: -1, y: 3 }, { x: 0, y: 1 }, { x: 0, y: 0 }], [{ x: 1, y: -1 }, { x: 3, y: -1 }, { x: 1, y: 0 }, { x: 0, y: 0 }], [{ x: -1, y: -1 }, { x: -3, y: -1 }, { x: -1, y: 0 }, { x: 0, y: 0 }], [{ x: -1, y: -1 }, { x: -1, y: -3 }, { x: 0, y: -1 }, { x: 0, y: 0 }], [{ x: 1, y: -1 }, { x: 1, y: -3 }, { x: 0, y: -1 }, { x: 0, y: 0 }], [{ x: -1, y: 1 }, { x: -3, y: 1 }, { x: -1, y: 0 }, { x: 0, y: 0 }], [{ x: 1, y: 1 }, { x: 3, y: 1 }, { x: 1, y: 0 }, { x: 0, y: 0 }]], [[{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 0 }], [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 0 }], [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: -1 }], [{ x: 0, y: 0 }, { x: -1, y: 0 }, { x: 0, y: -1 }]], [[{ x: 0, y: 2 }, { x: 1, y: 2 }, { x: 0, y: 0 }, { x: 1, y: 0 }], [{ x: 0, y: 2 }, { x: -1, y: 2 }, { x: 0, y: 0 }, { x: -1, y: 0 }], [{ x: 2, y: 0 }, { x: 2, y: -1 }, { x: 0, y: 0 }, { x: 0, y: -1 }], [{ x: -2, y: 0 }, { x: -2, y: 1 }, { x: 0, y: 0 }, { x: 0, y: 1 }]], [[{ x: 0, y: 0 }, { x: 0, y: 2 }, { x: 2, y: 0 }], [{ x: 0, y: 0 }, { x: 0, y: 2 }, { x: -2, y: 0 }], [{ x: 0, y: 0 }, { x: 2, y: 0 }, { x: 0, y: -2 }], [{ x: 0, y: 0 }, { x: -2, y: 0 }, { x: 0, y: -2 }]], [[{ x: 1, y: 2 }, { x: 0, y: 2 }, { x: 1, y: 0 }, { x: 2, y: 0 }], [{ x: -1, y: 2 }, { x: 0, y: 2 }, { x: -1, y: 0 }, { x: -2, y: 0 }], [{ x: 2, y: -1 }, { x: 2, y: 0 }, { x: 0, y: -1 }, { x: 0, y: -2 }], [{ x: -2, y: -1 }, { x: -2, y: 0 }, { x: 0, y: -1 }, { x: 0, y: -2 }]], [[{ x: 1, y: 2 }, { x: 2, y: 1 }, { x: 1, y: 0 }, { x: 0, y: 1 }]], [[{ x: 0, y: 2 }, { x: 2, y: 2 }, { x: 1, y: 0 }], [{ x: 2, y: 0 }, { x: 2, y: -2 }, { x: 0, y: -1 }], [{ x: -2, y: 0 }, { x: -2, y: -2 }, { x: 0, y: -1 }], [{ x: 0, y: -2 }, { x: -2, y: -2 }, { x: -1, y: 0 }]], [[{ x: 1, y: 1 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 1, y: 0 }, { x: 2, y: 0 }], [{ x: -1, y: 1 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: -1, y: 0 }, { x: -2, y: 0 }], [{ x: 1, y: -1 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 0, y: -1 }, { x: 0, y: -2 }], [{ x: -1, y: -1 }, { x: -1, y: 0 }, { x: -2, y: 0 }, { x: 0, y: -1 }, { x: 0, y: -2 }]], [[{ x: 0, y: 2 }, { x: 1, y: 2 }, { x: 1, y: 1 }, { x: 0, y: 0 }], [{ x: 0, y: 2 }, { x: -1, y: 2 }, { x: -1, y: 1 }, { x: 0, y: 0 }], [{ x: 2, y: 0 }, { x: 2, y: -1 }, { x: 1, y: -1 }, { x: 0, y: 0 }], [{ x: -2, y: 0 }, { x: -2, y: -1 }, { x: -1, y: -1 }, { x: 0, y: 0 }], [{ x: 0, y: -2 }, { x: -1, y: -2 }, { x: -1, y: -1 }, { x: 0, y: 0 }], [{ x: 0, y: -2 }, { x: 1, y: -2 }, { x: 1, y: -1 }, { x: 0, y: 0 }], [{ x: -2, y: 0 }, { x: -2, y: 1 }, { x: -1, y: 1 }, { x: 0, y: 0 }], [{ x: 2, y: 0 }, { x: 2, y: 1 }, { x: 1, y: 1 }, { x: 0, y: 0 }]], [[{ x: 0, y: 1 }, { x: 1, y: 0 }, { x: 1, y: 2 }, { x: 2, y: 2 }], [{ x: 0, y: 1 }, { x: -1, y: 0 }, { x: -1, y: 2 }, { x: -2, y: 2 }], [{ x: 1, y: 0 }, { x: 0, y: -1 }, { x: 2, y: -1 }, { x: 2, y: -2 }], [{ x: -1, y: 0 }, { x: 0, y: -1 }, { x: -2, y: -1 }, { x: -2, y: -2 }], [{ x: 0, y: -1 }, { x: -1, y: 0 }, { x: -1, y: -2 }, { x: -2, y: -2 }], [{ x: 0, y: -1 }, { x: 1, y: 0 }, { x: 1, y: -2 }, { x: 2, y: -2 }], [{ x: -1, y: 0 }, { x: 0, y: 1 }, { x: -2, y: 1 }, { x: -2, y: 2 }], [{ x: 1, y: 0 }, { x: 0, y: 1 }, { x: 2, y: 1 }, { x: 2, y: 2 }]], [[{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 }]], [[{ x: 0, y: 1 }, { x: 2, y: 1 }, { x: 2, y: 0 }], [{ x: 0, y: 1 }, { x: -2, y: 1 }, { x: -2, y: 0 }], [{ x: 1, y: 0 }, { x: 1, y: -2 }, { x: 0, y: -2 }], [{ x: -1, y: 0 }, { x: -1, y: -2 }, { x: 0, y: -2 }], [{ x: 0, y: -1 }, { x: -2, y: -1 }, { x: -2, y: 0 }], [{ x: 0, y: -1 }, { x: 2, y: -1 }, { x: 2, y: 0 }], [{ x: -1, y: 0 }, { x: -1, y: 2 }, { x: 0, y: 2 }], [{ x: 1, y: 0 }, { x: 1, y: 2 }, { x: 0, y: 2 }]], [[{ x: 0, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 0 }], [{ x: 1, y: 0 }, { x: 1, y: -2 }, { x: 0, y: -1 }], [{ x: -1, y: 0 }, { x: -1, y: -2 }, { x: 0, y: -1 }], [{ x: 0, y: -1 }, { x: -2, y: -1 }, { x: -1, y: 0 }]], [[{ x: 1, y: 1 }, { x: 0, y: 1 }, { x: 1, y: 0 }, { x: 2, y: 0 }], [{ x: -1, y: 1 }, { x: 0, y: 1 }, { x: -1, y: 0 }, { x: -2, y: 0 }], [{ x: 1, y: -1 }, { x: 1, y: 0 }, { x: 0, y: -1 }, { x: 0, y: -2 }], [{ x: -1, y: -1 }, { x: -1, y: 0 }, { x: 0, y: -1 }, { x: 0, y: -2 }]], [[{ x: 0, y: 0 }]], [[{ x: 0, y: 0 }, { x: 0, y: 1 }], [{ x: 0, y: 0 }, { x: 1, y: 0 }]], [[{ x: 0, y: 2 }, { x: 0, y: 0 }], [{ x: 2, y: 0 }, { x: 0, y: 0 }]], [[{ x: 0, y: 0 }, { x: 0, y: 3 }], [{ x: 0, y: 0 }, { x: 3, y: 0 }]], [[{ x: 0, y: 4 }, { x: 0, y: 0 }], [{ x: 4, y: 0 }, { x: 0, y: 0 }]]];

// src/movegen/piece-corner-attachers.json
var piece_corner_attachers_default = [[[{ x: -1, y: 4 }, { x: 2, y: 4 }, { x: 2, y: 2 }, { x: 1, y: -1 }, { x: -1, y: -1 }], [{ x: 1, y: 4 }, { x: -2, y: 2 }, { x: -2, y: 4 }, { x: 1, y: -1 }, { x: -1, y: -1 }], [{ x: 4, y: 1 }, { x: 4, y: -2 }, { x: 2, y: -2 }, { x: -1, y: -1 }, { x: -1, y: 1 }], [{ x: -4, y: 1 }, { x: -2, y: -2 }, { x: -4, y: -2 }, { x: 1, y: 1 }, { x: 1, y: -1 }], [{ x: 1, y: -4 }, { x: -2, y: -4 }, { x: -2, y: -2 }, { x: 1, y: 1 }, { x: -1, y: 1 }], [{ x: -1, y: -4 }, { x: 2, y: -2 }, { x: 2, y: -4 }, { x: 1, y: 1 }, { x: -1, y: 1 }], [{ x: -4, y: -1 }, { x: -2, y: 2 }, { x: -4, y: 2 }, { x: 1, y: 1 }, { x: 1, y: -1 }], [{ x: 4, y: -1 }, { x: 4, y: 2 }, { x: 2, y: 2 }, { x: -1, y: -1 }, { x: -1, y: 1 }]], [[{ x: 2, y: 4 }, { x: 0, y: 4 }, { x: -1, y: 1 }, { x: -1, y: 3 }, { x: 2, y: -1 }, { x: 0, y: -1 }], [{ x: 0, y: 4 }, { x: -2, y: 4 }, { x: 1, y: 3 }, { x: 1, y: 1 }, { x: 0, y: -1 }, { x: -2, y: -1 }], [{ x: 4, y: 0 }, { x: 4, y: -2 }, { x: 3, y: 1 }, { x: 1, y: 1 }, { x: -1, y: -2 }, { x: -1, y: 0 }], [{ x: -4, y: -2 }, { x: -4, y: 0 }, { x: -1, y: 1 }, { x: -3, y: 1 }, { x: 1, y: 0 }, { x: 1, y: -2 }], [{ x: 0, y: -4 }, { x: -2, y: -4 }, { x: 1, y: -1 }, { x: 1, y: -3 }, { x: 0, y: 1 }, { x: -2, y: 1 }], [{ x: 2, y: -4 }, { x: 0, y: -4 }, { x: -1, y: -3 }, { x: -1, y: -1 }, { x: 2, y: 1 }, { x: 0, y: 1 }], [{ x: -4, y: 0 }, { x: -4, y: 2 }, { x: -1, y: -1 }, { x: -3, y: -1 }, { x: 1, y: 2 }, { x: 1, y: 0 }], [{ x: 4, y: 2 }, { x: 4, y: 0 }, { x: 3, y: -1 }, { x: 1, y: -1 }, { x: -1, y: 0 }, { x: -1, y: 2 }]], [[{ x: 2, y: 0 }, { x: 2, y: 4 }, { x: 0, y: 4 }, { x: -1, y: 2 }, { x: 1, y: -1 }, { x: -1, y: -1 }], [{ x: -2, y: 0 }, { x: 0, y: 4 }, { x: -2, y: 4 }, { x: 1, y: 2 }, { x: 1, y: -1 }, { x: -1, y: -1 }], [{ x: 0, y: -2 }, { x: 4, y: 0 }, { x: 4, y: -2 }, { x: 2, y: 1 }, { x: -1, y: -1 }, { x: -1, y: 1 }], [{ x: 0, y: -2 }, { x: -4, y: -2 }, { x: -4, y: 0 }, { x: -2, y: 1 }, { x: 1, y: 1 }, { x: 1, y: -1 }], [{ x: -2, y: 0 }, { x: 0, y: -4 }, { x: -2, y: -4 }, { x: 1, y: -2 }, { x: 1, y: 1 }, { x: -1, y: 1 }], [{ x: 2, y: 0 }, { x: 2, y: -4 }, { x: 0, y: -4 }, { x: -1, y: -2 }, { x: 1, y: 1 }, { x: -1, y: 1 }], [{ x: 0, y: 2 }, { x: -4, y: 0 }, { x: -4, y: 2 }, { x: -2, y: -1 }, { x: 1, y: 1 }, { x: 1, y: -1 }], [{ x: 0, y: 2 }, { x: 4, y: 2 }, { x: 4, y: 0 }, { x: 2, y: -1 }, { x: -1, y: -1 }, { x: -1, y: 1 }]], [[{ x: -1, y: -1 }, { x: 1, y: 2 }, { x: -1, y: 2 }, { x: 2, y: 1 }, { x: 2, y: -1 }], [{ x: 1, y: -1 }, { x: 1, y: 2 }, { x: -1, y: 2 }, { x: -2, y: -1 }, { x: -2, y: 1 }], [{ x: -1, y: 1 }, { x: 2, y: 1 }, { x: 2, y: -1 }, { x: 1, y: -2 }, { x: -1, y: -2 }], [{ x: 1, y: 1 }, { x: -2, y: -1 }, { x: -2, y: 1 }, { x: 1, y: -2 }, { x: -1, y: -2 }]], [[{ x: -1, y: 3 }, { x: 2, y: 3 }, { x: 2, y: 1 }, { x: -1, y: -1 }, { x: 2, y: -1 }], [{ x: 1, y: 3 }, { x: -2, y: 1 }, { x: -2, y: 3 }, { x: 1, y: -1 }, { x: -2, y: -1 }], [{ x: 3, y: 1 }, { x: 3, y: -2 }, { x: 1, y: -2 }, { x: -1, y: 1 }, { x: -1, y: -2 }], [{ x: -3, y: -1 }, { x: -1, y: 2 }, { x: -3, y: 2 }, { x: 1, y: -1 }, { x: 1, y: 2 }]], [[{ x: -1, y: -1 }, { x: 1, y: 3 }, { x: -1, y: 3 }, { x: 3, y: 1 }, { x: 3, y: -1 }], [{ x: 1, y: -1 }, { x: 1, y: 3 }, { x: -1, y: 3 }, { x: -3, y: -1 }, { x: -3, y: 1 }], [{ x: -1, y: 1 }, { x: 3, y: 1 }, { x: 3, y: -1 }, { x: 1, y: -3 }, { x: -1, y: -3 }], [{ x: 1, y: 1 }, { x: -3, y: -1 }, { x: -3, y: 1 }, { x: 1, y: -3 }, { x: -1, y: -3 }]], [[{ x: 2, y: 3 }, { x: -1, y: 1 }, { x: -1, y: 3 }, { x: 0, y: -1 }, { x: 3, y: 1 }, { x: 3, y: -1 }], [{ x: -2, y: 3 }, { x: 1, y: 3 }, { x: 1, y: 1 }, { x: 0, y: -1 }, { x: -3, y: -1 }, { x: -3, y: 1 }], [{ x: 3, y: -2 }, { x: 3, y: 1 }, { x: 1, y: 1 }, { x: -1, y: 0 }, { x: 1, y: -3 }, { x: -1, y: -3 }], [{ x: -3, y: -2 }, { x: -1, y: 1 }, { x: -3, y: 1 }, { x: 1, y: 0 }, { x: 1, y: -3 }, { x: -1, y: -3 }]], [[{ x: 2, y: 3 }, { x: 0, y: 3 }, { x: 3, y: 2 }, { x: 3, y: 0 }, { x: 2, y: -1 }, { x: 0, y: -1 }, { x: -1, y: 0 }, { x: -1, y: 2 }]], [[{ x: -1, y: 1 }, { x: -1, y: 3 }, { x: 3, y: 3 }, { x: 3, y: 1 }, { x: 2, y: -1 }, { x: 0, y: -1 }], [{ x: 3, y: 1 }, { x: 1, y: 1 }, { x: 3, y: -3 }, { x: 1, y: -3 }, { x: -1, y: -2 }, { x: -1, y: 0 }], [{ x: -1, y: 1 }, { x: -3, y: 1 }, { x: -1, y: -3 }, { x: -3, y: -3 }, { x: 1, y: 0 }, { x: 1, y: -2 }], [{ x: 1, y: -1 }, { x: 1, y: -3 }, { x: -3, y: -3 }, { x: -3, y: -1 }, { x: 0, y: 1 }, { x: -2, y: 1 }]], [[{ x: 2, y: 2 }, { x: -1, y: 0 }, { x: 1, y: 3 }, { x: -1, y: 3 }, { x: 0, y: -1 }, { x: 3, y: 1 }, { x: 3, y: -1 }], [{ x: -2, y: 2 }, { x: 1, y: 0 }, { x: 1, y: 3 }, { x: -1, y: 3 }, { x: 0, y: -1 }, { x: -3, y: -1 }, { x: -3, y: 1 }], [{ x: 2, y: -2 }, { x: 0, y: 1 }, { x: 3, y: 1 }, { x: 3, y: -1 }, { x: -1, y: 0 }, { x: 1, y: -3 }, { x: -1, y: -3 }], [{ x: -2, y: -2 }, { x: 0, y: 1 }, { x: -3, y: -1 }, { x: -3, y: 1 }, { x: 1, y: 0 }, { x: 1, y: -3 }, { x: -1, y: -3 }]], [[{ x: -1, y: 3 }, { x: 2, y: 3 }, { x: 2, y: 0 }, { x: 1, y: -1 }, { x: -1, y: -1 }], [{ x: 1, y: 3 }, { x: -2, y: 3 }, { x: -2, y: 0 }, { x: 1, y: -1 }, { x: -1, y: -1 }], [{ x: 3, y: 1 }, { x: 3, y: -2 }, { x: 0, y: -2 }, { x: -1, y: -1 }, { x: -1, y: 1 }], [{ x: -3, y: 1 }, { x: -3, y: -2 }, { x: 0, y: -2 }, { x: 1, y: 1 }, { x: 1, y: -1 }], [{ x: 1, y: -3 }, { x: -2, y: -3 }, { x: -2, y: 0 }, { x: 1, y: 1 }, { x: -1, y: 1 }], [{ x: -1, y: -3 }, { x: 2, y: -3 }, { x: 2, y: 0 }, { x: 1, y: 1 }, { x: -1, y: 1 }], [{ x: -3, y: -1 }, { x: -3, y: 2 }, { x: 0, y: 2 }, { x: 1, y: 1 }, { x: 1, y: -1 }], [{ x: 3, y: -1 }, { x: 3, y: 2 }, { x: 0, y: 2 }, { x: -1, y: -1 }, { x: -1, y: 1 }]], [[{ x: -1, y: 0 }, { x: -1, y: 2 }, { x: 2, y: -1 }, { x: 0, y: -1 }, { x: 0, y: 3 }, { x: 3, y: 3 }, { x: 3, y: 1 }], [{ x: 1, y: 2 }, { x: 1, y: 0 }, { x: 0, y: -1 }, { x: -2, y: -1 }, { x: 0, y: 3 }, { x: -3, y: 1 }, { x: -3, y: 3 }], [{ x: 2, y: 1 }, { x: 0, y: 1 }, { x: -1, y: -2 }, { x: -1, y: 0 }, { x: 3, y: 0 }, { x: 3, y: -3 }, { x: 1, y: -3 }], [{ x: 0, y: 1 }, { x: -2, y: 1 }, { x: 1, y: 0 }, { x: 1, y: -2 }, { x: -3, y: 0 }, { x: -1, y: -3 }, { x: -3, y: -3 }], [{ x: 1, y: 0 }, { x: 1, y: -2 }, { x: 0, y: 1 }, { x: -2, y: 1 }, { x: 0, y: -3 }, { x: -3, y: -3 }, { x: -3, y: -1 }], [{ x: -1, y: -2 }, { x: -1, y: 0 }, { x: 2, y: 1 }, { x: 0, y: 1 }, { x: 0, y: -3 }, { x: 3, y: -1 }, { x: 3, y: -3 }], [{ x: 0, y: -1 }, { x: -2, y: -1 }, { x: 1, y: 2 }, { x: 1, y: 0 }, { x: -3, y: 0 }, { x: -1, y: 3 }, { x: -3, y: 3 }], [{ x: 2, y: -1 }, { x: 0, y: -1 }, { x: -1, y: 0 }, { x: -1, y: 2 }, { x: 3, y: 0 }, { x: 3, y: 3 }, { x: 1, y: 3 }]], [[{ x: -1, y: -1 }, { x: 2, y: -1 }, { x: 2, y: 2 }, { x: -1, y: 2 }]], [[{ x: -1, y: 0 }, { x: -1, y: 2 }, { x: 3, y: 2 }, { x: 3, y: -1 }, { x: 1, y: -1 }], [{ x: 1, y: 2 }, { x: 1, y: 0 }, { x: -3, y: 2 }, { x: -1, y: -1 }, { x: -3, y: -1 }], [{ x: 2, y: 1 }, { x: 0, y: 1 }, { x: 2, y: -3 }, { x: -1, y: -3 }, { x: -1, y: -1 }], [{ x: 0, y: 1 }, { x: -2, y: 1 }, { x: -2, y: -3 }, { x: 1, y: -1 }, { x: 1, y: -3 }], [{ x: 1, y: 0 }, { x: 1, y: -2 }, { x: -3, y: -2 }, { x: -1, y: 1 }, { x: -3, y: 1 }], [{ x: -1, y: -2 }, { x: -1, y: 0 }, { x: 3, y: -2 }, { x: 3, y: 1 }, { x: 1, y: 1 }], [{ x: 0, y: -1 }, { x: -2, y: -1 }, { x: -2, y: 3 }, { x: 1, y: 3 }, { x: 1, y: 1 }], [{ x: 2, y: -1 }, { x: 0, y: -1 }, { x: 2, y: 3 }, { x: -1, y: 1 }, { x: -1, y: 3 }]], [[{ x: -1, y: 0 }, { x: -1, y: 2 }, { x: 3, y: 2 }, { x: 3, y: 0 }, { x: 2, y: -1 }, { x: 0, y: -1 }], [{ x: 2, y: 1 }, { x: 0, y: 1 }, { x: 2, y: -3 }, { x: 0, y: -3 }, { x: -1, y: -2 }, { x: -1, y: 0 }], [{ x: 0, y: 1 }, { x: -2, y: 1 }, { x: 0, y: -3 }, { x: -2, y: -3 }, { x: 1, y: 0 }, { x: 1, y: -2 }], [{ x: 1, y: 0 }, { x: 1, y: -2 }, { x: -3, y: -2 }, { x: -3, y: 0 }, { x: 0, y: 1 }, { x: -2, y: 1 }]], [[{ x: 2, y: 2 }, { x: -1, y: 0 }, { x: -1, y: 2 }, { x: 0, y: -1 }, { x: 3, y: 1 }, { x: 3, y: -1 }], [{ x: -2, y: 2 }, { x: 1, y: 2 }, { x: 1, y: 0 }, { x: 0, y: -1 }, { x: -3, y: -1 }, { x: -3, y: 1 }], [{ x: 2, y: -2 }, { x: 2, y: 1 }, { x: 0, y: 1 }, { x: -1, y: 0 }, { x: 1, y: -3 }, { x: -1, y: -3 }], [{ x: -2, y: -2 }, { x: 0, y: 1 }, { x: -2, y: 1 }, { x: 1, y: 0 }, { x: 1, y: -3 }, { x: -1, y: -3 }]], [[{ x: 1, y: 1 }, { x: 1, y: -1 }, { x: -1, y: -1 }, { x: -1, y: 1 }]], [[{ x: 1, y: -1 }, { x: -1, y: -1 }, { x: 1, y: 2 }, { x: -1, y: 2 }], [{ x: -1, y: -1 }, { x: -1, y: 1 }, { x: 2, y: 1 }, { x: 2, y: -1 }]], [[{ x: 1, y: 3 }, { x: -1, y: 3 }, { x: 1, y: -1 }, { x: -1, y: -1 }], [{ x: 3, y: 1 }, { x: 3, y: -1 }, { x: -1, y: -1 }, { x: -1, y: 1 }]], [[{ x: 1, y: -1 }, { x: -1, y: -1 }, { x: 1, y: 4 }, { x: -1, y: 4 }], [{ x: -1, y: -1 }, { x: -1, y: 1 }, { x: 4, y: 1 }, { x: 4, y: -1 }]], [[{ x: 1, y: 5 }, { x: -1, y: 5 }, { x: 1, y: -1 }, { x: -1, y: -1 }], [{ x: 5, y: 1 }, { x: 5, y: -1 }, { x: -1, y: -1 }, { x: -1, y: 1 }]]];

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
  if (pseudoLegalMove.piece === null) {
    return true;
  }
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
    const myBitBoard = [state.state.playerABitBoard, state.state.playerBBitBoard][toMove];
    const opponentBitBoard = [state.state.playerBBitBoard, state.state.playerABitBoard][toMove];
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
  return moves.filter((p) => isMoveLegal(p, state));
};
var generateFirstMove = (board) => {
  const myState = board.state.toMove === 0 ? board.state.playerA : board.state.playerB;
  const startPos = board.startPositions[board.state.toMove];
  const moves = [];
  for (const piece of myState.remainingPieces) {
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
  return moves.filter((p) => isMoveLegal(p, board));
};
var getAllLegalMoves = (board) => {
  if (board.gameOver()) {
    return [];
  }
  const myPlacedPieces = board.state.pieces.filter((p) => p.player === board.state.toMove);
  if (myPlacedPieces.length === 0) {
    return generateFirstMove(board);
  }
  const myState = board.state.toMove === 0 ? board.state.playerA : board.state.playerB;
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
      for (const unplacedPiece of myState.remainingPieces) {
        moves.push(...getLegalMovesFrom(cornerAbsolute, unplacedPiece, board));
      }
    }
  }
  if (moves.length === 0) {
    moves.push({ piece: null, previousNullMoveCounter: board.state.nullMoveCounter });
  }
  return moves;
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
  playerA: { remainingPieces: /* @__PURE__ */ new Set() },
  playerB: { remainingPieces: /* @__PURE__ */ new Set() },
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
    for (let i = 0; i < pieceData.length; i++) {
      this.state.playerA.remainingPieces.add(i);
      this.state.playerB.remainingPieces.add(i);
    }
    this.startPositions = getStartPosition(startPosition);
  }
  reset() {
    this.state = structuredClone(defaultBoardState);
    for (let i = 0; i < pieceData.length; i++) {
      this.state.playerA.remainingPieces.add(i);
      this.state.playerB.remainingPieces.add(i);
    }
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
      return null;
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
    const state = window.structuredClone(this.state);
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
      this.state.playerA.remainingPieces.delete(piece.pieceType);
    } else {
      this.state.playerB.remainingPieces.delete(piece.pieceType);
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
      this.state.playerA.remainingPieces.add(piece.pieceType);
    } else {
      this.state.playerB.remainingPieces.add(piece.pieceType);
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
