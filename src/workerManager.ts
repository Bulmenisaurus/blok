import { BoardState, Move, PlacedPiece } from './movegen';

export type WorkerResponse = null | {
    move: Move;
    score: number;
};

export interface WorkerMessage {
    boardStateMoves: PlacedPiece[];
    searchMoves: Move[];
}

export class WorkerManager {
    workers: Worker[];
    numWorkers: number;

    constructor() {
        this.workers = [];

        this.numWorkers = navigator.hardwareConcurrency;
        for (let i = 0; i < this.numWorkers; i++) {
            this.workers.push(new Worker('./dist/worker.js'));
        }
    }

    async findMove(moves: Move[], board: BoardState): Promise<WorkerResponse> {
        const workerTasks: Move[][] = [];

        for (let i = 0; i < this.numWorkers; i++) {
            workerTasks.push([]);
        }

        for (let i = 0; i < moves.length; i++) {
            workerTasks[i % this.numWorkers].push(moves[i]);
        }

        const requests: Promise<WorkerResponse>[] = [];

        for (let i = 0; i < this.numWorkers; i++) {
            requests.push(this.workerRequest(this.workers[i], board, workerTasks[i]));
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

    workerRequest(worker: Worker, board: BoardState, task: Move[]): Promise<WorkerResponse> {
        const responsePromise = new Promise<WorkerResponse>((resolve) => {
            worker.onmessage = (message: MessageEvent<WorkerResponse>) => {
                resolve(message.data);

                // is deleting the event necessary?
                // is there a better way to do this?
                worker.onmessage = null;
            };
        });

        const message: WorkerMessage = { boardStateMoves: board.pieces, searchMoves: task };

        worker.postMessage(message);

        return responsePromise;
    }
}
