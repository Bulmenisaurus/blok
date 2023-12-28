import { render, startPos } from './renderer';
import { BoardState, getAllLegalMoves, getPieceData } from './movegen';
import { InteractiveCanvas } from './interactiveCanvas';

const main = () => {
    const boardState = new BoardState();
    const interactiveCanvas = new InteractiveCanvas(boardState);

    // debugger;
};

main();
