import { BoardState } from './movegen';
import { InteractiveCanvas } from './interactiveCanvas';
import { WorkerManager } from './workerManager';

const main = () => {
    const popupContainer = document.getElementById('popup-bg') as HTMLDivElement;

    const startPos = document.getElementById('start-pos') as HTMLSelectElement;
    const player = document.getElementById('play-as') as HTMLSelectElement;
    const difficulty = document.getElementById('difficulty') as HTMLSelectElement;
    const threads = document.getElementById('threads') as HTMLSelectElement;

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

        const boardState = new BoardState();
        const workers = new WorkerManager(userNumThreads);
        const interactiveCanvas = new InteractiveCanvas(boardState, workers);

        popupContainer.style.display = 'none';
    });

    // debugger;
};

main();
