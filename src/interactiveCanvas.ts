import { Board } from './board';
import { findMove } from './mcts/mcts-bot';
import {
    Move,
    PieceData,
    PieceType,
    PlacedPiece,
    RRData,
    getAllLegalMoves,
    getBoundingBox,
    getOrientationData,
    pieceData,
} from './movegen/movegen';
import { render } from './renderer';
import { Coordinate } from './types';
import { WorkerManager } from './workerManager';

/**
 * The interactive canvas for the game.
 * Handles the user input and updates the board state.
 * Also handles the rendering of the board and the pieces.
 */
export class InteractiveCanvas {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    board: Board;
    carousel: HTMLElement;
    carouselCanvases: { [key: number]: HTMLCanvasElement };

    selectedPiece: PieceType | null;
    mousePosition: Coordinate;
    selectedPieceRotation: number;
    selectedPieceFlipped: boolean;
    workers: WorkerManager;
    moveAlertSound: HTMLAudioElement | undefined;
    legalMoves: Move[];

    constructor(board: Board, workers: WorkerManager, shouldPlaySound: boolean) {
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

        this.legalMoves = getAllLegalMoves(board);

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

        if (shouldPlaySound) {
            this.moveAlertSound = new Audio('./audio/bell.mp3');
        }

        const skipButton = document.getElementById('skip-button')!;
        skipButton.addEventListener('click', () => {
            const skipMove: Move = {
                piece: null,
                previousNullMoveCounter: this.board.state.nullMoveCounter,
            };
            if (!this.isMoveLegal(skipMove)) {
                console.error('Illegal skip move');
                return;
            }

            this.onUserCompleteTurn(skipMove);
        });
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
            previousNullMoveCounter: this.board.state.nullMoveCounter,
        };

        if (!this.isMoveLegal(move)) {
            console.error('Illegal move');
            return;
        }

        this.onUserCompleteTurn(move);
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

        if (e.key === '?') {
            const move = this.legalMoves[0];
            this.onUserCompleteTurn(move);
        }
    }

    // Everything that needs to be done after the player chose a valid move:
    // Play it
    // Update UI
    // Alert bot
    onUserCompleteTurn(move: Move) {
        if (this.board.state.toMove !== 0) {
            throw new Error('calm down buddy, not your turn.');
        }
        this.board.doMove(move);
        this.updateScore();
        this.updateCarouselVisibility();

        findMove(this.board, this.workers, move).then((move) => {
            if (this.moveAlertSound) {
                this.moveAlertSound.play();
            }

            if (move === undefined) {
                console.log('no bot move');
                this.board.skipTurn();
            } else {
                this.board.doMove(move);
            }
            this.updateScore();
            this.legalMoves = getAllLegalMoves(this.board);
        });
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
            if (this.board.state.playerARemaining & (1 << pieceType)) {
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
                x: tile.x - pieceBoundingBox.topLeft.x,
                y: tile.y - pieceBoundingBox.topLeft.y,
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
            playerA: this.board.state.pieces
                .filter((p) => p.player === 0)
                .map((p) => getOrientationData(p.pieceType, 0).length)
                .reduce((a, b) => a + b, 0),
            playerB: this.board.state.pieces
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

        if (this.board.gameOver()) {
            const winner = this.board.winner();
            if (winner === 'draw') {
                alert('Game is a draw');
            } else {
                alert(`Player ${winner} wins!`);
            }
        }
    }

    isMoveLegal(move: Move): boolean {
        // check if either we can skip or we can place that piece
        return !!this.legalMoves.find(
            (legalMove) =>
                (move.piece === null && legalMove.piece === null) ||
                (move.piece !== null &&
                    legalMove.piece !== null &&
                    move.piece.location.x === legalMove.piece.location.x &&
                    move.piece.location.y === legalMove.piece.location.y &&
                    move.piece.orientation === legalMove.piece.orientation &&
                    move.piece.pieceType === legalMove.piece.pieceType)
        );
    }
}
