import { Board } from './board';
import { findMove } from './mcts/mcts-bot';
import {
    Move,
    NULL_MOVE,
    PieceData,
    PieceType,
    PlacedPiece,
    Player,
    RRData,
    getAllLegalMoves,
    getMovePlayer,
    getOrientationData,
    pieceData,
    serializePlacedPiece,
} from './movegen/movegen';
import { getBoundingBox, otherPlayer } from './movegen/movegen-utils';
import { render } from './renderer';
import { Coordinate } from './types';
import { getAppMode } from './util';
import { WorkerManager } from './workerManager';

/**
 * The interactive canvas for the game.
 * Handles the user input and updates the board state.
 * Also handles the rendering of the board and the pieces.
 */
export class InteractiveCanvas {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    /** Current board state. Should always be reflected in the UI */
    board: Board;
    carousel: HTMLElement;
    carouselCanvases: { [key: number]: HTMLCanvasElement } = [];

    /** The player that the user controls */
    userPlayer: Player;

    /** The current selected piece, will be shown on hover */
    selectedPiece: PieceType | null = null;
    /** Current position of the mouse, update on mousemove */
    mousePosition: Coordinate = { x: 0, y: 0 };
    /** Current rotation of the piece */
    selectedPieceRotation: number = 0;
    /** Whether the piece is horizontally flipped or not */
    selectedPieceFlipped: boolean = false;

    workers: WorkerManager;
    moveAlertSound: HTMLAudioElement | undefined;

    /** The legal moves in the current position, used to check move validity */
    legalMoves: Move[];
    /** The list of moves played this game, used to update the bot */
    playedMoves: Move[] = [];

    constructor(
        board: Board,
        workers: WorkerManager,
        shouldPlaySound: boolean,
        userPlayer: string
    ) {
        const canvas = document.getElementById('canvas') as HTMLCanvasElement;
        const ctx = canvas.getContext('2d')!;

        this.userPlayer = userPlayer === 'green' ? 0 : 1;

        this.canvas = canvas;
        this.ctx = ctx;
        this.board = board;
        this.workers = workers;
        this.carousel = document.getElementById('blocks-carousel')!;
        this.initCarousel();

        this.legalMoves = getAllLegalMoves(board);

        this.updateUI();

        this.canvas.addEventListener('mousemove', (e) => this.mouseMove(e));
        this.canvas.addEventListener('click', (e) => this.click(e));
        window.addEventListener('keydown', (e) => this.keyDown(e));

        window.requestAnimationFrame(() => this.drawLoop());

        if (shouldPlaySound) {
            this.moveAlertSound = new Audio('./audio/bell.mp3');
        }

        const skipButton = document.getElementById('skip-button')!;
        skipButton.addEventListener('click', () => {
            const skipMove = NULL_MOVE;
            if (!this.isMoveLegal(skipMove)) {
                console.error('Illegal skip move');
                return;
            }

            this.onUserCompleteTurn(skipMove);
        });

        // Finally, start the game loop
        this.onMoveReady();
    }
    /**
     * Called after a move has been played or at the beginning
     * The board state is assumed to have been update already
     */
    onMoveReady() {
        if (this.board.gameOver()) {
            return;
        }

        const botPlayer: Player = otherPlayer(this.userPlayer);
        const toPlay = this.board.state.toMove;
        const appStatus = getAppMode();

        if (toPlay === botPlayer) {
            // It is the bot's moves.
            // Only submit to the bot if we're in the 'ai' mode
            if (appStatus === 'ai') {
                this.botMove();
            } else {
                const moves = getAllLegalMoves(this.board);
                // const randomMove = moves[Math.floor(Math.random() * moves.length)];
                const randomMove = moves[0];
                this.board.doMove(randomMove);
                this.playedMoves.push(randomMove);
                this.legalMoves = getAllLegalMoves(this.board);

                this.updateUI();
            }
        } else {
            // It is the player's move. Don't do anything.
        }
    }

