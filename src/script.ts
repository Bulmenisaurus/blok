import { BoardState } from './movegen';
import { InteractiveCanvas } from './interactiveCanvas';
import { WorkerManager } from './workerManager';

const main = () => {
    const boardState = new BoardState();
    const workers = new WorkerManager();
    const interactiveCanvas = new InteractiveCanvas(boardState, workers);

    // debugger;
};

main();
