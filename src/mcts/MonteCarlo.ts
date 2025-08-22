import { Board } from '../board';
import { getAllLegalMoves, Move, Player } from '../movegen/movegen';
import { otherPlayer } from '../movegen/movegen-utils';
import { MonteCarloNode } from './MonteCarloNode';

type GameOutcome = Player | 'draw' | 'none';

export class MonteCarlo {
    game: Board;
    UCB1ExploreParam: number;
    //* nodes: Map<string, MonteCarloNode>;
    all_nodes: MonteCarloNode[];
    root_node_idx: number;
    constructor(game: Board, UCB1ExploreParam = 2) {
        this.game = game;
        this.UCB1ExploreParam = UCB1ExploreParam;
        //* this.nodes = new Map(); // map: State.hash() => MonteCarloNode
        this.all_nodes = [];
        this.root_node_idx = -1;
    }
    /** From given state, repeatedly run MCTS to build statistics. Timeout in ms. */
    runSearch(state: Board, difficulty: string) {
        this.makeNode(state);
        const start = Date.now();

        const timeout = {
            easy: 2_000,
            medium: 10_000,
            hard: 20_000,
        }[difficulty]!;

        const searchDepth = {
            easy: 1_000,
            medium: 5_000,
            hard: 15_000,
        }[difficulty]!;

        let i = 0;
        for (; i < searchDepth || Date.now() < start + timeout; i++) {
            let node = this.select(state);
            let winner = node.state.winner();
            if (node.isLeaf() === false && winner === 'none') {
                node = this.expand(node);
                winner = this.simulate(node);
            }
            this.backpropagate(node, winner);
        }

        console.log('runSearch', i, 'took', Date.now() - start, 'ms');
    }

    // Creates a new node from which to start a search
    // Since I clear the entire tree after every search, this will always create a root node
    makeNode(state: Board) {
        let unexpandedPlays = getAllLegalMoves(state);
        const new_idx = this.all_nodes.length;

        if (new_idx !== 0) {
            throw new Error(
                'Search started from a non empty tree. Was the tree not cleared between searches?'
            );
        }

        this.root_node_idx = 0;

        let node = new MonteCarloNode(new_idx, null, null, null, state, unexpandedPlays);
        //* this.nodes.set(state.hash(), node);
        this.all_nodes.push(node);

        // index of the node
        return this.all_nodes.length - 1;
    }

    /** Get the best move from available statistics. */
    bestPlay(state: Board) {
        // If not all children are expanded, not enough information
        //* if (!this.nodes.get(state.hash())!.isFullyExpanded()) {
        //*     throw new Error('Not enough information!');
        //* }
        if (!this.all_nodes[this.root_node_idx].isFullyExpanded()) {
            throw new Error('Not enough information!');
        }
        //* let node = this.nodes.get(state.hash())!;
        let node = this.all_nodes[this.root_node_idx];
        let allPlays = node.allPlays();
        let bestPlay;
        let max = -Infinity;
        for (let play of allPlays) {
            let childNode = node.childNode(play, this.all_nodes);
            // skip unexpanded nodes (probably would've been caught by the condition above)
            if (childNode.n_plays === 0) {
                continue;
            }
            if (childNode.n_plays > max) {
                bestPlay = play;
                max = childNode.n_plays;
            }
        }
        if (bestPlay === undefined) {
            throw new Error('No best play found. Was bestPlay called on a leaf node?');
        }
        return bestPlay;
    }
    /** Phase 1, Selection: Select until not fully expanded OR leaf */
    select(state: Board): MonteCarloNode {
        //* let node = this.nodes.get(state.hash())!;
        let node = this.all_nodes[this.root_node_idx];
        while (node.isFullyExpanded() && !node.isLeaf()) {
            let plays = node.allPlays();
            let bestPlay;
            let bestUCB1 = -Infinity;
            for (let play of plays) {
                let childUCB1 = node
                    .childNode(play, this.all_nodes)
                    .getUCB1(this.UCB1ExploreParam, this.all_nodes);
                if (childUCB1 > bestUCB1) {
                    bestPlay = play;
                    bestUCB1 = childUCB1;
                }
            }
            if (bestPlay === undefined) {
                throw new Error('No best play found. Was select called on a leaf node?');
            }
            node = node.childNode(bestPlay, this.all_nodes);
        }
        return node;
    }

    /** Phase 2, Expansion: Expand a random unexpanded child node */
    expand(node: MonteCarloNode) {
        let plays = node.unexpandedPlays();
        let randomMove = plays[Math.floor(Math.random() * plays.length)];

        const childState = node.state.copy();
        childState.doMove(randomMove);
        let childUnexpandedPlays = getAllLegalMoves(childState);

        const new_idx = this.all_nodes.length;

        let childNode = node.expand(randomMove, childState, childUnexpandedPlays, new_idx);
        //* this.nodes.set(childState.hash(), childNode);
        this.all_nodes.push(childNode);
        return childNode;
    }

    /** Phase 3, Simulation: Play game to terminal state, return winner */
    simulate(node: MonteCarloNode): GameOutcome {
        let state = node.state.copy();
        let winner = state.winner();
        while (winner === 'none') {
            let plays = getAllLegalMoves(state);
            let play = plays[Math.floor(Math.random() * plays.length)];
            state.doMove(play);
            winner = state.winner();
        }
        return winner;
    }
    /** Phase 4, Backpropagation: Update ancestor statistics */
    backpropagate(node: MonteCarloNode, winner: GameOutcome) {
        let currentNode: MonteCarloNode | null = node;
        while (currentNode !== null) {
            //TODO: do i have to increment n_wins on draw?
            currentNode.n_plays += 1;
            // Parent's choice
            if (otherPlayer(currentNode.state.state.toMove) === winner) {
                currentNode.n_wins += 1;
            }

            let parentNodeIdx: number | null = currentNode.parent_idx;
            currentNode = parentNodeIdx === null ? null : this.all_nodes[parentNodeIdx];
        }
    }

    getStats(state: Board) {
        let node = this.all_nodes[this.root_node_idx];
        //* let node = this.nodes.get(state.hash())!;
        let stats: {
            n_plays: number;
            n_wins: number;
        } = {
            n_plays: node.n_plays,
            n_wins: node.n_wins,
        };

        return stats;
    }
}
