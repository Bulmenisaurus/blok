import { Board } from './board';
import { Move, StartPosition } from './movegen/movegen';

export type AppMode = 'perf' | 'interactive' | 'ai';

export const getAppMode = (): AppMode => {
    const urlParams = new URLSearchParams(window.location.search);
    // ai is the default mode
    const appModeParam = urlParams.get('debug') || 'ai';

    return appModeParam as AppMode;
};

export interface ControllerOptions {
    numThreads: number;
    difficulty: string;
    startPos: StartPosition;
}
// Generic interface for engine
export interface Controller {
    init(board: Board): void;
    findMove(moves: Move[], board: Board, lastMove: Move | undefined): Promise<Move | undefined>;
}
