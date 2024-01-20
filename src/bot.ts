import { BoardState } from './board';
import { Move, PlayerState, getAllLegalMoves, getOrientationData } from './movegen';
import { WorkerManager } from './workerManager';

export const findMove = async (
    board: BoardState,
    workers: WorkerManager
): Promise<Move | undefined> => {
    const startTime = Date.now();

    let moves = getAllLegalMoves(board);
    // last 50 moves
    moves = moves.filter((m) => {
        if (board.pieces.length < 5 && getOrientationData(m.piece.pieceType, 0).length !== 5) {
            return false;
        }

        return true;
    });
    const filteredLength = moves.length;
    moves = moves.slice(Math.max(0, moves.length - 50));

    console.log(`#${moves.length} (from ${filteredLength})`);
    const response = await workers.findMove(moves, board);

    const endTime = Date.now();
    console.log(`Took ${endTime - startTime}ms to evaluate positions. Bestmove ${response?.score}`);

    if (response === null) {
        return undefined;
    } else {
        return response.move;
    }
};

export const recursiveBoardSearchAlphaBeta = (
    depth: number,
    board: BoardState,
    alpha: number,
    beta: number
): number => {
    if (depth === 0) {
        return evaluate(board);
    }

    let moves: Move[] = getAllLegalMoves(board);
    moves = moves.slice(Math.max(0, moves.length - 50));

    // if game over, return eval
    if (moves.length === 0) {
        return evaluate(board);
    }

    for (const move of moves) {
        board.doMove(move);
        const evaluation: number = -recursiveBoardSearchAlphaBeta(depth - 1, board, -beta, -alpha);
        board.undoMove(move);

        if (evaluation >= beta) {
            return beta;
        }

        alpha = Math.max(alpha, evaluation);
    }
    return alpha;
};

/**
 * Basic evaluation function.
 * Returns a:
 *  - positive value if the player who's turn it is to move is doing better
 *  - negative if the player who's turn it is to move is doing worse
 *  - 0 if it is a tie.
 */
const evaluate = (board: BoardState) => {
    const pAMobility = getAllLegalMoves(board).length / 100;
    board.skipTurn();
    const pBMobility = getAllLegalMoves(board).length / 100;
    board.skipTurn();

    const evaluation =
        countPlayerScore(board.playerA) -
        countPlayerScore(board.playerB) +
        (pAMobility - pBMobility);
    const perspective = board.toMove === 0 ? 1 : -1;

    return evaluation * perspective;
};

// higher = better
export const countPlayerScore = (player: PlayerState) => {
    let score = 1_000;
    for (const remainingPiece of player.remainingPieces) {
        const pieceTile = getOrientationData(remainingPiece, 0);
        score -= pieceTile.length;
    }

    return score;
};
