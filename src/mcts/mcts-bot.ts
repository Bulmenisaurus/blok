import { Board } from '../board';
import { getAllLegalMoves, Move } from '../movegen/movegen';
import { WorkerManager } from '../workerManager';

export const findMove = async (
    board: Board,
    workers: WorkerManager,
    lastMove: Move | undefined
): Promise<Move | undefined> => {
    const move = await workers.findMoveMCTS(getAllLegalMoves(board), board, lastMove);
    return move;
};
