import { resolve } from 'path';
import { findMove } from './bot';
import { BoardState, Move } from './movegen';
import * as fs from 'fs';
import * as readline from 'readline';

interface BenchMark {
    name: string;
    timings: number[];
}

const bench = (moves: Move[]): number => {
    const timing: number[] = [];

    for (let i = 0; i < 5; i++) {
        const startTime = new Date();
        const board = new BoardState();
        for (const move of moves) {
            board.doMove(move);
        }

        findMove(board, 0);
        const endTime = new Date();

        const diff = endTime.getTime() - startTime.getTime();
        timing.push(diff);
    }

    return timing.reduce((a, b) => a + b, 0) / timing.length;
};

const benchStart = () => {
    //prettier-ignore
    // 2 ply
    const moves = <Move[]>[{"piece":{"location":{"x":5,"y":5},"pieceType":6,"player":0,"rotation":1,"reflection":false}},{"piece":{"pieceType":0,"location":{"x":9,"y":9},"player":1,"rotation":0,"reflection":false}}];

    return bench(moves);
};

const benchMiddle = () => {
    //prettier-ignore
    // 10 ply
    const moves = <Move[]>[{"piece":{"location":{"x":5,"y":5},"pieceType":6,"player":0,"rotation":1,"reflection":false}},{"piece":{"pieceType":0,"location":{"x":9,"y":9},"player":1,"rotation":0,"reflection":false}},{"piece":{"location":{"x":8,"y":4},"pieceType":7,"player":0,"rotation":0,"reflection":false}},{"piece":{"location":{"x":8,"y":13},"player":1,"pieceType":5,"rotation":1,"reflection":false}},{"piece":{"location":{"x":7,"y":9},"pieceType":8,"player":0,"rotation":0,"reflection":false}},{"piece":{"location":{"x":12,"y":10},"player":1,"pieceType":4,"rotation":0,"reflection":true}},{"piece":{"location":{"x":3,"y":3},"pieceType":9,"player":0,"rotation":0,"reflection":false}},{"piece":{"location":{"x":10,"y":4},"player":1,"pieceType":20,"rotation":0,"reflection":true}},{"piece":{"location":{"x":4,"y":8},"pieceType":10,"player":0,"rotation":1,"reflection":false}},{"piece":{"location":{"x":6,"y":10},"player":1,"pieceType":8,"rotation":2,"reflection":true}}];

    return bench(moves);
};

const benchEnd = () => {
    //prettier-ignore
    // 18 ply
    const moves = <Move[]>[{"piece":{"location":{"x":5,"y":5},"pieceType":6,"player":0,"rotation":1,"reflection":false}},{"piece":{"pieceType":0,"location":{"x":9,"y":9},"player":1,"rotation":0,"reflection":false}},{"piece":{"location":{"x":8,"y":4},"pieceType":7,"player":0,"rotation":0,"reflection":false}},{"piece":{"location":{"x":8,"y":13},"player":1,"pieceType":5,"rotation":1,"reflection":false}},{"piece":{"location":{"x":7,"y":9},"pieceType":8,"player":0,"rotation":0,"reflection":false}},{"piece":{"location":{"x":12,"y":10},"player":1,"pieceType":4,"rotation":0,"reflection":true}},{"piece":{"location":{"x":3,"y":3},"pieceType":9,"player":0,"rotation":0,"reflection":false}},{"piece":{"location":{"x":10,"y":4},"player":1,"pieceType":20,"rotation":0,"reflection":true}},{"piece":{"location":{"x":4,"y":8},"pieceType":10,"player":0,"rotation":1,"reflection":false}},{"piece":{"location":{"x":6,"y":10},"player":1,"pieceType":8,"rotation":2,"reflection":true}},{"piece":{"location":{"x":6,"y":1},"pieceType":11,"player":0,"rotation":0,"reflection":false}},{"piece":{"location":{"x":13,"y":7},"player":1,"pieceType":19,"rotation":2,"reflection":true}},{"piece":{"location":{"x":0,"y":9},"pieceType":5,"player":0,"rotation":0,"reflection":false}},{"piece":{"location":{"x":12,"y":2},"player":1,"pieceType":6,"rotation":0,"reflection":true}},{"piece":{"location":{"x":1,"y":6},"pieceType":12,"player":0,"rotation":0,"reflection":false}},{"piece":{"location":{"x":3,"y":10},"player":1,"pieceType":2,"rotation":3,"reflection":false}},{"piece":{"location":{"x":9,"y":6},"pieceType":16,"player":0,"rotation":0,"reflection":false}},{"piece":{"location":{"x":8,"y":0},"player":1,"pieceType":10,"rotation":1,"reflection":true}}];

    return bench(moves);
};

const question = (int: ReturnType<(typeof readline)['createInterface']>, questionText: string) => {
    const response = new Promise<string>((resolve) => {
        int.question(questionText, (response) => {
            resolve(response);
        });
    });

    return response;
};

const main = async () => {
    const start = benchStart();
    const middle = benchMiddle();
    const end = benchEnd();

    console.log(`${start.toFixed(1)}ms start; ${middle.toFixed(1)}ms mid; ${end.toFixed(1)}ms end`);
    const readlineInterface = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    const saveB = await question(
        readlineInterface,
        'Would you like to save these benchmarks? [y/n]\n'
    );

    if (saveB !== 'y') {
        process.exit();
    }

    const benchName = await question(
        readlineInterface,
        'What would you like to name this benchmark?\n'
    );

    const previousBenches: BenchMark[] = JSON.parse(fs.readFileSync('benchmarks.json').toString());
    const benchMark = { name: benchName, timings: [start, middle, end] };

    fs.writeFileSync('benchmarks.json', JSON.stringify([...previousBenches, benchMark]));

    process.exit();
};

main();
