import { Board } from '../board';
import {
    getAllLegalMoves,
    Move,
    Player,
    pickSizeWeightedMove,
    sizeWeight,
} from '../movegen/movegen';
import { otherPlayer } from '../movegen/movegen-utils';
import { ChildSlot, MonteCarloNode } from './MonteCarloNode';

/** Typical AlphaZero-range PUCT constant. Prior is 2^size, not a net. */
const PUCT_C = 1.5;
/** Progressive widening: allow C * n^alpha children before selecting among them. */
const PW_C = 4.0;
const PW_ALPHA = 0.5;

export interface SearchInfo {
    move: Move;
    visits: number;
    q: number;
    iterations: number;
    nodes: number;
}

export class MonteCarlo {
    all_nodes: MonteCarloNode[];
    iterations: number;
    private scratch: Board | null;

    constructor() {
        this.all_nodes = [];
        this.iterations = 0;
        this.scratch = null;
    }

    clear() {
        this.all_nodes = [];
        this.iterations = 0;
    }

    /** From given state, run MCTS until `timeoutMs` elapses. */
    runSearch(state: Board, timeoutMs: number) {
        this.startSearch(state);
        const deadline = Date.now() + timeoutMs;
        let i = 0;
        while (true) {
            this.iterate(state);
            i++;
            if ((i & 7) === 0 && Date.now() >= deadline) {
                break;
            }
        }
    }

    startSearch(state: Board) {
        this.clear();
        if (this.scratch === null) {
            this.scratch = state.copy();
        }
        this.makeRoot(state);
    }

    /** One select / expand / simulate / backprop iteration from `root`. */
    iterate(root: Board) {
        const treeState = this.scratch === null ? root.copy() : this.scratch;
        this.scratch = treeState;
        treeState.copyFrom(root);

        const nodeIdx = this.select(treeState);
        if (!this.all_nodes[nodeIdx].isLeaf() && !treeState.gameOver()) {
            const newIdx = this.expand(nodeIdx, treeState);
            const player = treeState.state.toMove;
            const expander = otherPlayer(player);
            const mobH = mobilityHeuristic(treeState, expander);
            this.simulate(treeState);
            this.backpropagate(newIdx, treeState.score(), player, mobH);
        } else {
            this.backpropagate(nodeIdx, treeState.score(), treeState.state.toMove, null);
        }
        this.iterations += 1;
    }

    makeRoot(state: Board) {
        if (this.all_nodes.length !== 0) {
            throw new Error(
                'Search started from a non empty tree. Was the tree not cleared between searches?'
            );
        }
        const unexpandedPlays = getAllLegalMoves(state);
        this.all_nodes.push(new MonteCarloNode(0, null, unexpandedPlays, 1.0));
    }

    bestPlay(): Move {
        return this.bestPlayInfo().move;
    }

    bestPlayInfo(): SearchInfo {
        const node = this.all_nodes[0];
        let bestPlay: Move | undefined;
        let maxPlays = 0;
        let q = 0.5;
        for (const child of node.children) {
            if (child.node === null) {
                continue;
            }
            const childNode = this.all_nodes[child.node];
            if (childNode.n_plays > maxPlays || bestPlay === undefined) {
                bestPlay = child.play;
                maxPlays = childNode.n_plays;
                q = childNode.n_plays > 0 ? childNode.n_wins / childNode.n_plays : 0.5;
            }
        }
        if (bestPlay === undefined) {
            bestPlay = node.children[0]?.play;
        }
        if (bestPlay === undefined) {
            throw new Error('No best play found. Was bestPlay called on a leaf node?');
        }
        return {
            move: bestPlay,
            visits: maxPlays,
            q,
            iterations: this.iterations,
            nodes: this.all_nodes.length,
        };
    }

    select(state: Board): number {
        let idx = 0;
        while (true) {
            if (this.all_nodes[idx].isLeaf() || this.shouldExpand(idx)) {
                return idx;
            }
            const child = this.bestChild(idx);
            state.doMove(child.play);
            idx = child.node as number;
        }
    }

