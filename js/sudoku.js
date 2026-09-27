/* =========================================
   GAMEHUB - SUDOKU
========================================= */


/* =========================================
   GAME STATE
========================================= */

let sudokuBoard = [];

let sudokuSolution = [];

let sudokuInitialBoard = [];

let sudokuSelectedCell = null;

let sudokuDifficulty = "medium";

let sudokuMistakes = 0;

let sudokuHints = 3;

let sudokuSeconds = 0;

let sudokuTimer = null;

let sudokuGameOver = false;


/* =========================================
   DIFFICULTY SETTINGS
========================================= */

const sudokuDifficultySettings = {

    easy: {
        name: "EASY",
        remove: 38
    },

    medium: {
        name: "MEDIUM",
        remove: 48
    },

    hard: {
        name: "HARD",
        remove: 55
    }

};


/* =========================================
   INITIALIZE SUDOKU
========================================= */

function initializeSudoku() {

    const container =
        document.getElementById(
            "sudoku-container"
        );

    if (!container) {

        return;

    }


    stopSudokuTimer();


    sudokuMistakes = 0;

    sudokuHints = 3;

    sudokuSeconds = 0;

    sudokuSelectedCell = null;

    sudokuGameOver = false;


    generateSudokuPuzzle();


    renderSudoku();


    startSudokuTimer();

}


/* =========================================
   GENERATE PUZZLE
========================================= */

function generateSudokuPuzzle() {

    sudokuSolution =
        createSudokuSolution();


    sudokuBoard =
        sudokuSolution.map(
            row => [...row]
        );


    removeSudokuNumbers();


    sudokuInitialBoard =
        sudokuBoard.map(
            row => [...row]
        );

}


/* =========================================
   CREATE COMPLETE SUDOKU
========================================= */

function createSudokuSolution() {

    const board =
        Array.from(
            { length: 9 },
            () => Array(9).fill(0)
        );


    fillSudokuBoard(board);


    return board;

}


/* =========================================
   FILL SUDOKU BOARD
========================================= */

function fillSudokuBoard(board) {

    const emptyCell =
        findEmptySudokuCell(board);


    if (!emptyCell) {

        return true;

    }


    const [
        row,
        col
    ] = emptyCell;


    const numbers =
        shuffleSudokuNumbers();


    for (const number of numbers) {

        if (
            isSudokuSafe(
                board,
                row,
                col,
                number
            )
        ) {

            board[row][col] = number;


            if (
                fillSudokuBoard(board)
            ) {

                return true;

            }


            board[row][col] = 0;

        }

    }


    return false;

}


/* =========================================
   FIND EMPTY CELL
========================================= */

function findEmptySudokuCell(
    board
) {

    for (let row = 0; row < 9; row++) {

        for (let col = 0; col < 9; col++) {

            if (board[row][col] === 0) {

                return [
                    row,
                    col
                ];

            }

        }

    }


    return null;

}


/* =========================================
   CHECK SAFE NUMBER
========================================= */

function isSudokuSafe(
    board,
    row,
    col,
    number
) {

    /* Check row */

    for (let x = 0; x < 9; x++) {

        if (board[row][x] === number) {

            return false;

        }

    }


    /* Check column */

    for (let x = 0; x < 9; x++) {

        if (board[x][col] === number) {

            return false;

        }

    }


    /* Check 3x3 box */

    const startRow =
        row - (row % 3);

    const startCol =
        col - (col % 3);


    for (
        let r = 0;
        r < 3;
        r++
    ) {

        for (
            let c = 0;
            c < 3;
            c++
        ) {

            if (
                board[startRow + r][startCol + c]
                === number
            ) {

                return false;

            }

        }

    }


    return true;

}


/* =========================================
   SHUFFLE NUMBERS
========================================= */

function shuffleSudokuNumbers() {

    const numbers = [
        1, 2, 3,
        4, 5, 6,
        7, 8, 9
    ];


    for (
        let i = numbers.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() * (i + 1)
            );


        [
            numbers[i],
            numbers[j]
        ] = [
            numbers[j],
            numbers[i]
        ];

    }


    return numbers;

}


/* =========================================
   REMOVE NUMBERS
========================================= */

