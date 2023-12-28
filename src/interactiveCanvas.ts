import {
    BoardState,
    Move,
    PieceData,
    PieceType,
    PlacedPiece,
    getAllLegalMoves,
    getBoundingBox,
    pieceData,
} from './movegen';
import { render, renderPiece } from './renderer';
import { Coordinate } from './types';

export class InteractiveCanvas {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    board: BoardState;
    carousel: HTMLElement;
    carouselCanvases: HTMLCanvasElement[];

    selectedPiece: PieceType | null;
    mousePosition: Coordinate;
    selectedPieceRotation: number;
    constructor(board: BoardState) {
        const canvas = document.getElementById('canvas') as HTMLCanvasElement;
        const ctx = canvas.getContext('2d')!;

        this.canvas = canvas;
        this.ctx = ctx;
        this.board = board;
        this.carousel = document.getElementById('blocks-carousel')!;
        this.carouselCanvases = [];
        this.initCarousel();

        this.selectedPiece = null;
        this.mousePosition = { x: 0, y: 0 };
        this.selectedPieceRotation = 0;

        this.canvas.addEventListener('mousemove', (e) => {
            this.mouseMove(e);
        });

        this.canvas.addEventListener('click', (e) => {
            this.click(e);
        });

        window.addEventListener('keydown', (e) => {
            this.keyDown(e);
        });

        window.requestAnimationFrame(() => this.drawLoop());
    }

    mouseMove(e: MouseEvent) {
        const canvasWidth = this.canvas.getBoundingClientRect().width;
        const canvasHeight = this.canvas.getBoundingClientRect().height;

        const mouseBoardC: Coordinate = {
            x: Math.floor((14 * e.offsetX) / canvasWidth),
            y: Math.floor((14 * e.offsetY) / canvasHeight),
        };

        this.mousePosition = mouseBoardC;
    }

    click(e: MouseEvent) {
        if (this.selectedPiece === null) {
            console.log('tried placing without selecting any piece');
            return;
        }
        const move: Move = {
            piece: {
                location: this.mousePosition,
                pieceType: this.selectedPiece,
                player: 0,
                rotation: this.selectedPieceRotation,
            },
        };
        this.board.doMove(move);
        this.updateCarouselVisibility();
        this.selectedPiece = null;
        this.selectedPieceRotation = 0;

        this.board.doMove(getAllLegalMoves(this.board)[0]);
    }

    keyDown(e: KeyboardEvent) {
        if (e.key === 'Escape') {
            this.selectedPiece = null;
        }
        if (e.key.toLowerCase() === 'r') {
            if (e.shiftKey) {
                this.selectedPieceRotation += 3;
            } else {
                this.selectedPieceRotation += 1;
            }
            this.selectedPieceRotation %= 4;
        }
    }

    initCarousel() {
        for (const [pieceType, piece] of pieceData.entries()) {
            const pieceCanvas = this.carouselPiecePreview(piece);
            this.carousel.append(pieceCanvas);
            this.carouselCanvases.push(pieceCanvas);

            pieceCanvas.addEventListener('click', () => {
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
                this.carouselCanvases[pieceType].classList.remove('hidden');
            } else {
                this.carouselCanvases[pieceType].classList.add('hidden');
            }
        }
    }

    carouselPiecePreview(piece: PieceData): HTMLCanvasElement {
        const pieceCanvas = document.createElement('canvas');

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
        return pieceCanvas;
    }

    drawLoop() {
        let piecePreview: PlacedPiece | undefined;
        if (this.selectedPiece !== null) {
            piecePreview = {
                location: this.mousePosition,
                pieceType: this.selectedPiece,
                player: 0,
                rotation: this.selectedPieceRotation,
            };
        }
        render(this.canvas, this.ctx, this.board, piecePreview);

        window.requestAnimationFrame(() => this.drawLoop());
    }
}
