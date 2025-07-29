import { Board } from './board';
import { WorkerMessage, WorkerResponse } from './workerManager';
import { MonteCarlo } from './mcts/MonteCarlo';

const board = new Board('middle');
// Create Monte Carlo Tree Search instance
const mcts = new MonteCarlo(board);

onmessage = (e: MessageEvent<WorkerMessage>) => {
    board.doMove(e.data.lastMove);

    if (board.gameOver()) {
        console.log('why are you bothering me? The game is over.');
    }

    // Run MCTS search for a reasonable time (5 seconds)
    console.log('running mcts');
    mcts.runSearch(board, 5000);

    try {
        // Get the best move from MCTS
        const bestMove = mcts.bestPlay(board);

        // Get statistics for the best move
        const stats = mcts.getStats(board);
        const bestMoveStats = stats.children.find(
            (child) =>
                child.play &&
                child.play.piece &&
                bestMove.piece &&
                child.play.piece.pieceType === bestMove.piece.pieceType &&
                child.play.piece.location.x === bestMove.piece.location.x &&
                child.play.piece.location.y === bestMove.piece.location.y &&
                child.play.piece.orientation === bestMove.piece.orientation
        );

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