function removeSudokuNumbers() {

    const removeCount =
        sudokuDifficultySettings[
            sudokuDifficulty
        ].remove;


    let removed = 0;


    while (removed < removeCount) {

        const row =
            Math.floor(
                Math.random() * 9
            );


        const col =
            Math.floor(
                Math.random() * 9
            );


        if (
            sudokuBoard[row][col] !== 0
        ) {

            sudokuBoard[row][col] = 0;

            removed++;

        }

    }

}


/* =========================================
   RENDER SUDOKU
========================================= */

function renderSudoku() {

    const container =
        document.getElementById(
            "sudoku-container"
        );


    if (!container) {

        return;

    }


    container.innerHTML = `

        <div class="sudoku-game-wrapper">


            <!-- =================================
                 TOP BAR
            ================================== -->

            <div class="sudoku-top-bar">


                <div class="sudoku-stat">

                    <span>
                        TIME
                    </span>

                    <strong id="sudoku-timer">
                        00:00
                    </strong>

                </div>


                <div class="sudoku-stat">

                    <span>
                        MISTAKES
                    </span>

                    <strong id="sudoku-mistakes">
                        0 / 3
                    </strong>

                </div>


                <div class="sudoku-stat">

                    <span>
                        HINTS
                    </span>

                    <strong id="sudoku-hints">
                        ${sudokuHints}
                    </strong>

                </div>


            </div>


            <!-- =================================
                 DIFFICULTY
            ================================== -->

            <div class="sudoku-difficulty">

                <span>
                    DIFFICULTY
                </span>


                <div class="sudoku-difficulty-buttons">


                    <button
                        class="sudoku-difficulty-button ${
                            sudokuDifficulty === "easy"
                                ? "active"
                                : ""
                        }"
                        data-difficulty="easy"
                    >
                        EASY
                    </button>


                    <button
                        class="sudoku-difficulty-button ${
                            sudokuDifficulty === "medium"
                                ? "active"
                                : ""
                        }"
                        data-difficulty="medium"
                    >
                        MEDIUM
                    </button>


                    <button
                        class="sudoku-difficulty-button ${
                            sudokuDifficulty === "hard"
                                ? "active"
                                : ""
                        }"
                        data-difficulty="hard"
                    >
                        HARD
                    </button>


                </div>

            </div>


            <!-- =================================
                 BOARD
            ================================== -->

            <div
                id="sudoku-board"
                class="sudoku-board"
            >

                ${createSudokuCells()}

            </div>


            <!-- =================================
                 NUMBER PAD
            ================================== -->

            <div class="sudoku-number-pad">

                ${createSudokuNumberButtons()}

                <button
                    class="sudoku-number-button erase"
                    data-number="erase"
                >

                    <i class="fa-solid fa-eraser"></i>

                </button>

            </div>


            <!-- =================================
                 STATUS
            ================================== -->

            <div
                id="sudoku-status"
                class="sudoku-status"
            >

                SELECT A CELL TO BEGIN

            </div>


            <!-- =================================
                 CONTROLS
            ================================== -->

            <div class="sudoku-controls">

                <button
                    id="sudoku-hint-button"
                    class="sudoku-control-button hint"
                >

                    <i class="fa-solid fa-lightbulb"></i>

                    HINT

                </button>


                <button
                    id="sudoku-new-button"
                    class="sudoku-control-button primary"
                >

                    <i class="fa-solid fa-rotate-right"></i>

                    NEW PUZZLE

                </button>


                <button
                    id="sudoku-reset-button"
                    class="sudoku-control-button secondary"
                >

                    <i class="fa-solid fa-arrow-rotate-left"></i>

                    RESET

                </button>

            </div>


        </div>

    `;


    addSudokuStyles();

    attachSudokuEvents();

    updateSudokuDisplay();

}


/* =========================================
   CREATE BOARD CELLS
========================================= */