    shouldExpand(idx: number): boolean {
        const node = this.all_nodes[idx];
        if (node.isFullyExpanded()) {
            return false;
        }
        if (node.n_expanded === 0) {
            return true;
        }
        const k = PW_C * Math.pow(Math.max(node.n_plays, 1), PW_ALPHA);
        return node.n_expanded < k;
    }

    bestChild(idx: number): ChildSlot {
        const node = this.all_nodes[idx];
        const parentN = node.n_plays;
        let best: ChildSlot | undefined;
        let bestUcb = -Infinity;
        for (const child of node.children) {
            if (child.node === null) {
                continue;
            }
            const ucb = this.all_nodes[child.node].getPUCT(PUCT_C, parentN);
            if (ucb > bestUcb) {
                bestUcb = ucb;
                best = child;
            }
        }
        if (best === undefined || best.node === null) {
            throw new Error('No best play found. Was select called on a leaf node?');
        }
        return best;
    }

    expand(nodeIdx: number, currentState: Board): number {
        const parent = this.all_nodes[nodeIdx];
        const newIdx = this.all_nodes.length;
        const randomMove = pickUnexpandedWeighted(parent);
        currentState.doMove(randomMove);
        const childPlays = getAllLegalMoves(currentState);
        const prior = sizePrior(parent.children, randomMove);
        const childNode = parent.expand(randomMove, childPlays, newIdx, prior);
        this.all_nodes.push(childNode);
        return newIdx;
    }

    simulate(currentState: Board) {
        while (!currentState.gameOver()) {
            currentState.doMove(pickSizeWeightedMove(currentState));
        }
    }

    backpropagate(
        nodeIdx: number,
        squares: { playerA: number; playerB: number },
        playerToMove: Player,
        mobilityH: number | null
    ) {
        const expander = otherPlayer(playerToMove);
        const value = (playerToWin: Player) => {
            const term = squareValue(squares, playerToWin);
            if (mobilityH === null) {
                return term;
            }
            if (playerToWin === expander) {
                return 0.75 * term + 0.25 * mobilityH;
            }
            return 0.75 * term + 0.25 * (1 - mobilityH);
        };

        let idx = nodeIdx;
        let player = playerToMove;
        while (true) {
            const node = this.all_nodes[idx];
            node.n_plays += 1;
            node.n_wins += value(otherPlayer(player));
            if (node.parent_idx === null) {
                break;
            }
            idx = node.parent_idx;
            player = otherPlayer(player);
        }
    }

    getStats() {
        const node = this.all_nodes[0];
        return {
            n_plays: node.n_plays,
            n_wins: node.n_wins,
        };
    }
}

function squareValue(squares: { playerA: number; playerB: number }, playerToWin: Player): number {
    const diff =
        playerToWin === 0 ? squares.playerA - squares.playerB : squares.playerB - squares.playerA;
    return 0.5 + 0.5 * Math.tanh(diff / 12);
}

function mobilityHeuristic(state: Board, playerToWin: Player): number {
    const my = state.mobility(playerToWin);
    const opp = state.mobility(otherPlayer(playerToWin));
    return 0.5 + 0.5 * Math.tanh((my - opp) / 100);
}

function sizePrior(children: { play: Move }[], play: Move): number {
    let total = 0;
    let wPlay = 1;
    for (let i = 0; i < children.length; i++) {
        const w = sizeWeight(children[i].play);
        total += w;
        if (children[i].play === play) {
            wPlay = w;
        }
    }
    return total === 0 ? 1 : wPlay / total;
}

function pickUnexpandedWeighted(node: MonteCarloNode): Move {
    let total = 0;
    for (let i = 0; i < node.children.length; i++) {
        if (node.children[i].node === null) {
            total += sizeWeight(node.children[i].play);
        }
    }
    let r = Math.random() * total;
    let last = node.children[0].play;
    for (let i = 0; i < node.children.length; i++) {
        if (node.children[i].node !== null) {
            continue;
        }
        last = node.children[i].play;
        const w = sizeWeight(last);
        if (r < w) {
            return last;
        }
        r -= w;
    }
    return last;
}
