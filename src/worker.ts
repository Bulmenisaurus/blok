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
        mcts = new MonteCarlo(board);
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

    // Run MCTS search for a reasonable time (5 seconds)
    console.log('running mcts');
    console.log('running 5k search');
    mcts.runSearch(board, difficulty);

    try {
        // Get the best move from MCTS
        const bestMove = mcts.bestPlay(board);

        // Get statistics for the best move
        const stats = mcts.getStats(board);
        const bestMoveStats = stats.children.find(
            (child) => child.play && bestMove && child.play === bestMove
        );
        // clear memory
        console.log('clearing');
        mcts.nodes.clear();

        const score = bestMoveStats
            ? (bestMoveStats.n_wins ?? 0) / (bestMoveStats.n_plays ?? 0)
            : 0;

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
