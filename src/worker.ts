import { Board } from './board';
import { WorkerMessage, WorkerResponse } from './workerManager';
import { MonteCarlo } from './mcts/MonteCarlo';
import { getAllLegalMoves } from './movegen/movegen';

let board: Board | undefined;
// Create Monte Carlo Tree Search instance
let mcts: MonteCarlo | undefined;

let difficulty: string = 'easy';

onmessage = (e: MessageEvent<WorkerMessage>) => {
    if (e.data.type === 'init') {
        console.log('initialization');
        board = new Board(e.data.startPos);
        mcts = new MonteCarlo();
        difficulty = e.data.difficulty;
        return;
    }

    if (board === undefined || mcts === undefined) {
        throw new Error('No initialization! :(');
    }

    if (e.data.lastMove !== undefined) {
        board.doMove(e.data.lastMove);
    }

    if (board.gameOver()) {
        throw new Error('why are you bothering me? The game is over.');
    }

    const moves = getAllLegalMoves(board);
    if (moves.length === 1) {
        const bestMove = moves[0];
        board.doMove(bestMove);
        postMessage({ move: bestMove, score: 0 });
        return;
    }

    const timeout = {
        easy: 2_000,
        medium: 10_000,
        hard: 20_000,
    }[difficulty]!;

    console.log('running mcts', timeout, 'ms');
    const start = Date.now();
    mcts.runSearch(board, timeout);

    try {
        const info = mcts.bestPlayInfo();
        const bestMove = info.move;
        const score = info.q;
        console.log(
            `mcts: iterations=${info.iterations} score=${score.toFixed(3)} visits=${
                info.visits
            } bestmove=${bestMove} took ${Date.now() - start} ms`
        );

        mcts.clear();

        board.doMove(bestMove);

        postMessage({
            move: bestMove,
            score: score,
        } as WorkerResponse);
    } catch (error) {
        console.error('MCTS failed to find best move:', error);
        postMessage(null);
    }
};
