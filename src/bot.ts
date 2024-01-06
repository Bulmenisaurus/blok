import { BoardState, Move, PlayerState, getAllLegalMoves, getPieceData } from './movegen';

export const findMove = (board: BoardState): Move | undefined => {
    let bestMove: Move | undefined = undefined;
    let bestMoveScore = -Infinity;

    const startTime = Date.now();

    for (const move of getAllLegalMoves(board)) {
        board.doMove(move);

        let ourScore = 0;

        // // if our moves resulted in a finish, interrupt search immediately
        // const playerFinished = countPlayerScore(aiColor, board) === 980;
        // if (playerFinished) {
        //     ourScore = evaluate(board, aiColor);
        // } else {
        // we just made a move, so now its time to evaluate from the perspective of the opponent

        const opponentScore = recursiveBoardSearchAlphaBeta(2, board, -Infinity, Infinity);

        ourScore = -opponentScore;
        // }

        board.undoMove(move);

        if (ourScore > bestMoveScore) {
            bestMoveScore = ourScore;
            bestMove = move;
        }
    }

    const endTime = Date.now();
    console.log(`Took ${endTime - startTime}ms to evaluate positions. Bestmove ${bestMoveScore}`);

    return bestMove;
};

const recursiveBoardSearchAlphaBeta = (
    depth: number,
    board: BoardState,
    alpha: number,
    beta: number
): number => {
    if (depth === 0) {
        return evaluate(board);
    }

    const moves: Move[] = getAllLegalMoves(board);

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
    const evaluation = countPlayerScore(board.playerA) - countPlayerScore(board.playerB);

    const perspective = board.toMove === 0 ? 1 : -1;

    return evaluation * perspective;
};

// higher = better
export const countPlayerScore = (player: PlayerState) => {
    let score = 1_000;
    for (const remainingPiece of player.remainingPieces) {
        const pieceTile = getPieceData(remainingPiece, 0, false);
        score -= pieceTile.length;
    }

    return score;
};
