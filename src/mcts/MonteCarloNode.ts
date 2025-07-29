import { Board } from '../board';
import { Move } from '../movegen/movegen';

/** Class representing a node in the search tree. */

//TODO: dedup
const moveHash = (move: Move) => {
    if (move.piece === null) {
        return 'null';
    }
    return `${move.piece.pieceType}-${move.piece.location.x}-${move.piece.location.y}-${move.piece.orientation}`;
};

export class MonteCarloNode {
    play: Move | null;
    state: Board;
    n_plays: number;
    n_wins: number;
    parent: MonteCarloNode | null;
    children: Map<string, { play: Move; node: MonteCarloNode | null }>;
    constructor(
        parent: MonteCarloNode | null,
        play: Move | null,
        state: Board,
        unexpandedPlays: Move[]
    ) {
        this.play = play;
        this.state = state; // Monte Carlo stuff
        this.n_plays = 0;
        this.n_wins = 0; // Tree stuff
        this.parent = parent;
        this.children = new Map();
        for (let play of unexpandedPlays) {
            this.children.set(moveHash(play), { play: play, node: null });
        }
    }

    /** Get the MonteCarloNode corresponding to the given play. */
    childNode(play: Move): MonteCarloNode {
        let child = this.children.get(moveHash(play));
        if (child === undefined) {
            throw new Error('Child not found');
        }
        if (child.node === null) {
            throw new Error('Child not expanded');
        }
        return child.node;
    }

    /** Expand the specified child play and return the new child node. */
    expand(play: Move, childState: Board, unexpandedPlays: Move[]): MonteCarloNode {
        if (!this.children.has(moveHash(play))) {
            throw new Error('Child not found');
        }
        let childNode = new MonteCarloNode(this, play, childState, unexpandedPlays);
        this.children.set(moveHash(play), { play: play, node: childNode });
        return childNode;
    }

    /** Get all legal plays from this node. */
    allPlays(): Move[] {
        return Array.from(this.children.values()).map((child) => child.play);
    }

    /** Get all unexpanded legal plays from this node. */
    unexpandedPlays(): Move[] {
        return Array.from(this.children.values())
            .filter((child) => child.node === null)
            .map((child) => child.play);
    }

    /** Whether this node is fully expanded. */
    isFullyExpanded(): boolean {
        return Array.from(this.children.values()).every((child) => child.node !== null);
    }

    /** Whether this node is terminal in the game tree, 
      NOT INCLUSIVE of termination due to winning. */
    isLeaf(): boolean {
        return this.children.size === 0;
    }

    /** Get the UCB1 value for this node.
     * Not defined for the root node.
     */
    getUCB1(biasParam: number): number {
        if (this.parent === null) {
            throw new Error('UCB1 not defined for root node');
        }
        return (
            this.n_wins / this.n_plays +
            Math.sqrt((biasParam * Math.log(this.parent.n_plays)) / this.n_plays)
        );
    }
}
