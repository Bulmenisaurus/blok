import { BoardState, getBoundingBox, pieceData } from './movegen';
import { render } from './renderer';
import { Coordinate } from './types';

export class InteractiveCanvas {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    board: BoardState;
    carousel: HTMLElement;
    constructor(board: BoardState) {
        const canvas = document.getElementById('canvas') as HTMLCanvasElement;
        const ctx = canvas.getContext('2d')!;

        this.canvas = canvas;
        this.ctx = ctx;
        this.board = board;
        this.carousel = document.getElementById('blocks-carousel')!;
        this.initCarousel();

        window.requestAnimationFrame(() => this.render());
    }

    initCarousel() {
        for (const piece of pieceData) {
            const pieceCanvas = document.createElement('canvas');
            this.carousel.append(pieceCanvas);
            const pieceCtx = pieceCanvas.getContext('2d')!;
            const pieceBoundingBox = getBoundingBox(piece);

            pieceCanvas.width = pieceBoundingBox.width * 100;
            pieceCanvas.height = pieceBoundingBox.height * 100;

            for (const tile of piece) {
                const shiftedCoords: Coordinate = {
                    x: tile.x - pieceBoundingBox.bottomLeft.x,
                    y: tile.y - pieceBoundingBox.bottomLeft.y,
                };

                const canvasCoords: Coordinate = {
                    x: shiftedCoords.x * 100,
                    y: shiftedCoords.y * 100,
                };

                pieceCtx.beginPath();
                pieceCtx.rect(canvasCoords.x, canvasCoords.y, 100, 100);
                pieceCtx.fillStyle = 'green';
                pieceCtx.fill();

                const numRows = pieceBoundingBox.height;
                const numCols = pieceBoundingBox.width;

                for (let i = 0; i < numRows; i++) {
                    // horizontal
                    pieceCtx.lineWidth = 5;
                    pieceCtx.strokeStyle = '#fff';

                    pieceCtx.beginPath();
                    pieceCtx.moveTo(0, (pieceCanvas.height / numRows) * (i + 1));
                    pieceCtx.lineTo(pieceCanvas.width, (pieceCanvas.height / numRows) * (i + 1));
                    pieceCtx.stroke();
                }

                for (let i = 0; i < numCols; i++) {
                    // vertical
                    pieceCtx.beginPath();
                    pieceCtx.moveTo((pieceCanvas.width / numCols) * (i + 1), 0);
                    pieceCtx.lineTo((pieceCanvas.width / numCols) * (i + 1), pieceCanvas.height);
                    pieceCtx.stroke();
                }
            }
        }
    }

    render() {
        render(this.canvas, this.ctx, this.board);
        window.requestAnimationFrame(() => this.render());
    }
}
