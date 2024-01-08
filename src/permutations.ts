import { PieceData, PieceType, getBoundingBox, getPieceData, pieceData } from './movegen';
import { Coordinate } from './types';

const updateDrawings = (blockId: PieceType): PieceData[] => {
    // if (isNaN(blockId)) {
    //     return;
    // }
    const data: PieceData[] = [];
    const pieceContainer = document.getElementById('piece-container')!;

    while (pieceContainer.firstChild) {
        pieceContainer.firstChild.remove();
    }

    for (let rotation = 0; rotation < 4; rotation++) {
        for (const reflection of [true, false]) {
            const pieceData = getPieceData(blockId, rotation, reflection);
            data.push(pieceData);

            const pieceCanvas = drawPiece(pieceData);
            pieceContainer.appendChild(pieceCanvas);
        }
    }

    return data;
};

const updateSelected = (pieceData: PieceData[], container: HTMLDivElement) => {
    while (container.firstChild) {
        container.firstChild.remove();
    }

    for (const data of pieceData) {
        container.appendChild(drawPiece(data));
    }
};

const drawPiece = (piece: PieceData) => {
    const pieceCanvas = document.createElement('canvas');

    const pieceCtx = pieceCanvas.getContext('2d')!;
    const pieceBoundingBox = getBoundingBox(piece);

    pieceCanvas.width = pieceBoundingBox.width * 100;
    pieceCanvas.height = pieceBoundingBox.height * 100;

    for (const tile of piece) {
        const shiftedCoords: Coordinate = {
            x: tile.x - pieceBoundingBox.bottomLeft.x,
            y: tile.y - pieceBoundingBox.bottomLeft.y,
        };

        const canvasCoords: Coordinate = {
            x: shiftedCoords.x * 100,
            y: shiftedCoords.y * 100,
        };

        pieceCtx.beginPath();
        pieceCtx.rect(canvasCoords.x, canvasCoords.y, 100, 100);
        pieceCtx.fillStyle = 'green';
        pieceCtx.fill();

        const numRows = pieceBoundingBox.height;
        const numCols = pieceBoundingBox.width;

        for (let i = 0; i < numRows; i++) {
            // horizontal
            pieceCtx.lineWidth = 5;
            pieceCtx.strokeStyle = '#fff';

            pieceCtx.beginPath();
            pieceCtx.moveTo(0, (pieceCanvas.height / numRows) * (i + 1));
            pieceCtx.lineTo(pieceCanvas.width, (pieceCanvas.height / numRows) * (i + 1));
            pieceCtx.stroke();
        }

        for (let i = 0; i < numCols; i++) {
            // vertical
            pieceCtx.beginPath();
            pieceCtx.moveTo((pieceCanvas.width / numCols) * (i + 1), 0);
            pieceCtx.lineTo((pieceCanvas.width / numCols) * (i + 1), pieceCanvas.height);
            pieceCtx.stroke();
        }
    }
    return pieceCanvas;
};

const updateSelection = (selection: string, pieces: PieceData[]) => {
    const indices = selection.split(',').map((p) => parseInt(p));
    const selectedPieces = pieces.filter((_, i) => indices.includes(i));

    const outputContainer = <HTMLTextAreaElement>document.getElementById('output');
    outputContainer.value = JSON.stringify(selectedPieces);

    const previewContainer = document.getElementById('preview') as HTMLDivElement;
    updateSelected(selectedPieces, previewContainer);
};

const main = () => {
    const blockInput = <HTMLInputElement>document.getElementById('block');
    let pieceData: PieceData[] = [];

    pieceData = updateDrawings(parseInt(blockInput.value));

    blockInput.addEventListener('input', () => {
        const value = parseInt(blockInput.value);
        if (!isNaN(value)) {
            pieceData = updateDrawings(parseInt(blockInput.value));
        }

        console.log(pieceData);
    });

    const selectionInput = <HTMLInputElement>document.getElementById('selection');
    updateSelection(selectionInput.value, pieceData);

    selectionInput.addEventListener('input', () => {
        updateSelection(selectionInput.value, pieceData);
    });
};

main();