function createSudokuCells() {

    let html = "";


    for (let row = 0; row < 9; row++) {

        for (let col = 0; col < 9; col++) {

            const value =
                sudokuBoard[row][col];


            const isGiven =
                sudokuInitialBoard[row][col] !== 0;


            const classes = [
                "sudoku-cell"
            ];


            if (isGiven) {

                classes.push("given");

            }


            if (
                sudokuSelectedCell &&
                sudokuSelectedCell.row === row &&
                sudokuSelectedCell.col === col
            ) {

                classes.push("selected");

            }


            if (
                sudokuSelectedCell &&
                sudokuBoard[row][col] !== 0 &&
                sudokuSelectedCell.row !== row &&
                sudokuSelectedCell.col !== col &&
                sudokuBoard[row][col] ===
                sudokuBoard[
                    sudokuSelectedCell.row
                ][
                    sudokuSelectedCell.col
                ]
            ) {

                classes.push("same-number");

            }


            if (
                col === 2 ||
                col === 5
            ) {

                classes.push("box-right");

            }


            if (
                row === 2 ||
                row === 5
            ) {

                classes.push("box-bottom");

            }


            html += `

                <button
                    class="${classes.join(" ")}"
                    data-row="${row}"
                    data-col="${col}"
                >

                    ${
                        value === 0
                            ? ""
                            : value
                    }

                </button>

            `;

        }

    }


    return html;

}


/* =========================================
   CREATE NUMBER BUTTONS
========================================= */

function createSudokuNumberButtons() {

    let html = "";


    for (let number = 1; number <= 9; number++) {

        html += `

            <button
                class="sudoku-number-button"
                data-number="${number}"
            >
                ${number}
            </button>

        `;

    }


    return html;

}


/* =========================================
   EVENT LISTENERS
========================================= */

function attachSudokuEvents() {

    document
        .querySelectorAll(".sudoku-cell")
        .forEach(cell => {

            cell.addEventListener(
                "click",
                handleSudokuCellClick
            );

        });


    document
        .querySelectorAll(
            ".sudoku-number-button"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                handleSudokuNumberClick
            );

        });


    document
        .querySelectorAll(
            ".sudoku-difficulty-button"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                function () {

                    changeSudokuDifficulty(
                        this.dataset.difficulty
                    );

                }
            );

        });


    const hintButton =
        document.getElementById(
            "sudoku-hint-button"
        );


    if (hintButton) {

        hintButton.addEventListener(
            "click",
            useSudokuHint
        );

    }


    const newButton =
        document.getElementById(
            "sudoku-new-button"
        );


    if (newButton) {

        newButton.addEventListener(
            "click",
            initializeSudoku
        );

    }


    const resetButton =
        document.getElementById(
            "sudoku-reset-button"
        );


    if (resetButton) {

        resetButton.addEventListener(
            "click",
            resetSudokuPuzzle
        );

    }


    document.addEventListener(
        "keydown",
        handleSudokuKeyboard
    );

}


/* =========================================
   CELL CLICK
========================================= */

function handleSudokuCellClick(event) {

    if (sudokuGameOver) {

        return;

    }


    const row =
        Number(
            event.currentTarget.dataset.row
        );


    const col =
        Number(
            event.currentTarget.dataset.col
        );


    if (
        sudokuInitialBoard[row][col] !== 0
    ) {

        sudokuSelectedCell = {
            row,
            col
        };


        renderSudokuBoardOnly();

        return;

    }


    sudokuSelectedCell = {
        row,
        col
    };


    renderSudokuBoardOnly();


    updateSudokuStatus(
        "SELECT A NUMBER"
    );

}


/* =========================================
   NUMBER CLICK
========================================= */

function handleSudokuNumberClick(event) {

    if (sudokuGameOver) {

        return;

    }


    if (!sudokuSelectedCell) {

        updateSudokuStatus(
            "SELECT A CELL FIRST"
        );

        return;

    }


    const number =
        event.currentTarget.dataset.number;


    if (number === "erase") {

        eraseSudokuCell();

        return;

    }


    enterSudokuNumber(
        Number(number)
    );

}


/* =========================================
   ENTER NUMBER
========================================= */

function enterSudokuNumber(number) {

    const {
        row,
        col
    } = sudokuSelectedCell;


    /* Given cells cannot be changed */

    if (
        sudokuInitialBoard[row][col] !== 0
    ) {

        return;

    }


    /* Correct number */

    if (
        sudokuSolution[row][col] === number
    ) {

        sudokuBoard[row][col] =
            number;


        updateSudokuStatus(
            "CORRECT!"
        );


        renderSudokuBoardOnly();


        checkSudokuCompletion();

        return;

    }


    /* Wrong number */

    sudokuMistakes++;


    updateSudokuStatus(
        "WRONG NUMBER",
        "error"
    );


    flashSudokuCell(
        row,
        col,
        "wrong"
    );


    updateSudokuDisplay();


    if (sudokuMistakes >= 3) {

        endSudokuGame();

    }

}