    /**
     * Sends the signal to the ai to play a move
     */
    botMove() {
        const lastMove = this.playedMoves.at(-1);
        findMove(this.board, this.workers, lastMove).then((move) => {
            if (this.moveAlertSound) {
                this.moveAlertSound.play();
            }

            if (move === undefined) {
                console.log('no bot move');
                this.board.skipTurn();
            } else {
                this.board.doMove(move);
                this.playedMoves.push(move);
            }
            this.legalMoves = getAllLegalMoves(this.board);
            this.updateUI();
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

        const move = serializePlacedPiece({
            location: this.mousePosition,
            pieceType: this.selectedPiece,
            player: this.userPlayer,
            orientation,
        });

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
            const move = this.legalMoves[Math.floor(Math.random() * this.legalMoves.length)];
            this.onUserCompleteTurn(move);
        }
    }

    // Everything that needs to be done after the player chose a valid move:
    // Play it
    // Update UI
    // Alert bot
    onUserCompleteTurn(move: Move) {
        if (this.board.state.toMove !== this.userPlayer) {
            throw new Error('calm down buddy, not your turn.');
        }
        this.board.doMove(move);
        this.playedMoves.push(move);
        this.selectedPiece = null;

        this.updateUI();

        this.onMoveReady();
    }

    initCarousel() {
        // order pieces by length
        const pieceOrder: PieceType[] = [
            20, 0, 1, 2, 4, 5, 6, 7, 8, 9, 10, 19, 11, 12, 13, 14, 15, 18, 3, 17, 16,
        ];

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
        const myPiecesRemaining = [
            this.board.state.playerARemaining,
            this.board.state.playerBRemaining,
        ][this.userPlayer];

        for (const [pieceType, piece] of pieceData.entries()) {
            const visible = myPiecesRemaining & (1 << pieceType);
            this.carouselCanvases[pieceType].classList.toggle('hidden', !visible);
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
            pieceCtx.fillStyle = this.userPlayer === 0 ? 'green' : 'red';
            pieceCtx.fill();
        }
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
                player: this.userPlayer,
                orientation,
            };
        }

        render(
            this.canvas,
            this.ctx,
            this.board,
            piecePreview ? serializePlacedPiece(piecePreview) : undefined
        );

        window.requestAnimationFrame(() => this.drawLoop());
    }

    score(): { playerA: number; playerB: number } {
        return this.board.score();
    }

    updateUI() {
        console.log('updating UI, player to move', this.board.state.toMove);
        this.updateScore();
        this.updateMessage();
        this.updateCarouselVisibility();
    }

    updateMessage() {
        const messageUser = document.getElementById('message-user')!;
        const messageCPU = document.getElementById('message-cpu')!;
        const messageSkip = document.getElementById('message-skip')!;
        const messageGame = document.getElementById('message-gameover')!;

        messageUser.style.display = 'none';
        messageCPU.style.display = 'none';
        messageSkip.style.display = 'none';
        messageGame.style.display = 'none';

        if (this.board.gameOver()) {
            messageGame.style.display = 'block';
            return;
        }

        if (this.board.state.toMove !== this.userPlayer) {
            messageCPU.style.display = 'block';
        } else {
            // player to move
            if (this.isMoveLegal(NULL_MOVE)) {
                messageSkip.style.display = 'block';
            } else {
                messageUser.style.display = 'block';
            }
        }
    }

    updateScore() {
        const userScore: HTMLElement = document.querySelector('#user-score-container > .score')!;
        const botScore: HTMLElement = document.querySelector('#bot-score-container > .score')!;

        const { playerA, playerB } = this.score();

        userScore.innerText = playerA.toString();
        botScore.innerText = playerB.toString();

        // update the skip button

        const canSkip = this.legalMoves.includes(NULL_MOVE);
        const skipButton = document.getElementById('skip-button') as HTMLButtonElement;
        skipButton.disabled = !canSkip;

        if (this.board.gameOver()) {
            const winner = this.board.winner();
            if (winner === 'draw') {
                alert('Game is a draw');
            } else {
                const winnerName = winner === 0 ? 'Green' : 'Red';
                alert(`Player ${winnerName} wins!`);
            }
        }
    }

    isMoveLegal(move: Move): boolean {
        // check if either we can skip or we can place that piece
        return this.legalMoves.includes(move);
    }
}
