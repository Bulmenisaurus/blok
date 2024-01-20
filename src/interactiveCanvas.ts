import { findMove } from './bot';
import {
    BoardState,
    Move,
    PieceData,
    PieceType,
    PlacedPiece,
    RRData,
    getBoundingBox,
    getOrientationData,
    pieceData,
} from './movegen';
import { render } from './renderer';
import { Coordinate } from './types';
import { WorkerManager } from './workerManager';

export class InteractiveCanvas {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    board: BoardState;
    carousel: HTMLElement;
    carouselCanvases: { [key: number]: HTMLCanvasElement };

    selectedPiece: PieceType | null;
    mousePosition: Coordinate;
    selectedPieceRotation: number;
    selectedPieceFlipped: boolean;
    workers: WorkerManager;
    constructor(board: BoardState, workers: WorkerManager) {
        const canvas = document.getElementById('canvas') as HTMLCanvasElement;
        const ctx = canvas.getContext('2d')!;

        this.canvas = canvas;
        this.ctx = ctx;
        this.board = board;
        this.workers = workers;
        this.carousel = document.getElementById('blocks-carousel')!;
        this.carouselCanvases = [];
        this.initCarousel();

        this.selectedPiece = null;
        this.mousePosition = { x: 0, y: 0 };
        this.selectedPieceRotation = 0;
        this.selectedPieceFlipped = false;

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

        const rotationReflection =
            2 * this.selectedPieceRotation + (this.selectedPieceFlipped ? 1 : 0);

        const orientation = RRData[this.selectedPiece][rotationReflection];

        const move: Move = {
            piece: {
                location: this.mousePosition,
                pieceType: this.selectedPiece,
                player: 0,
                orientation,
            },
        };

        this.board.doMove(move);
        this.updateCarouselVisibility();
        this.updateScore();
        this.selectedPiece = null;
        this.selectedPieceRotation = 0;

        // const botMove = getAllLegalMoves(this.board);
        // if (botMove.length === 1) {
        //     this.board.doMove(botMove[0]);
        // } else {
        //     console.log(botMove);
        //     this.board.doMove(botMove[1]);
        // }
        const botMove = findMove(this.board, this.workers).then((move) => {
            if (move === undefined) {
                console.log('no bot move');
                this.board.skipTurn();
            } else {
                this.board.doMove(move);
            }
            this.updateScore();
        });
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

        if (e.key === 'f') {
            this.selectedPieceFlipped = !this.selectedPieceFlipped;
        }
    }

    initCarousel() {
        // order pieces by length
        const pieceOrder: PieceType[] = [
            20, 0, 1, 2, 4, 5, 6, 7, 8, 9, 10, 19, 11, 12, 13, 14, 15, 18, 3, 17, 16,
        ];
        // const pieceOrder = Array(21)
        //     .fill(0)
        //     .map((_, i) => i);
        for (const pieceType of pieceOrder) {
            const piece = getOrientationData(pieceType, 0);
            const pieceCanvas = this.carouselPiecePreview(piece);
            this.carousel.append(pieceCanvas);
            this.carouselCanvases[pieceType] = pieceCanvas;

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

        pieceCanvas.style.height = `${pieceBoundingBox.height * 20}%`;

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
            const rotationReflection =
                2 * this.selectedPieceRotation + (this.selectedPieceFlipped ? 1 : 0);
            const orientation = RRData[this.selectedPiece][rotationReflection];

            piecePreview = {
                location: this.mousePosition,
                pieceType: this.selectedPiece,
                player: 0,
                orientation,
            };
        }
        render(this.canvas, this.ctx, this.board, piecePreview);

        window.requestAnimationFrame(() => this.drawLoop());
    }

    score(): { playerA: number; playerB: number } {
        return {
            playerA: this.board.pieces
                .filter((p) => p.player === 0)
                .map((p) => getOrientationData(p.pieceType, 0).length)
                .reduce((a, b) => a + b, 0),
            playerB: this.board.pieces
                .filter((p) => p.player === 1)
                .map((p) => getOrientationData(p.pieceType, 0).length)
                .reduce((a, b) => a + b, 0),
        };
    }

    updateScore() {
        const userScore: HTMLElement = document.querySelector('#user-score-container > .score')!;
        const botScore: HTMLElement = document.querySelector('#bot-score-container > .score')!;

        const { playerA, playerB } = this.score();

        userScore.innerText = playerA.toString();
        botScore.innerText = playerB.toString();
    }
}
