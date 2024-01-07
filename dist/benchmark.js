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
var getPieceData = (pieceType, rotation, reflection) => {
  let data = pieceData[pieceType];
  if (reflection) {
    data = reflect(data);
  }
  for (let i = 0; i < rotation; i++) {
    data = rotate90Deg(data);
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
var hashCoord = (c) => {
  return c.x << 16 | c.y;
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
var uniqueMoves = (move) => {
  const seen = /* @__PURE__ */ new Set();
  return move.filter((m) => {
    const hash = hashCoord(m.piece.location);
    if (seen.has(hash)) {
      return false;
    } else {
      seen.add(hash);
      return true;
    }
  });
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
  for (let rotation = 0; rotation < 4; rotation++) {
    for (const reflection of [true, false]) {
      for (const corner of getCorners(getPieceData(piece, rotation, reflection))) {
        const pieceMiddle = { x: from.x - corner.x, y: from.y - corner.y };
        let placedPiece = {
          location: pieceMiddle,
          player: state.toMove,
          pieceType: piece,
          rotation,
          reflection
        };
        moves.push({ piece: placedPiece });
      }
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
      for (const unplacedPiece of myState.remainingPieces) {
        moves.push(...getLegalMovesFrom(cornerAbsolute, unplacedPiece, board));
      }
    }
  }
  return uniqueMoves(moves);
};

// src/bot.ts
var findMove = (board, overrideDepth) => {
  let bestMove = void 0;
  let bestMoveScore = -Infinity;
  const startTime = Date.now();
  for (const move of getAllLegalMoves(board)) {
    board.doMove(move);
    let ourScore = 0;
    const depth = overrideDepth || 2;
    const opponentScore = recursiveBoardSearchAlphaBeta(depth, board, -Infinity, Infinity);
    ourScore = -opponentScore;
    board.undoMove(move);
    if (ourScore > bestMoveScore) {
      bestMoveScore = ourScore;
      bestMove = move;
    }
  }
  const endTime = Date.now();
  console.log(`Took ${endTime - startTime}ms to evaluate positions. Bestmove ${bestMoveScore}`);
  return bestMove;
};
var recursiveBoardSearchAlphaBeta = (depth, board, alpha, beta) => {
  if (depth === 0) {
    return evaluate(board);
  }
  const moves = getAllLegalMoves(board);
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
  const evaluation = countPlayerScore(board.playerA) - countPlayerScore(board.playerB);
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

// src/benchmark.ts
var fs = __toESM(require("fs"));
var readline = __toESM(require("readline"));
var bench = (moves) => {
  const timing = [];
  for (let i = 0; i < 5; i++) {
    const startTime = /* @__PURE__ */ new Date();
    const board = new BoardState();
    for (const move of moves) {
      board.doMove(move);
    }
    findMove(board, 2);
    const endTime = /* @__PURE__ */ new Date();
    const diff = endTime.getTime() - startTime.getTime();
    timing.push(diff);
  }
  return timing.reduce((a, b) => a + b, 0) / timing.length;
};
var benchStart = () => {
  const moves = [{ "piece": { "location": { "x": 5, "y": 5 }, "pieceType": 6, "player": 0, "rotation": 1, "reflection": false } }, { "piece": { "pieceType": 0, "location": { "x": 9, "y": 9 }, "player": 1, "rotation": 0, "reflection": false } }];
  return bench(moves);
};
var benchMiddle = () => {
  const moves = [{ "piece": { "location": { "x": 5, "y": 5 }, "pieceType": 6, "player": 0, "rotation": 1, "reflection": false } }, { "piece": { "pieceType": 0, "location": { "x": 9, "y": 9 }, "player": 1, "rotation": 0, "reflection": false } }, { "piece": { "location": { "x": 8, "y": 4 }, "pieceType": 7, "player": 0, "rotation": 0, "reflection": false } }, { "piece": { "location": { "x": 8, "y": 13 }, "player": 1, "pieceType": 5, "rotation": 1, "reflection": false } }, { "piece": { "location": { "x": 7, "y": 9 }, "pieceType": 8, "player": 0, "rotation": 0, "reflection": false } }, { "piece": { "location": { "x": 12, "y": 10 }, "player": 1, "pieceType": 4, "rotation": 0, "reflection": true } }, { "piece": { "location": { "x": 3, "y": 3 }, "pieceType": 9, "player": 0, "rotation": 0, "reflection": false } }, { "piece": { "location": { "x": 10, "y": 4 }, "player": 1, "pieceType": 20, "rotation": 0, "reflection": true } }, { "piece": { "location": { "x": 4, "y": 8 }, "pieceType": 10, "player": 0, "rotation": 1, "reflection": false } }, { "piece": { "location": { "x": 6, "y": 10 }, "player": 1, "pieceType": 8, "rotation": 2, "reflection": true } }];
  return bench(moves);
};
var benchEnd = () => {
  const moves = [{ "piece": { "location": { "x": 5, "y": 5 }, "pieceType": 6, "player": 0, "rotation": 1, "reflection": false } }, { "piece": { "pieceType": 0, "location": { "x": 9, "y": 9 }, "player": 1, "rotation": 0, "reflection": false } }, { "piece": { "location": { "x": 8, "y": 4 }, "pieceType": 7, "player": 0, "rotation": 0, "reflection": false } }, { "piece": { "location": { "x": 8, "y": 13 }, "player": 1, "pieceType": 5, "rotation": 1, "reflection": false } }, { "piece": { "location": { "x": 7, "y": 9 }, "pieceType": 8, "player": 0, "rotation": 0, "reflection": false } }, { "piece": { "location": { "x": 12, "y": 10 }, "player": 1, "pieceType": 4, "rotation": 0, "reflection": true } }, { "piece": { "location": { "x": 3, "y": 3 }, "pieceType": 9, "player": 0, "rotation": 0, "reflection": false } }, { "piece": { "location": { "x": 10, "y": 4 }, "player": 1, "pieceType": 20, "rotation": 0, "reflection": true } }, { "piece": { "location": { "x": 4, "y": 8 }, "pieceType": 10, "player": 0, "rotation": 1, "reflection": false } }, { "piece": { "location": { "x": 6, "y": 10 }, "player": 1, "pieceType": 8, "rotation": 2, "reflection": true } }, { "piece": { "location": { "x": 6, "y": 1 }, "pieceType": 11, "player": 0, "rotation": 0, "reflection": false } }, { "piece": { "location": { "x": 13, "y": 7 }, "player": 1, "pieceType": 19, "rotation": 2, "reflection": true } }, { "piece": { "location": { "x": 0, "y": 9 }, "pieceType": 5, "player": 0, "rotation": 0, "reflection": false } }, { "piece": { "location": { "x": 12, "y": 2 }, "player": 1, "pieceType": 6, "rotation": 0, "reflection": true } }, { "piece": { "location": { "x": 1, "y": 6 }, "pieceType": 12, "player": 0, "rotation": 0, "reflection": false } }, { "piece": { "location": { "x": 3, "y": 10 }, "player": 1, "pieceType": 2, "rotation": 3, "reflection": false } }, { "piece": { "location": { "x": 9, "y": 6 }, "pieceType": 16, "player": 0, "rotation": 0, "reflection": false } }, { "piece": { "location": { "x": 8, "y": 0 }, "player": 1, "pieceType": 10, "rotation": 1, "reflection": true } }];
  return bench(moves);
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
