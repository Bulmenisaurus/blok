import { Move, getAllLegalMoves } from './movegen/movegen';
import * as fs from 'fs';
import * as readline from 'readline';
import { Board } from './board';

const recursiveMoveGen = (board: Board, depth: number) => {
    if (depth <= 0) {
        return;
    }

    const moves = getAllLegalMoves(board).slice(0, 50);
    for (const move of moves) {
        board.doMove(move);
        recursiveMoveGen(board, depth - 1);
        board.undoMove(move);
    }
};

interface BenchMark {
    name: string;
    timings: number[];
}

const bench = (moves: Move[], name: string): number => {
    const timing: number[] = [];

    for (let i = 0; i < 5; i++) {
        const startTime = new Date();
        const board = new Board('middle');
        for (const move of moves) {
            board.doMove(move);
        }

        recursiveMoveGen(board, 3);
        const endTime = new Date();

        const diff = endTime.getTime() - startTime.getTime();
        console.log(`[${i + 1}/5] ${name} ${diff}ms`);
        timing.push(diff);
    }

    return timing.reduce((a, b) => a + b, 0) / timing.length;
};

const benchStart = () => {
    //prettier-ignore
    // 2 ply
    const moves = <Move[]>[{"piece":{"location":{"x":4,"y":5},"pieceType":6,"player":0,"orientation":0}},{"piece":{"pieceType":0,"location":{"x":9,"y":9},"player":1,"orientation":0}}];
    return bench(moves, 'start');
};

const benchMiddle = () => {
    //prettier-ignore
    // 10 ply
    const moves = <Move[]>[{"piece":{"location":{"x":5,"y":5},"pieceType":6,"player":0,"orientation":2}},{"piece":{"pieceType":0,"location":{"x":9,"y":9},"player":1,"orientation":0}},{"piece":{"location":{"x":7,"y":9},"pieceType":8,"player":0,"orientation":0}},{"piece":{"location":{"x":8,"y":12},"player":1,"pieceType":10,"orientation":0}},{"piece":{"location":{"x":5,"y":2},"pieceType":7,"player":0,"orientation":0}},{"piece":{"location":{"x":12,"y":10},"player":1,"pieceType":4,"orientation":1}},{"piece":{"location":{"x":8,"y":3},"pieceType":9,"player":0,"orientation":0}},{"piece":{"location":{"x":11,"y":6},"player":1,"pieceType":1,"orientation":3}},{"piece":{"location":{"x":4,"y":8},"pieceType":11,"player":0,"orientation":2}},{"piece":{"location":{"x":12,"y":13},"player":1,"pieceType":13,"orientation":0}}]
    return bench(moves, 'middle');
};

const benchEnd = () => {
    //prettier-ignore
    // 18 ply
    const moves = <Move[]>[{"piece":{"location":{"x":5,"y":5},"pieceType":6,"player":0,"orientation":2}},{"piece":{"pieceType":0,"location":{"x":9,"y":9},"player":1,"orientation":0}},{"piece":{"location":{"x":5,"y":2},"pieceType":7,"player":0,"orientation":0}},{"piece":{"location":{"x":8,"y":12},"player":1,"pieceType":8,"orientation":2}},{"piece":{"location":{"x":7,"y":8},"pieceType":10,"player":0,"orientation":0}},{"piece":{"location":{"x":12,"y":10},"player":1,"pieceType":4,"orientation":1}},{"piece":{"location":{"x":9,"y":5},"pieceType":11,"player":0,"orientation":6}},{"piece":{"location":{"x":11,"y":6},"player":1,"pieceType":1,"orientation":3}},{"piece":{"location":{"x":13,"y":4},"pieceType":8,"player":0,"orientation":1}},{"piece":{"location":{"x":12,"y":13},"player":1,"pieceType":13,"orientation":0}},{"piece":{"location":{"x":10,"y":2},"pieceType":14,"player":0,"orientation":3}},{"piece":{"location":{"x":13,"y":8},"player":1,"pieceType":16,"orientation":0}},{"piece":{"location":{"x":8,"y":1},"pieceType":15,"player":0,"orientation":0}},{"piece":{"location":{"x":6,"y":10},"player":1,"pieceType":14,"orientation":2}},{"piece":{"location":{"x":2,"y":7},"pieceType":9,"player":0,"orientation":0}},{"piece":{"location":{"x":3,"y":12},"player":1,"pieceType":20,"orientation":1}},{"piece":{"location":{"x":1,"y":3},"pieceType":2,"player":0,"orientation":2}},{"piece":{"location":{"x":4,"y":8},"player":1,"pieceType":2,"orientation":1}}]
    return bench(moves, 'end');
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