/* =========================================
   ERASE CELL
========================================= */

function eraseSudokuCell() {

    if (!sudokuSelectedCell) {

        return;

    }


    const {
        row,
        col
    } = sudokuSelectedCell;


    if (
        sudokuInitialBoard[row][col] !== 0
    ) {

        return;

    }


    sudokuBoard[row][col] = 0;


    renderSudokuBoardOnly();


    updateSudokuStatus(
        "CELL CLEARED"
    );

}


/* =========================================
   CHECK COMPLETION
========================================= */

function checkSudokuCompletion() {

    for (let row = 0; row < 9; row++) {

        for (let col = 0; col < 9; col++) {

            if (
                sudokuBoard[row][col] !==
                sudokuSolution[row][col]
            ) {

                return false;

            }

        }

    }


    completeSudokuGame();

    return true;

}


/* =========================================
   COMPLETE GAME
========================================= */

function completeSudokuGame() {

    sudokuGameOver = true;


    stopSudokuTimer();


    updateSudokuStatus(
        "PUZZLE COMPLETED!"
    );


    const board =
        document.getElementById(
            "sudoku-board"
        );


    if (board) {

        board.classList.add(
            "sudoku-completed"
        );

    }

}


/* =========================================
   GAME OVER
========================================= */

function endSudokuGame() {

    sudokuGameOver = true;


    stopSudokuTimer();


    updateSudokuStatus(
        "TOO MANY MISTAKES"
    );


    const board =
        document.getElementById(
            "sudoku-board"
        );


    if (board) {

        board.classList.add(
            "sudoku-failed"
        );

    }

}


/* =========================================
   HINT
========================================= */

function useSudokuHint() {

    if (sudokuGameOver) {

        return;

    }


    if (sudokuHints <= 0) {

        updateSudokuStatus(
            "NO HINTS LEFT",
            "error"
        );

        return;

    }


    let target = null;


    if (sudokuSelectedCell) {

        const {
            row,
            col
        } = sudokuSelectedCell;


        if (
            sudokuInitialBoard[row][col] === 0 &&
            sudokuBoard[row][col] !==
            sudokuSolution[row][col]
        ) {

            target = {
                row,
                col
            };

        }

    }


    if (!target) {

        const emptyCells = [];


        for (let row = 0; row < 9; row++) {

            for (let col = 0; col < 9; col++) {

                if (
                    sudokuInitialBoard[row][col] === 0 &&
                    sudokuBoard[row][col] !==
                    sudokuSolution[row][col]
                ) {

                    emptyCells.push({
                        row,
                        col
                    });

                }

            }

        }


        if (emptyCells.length === 0) {

            return;

        }


        target =
            emptyCells[
                Math.floor(
                    Math.random() *
                    emptyCells.length
                )
            ];

    }


    sudokuSelectedCell = target;


    sudokuBoard[target.row][target.col] =
        sudokuSolution[
            target.row
        ][
            target.col
        ];


    sudokuHints--;


    updateSudokuStatus(
        "HINT USED"
    );


    renderSudokuBoardOnly();

    updateSudokuDisplay();


    checkSudokuCompletion();

}


/* =========================================
   CHANGE DIFFICULTY
========================================= */

function changeSudokuDifficulty(
    difficulty
) {

    if (
        !sudokuDifficultySettings[
            difficulty
        ]
    ) {

        return;

    }


    sudokuDifficulty =
        difficulty;


    initializeSudoku();

}


/* =========================================
   RESET PUZZLE
========================================= */

function resetSudokuPuzzle() {

    stopSudokuTimer();


    sudokuBoard =
        sudokuInitialBoard.map(
            row => [...row]
        );


    sudokuMistakes = 0;

    sudokuHints = 3;

    sudokuSeconds = 0;

    sudokuSelectedCell = null;

    sudokuGameOver = false;


    renderSudoku();

    startSudokuTimer();

}


