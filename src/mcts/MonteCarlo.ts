import { Board } from '../board';
import { getAllLegalMoves, Move, Player } from '../movegen/movegen';
import { otherPlayer } from '../movegen/movegen-utils';
import { MonteCarloNode } from './MonteCarloNode';

type GameOutcome = Player | 'draw' | 'none';

export class MonteCarlo {
    game: Board;
    UCB1ExploreParam: number;
    nodes: Map<string, MonteCarloNode>;
    constructor(game: Board, UCB1ExploreParam = 2) {
        this.game = game;
        this.UCB1ExploreParam = UCB1ExploreParam;
        this.nodes = new Map(); // map: State.hash() => MonteCarloNode
    }
    /** From given state, repeatedly run MCTS to build statistics. Timeout in ms. */
    runSearch(state: Board, timeout = 10000) {
        this.makeNode(state);
        let end = Date.now() + timeout;

        let i = 0;
        for (; i < 1000 || Date.now() < end; i++) {
            let node = this.select(state);
            let winner = node.state.winner();
            if (node.isLeaf() === false && winner === 'none') {
                node = this.expand(node);
                winner = this.simulate(node);
            }
            this.backpropagate(node, winner);
        }

        console.log('runSearch', i);
    }

    /** If given state does not exist, create dangling node. */
    makeNode(state: Board) {
        if (!this.nodes.has(state.hash())) {
            let unexpandedPlays = getAllLegalMoves(state);
            let node = new MonteCarloNode(null, null, state, unexpandedPlays);
            this.nodes.set(state.hash(), node);
        }
    }

    /** Get the best move from available statistics. */
    bestPlay(state: Board) {
        this.makeNode(state);
        // If not all children are expanded, not enough information
        if (!this.nodes.get(state.hash())!.isFullyExpanded()) {
            throw new Error('Not enough information!');
        }
        let node = this.nodes.get(state.hash())!;
        let allPlays = node.allPlays();
        let bestPlay;
        let max = -Infinity;
        for (let play of allPlays) {
            let childNode = node.childNode(play);
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
        let node = this.nodes.get(state.hash())!;
        while (node.isFullyExpanded() && !node.isLeaf()) {
            let plays = node.allPlays();
            let bestPlay;
            let bestUCB1 = -Infinity;
            for (let play of plays) {
                let childUCB1 = node.childNode(play).getUCB1(this.UCB1ExploreParam);
                if (childUCB1 > bestUCB1) {
                    bestPlay = play;
                    bestUCB1 = childUCB1;
                }
            }
            if (bestPlay === undefined) {
                throw new Error('No best play found. Was select called on a leaf node?');
            }
            node = node.childNode(bestPlay);
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
        let childNode = node.expand(randomMove, childState, childUnexpandedPlays);
        this.nodes.set(childState.hash(), childNode);
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
            currentNode = currentNode!.parent;
        }
    }

    getStats(state: Board) {
        let node = this.nodes.get(state.hash())!;
        let stats: {
            n_plays: number;
            n_wins: number;
            children: { play: Move; n_plays: number | null; n_wins: number | null }[];
        } = {
            n_plays: node.n_plays,
            n_wins: node.n_wins,
            children: [],
        };

        for (let child of node.children.values()) {
            if (child.node === null) {
                stats.children.push({ play: child.play, n_plays: null, n_wins: null });
            } else {
                stats.children.push({
                    play: child.play,
                    n_plays: child.node.n_plays,
                    n_wins: child.node.n_wins,
                });
            }
        }
        return stats;
    }
}
