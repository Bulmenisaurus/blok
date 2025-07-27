import { getAllLegalMoves, StartPosition } from './movegen/movegen';
import { InteractiveCanvas } from './interactiveCanvas';
import { WorkerManager } from './workerManager';
import { Board } from './board';

const main = () => {
    const popupContainer = document.getElementById('popup-bg') as HTMLDivElement;

    const startPos = document.getElementById('start-pos') as HTMLSelectElement;
    const player = document.getElementById('play-as') as HTMLSelectElement;
    const difficulty = document.getElementById('difficulty') as HTMLSelectElement;
    const threads = document.getElementById('threads') as HTMLSelectElement;
    const sound = document.getElementById('sound') as HTMLInputElement;

    const submitButton = document.getElementById('play') as HTMLButtonElement;

    const browserNumThreads = navigator.hardwareConcurrency || 1;

    for (let i = 1; i <= browserNumThreads; i++) {
        const optionElement = document.createElement('option');
        optionElement.value = `${i}`;
        optionElement.innerText = `${i}`;

        if (i === 1) {
            optionElement.selected = true;
        }

        threads.append(optionElement);
    }

    submitButton.addEventListener('click', () => {
        const userNumThreads = parseInt(threads.value);
        const startPosition = startPos.value as StartPosition;
        const shouldPlaySound = sound.value === 'on';

        const boardState = new Board(startPosition);
        const workers = new WorkerManager(userNumThreads);
        const interactiveCanvas = new InteractiveCanvas(boardState, workers, shouldPlaySound);

        popupContainer.style.display = 'none';

        // debug
        const statistics: { a: number; b: number; tie: number } = { a: 0, b: 0, tie: 0 };
        const moveamounts = [];
        const startTime = performance.now();
        for (let i = 0; i < 1000; i++) {
            while (!boardState.gameOver()) {
                const legalMoves = getAllLegalMoves(boardState);
                if (legalMoves.length === 0) {
                    break;
                }
                moveamounts.push(legalMoves.length);
                const randomMove = legalMoves[Math.floor(Math.random() * legalMoves.length)];
                boardState.doMove(randomMove);
            }
            const score = boardState.score();
            if (score.playerA > score.playerB) {
                statistics.a++;
            } else if (score.playerA < score.playerB) {
                statistics.b++;
            } else {
                statistics.tie++;
            }

            boardState.reset();
        }

        const endTime = performance.now();
        console.log(`Time taken: ${endTime - startTime} milliseconds`);

        console.log(statistics);
        console.log(
            'Average move amount',
            moveamounts.reduce((a, b) => a + b, 0) / moveamounts.length
        );
    });
};

main();
