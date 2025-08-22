import { Board } from '../board';
import { Move } from '../movegen/movegen';

/** Class representing a node in the search tree. */

//TODO: dedup
const moveHash = (move: Move) => {
    return `${move}`;
};

export class MonteCarloNode {
    play: Move | null;
    state: Board;
    n_plays: number;
    n_wins: number;
    own_idx: number;
    //* parent: MonteCarloNode | null;
    parent_idx: number | null;
    // lazily evaluated chilren
    //* children: Map<string, { play: Move; node: MonteCarloNode | null }>;
    children_idx: Map<string, { play: Move; node: number | null }>;
    constructor(
        idx: number,
        parent: MonteCarloNode | null,
        parentIdx: number | null,
        play: Move | null,
        state: Board,
        unexpandedPlays: Move[]
    ) {
        this.own_idx = idx;
        this.play = play;
        this.state = state; // Monte Carlo stuff
        this.n_plays = 0;
        this.n_wins = 0; // Tree stuff
        //* this.parent = parent;
        this.parent_idx = parentIdx;
        //* this.children = new Map();
        this.children_idx = new Map();
        for (let play of unexpandedPlays) {
            //* this.children.set(moveHash(play), { play: play, node: null });
            this.children_idx.set(moveHash(play), { play: play, node: null });
        }
    }

    /** Get the MonteCarloNode corresponding to the given play. */
    childNode(play: Move, all_nodes: MonteCarloNode[]): MonteCarloNode {
        //* let child = this.children.get(moveHash(play));
        let child = this.children_idx.get(moveHash(play));
        if (child === undefined) {
            throw new Error('Child not found');
        }
        if (child.node === null) {
            throw new Error('Child not expanded');
        }
        return all_nodes[child.node];
    }

    /** Expand the specified child play and return the new child node. */
    expand(
        play: Move,
        childState: Board,
        unexpandedPlays: Move[],
        new_idx: number
    ): MonteCarloNode {
        if (!this.children_idx.has(moveHash(play))) {
            throw new Error('Child not found');
        }
        let childNode = new MonteCarloNode(
            new_idx,
            this,
            this.own_idx,
            play,
            childState,
            unexpandedPlays
        );

        //* this.children.set(moveHash(play), { play: play, node: childNode });
        this.children_idx.set(moveHash(play), { play: play, node: new_idx });
        return childNode;
    }

    /** Get all legal plays from this node. */
    allPlays(): Move[] {
        return Array.from(this.children_idx.values()).map((child) => child.play);
    }

    /** Get all unexpanded legal plays from this node. */
    unexpandedPlays(): Move[] {
        return Array.from(this.children_idx.values())
            .filter((child) => child.node === null)
            .map((child) => child.play);
    }

    /** Whether this node is fully expanded. */
    isFullyExpanded(): boolean {
        return Array.from(this.children_idx.values()).every((child) => child.node !== null);
    }

    /** Whether this node is terminal in the game tree, 
      NOT INCLUSIVE of termination due to winning. */
    isLeaf(): boolean {
        return this.children_idx.size === 0;
    }

    /** Get the UCB1 value for this node.
     * Not defined for the root node.
     */
    getUCB1(biasParam: number, all_nodes: MonteCarloNode[]): number {
        if (this.parent_idx === null) {
            throw new Error('UCB1 not defined for root node');
        }
        const parent = all_nodes[this.parent_idx];
        return (
            this.n_wins / this.n_plays +
            Math.sqrt((biasParam * Math.log(parent.n_plays)) / this.n_plays)
        );
    }
}
