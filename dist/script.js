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

  // src/movegen/piece-rr.json
  var piece_rr_default = [[0, 1, 2, 3, 4, 5, 6, 7], [0, 1, 2, 3, 4, 5, 6, 7], [0, 1, 2, 3, 4, 5, 6, 7], [0, 1, 2, 3, 3, 2, 1, 0], [0, 1, 2, 2, 1, 0, 3, 3], [0, 1, 2, 3, 3, 2, 1, 0], [0, 1, 2, 3, 0, 1, 2, 3], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 1, 2, 3, 3, 2, 1], [0, 1, 2, 3, 3, 2, 1, 0], [0, 1, 2, 3, 4, 5, 6, 7], [0, 1, 2, 3, 4, 5, 6, 7], [0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 2, 3, 4, 5, 6, 7], [0, 0, 1, 2, 3, 3, 2, 1], [0, 1, 2, 3, 0, 1, 2, 3], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 1, 1, 0, 0, 1, 1], [0, 0, 1, 1, 0, 0, 1, 1], [0, 0, 1, 1, 0, 0, 1, 1], [0, 0, 1, 1, 0, 0, 1, 1]];

  // src/movegen/piece-corners.json
  var piece_corners_default = [[[{ x: 0, y: 3 }, { x: 1, y: 3 }, { x: 0, y: 0 }], [{ x: 0, y: 3 }, { x: -1, y: 3 }, { x: 0, y: 0 }], [{ x: 3, y: 0 }, { x: 3, y: -1 }, { x: 0, y: 0 }], [{ x: -3, y: 0 }, { x: -3, y: -1 }, { x: 0, y: 0 }], [{ x: 0, y: -3 }, { x: -1, y: -3 }, { x: 0, y: 0 }], [{ x: 0, y: -3 }, { x: 1, y: -3 }, { x: 0, y: 0 }], [{ x: -3, y: 0 }, { x: -3, y: 1 }, { x: 0, y: 0 }], [{ x: 3, y: 0 }, { x: 3, y: 1 }, { x: 0, y: 0 }]], [[{ x: 1, y: 3 }, { x: 0, y: 2 }, { x: 1, y: 0 }], [{ x: -1, y: 3 }, { x: 0, y: 2 }, { x: -1, y: 0 }], [{ x: 3, y: -1 }, { x: 2, y: 0 }, { x: 0, y: -1 }], [{ x: -3, y: -1 }, { x: -2, y: 0 }, { x: 0, y: -1 }], [{ x: -1, y: -3 }, { x: 0, y: -2 }, { x: -1, y: 0 }], [{ x: 1, y: -3 }, { x: 0, y: -2 }, { x: 1, y: 0 }], [{ x: -3, y: 1 }, { x: -2, y: 0 }, { x: 0, y: 1 }], [{ x: 3, y: 1 }, { x: 2, y: 0 }, { x: 0, y: 1 }]], [[{ x: 1, y: 1 }, { x: 1, y: 3 }, { x: 0, y: 1 }, { x: 0, y: 0 }], [{ x: -1, y: 1 }, { x: -1, y: 3 }, { x: 0, y: 1 }, { x: 0, y: 0 }], [{ x: 1, y: -1 }, { x: 3, y: -1 }, { x: 1, y: 0 }, { x: 0, y: 0 }], [{ x: -1, y: -1 }, { x: -3, y: -1 }, { x: -1, y: 0 }, { x: 0, y: 0 }], [{ x: -1, y: -1 }, { x: -1, y: -3 }, { x: 0, y: -1 }, { x: 0, y: 0 }], [{ x: 1, y: -1 }, { x: 1, y: -3 }, { x: 0, y: -1 }, { x: 0, y: 0 }], [{ x: -1, y: 1 }, { x: -3, y: 1 }, { x: -1, y: 0 }, { x: 0, y: 0 }], [{ x: 1, y: 1 }, { x: 3, y: 1 }, { x: 1, y: 0 }, { x: 0, y: 0 }]], [[{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 0 }], [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 0 }], [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: -1 }], [{ x: 0, y: 0 }, { x: -1, y: 0 }, { x: 0, y: -1 }]], [[{ x: 0, y: 2 }, { x: 1, y: 2 }, { x: 0, y: 0 }, { x: 1, y: 0 }], [{ x: 0, y: 2 }, { x: -1, y: 2 }, { x: 0, y: 0 }, { x: -1, y: 0 }], [{ x: 2, y: 0 }, { x: 2, y: -1 }, { x: 0, y: 0 }, { x: 0, y: -1 }], [{ x: -2, y: 0 }, { x: -2, y: 1 }, { x: 0, y: 0 }, { x: 0, y: 1 }]], [[{ x: 0, y: 0 }, { x: 0, y: 2 }, { x: 2, y: 0 }], [{ x: 0, y: 0 }, { x: 0, y: 2 }, { x: -2, y: 0 }], [{ x: 0, y: 0 }, { x: 2, y: 0 }, { x: 0, y: -2 }], [{ x: 0, y: 0 }, { x: -2, y: 0 }, { x: 0, y: -2 }]], [[{ x: 1, y: 2 }, { x: 0, y: 2 }, { x: 1, y: 0 }, { x: 2, y: 0 }], [{ x: -1, y: 2 }, { x: 0, y: 2 }, { x: -1, y: 0 }, { x: -2, y: 0 }], [{ x: 2, y: -1 }, { x: 2, y: 0 }, { x: 0, y: -1 }, { x: 0, y: -2 }], [{ x: -2, y: -1 }, { x: -2, y: 0 }, { x: 0, y: -1 }, { x: 0, y: -2 }]], [[{ x: 1, y: 2 }, { x: 2, y: 1 }, { x: 1, y: 0 }, { x: 0, y: 1 }]], [[{ x: 0, y: 2 }, { x: 2, y: 2 }, { x: 1, y: 0 }], [{ x: 2, y: 0 }, { x: 2, y: -2 }, { x: 0, y: -1 }], [{ x: -2, y: 0 }, { x: -2, y: -2 }, { x: 0, y: -1 }], [{ x: 0, y: -2 }, { x: -2, y: -2 }, { x: -1, y: 0 }]], [[{ x: 1, y: 1 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 1, y: 0 }, { x: 2, y: 0 }], [{ x: -1, y: 1 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: -1, y: 0 }, { x: -2, y: 0 }], [{ x: 1, y: -1 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 0, y: -1 }, { x: 0, y: -2 }], [{ x: -1, y: -1 }, { x: -1, y: 0 }, { x: -2, y: 0 }, { x: 0, y: -1 }, { x: 0, y: -2 }]], [[{ x: 0, y: 2 }, { x: 1, y: 2 }, { x: 1, y: 1 }, { x: 0, y: 0 }], [{ x: 0, y: 2 }, { x: -1, y: 2 }, { x: -1, y: 1 }, { x: 0, y: 0 }], [{ x: 2, y: 0 }, { x: 2, y: -1 }, { x: 1, y: -1 }, { x: 0, y: 0 }], [{ x: -2, y: 0 }, { x: -2, y: -1 }, { x: -1, y: -1 }, { x: 0, y: 0 }], [{ x: 0, y: -2 }, { x: -1, y: -2 }, { x: -1, y: -1 }, { x: 0, y: 0 }], [{ x: 0, y: -2 }, { x: 1, y: -2 }, { x: 1, y: -1 }, { x: 0, y: 0 }], [{ x: -2, y: 0 }, { x: -2, y: 1 }, { x: -1, y: 1 }, { x: 0, y: 0 }], [{ x: 2, y: 0 }, { x: 2, y: 1 }, { x: 1, y: 1 }, { x: 0, y: 0 }]], [[{ x: 0, y: 1 }, { x: 1, y: 0 }, { x: 1, y: 2 }, { x: 2, y: 2 }], [{ x: 0, y: 1 }, { x: -1, y: 0 }, { x: -1, y: 2 }, { x: -2, y: 2 }], [{ x: 1, y: 0 }, { x: 0, y: -1 }, { x: 2, y: -1 }, { x: 2, y: -2 }], [{ x: -1, y: 0 }, { x: 0, y: -1 }, { x: -2, y: -1 }, { x: -2, y: -2 }], [{ x: 0, y: -1 }, { x: -1, y: 0 }, { x: -1, y: -2 }, { x: -2, y: -2 }], [{ x: 0, y: -1 }, { x: 1, y: 0 }, { x: 1, y: -2 }, { x: 2, y: -2 }], [{ x: -1, y: 0 }, { x: 0, y: 1 }, { x: -2, y: 1 }, { x: -2, y: 2 }], [{ x: 1, y: 0 }, { x: 0, y: 1 }, { x: 2, y: 1 }, { x: 2, y: 2 }]], [[{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 }]], [[{ x: 0, y: 1 }, { x: 2, y: 1 }, { x: 2, y: 0 }], [{ x: 0, y: 1 }, { x: -2, y: 1 }, { x: -2, y: 0 }], [{ x: 1, y: 0 }, { x: 1, y: -2 }, { x: 0, y: -2 }], [{ x: -1, y: 0 }, { x: -1, y: -2 }, { x: 0, y: -2 }], [{ x: 0, y: -1 }, { x: -2, y: -1 }, { x: -2, y: 0 }], [{ x: 0, y: -1 }, { x: 2, y: -1 }, { x: 2, y: 0 }], [{ x: -1, y: 0 }, { x: -1, y: 2 }, { x: 0, y: 2 }], [{ x: 1, y: 0 }, { x: 1, y: 2 }, { x: 0, y: 2 }]], [[{ x: 0, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 0 }], [{ x: 1, y: 0 }, { x: 1, y: -2 }, { x: 0, y: -1 }], [{ x: -1, y: 0 }, { x: -1, y: -2 }, { x: 0, y: -1 }], [{ x: 0, y: -1 }, { x: -2, y: -1 }, { x: -1, y: 0 }]], [[{ x: 1, y: 1 }, { x: 0, y: 1 }, { x: 1, y: 0 }, { x: 2, y: 0 }], [{ x: -1, y: 1 }, { x: 0, y: 1 }, { x: -1, y: 0 }, { x: -2, y: 0 }], [{ x: 1, y: -1 }, { x: 1, y: 0 }, { x: 0, y: -1 }, { x: 0, y: -2 }], [{ x: -1, y: -1 }, { x: -1, y: 0 }, { x: 0, y: -1 }, { x: 0, y: -2 }]], [[{ x: 0, y: 0 }]], [[{ x: 0, y: 0 }, { x: 0, y: 1 }], [{ x: 0, y: 0 }, { x: 1, y: 0 }]], [[{ x: 0, y: 2 }, { x: 0, y: 0 }], [{ x: 2, y: 0 }, { x: 0, y: 0 }]], [[{ x: 0, y: 0 }, { x: 0, y: 3 }], [{ x: 0, y: 0 }, { x: 3, y: 0 }]], [[{ x: 0, y: 4 }, { x: 0, y: 0 }], [{ x: 4, y: 0 }, { x: 0, y: 0 }]]];

  // src/movegen/piece-corner-attachers.json
  var piece_corner_attachers_default = [[[{ x: -1, y: 4 }, { x: 2, y: 4 }, { x: 2, y: 2 }, { x: 1, y: -1 }, { x: -1, y: -1 }], [{ x: 1, y: 4 }, { x: -2, y: 2 }, { x: -2, y: 4 }, { x: 1, y: -1 }, { x: -1, y: -1 }], [{ x: 4, y: 1 }, { x: 4, y: -2 }, { x: 2, y: -2 }, { x: -1, y: -1 }, { x: -1, y: 1 }], [{ x: -4, y: 1 }, { x: -2, y: -2 }, { x: -4, y: -2 }, { x: 1, y: 1 }, { x: 1, y: -1 }], [{ x: 1, y: -4 }, { x: -2, y: -4 }, { x: -2, y: -2 }, { x: 1, y: 1 }, { x: -1, y: 1 }], [{ x: -1, y: -4 }, { x: 2, y: -2 }, { x: 2, y: -4 }, { x: 1, y: 1 }, { x: -1, y: 1 }], [{ x: -4, y: -1 }, { x: -2, y: 2 }, { x: -4, y: 2 }, { x: 1, y: 1 }, { x: 1, y: -1 }], [{ x: 4, y: -1 }, { x: 4, y: 2 }, { x: 2, y: 2 }, { x: -1, y: -1 }, { x: -1, y: 1 }]], [[{ x: 2, y: 4 }, { x: 0, y: 4 }, { x: -1, y: 1 }, { x: -1, y: 3 }, { x: 2, y: -1 }, { x: 0, y: -1 }], [{ x: 0, y: 4 }, { x: -2, y: 4 }, { x: 1, y: 3 }, { x: 1, y: 1 }, { x: 0, y: -1 }, { x: -2, y: -1 }], [{ x: 4, y: 0 }, { x: 4, y: -2 }, { x: 3, y: 1 }, { x: 1, y: 1 }, { x: -1, y: -2 }, { x: -1, y: 0 }], [{ x: -4, y: -2 }, { x: -4, y: 0 }, { x: -1, y: 1 }, { x: -3, y: 1 }, { x: 1, y: 0 }, { x: 1, y: -2 }], [{ x: 0, y: -4 }, { x: -2, y: -4 }, { x: 1, y: -1 }, { x: 1, y: -3 }, { x: 0, y: 1 }, { x: -2, y: 1 }], [{ x: 2, y: -4 }, { x: 0, y: -4 }, { x: -1, y: -3 }, { x: -1, y: -1 }, { x: 2, y: 1 }, { x: 0, y: 1 }], [{ x: -4, y: 0 }, { x: -4, y: 2 }, { x: -1, y: -1 }, { x: -3, y: -1 }, { x: 1, y: 2 }, { x: 1, y: 0 }], [{ x: 4, y: 2 }, { x: 4, y: 0 }, { x: 3, y: -1 }, { x: 1, y: -1 }, { x: -1, y: 0 }, { x: -1, y: 2 }]], [[{ x: 2, y: 0 }, { x: 2, y: 4 }, { x: 0, y: 4 }, { x: -1, y: 2 }, { x: 1, y: -1 }, { x: -1, y: -1 }], [{ x: -2, y: 0 }, { x: 0, y: 4 }, { x: -2, y: 4 }, { x: 1, y: 2 }, { x: 1, y: -1 }, { x: -1, y: -1 }], [{ x: 0, y: -2 }, { x: 4, y: 0 }, { x: 4, y: -2 }, { x: 2, y: 1 }, { x: -1, y: -1 }, { x: -1, y: 1 }], [{ x: 0, y: -2 }, { x: -4, y: -2 }, { x: -4, y: 0 }, { x: -2, y: 1 }, { x: 1, y: 1 }, { x: 1, y: -1 }], [{ x: -2, y: 0 }, { x: 0, y: -4 }, { x: -2, y: -4 }, { x: 1, y: -2 }, { x: 1, y: 1 }, { x: -1, y: 1 }], [{ x: 2, y: 0 }, { x: 2, y: -4 }, { x: 0, y: -4 }, { x: -1, y: -2 }, { x: 1, y: 1 }, { x: -1, y: 1 }], [{ x: 0, y: 2 }, { x: -4, y: 0 }, { x: -4, y: 2 }, { x: -2, y: -1 }, { x: 1, y: 1 }, { x: 1, y: -1 }], [{ x: 0, y: 2 }, { x: 4, y: 2 }, { x: 4, y: 0 }, { x: 2, y: -1 }, { x: -1, y: -1 }, { x: -1, y: 1 }]], [[{ x: -1, y: -1 }, { x: 1, y: 2 }, { x: -1, y: 2 }, { x: 2, y: 1 }, { x: 2, y: -1 }], [{ x: 1, y: -1 }, { x: 1, y: 2 }, { x: -1, y: 2 }, { x: -2, y: -1 }, { x: -2, y: 1 }], [{ x: -1, y: 1 }, { x: 2, y: 1 }, { x: 2, y: -1 }, { x: 1, y: -2 }, { x: -1, y: -2 }], [{ x: 1, y: 1 }, { x: -2, y: -1 }, { x: -2, y: 1 }, { x: 1, y: -2 }, { x: -1, y: -2 }]], [[{ x: -1, y: 3 }, { x: 2, y: 3 }, { x: 2, y: 1 }, { x: -1, y: -1 }, { x: 2, y: -1 }], [{ x: 1, y: 3 }, { x: -2, y: 1 }, { x: -2, y: 3 }, { x: 1, y: -1 }, { x: -2, y: -1 }], [{ x: 3, y: 1 }, { x: 3, y: -2 }, { x: 1, y: -2 }, { x: -1, y: 1 }, { x: -1, y: -2 }], [{ x: -3, y: -1 }, { x: -1, y: 2 }, { x: -3, y: 2 }, { x: 1, y: -1 }, { x: 1, y: 2 }]], [[{ x: -1, y: -1 }, { x: 1, y: 3 }, { x: -1, y: 3 }, { x: 3, y: 1 }, { x: 3, y: -1 }], [{ x: 1, y: -1 }, { x: 1, y: 3 }, { x: -1, y: 3 }, { x: -3, y: -1 }, { x: -3, y: 1 }], [{ x: -1, y: 1 }, { x: 3, y: 1 }, { x: 3, y: -1 }, { x: 1, y: -3 }, { x: -1, y: -3 }], [{ x: 1, y: 1 }, { x: -3, y: -1 }, { x: -3, y: 1 }, { x: 1, y: -3 }, { x: -1, y: -3 }]], [[{ x: 2, y: 3 }, { x: -1, y: 1 }, { x: -1, y: 3 }, { x: 0, y: -1 }, { x: 3, y: 1 }, { x: 3, y: -1 }], [{ x: -2, y: 3 }, { x: 1, y: 3 }, { x: 1, y: 1 }, { x: 0, y: -1 }, { x: -3, y: -1 }, { x: -3, y: 1 }], [{ x: 3, y: -2 }, { x: 3, y: 1 }, { x: 1, y: 1 }, { x: -1, y: 0 }, { x: 1, y: -3 }, { x: -1, y: -3 }], [{ x: -3, y: -2 }, { x: -1, y: 1 }, { x: -3, y: 1 }, { x: 1, y: 0 }, { x: 1, y: -3 }, { x: -1, y: -3 }]], [[{ x: 2, y: 3 }, { x: 0, y: 3 }, { x: 3, y: 2 }, { x: 3, y: 0 }, { x: 2, y: -1 }, { x: 0, y: -1 }, { x: -1, y: 0 }, { x: -1, y: 2 }]], [[{ x: -1, y: 1 }, { x: -1, y: 3 }, { x: 3, y: 3 }, { x: 3, y: 1 }, { x: 2, y: -1 }, { x: 0, y: -1 }], [{ x: 3, y: 1 }, { x: 1, y: 1 }, { x: 3, y: -3 }, { x: 1, y: -3 }, { x: -1, y: -2 }, { x: -1, y: 0 }], [{ x: -1, y: 1 }, { x: -3, y: 1 }, { x: -1, y: -3 }, { x: -3, y: -3 }, { x: 1, y: 0 }, { x: 1, y: -2 }], [{ x: 1, y: -1 }, { x: 1, y: -3 }, { x: -3, y: -3 }, { x: -3, y: -1 }, { x: 0, y: 1 }, { x: -2, y: 1 }]], [[{ x: 2, y: 2 }, { x: -1, y: 0 }, { x: 1, y: 3 }, { x: -1, y: 3 }, { x: 0, y: -1 }, { x: 3, y: 1 }, { x: 3, y: -1 }], [{ x: -2, y: 2 }, { x: 1, y: 0 }, { x: 1, y: 3 }, { x: -1, y: 3 }, { x: 0, y: -1 }, { x: -3, y: -1 }, { x: -3, y: 1 }], [{ x: 2, y: -2 }, { x: 0, y: 1 }, { x: 3, y: 1 }, { x: 3, y: -1 }, { x: -1, y: 0 }, { x: 1, y: -3 }, { x: -1, y: -3 }], [{ x: -2, y: -2 }, { x: 0, y: 1 }, { x: -3, y: -1 }, { x: -3, y: 1 }, { x: 1, y: 0 }, { x: 1, y: -3 }, { x: -1, y: -3 }]], [[{ x: -1, y: 3 }, { x: 2, y: 3 }, { x: 2, y: 0 }, { x: 1, y: -1 }, { x: -1, y: -1 }], [{ x: 1, y: 3 }, { x: -2, y: 3 }, { x: -2, y: 0 }, { x: 1, y: -1 }, { x: -1, y: -1 }], [{ x: 3, y: 1 }, { x: 3, y: -2 }, { x: 0, y: -2 }, { x: -1, y: -1 }, { x: -1, y: 1 }], [{ x: -3, y: 1 }, { x: -3, y: -2 }, { x: 0, y: -2 }, { x: 1, y: 1 }, { x: 1, y: -1 }], [{ x: 1, y: -3 }, { x: -2, y: -3 }, { x: -2, y: 0 }, { x: 1, y: 1 }, { x: -1, y: 1 }], [{ x: -1, y: -3 }, { x: 2, y: -3 }, { x: 2, y: 0 }, { x: 1, y: 1 }, { x: -1, y: 1 }], [{ x: -3, y: -1 }, { x: -3, y: 2 }, { x: 0, y: 2 }, { x: 1, y: 1 }, { x: 1, y: -1 }], [{ x: 3, y: -1 }, { x: 3, y: 2 }, { x: 0, y: 2 }, { x: -1, y: -1 }, { x: -1, y: 1 }]], [[{ x: -1, y: 0 }, { x: -1, y: 2 }, { x: 2, y: -1 }, { x: 0, y: -1 }, { x: 0, y: 3 }, { x: 3, y: 3 }, { x: 3, y: 1 }], [{ x: 1, y: 2 }, { x: 1, y: 0 }, { x: 0, y: -1 }, { x: -2, y: -1 }, { x: 0, y: 3 }, { x: -3, y: 1 }, { x: -3, y: 3 }], [{ x: 2, y: 1 }, { x: 0, y: 1 }, { x: -1, y: -2 }, { x: -1, y: 0 }, { x: 3, y: 0 }, { x: 3, y: -3 }, { x: 1, y: -3 }], [{ x: 0, y: 1 }, { x: -2, y: 1 }, { x: 1, y: 0 }, { x: 1, y: -2 }, { x: -3, y: 0 }, { x: -1, y: -3 }, { x: -3, y: -3 }], [{ x: 1, y: 0 }, { x: 1, y: -2 }, { x: 0, y: 1 }, { x: -2, y: 1 }, { x: 0, y: -3 }, { x: -3, y: -3 }, { x: -3, y: -1 }], [{ x: -1, y: -2 }, { x: -1, y: 0 }, { x: 2, y: 1 }, { x: 0, y: 1 }, { x: 0, y: -3 }, { x: 3, y: -1 }, { x: 3, y: -3 }], [{ x: 0, y: -1 }, { x: -2, y: -1 }, { x: 1, y: 2 }, { x: 1, y: 0 }, { x: -3, y: 0 }, { x: -1, y: 3 }, { x: -3, y: 3 }], [{ x: 2, y: -1 }, { x: 0, y: -1 }, { x: -1, y: 0 }, { x: -1, y: 2 }, { x: 3, y: 0 }, { x: 3, y: 3 }, { x: 1, y: 3 }]], [[{ x: -1, y: -1 }, { x: 2, y: -1 }, { x: 2, y: 2 }, { x: -1, y: 2 }]], [[{ x: -1, y: 0 }, { x: -1, y: 2 }, { x: 3, y: 2 }, { x: 3, y: -1 }, { x: 1, y: -1 }], [{ x: 1, y: 2 }, { x: 1, y: 0 }, { x: -3, y: 2 }, { x: -1, y: -1 }, { x: -3, y: -1 }], [{ x: 2, y: 1 }, { x: 0, y: 1 }, { x: 2, y: -3 }, { x: -1, y: -3 }, { x: -1, y: -1 }], [{ x: 0, y: 1 }, { x: -2, y: 1 }, { x: -2, y: -3 }, { x: 1, y: -1 }, { x: 1, y: -3 }], [{ x: 1, y: 0 }, { x: 1, y: -2 }, { x: -3, y: -2 }, { x: -1, y: 1 }, { x: -3, y: 1 }], [{ x: -1, y: -2 }, { x: -1, y: 0 }, { x: 3, y: -2 }, { x: 3, y: 1 }, { x: 1, y: 1 }], [{ x: 0, y: -1 }, { x: -2, y: -1 }, { x: -2, y: 3 }, { x: 1, y: 3 }, { x: 1, y: 1 }], [{ x: 2, y: -1 }, { x: 0, y: -1 }, { x: 2, y: 3 }, { x: -1, y: 1 }, { x: -1, y: 3 }]], [[{ x: -1, y: 0 }, { x: -1, y: 2 }, { x: 3, y: 2 }, { x: 3, y: 0 }, { x: 2, y: -1 }, { x: 0, y: -1 }], [{ x: 2, y: 1 }, { x: 0, y: 1 }, { x: 2, y: -3 }, { x: 0, y: -3 }, { x: -1, y: -2 }, { x: -1, y: 0 }], [{ x: 0, y: 1 }, { x: -2, y: 1 }, { x: 0, y: -3 }, { x: -2, y: -3 }, { x: 1, y: 0 }, { x: 1, y: -2 }], [{ x: 1, y: 0 }, { x: 1, y: -2 }, { x: -3, y: -2 }, { x: -3, y: 0 }, { x: 0, y: 1 }, { x: -2, y: 1 }]], [[{ x: 2, y: 2 }, { x: -1, y: 0 }, { x: -1, y: 2 }, { x: 0, y: -1 }, { x: 3, y: 1 }, { x: 3, y: -1 }], [{ x: -2, y: 2 }, { x: 1, y: 2 }, { x: 1, y: 0 }, { x: 0, y: -1 }, { x: -3, y: -1 }, { x: -3, y: 1 }], [{ x: 2, y: -2 }, { x: 2, y: 1 }, { x: 0, y: 1 }, { x: -1, y: 0 }, { x: 1, y: -3 }, { x: -1, y: -3 }], [{ x: -2, y: -2 }, { x: 0, y: 1 }, { x: -2, y: 1 }, { x: 1, y: 0 }, { x: 1, y: -3 }, { x: -1, y: -3 }]], [[{ x: 1, y: 1 }, { x: 1, y: -1 }, { x: -1, y: -1 }, { x: -1, y: 1 }]], [[{ x: 1, y: -1 }, { x: -1, y: -1 }, { x: 1, y: 2 }, { x: -1, y: 2 }], [{ x: -1, y: -1 }, { x: -1, y: 1 }, { x: 2, y: 1 }, { x: 2, y: -1 }]], [[{ x: 1, y: 3 }, { x: -1, y: 3 }, { x: 1, y: -1 }, { x: -1, y: -1 }], [{ x: 3, y: 1 }, { x: 3, y: -1 }, { x: -1, y: -1 }, { x: -1, y: 1 }]], [[{ x: 1, y: -1 }, { x: -1, y: -1 }, { x: 1, y: 4 }, { x: -1, y: 4 }], [{ x: -1, y: -1 }, { x: -1, y: 1 }, { x: 4, y: 1 }, { x: 4, y: -1 }]], [[{ x: 1, y: 5 }, { x: -1, y: 5 }, { x: 1, y: -1 }, { x: -1, y: -1 }], [{ x: 5, y: 1 }, { x: 5, y: -1 }, { x: -1, y: -1 }, { x: -1, y: 1 }]]];

  // src/movegen/movegen.ts
  var otherPlayer = (player) => player === 1 ? 0 : 1;
  var pieceData = pieces_default;
  var orientationData = piece_orientations_default;
  var RRData = piece_rr_default;
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
    const startPos2 = board.startPositions[board.state.toMove];
    const moves = [];
    for (const piece of myState.remainingPieces) {
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

  // src/minmax/bot.ts
  var findMove = async (board, workers) => {
    const startTime = Date.now();
    let moves = getAllLegalMoves(board);
    return moves[Math.floor(Math.random() * moves.length)];
    moves = moves.filter((m) => {
      if (m.piece === null || board.state.pieces.length < 5 && getOrientationData(m.piece.pieceType, 0).length !== 5) {
        return false;
      }
      return true;
    });
    const filteredLength = moves.length;
    moves = moves.slice(Math.max(0, moves.length - 50));
    console.log(`searching ${moves.length} (from ${filteredLength} before slicing)`);
    const response = await workers.findMove(moves, board);
    const endTime = Date.now();
    if (response === null) {
      console.log(`Took ${endTime - startTime}ms to evaluate positions. No best move.`);
    } else {
      const score = Math.round(response.score * 100) / 100;
      console.log(`Took ${endTime - startTime}ms to evaluate positions. Score: ${score}`);
    }
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
    for (const tile of getOrientationData(piece.pieceType, piece.orientation)) {
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
    constructor(board, workers, shouldPlaySound) {
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
      this.legalMoves = getAllLegalMoves(board);
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
      if (shouldPlaySound) {
        this.moveAlertSound = new Audio("./audio/bell.mp3");
      }
      const skipButton = document.getElementById("skip-button");
      skipButton.addEventListener("click", () => {
        const skipMove = {
          piece: null,
          previousNullMoveCounter: this.board.state.nullMoveCounter
        };
        if (!this.isMoveLegal(skipMove)) {
          console.error("Illegal skip move");
          return;
        }
        this.board.doMove(skipMove);
        this.updateScore();
        this.legalMoves = getAllLegalMoves(this.board);
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
      const move = {
        piece: {
          location: this.mousePosition,
          pieceType: this.selectedPiece,
          player: 0,
          orientation
        },
        previousNullMoveCounter: this.board.state.nullMoveCounter
      };
      if (!this.isMoveLegal(move)) {
        console.error("Illegal move");
        return;
      }
      this.board.doMove(move);
      this.updateCarouselVisibility();
      this.updateScore();
      this.selectedPiece = null;
      this.selectedPieceRotation = 0;
      findMove(this.board, this.workers).then((move2) => {
        if (this.moveAlertSound) {
          this.moveAlertSound.play();
        }
        if (move2 === void 0) {
          console.log("no bot move");
          this.board.skipTurn();
        } else {
          this.board.doMove(move2);
        }
        this.updateScore();
        this.legalMoves = getAllLegalMoves(this.board);
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
      for (const [pieceType, piece] of pieceData.entries()) {
        if (this.board.state.playerA.remainingPieces.has(pieceType)) {
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
        const rotationReflection = 2 * this.selectedPieceRotation + (this.selectedPieceFlipped ? 1 : 0);
        const orientation = RRData[this.selectedPiece][rotationReflection];
        piecePreview = {
          location: this.mousePosition,
          pieceType: this.selectedPiece,
          player: 0,
          orientation
        };
      }
      render(this.canvas, this.ctx, this.board, piecePreview);
      window.requestAnimationFrame(() => this.drawLoop());
    }
    score() {
      return {
        playerA: this.board.state.pieces.filter((p) => p.player === 0).map((p) => getOrientationData(p.pieceType, 0).length).reduce((a, b) => a + b, 0),
        playerB: this.board.state.pieces.filter((p) => p.player === 1).map((p) => getOrientationData(p.pieceType, 0).length).reduce((a, b) => a + b, 0)
      };
    }
    updateScore() {
      const userScore = document.querySelector("#user-score-container > .score");
      const botScore = document.querySelector("#bot-score-container > .score");
      const { playerA, playerB } = this.score();
      userScore.innerText = playerA.toString();
      botScore.innerText = playerB.toString();
      if (this.board.gameOver()) {
        const winner = this.board.winner();
        if (winner === "draw") {
          alert("Game is a draw");
        } else {
          alert(`Player ${winner} wins!`);
        }
      }
    }
    isMoveLegal(move) {
      return !!this.legalMoves.find(
        (legalMove) => move.piece === null && legalMove.piece === null || move.piece !== null && legalMove.piece !== null && move.piece.location.x === legalMove.piece.location.x && move.piece.location.y === legalMove.piece.location.y && move.piece.orientation === legalMove.piece.orientation && move.piece.pieceType === legalMove.piece.pieceType
      );
    }
  };

  // src/workerManager.ts
  var WorkerManager = class {
    constructor(numThreads) {
      this.workers = [];
      this.numWorkers = numThreads;
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
      const message = {
        boardStateMoves: board.pieces,
        searchMoves: task,
        startPos: board.startPosName
      };
      worker.postMessage(message);
      return responsePromise;
    }
  };

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

  // src/script.ts
  var main = () => {
    const popupContainer = document.getElementById("popup-bg");
    const startPos2 = document.getElementById("start-pos");
    const player = document.getElementById("play-as");
    const difficulty = document.getElementById("difficulty");
    const threads = document.getElementById("threads");
    const sound = document.getElementById("sound");
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
      const userNumThreads = parseInt(threads.value);
      const startPosition = startPos2.value;
      const shouldPlaySound = sound.value === "on";
      const boardState = new Board(startPosition);
      const workers = new WorkerManager(userNumThreads);
      const interactiveCanvas = new InteractiveCanvas(boardState, workers, shouldPlaySound);
      popupContainer.style.display = "none";
    });
  };
  main();
})();