/* =========================================
   RENDER BOARD ONLY
========================================= */

function renderSudokuBoardOnly() {

    const board =
        document.getElementById(
            "sudoku-board"
        );


    if (!board) {

        return;

    }


    board.innerHTML =
        createSudokuCells();


    board
        .querySelectorAll(".sudoku-cell")
        .forEach(cell => {

            cell.addEventListener(
                "click",
                handleSudokuCellClick
            );

        });

}


/* =========================================
   UPDATE DISPLAY
========================================= */

function updateSudokuDisplay() {

    const mistakes =
        document.getElementById(
            "sudoku-mistakes"
        );


    const hints =
        document.getElementById(
            "sudoku-hints"
        );


    if (mistakes) {

        mistakes.textContent =
            `${sudokuMistakes} / 3`;

    }


    if (hints) {

        hints.textContent =
            sudokuHints;

    }


    updateSudokuTimerDisplay();

}


/* =========================================
   UPDATE STATUS
========================================= */

function updateSudokuStatus(
    message,
    type = ""
) {

    const status =
        document.getElementById(
            "sudoku-status"
        );


    if (!status) {

        return;

    }


    status.textContent =
        message;


    status.className =
        `sudoku-status ${type}`;

}


/* =========================================
   TIMER
========================================= */

function startSudokuTimer() {

    stopSudokuTimer();


    sudokuTimer =
        setInterval(() => {

            if (!sudokuGameOver) {

                sudokuSeconds++;

                updateSudokuTimerDisplay();

            }

        }, 1000);

}


/* =========================================
   STOP TIMER
========================================= */

function stopSudokuTimer() {

    if (sudokuTimer) {

        clearInterval(
            sudokuTimer
        );

        sudokuTimer = null;

    }

}


/* =========================================
   TIMER DISPLAY
========================================= */

function updateSudokuTimerDisplay() {

    const timer =
        document.getElementById(
            "sudoku-timer"
        );


    if (!timer) {

        return;

    }


    const minutes =
        Math.floor(
            sudokuSeconds / 60
        );


    const seconds =
        sudokuSeconds % 60;


    timer.textContent =
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

}


/* =========================================
   FLASH CELL
========================================= */

function flashSudokuCell(
    row,
    col,
    className
) {

    const cell =
        document.querySelector(
            `.sudoku-cell[data-row="${row}"][data-col="${col}"]`
        );


    if (!cell) {

        return;

    }


    cell.classList.add(
        className
    );


    setTimeout(() => {

        cell.classList.remove(
            className
        );

    }, 500);

}


/* =========================================
   KEYBOARD INPUT
========================================= */

function handleSudokuKeyboard(event) {

    if (sudokuGameOver) {

        return;

    }


    if (!sudokuSelectedCell) {

        return;

    }


    const key =
        event.key;


    if (
        key >= "1" &&
        key <= "9"
    ) {

        enterSudokuNumber(
            Number(key)
        );

    }


    if (
        key === "Backspace" ||
        key === "Delete" ||
        key === "0"
    ) {

        eraseSudokuCell();

    }

}


/* =========================================
   SUDOKU STYLES
========================================= */

