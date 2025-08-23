import { Board } from '../board';
import { getAllLegalMoves, Move } from '../movegen/movegen';
import { Controller } from '../util';

export const findMove = async (
    board: Board,
    workers: Controller,
    lastMove: Move | undefined
): Promise<Move | undefined> => {
    const move = await workers.findMove(getAllLegalMoves(board), board, lastMove);
    return move;
};
