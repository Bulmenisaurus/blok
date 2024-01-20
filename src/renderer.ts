import { BoardState, PlacedPiece, Player, getOrientationData } from './movegen';
import { Coordinate } from './types';

export const render = (
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    boardState: BoardState,
    previewPiece?: PlacedPiece
) => {
    canvas.width = 500;
    canvas.height = 500;

    drawBackground(ctx);

    // starting positions (4,4) and (9, 9)
    startPos(ctx, boardState.startPositions[0]);
    startPos(ctx, boardState.startPositions[1]);

    for (const piece of boardState.pieces) {
        renderPiece(ctx, piece);
    }

    if (previewPiece !== undefined) {
        renderPiece(ctx, previewPiece, true);
    }

    drawGridLines(ctx);
};

const drawBackground = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = '#ccc';
    ctx.fillRect(0, 0, 500, 500);
};

const drawGridLines = (ctx: CanvasRenderingContext2D) => {
    for (let i = 0; i < 13; i++) {
        // horizontal
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#fff';

        ctx.beginPath();
        ctx.moveTo(0, (500 / 14) * (i + 1));
        ctx.lineTo(500, (500 / 14) * (i + 1));
        ctx.stroke();

        // vertical
        ctx.beginPath();
        ctx.moveTo((500 / 14) * (i + 1), 0);
        ctx.lineTo((500 / 14) * (i + 1), 500);
        ctx.stroke();
    }
};

export const startPos = (ctx: CanvasRenderingContext2D, c: Coordinate) => {
    const cellSize = 500 / 14;

    const cellTopLeftX = c.x * cellSize;
    const cellTopLeftY = c.y * cellSize;
    const cellMiddleX = cellTopLeftX + cellSize / 2;
    const cellMiddleY = cellTopLeftY + cellSize / 2;

    ctx.beginPath();
    ctx.arc(cellMiddleX, cellMiddleY, cellSize * 0.2, 0, Math.PI * 2);
    ctx.fillStyle = '#aaa';
    ctx.fill();
};

export const renderPiece = (
    ctx: CanvasRenderingContext2D,
    piece: PlacedPiece,
    preview?: boolean
) => {
    for (const tile of getOrientationData(piece.pieceType, piece.orientation)) {
        const tileCoordinate: Coordinate = {
            x: tile.x + piece.location.x,
            y: tile.y + piece.location.y,
        };

        renderTile(ctx, tileCoordinate, piece.player, preview);
    }
};

const renderTile = (
    ctx: CanvasRenderingContext2D,
    location: Coordinate,
    player: Player,
    preview?: boolean
) => {
    const cellWidth = 500 / 14;

    const tileX = location.x * cellWidth;
    const tileY = location.y * cellWidth;

    if (preview) {
        ctx.fillStyle = ['rgba(30, 120, 0, 0.5)', 'rgba(255, 0, 0, 0.5)'][player];
    } else {
        ctx.fillStyle = ['green', 'red'][player];
    }

    ctx.beginPath();
    ctx.rect(tileX, tileY, cellWidth, cellWidth);
    ctx.fill();
};
