import { Board } from '../board';
import { Move } from '../movegen/movegen';

//TODO: dedup
const moveHash = (move: Move) => {
    return `${move}`;
};

/** Class representing a node in the search tree. */
export class MonteCarloNode {
    /** The move that got us to this position. Null if it is a root node */
    play: Move | null;
    parent_idx: number | null;
    /** The current board state that simulations play out from */
    state: Board;

    /** n_plays and n_wins updated by MonteCarlo.backpropagate() */
    n_plays: number;
    n_wins: number;

    /** The index of this node in the nodes array, used for giving children parents */
    own_idx: number;

    /** Lazily evaluated chilren. Once children are explored the node is no longer null */
    children_idx: Map<string, { play: Move; node: number | null }>;
    constructor(
        idx: number,
        parentIdx: number | null,
        play: Move | null,
        state: Board,
        unexpandedPlays: Move[]
    ) {
        this.own_idx = idx;
        this.play = play;
        this.state = state;
        this.n_plays = 0;
        this.n_wins = 0;
        this.parent_idx = parentIdx;
        this.children_idx = new Map();
        for (let play of unexpandedPlays) {
            this.children_idx.set(moveHash(play), { play: play, node: null });
        }
    }

    /** Get the MonteCarloNode corresponding to the given play. */
    childNode(play: Move, all_nodes: MonteCarloNode[]): MonteCarloNode {
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
            this.own_idx,
            play,
            childState,
            unexpandedPlays
        );

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
     * Needs all_nodes to get information from the parent
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
