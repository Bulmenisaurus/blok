import { recursiveBoardSearchAlphaBeta } from './bot';
import { BoardState, Move } from './movegen';
import { WorkerMessage, WorkerResponse } from './workerManager';

onmessage = (e: MessageEvent<WorkerMessage>) => {
    const board = new BoardState();
    for (const piece of e.data.boardStateMoves) {
        board.doMove({
            piece: piece,
        });
    }

    let bestMove: Move | undefined = undefined;
    let bestMoveScore = -Infinity;

    for (const move of e.data.searchMoves) {
        board.doMove(move);

        let ourScore = 0;

        // // if our moves resulted in a finish, interrupt search immediately
        // const playerFinished = countPlayerScore(aiColor, board) === 980;
        // if (playerFinished) {
        //     ourScore = evaluate(board, aiColor);
        // } else {
        // we just made a move, so now its time to evaluate from the perspective of the opponent

        const depth = 2;
        const opponentScore = recursiveBoardSearchAlphaBeta(depth, board, -Infinity, Infinity);

        ourScore = -opponentScore;
        // }

        board.undoMove(move);

        if (ourScore > bestMoveScore) {
            bestMoveScore = ourScore;
            bestMove = move;
        }
    }
    if (bestMove === undefined) {
        postMessage(null);
    } else {
        postMessage({
            move: bestMove,
            score: bestMoveScore,
        } as WorkerResponse);
    }
};