function addSudokuStyles() {

    if (
        document.getElementById(
            "sudoku-styles"
        )
    ) {

        return;

    }


    const style =
        document.createElement("style");


    style.id =
        "sudoku-styles";


    style.textContent = `

        /* =================================
           WRAPPER
        ================================= */

        .sudoku-game-wrapper {
            width: min(760px, 100%);
            margin: 0 auto;
        }


        /* =================================
           TOP BAR
        ================================= */

        .sudoku-top-bar {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 70px;

            margin-bottom: 25px;
        }


        .sudoku-stat {
            display: flex;
            flex-direction: column;
            align-items: center;
        }


        .sudoku-stat span {
            color: #6e6e88;

            font-family: "Orbitron", sans-serif;

            font-size: 7px;

            letter-spacing: 1.2px;

            margin-bottom: 5px;
        }


        .sudoku-stat strong {
            color: white;

            font-family: "Orbitron", sans-serif;

            font-size: 16px;
        }


        /* =================================
           DIFFICULTY
        ================================= */

        .sudoku-difficulty {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 15px;

            margin-bottom: 20px;
        }


        .sudoku-difficulty > span {
            color: #6e6e88;

            font-family: "Orbitron", sans-serif;

            font-size: 7px;

            letter-spacing: 1px;
        }


        .sudoku-difficulty-buttons {
            display: flex;

            gap: 5px;
        }


        .sudoku-difficulty-button {
            padding: 7px 10px;

            border: 1px solid
                rgba(255,255,255,0.07);

            border-radius: 6px;

            color: #6e6e88;

            background:
                rgba(255,255,255,0.025);

            font-family: "Orbitron", sans-serif;

            font-size: 7px;

            letter-spacing: 0.5px;

            transition: 0.2s ease;
        }


        .sudoku-difficulty-button:hover {
            color: white;

            border-color:
                rgba(0,217,255,0.3);
        }


        .sudoku-difficulty-button.active {
            color: #00d9ff;

            border-color:
                rgba(0,217,255,0.4);

            background:
                rgba(0,217,255,0.08);

            box-shadow:
                0 0 15px rgba(0,217,255,0.08);
        }


        /* =================================
           SUDOKU BOARD
        ================================= */

        .sudoku-board {
            width: min(510px, 100%);

            aspect-ratio: 1;

            margin: 0 auto;

            display: grid;

            grid-template-columns:
                repeat(9, 1fr);

            grid-template-rows:
                repeat(9, 1fr);

            border: 2px solid
                rgba(155,92,255,0.3);

            border-radius: 12px;

            overflow: hidden;

            background:
                rgba(5,5,14,0.85);

            box-shadow:
                0 20px 60px rgba(0,0,0,0.3),
                inset 0 0 35px
                rgba(155,92,255,0.04);

            transition: 0.3s ease;
        }


        .sudoku-cell {
            min-width: 0;
            min-height: 0;

            display: flex;
            align-items: center;
            justify-content: center;

            border: none;
            border-right:
                1px solid
                rgba(255,255,255,0.07);

            border-bottom:
                1px solid
                rgba(255,255,255,0.07);

            color: #a9a9bd;

            background:
                rgba(255,255,255,0.015);

            font-family: "Orbitron", sans-serif;

            font-size: clamp(13px, 2.5vw, 20px);

            font-weight: 600;

            transition:
                background 0.15s ease,
                color 0.15s ease,
                box-shadow 0.15s ease;
        }


        .sudoku-cell:hover {
            background:
                rgba(0,217,255,0.06);
        }


        .sudoku-cell.given {
            color: white;

            background:
                rgba(155,92,255,0.025);

            font-weight: 800;
        }


        .sudoku-cell.selected {
            color: #00d9ff;

            background:
                rgba(0,217,255,0.12);

            box-shadow:
                inset 0 0 0 2px
                rgba(0,217,255,0.45);

            text-shadow:
                0 0 12px
                rgba(0,217,255,0.45);
        }


        .sudoku-cell.same-number {
            background:
                rgba(155,92,255,0.08);

            color: #c4a8ff;
        }


        .sudoku-cell.box-right {
            border-right:
                2px solid
                rgba(155,92,255,0.3);
        }


        .sudoku-cell.box-bottom {
            border-bottom:
                2px solid
                rgba(155,92,255,0.3);
        }


        .sudoku-cell.wrong {
            color: #ff3cac;

            background:
                rgba(255,60,172,0.13);

            animation:
                sudokuShake 0.4s ease;
        }


        @keyframes sudokuShake {

            0%,
            100% {
                transform: translateX(0);
            }

            25% {
                transform: translateX(-5px);
            }

            75% {
                transform: translateX(5px);
            }

        }


        .sudoku-board.sudoku-completed {
            border-color:
                rgba(0,245,160,0.5);

            box-shadow:
                0 0 45px
                rgba(0,245,160,0.15);
        }


        .sudoku-board.sudoku-completed
        .sudoku-cell {
            color: #00f5a0;

            background:
                rgba(0,245,160,0.04);
        }


        .sudoku-board.sudoku-failed {
            border-color:
                rgba(255,60,172,0.45);
        }


        /* =================================
           NUMBER PAD
        ================================= */

        .sudoku-number-pad {
            display: flex;

            justify-content: center;

            gap: 7px;

            margin: 25px auto 0;
        }


        .sudoku-number-button {
            width: 42px;
            height: 42px;

            display: flex;
            align-items: center;
            justify-content: center;

            border: 1px solid
                rgba(255,255,255,0.08);

            border-radius: 9px;

            color: #aaaabe;

            background:
                rgba(255,255,255,0.025);

            font-family: "Orbitron", sans-serif;

            font-size: 11px;

            font-weight: 600;

            transition: 0.2s ease;
        }


        .sudoku-number-button:hover {
            color: white;

            border-color:
                rgba(0,217,255,0.35);

            background:
                rgba(0,217,255,0.08);

            transform: translateY(-2px);

            box-shadow:
                0 5px 15px
                rgba(0,217,255,0.08);
        }


        .sudoku-number-button.erase {
            color: #ff7fbc;
        }


        .sudoku-number-button.erase:hover {
            border-color:
                rgba(255,60,172,0.35);

            background:
                rgba(255,60,172,0.08);
        }


        /* =================================
           STATUS
        ================================= */

        .sudoku-status {
            min-height: 20px;

            margin-top: 18px;

            color: #00d9ff;

            font-family: "Orbitron", sans-serif;

            font-size: 8px;

            font-weight: 600;

            letter-spacing: 1px;

            text-align: center;
        }


        .sudoku-status.error {
            color: #ff3cac;

            animation:
                sudokuStatusPulse 0.4s ease;
        }


        @keyframes sudokuStatusPulse {

            0% {
                opacity: 0.3;
            }

            100% {
                opacity: 1;
            }

        }


        /* =================================
           CONTROLS
        ================================= */

        .sudoku-controls {
            display: flex;

            justify-content: center;

            gap: 10px;

            margin-top: 20px;
        }


        .sudoku-control-button {
            display: flex;
            align-items: center;
            gap: 7px;

            padding: 11px 15px;

            border: 1px solid
                rgba(255,255,255,0.08);

            border-radius: 8px;

            font-family: "Orbitron", sans-serif;

            font-size: 7px;

            font-weight: 600;

            letter-spacing: 0.6px;

            transition: 0.25s ease;
        }


        .sudoku-control-button:hover {
            transform: translateY(-2px);
        }


        .sudoku-control-button.hint {
            color: #ffd166;

            border-color:
                rgba(255,209,102,0.2);

            background:
                rgba(255,209,102,0.05);
        }


        .sudoku-control-button.hint:hover {
            border-color:
                rgba(255,209,102,0.45);

            box-shadow:
                0 0 18px
                rgba(255,209,102,0.1);
        }


        .sudoku-control-button.primary {
            color: white;

            border-color:
                rgba(155,92,255,0.35);

            background:
                rgba(155,92,255,0.1);
        }


        .sudoku-control-button.primary:hover {
            border-color: #9b5cff;

            box-shadow:
                0 0 18px
                rgba(155,92,255,0.12);
        }


        .sudoku-control-button.secondary {
            color: #77778f;

            background:
                rgba(255,255,255,0.025);
        }


        .sudoku-control-button.secondary:hover {
            color: white;

            border-color:
                rgba(255,255,255,0.2);
        }


        /* =================================
           MOBILE
        ================================= */

        @media (max-width: 650px) {

            .sudoku-top-bar {
                gap: 35px;
            }


            .sudoku-difficulty {
                flex-direction: column;

                gap: 8px;
            }


            .sudoku-number-pad {
                flex-wrap: wrap;

                max-width: 400px;
            }


            .sudoku-number-button {
                width: 38px;
                height: 38px;
            }

        }


        @media (max-width: 430px) {

            .sudoku-top-bar {
                gap: 18px;
            }


            .sudoku-stat strong {
                font-size: 13px;
            }


            .sudoku-stat span {
                font-size: 6px;
            }


            .sudoku-cell {
                font-size: 12px;
            }


            .sudoku-number-pad {
                gap: 5px;
            }


            .sudoku-number-button {
                width: 31px;
                height: 36px;

                border-radius: 7px;

                font-size: 9px;
            }


            .sudoku-controls {
                flex-wrap: wrap;
            }


            .sudoku-control-button {
                padding: 10px 11px;
            }

        }

    `;


    document.head.appendChild(style);

}



