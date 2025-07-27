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

        if (i === browserNumThreads) {
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
        // const startTime = performance.now();
        // for (let i = 0; i < 1000; i++) {
        //     while (true) {
        //         const legalMoves = getAllLegalMoves(boardState);
        //         if (legalMoves.length === 0) {
        //             break;
        //         }
        //         const randomMove = legalMoves[Math.floor(Math.random() * legalMoves.length)];
        //         boardState.doMove(randomMove);
        //         interactiveCanvas.updateCarouselVisibility();
        //         interactiveCanvas.updateScore();
        //     }
        // }
        // const endTime = performance.now();
        // console.log(`Time taken: ${endTime - startTime} milliseconds`);
    });

    // debugger;
};

main();
