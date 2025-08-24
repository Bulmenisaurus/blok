import { Board } from './board';
import { Move, StartPosition } from './movegen/movegen';
import { ControllerOptions } from './util';

export class WSManager {
    ws: WebSocket;
    intialized: Promise<void> | undefined;
    boardStartPos: StartPosition;
    difficulty: string;
    constructor(options: ControllerOptions) {
        this.boardStartPos = options.startPos;
        this.difficulty = options.difficulty;
        this.ws = new WebSocket('ws://127.0.0.1:8080');

        this.intialized = new Promise((resolve) => {
            this.ws.onopen = () => {
                console.log('ws opened');
                resolve();
            };
        });

        this.ws.onclose = () => {
            console.log('ws closed');
        };

        this.ws.onerror = (event) => {
            console.log('Error: ', event);
        };
    }

    async init() {
        await this.intialized;
        this.ws.send(
            JSON.stringify({
                type: 'init',
                startPos: this.boardStartPos,
                difficulty: this.difficulty,
            })
        );
    }

    async findMove(
        moves: Move[],
        board: Board,
        lastMove: Move | undefined
    ): Promise<Move | undefined> {
        await this.intialized;

        const start = Date.now();

        const responsePromise = new Promise<Move | undefined>((resolve) => {
            this.ws.onmessage = (event) => {
                console.log('ws message', event.data);
                const data = JSON.parse(event.data);
                if (data.type === 'move') {
                    this.ws.onmessage = null;
                    const end = Date.now();
                    console.log(`findMove took ${end - start}ms`);
                    resolve(data.move);
                }
            };
        });

        this.ws.send(
            JSON.stringify({
                type: 'findMove',
                move: lastMove,
            })
        );
        return responsePromise;
    }
}
