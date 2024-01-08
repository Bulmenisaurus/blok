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

  // src/movegen.ts
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
  var rotateCoord90Deg = (c) => {
    return { x: c.y, y: -c.x };
  };
  var rotate90Deg = (pieceData3) => {
    return pieceData3.map((c) => rotateCoord90Deg(c));
  };
  var reflect = (pieceData3) => {
    return pieceData3.map((p) => ({ x: -p.x, y: p.y }));
  };
  var getBoundingBox = (pieceData3) => {
    let minX = pieceData3[0].x;
    let minY = pieceData3[0].y;
    let maxX = pieceData3[0].x;
    let maxY = pieceData3[0].y;
    for (const tile of pieceData3) {
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

  // src/permutations.ts
  var updateDrawings = (blockId) => {
    const data = [];
    const pieceContainer = document.getElementById("piece-container");
    while (pieceContainer.firstChild) {
      pieceContainer.firstChild.remove();
    }
    for (let rotation = 0; rotation < 4; rotation++) {
      for (const reflection of [true, false]) {
        const pieceData3 = getPieceData(blockId, rotation, reflection);
        data.push(pieceData3);
        const pieceCanvas = drawPiece(pieceData3);
        pieceContainer.appendChild(pieceCanvas);
      }
    }
    return data;
  };
  var updateSelected = (pieceData3, container) => {
    while (container.firstChild) {
      container.firstChild.remove();
    }
    for (const data of pieceData3) {
      container.appendChild(drawPiece(data));
    }
  };
  var drawPiece = (piece) => {
    const pieceCanvas = document.createElement("canvas");
    const pieceCtx = pieceCanvas.getContext("2d");
    const pieceBoundingBox = getBoundingBox(piece);
    pieceCanvas.width = pieceBoundingBox.width * 100;
    pieceCanvas.height = pieceBoundingBox.height * 100;
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
  };
  var updateSelection = (selection, pieces) => {
    const indices = selection.split(",").map((p) => parseInt(p));
    const selectedPieces = pieces.filter((_, i) => indices.includes(i));
    const outputContainer = document.getElementById("output");
    outputContainer.value = JSON.stringify(selectedPieces);
    const previewContainer = document.getElementById("preview");
    updateSelected(selectedPieces, previewContainer);
  };
  var main = () => {
    const blockInput = document.getElementById("block");
    let pieceData3 = [];
    pieceData3 = updateDrawings(parseInt(blockInput.value));
    blockInput.addEventListener("input", () => {
      const value = parseInt(blockInput.value);
      if (!isNaN(value)) {
        pieceData3 = updateDrawings(parseInt(blockInput.value));
      }
      console.log(pieceData3);
    });
    const selectionInput = document.getElementById("selection");
    updateSelection(selectionInput.value, pieceData3);
    selectionInput.addEventListener("input", () => {
      updateSelection(selectionInput.value, pieceData3);
    });
  };
  main();
})();
