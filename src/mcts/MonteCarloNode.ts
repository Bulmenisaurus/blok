import { Move } from '../movegen/movegen';

export type ChildSlot = { play: Move; node: number | null };

/** Class representing a node in the search tree. */
export class MonteCarloNode {
    parent_idx: number | null;
    n_plays: number;
    n_wins: number;
    own_idx: number;
    /** Size-heuristic prior P(a); used by PUCT. */
    prior: number;
    children: ChildSlot[];
    n_expanded: number;

    constructor(idx: number, parentIdx: number | null, unexpandedPlays: Move[], prior: number) {
        this.own_idx = idx;
        this.n_plays = 0;
        this.n_wins = 0;
        this.parent_idx = parentIdx;
        this.prior = prior;
        this.children = unexpandedPlays.map((play) => ({ play, node: null }));
        this.n_expanded = 0;
    }

    expand(play: Move, unexpandedPlays: Move[], new_idx: number, prior: number): MonteCarloNode {
        const slot = this.children.find((c) => c.play === play && c.node === null);
        if (slot === undefined) {
            throw new Error('Play not found or already expanded');
        }
        slot.node = new_idx;
        this.n_expanded += 1;
        return new MonteCarloNode(new_idx, this.own_idx, unexpandedPlays, prior);
    }

    isFullyExpanded(): boolean {
        return this.n_expanded === this.children.length;
    }

    isLeaf(): boolean {
        return this.children.length === 0;
    }

    getPUCT(cPuct: number, parentNPlays: number): number {
        const n = this.n_plays;
        const q = n > 0 ? this.n_wins / n : 0;
        return q + (cPuct * this.prior * Math.sqrt(parentNPlays)) / (1 + n);
    }
}
