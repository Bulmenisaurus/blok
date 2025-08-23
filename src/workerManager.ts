import { Move, PlacedPiece, StartPosition } from './movegen/movegen';
import { Board } from './board';
import { ControllerOptions } from './util';

export type WorkerResponse = null | {
    move: Move;
    score: number;
};

export interface WorkerMessageMove {
    type: 'move';
    startPos: StartPosition;
    lastMove: Move | undefined;
    searchMoves: Move[];
}

export interface WorkerMessageInit {
    type: 'init';
    startPos: StartPosition;
    difficulty: string;
}

export type WorkerMessage = WorkerMessageMove | WorkerMessageInit;

export class WorkerManager {
    workers: Worker[];
    numWorkers: number;
    difficulty: string;

    constructor(options: ControllerOptions) {
        this.workers = [];
        this.difficulty = options.difficulty;

        this.numWorkers = options.numThreads;
        for (let i = 0; i < this.numWorkers; i++) {
            this.workers.push(new Worker('./dist/worker.js'));
        }
    }

    // simplified version of findMove that just uses one worker
    async findMove(
        moves: Move[],
        board: Board,
        lastMove: Move | undefined
    ): Promise<Move | undefined> {
        const request = this.workerRequest(this.workers[0], board, moves, lastMove);
        const response = await request;
        return response?.move;
    }

    /*
    async findMove(moves: Move[], board: Board, lastMove: Move): Promise<WorkerResponse> {
        const workerTasks: Move[][] = [];

        for (let i = 0; i < this.numWorkers; i++) {
            workerTasks.push([]);
        }

        for (let i = 0; i < moves.length; i++) {
            workerTasks[i % this.numWorkers].push(moves[i]);
        }

        const requests: Promise<WorkerResponse>[] = [];

        for (let i = 0; i < this.numWorkers; i++) {
            requests.push(this.workerRequest(this.workers[i], board, workerTasks[i], lastMove));
        }

        console.log(requests);
        const responses = await Promise.all(requests);

        let bestResponse: WorkerResponse = null;

        for (const response of responses) {
            if (response === null) {
                continue;
            }

            if (bestResponse === null) {
                bestResponse = response;
            }

            if (response.score > bestResponse.score) {
                bestResponse = response;
            }
        }

        return bestResponse;
    }
    */

    init(board: Board) {
        for (const worker of this.workers) {
            this.workerInit(worker, board);
        }
    }

    workerInit(worker: Worker, board: Board) {
        const initMessage: WorkerMessageInit = {
            type: 'init',
            startPos: board.state.startPosName,
            difficulty: this.difficulty,
        };

        worker.postMessage(initMessage);
    }

    workerRequest(
        worker: Worker,
        board: Board,
        task: Move[],
        lastMove: Move | undefined
    ): Promise<WorkerResponse> {
        const responsePromise = new Promise<WorkerResponse>((resolve) => {
            worker.onmessage = (message: MessageEvent<WorkerResponse>) => {
                resolve(message.data);

                // is deleting the event necessary?
                // is there a better way to do this?
                worker.onmessage = null;
            };
        });

        const message: WorkerMessage = {
            type: 'move',
            lastMove: lastMove,
            searchMoves: task,
            startPos: board.state.startPosName,
        };

        worker.postMessage(message);

        return responsePromise;
    }
}
