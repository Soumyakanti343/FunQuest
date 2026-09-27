/* =========================================
   GAMEHUB - TIC TAC TOE
========================================= */


/* =========================================
   GAME STATE
========================================= */

let ticBoard = [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
];

let ticCurrentPlayer = "X";

let ticGameOver = false;

let ticScores = {
    X: 0,
    O: 0,
    draws: 0
};


/* =========================================
   WINNING COMBINATIONS
========================================= */

const ticWinningCombinations = [

    [0, 1, 2],

    [3, 4, 5],

    [6, 7, 8],

    [0, 3, 6],

    [1, 4, 7],

    [2, 5, 8],

    [0, 4, 8],

    [2, 4, 6]

];


/* =========================================
   INITIALIZE GAME
========================================= */

function initializeTicTacToe() {

    const container =
        document.getElementById(
            "tic-tac-toe-container"
        );

    if (!container) {

        return;

    }


    ticBoard = [
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        ""
    ];

    ticCurrentPlayer = "X";

    ticGameOver = false;


    renderTicTacToe();

}


/* =========================================
   RENDER GAME
========================================= */

function renderTicTacToe() {

    const container =
        document.getElementById(
            "tic-tac-toe-container"
        );

    if (!container) {

        return;

    }


    container.innerHTML = `

        <div class="tic-game-wrapper">

            <!-- STATUS -->

            <div class="tic-status">

                <div class="tic-player-status">

                    <span class="tic-status-label">
                        CURRENT TURN
                    </span>

                    <div
                        id="tic-current-player"
                        class="tic-current-player player-x"
                    >
                        PLAYER X
                    </div>

                </div>


                <div class="tic-score-board">

                    <div class="tic-score">

                        <span class="tic-score-label">
                            PLAYER X
                        </span>

                        <span
                            id="tic-score-x"
                            class="tic-score-value score-x"
                        >
                            ${ticScores.X}
                        </span>

                    </div>


                    <div class="tic-score-divider">
                        :
                    </div>


                    <div class="tic-score">

                        <span class="tic-score-label">
                            PLAYER O
                        </span>

                        <span
                            id="tic-score-o"
                            class="tic-score-value score-o"
                        >
                            ${ticScores.O}
                        </span>

                    </div>


                    <div class="tic-draw-score">

                        <span>
                            DRAWS
                        </span>

                        <strong id="tic-score-draw">
                            ${ticScores.draws}
                        </strong>

                    </div>

                </div>

            </div>


            <!-- BOARD -->

            <div
                id="tic-board"
                class="tic-board"
            >

                ${ticBoard
                    .map(
                        (value, index) => `
                        
                        <button
                            class="tic-cell ${
                                value
                                    ? `filled player-${value.toLowerCase()}`
                                    : ""
                            }"
                            data-index="${index}"
                            aria-label="Cell ${index + 1}"
                        >
                            ${
                                value
                                    ? value
                                    : ""
                            }
                        </button>

                    `
                    )
                    .join("")}

            </div>


            <!-- RESULT -->

            <div
                id="tic-result"
                class="tic-result"
            >
                YOUR TURN
            </div>


            <!-- CONTROLS -->

            <div class="tic-controls">

                <button
                    id="tic-new-round"
                    class="tic-control-button primary"
                >

                    <i class="fa-solid fa-rotate-right"></i>

                    NEW ROUND

                </button>


                <button
                    id="tic-reset-score"
                    class="tic-control-button secondary"
                >

                    <i class="fa-solid fa-trash-can"></i>

                    RESET SCORE

                </button>

            </div>

        </div>

    `;


    addTicTacToeStyles();

    attachTicTacToeEvents();

    updateTicStatus();

}


/* =========================================
   EVENT LISTENERS
========================================= */

function attachTicTacToeEvents() {

    const cells =
        document.querySelectorAll(
            ".tic-cell"
        );


    cells.forEach(cell => {

        cell.addEventListener(
            "click",
            handleTicCellClick
        );

    });


    const newRoundButton =
        document.getElementById(
            "tic-new-round"
        );


    if (newRoundButton) {

        newRoundButton.addEventListener(
            "click",
            startNewTicRound
        );

    }


    const resetScoreButton =
        document.getElementById(
            "tic-reset-score"
        );


    if (resetScoreButton) {

        resetScoreButton.addEventListener(
            "click",
            resetTicScores
        );

    }

}


/* =========================================
   CELL CLICK
========================================= */

function handleTicCellClick(event) {

    if (ticGameOver) {

        return;

    }


    const cell =
        event.currentTarget;


    const index =
        Number(cell.dataset.index);


    /* Don't allow overwriting */

    if (ticBoard[index] !== "") {

        return;

    }


    /* Place symbol */

    ticBoard[index] =
        ticCurrentPlayer;


    cell.textContent =
        ticCurrentPlayer;


    cell.classList.add(
        "filled",
        `player-${ticCurrentPlayer.toLowerCase()}`
    );


    /* Check winner */

    const winningCombination =
        checkTicWinner();


    if (winningCombination) {

        finishTicGame(
            ticCurrentPlayer,
            winningCombination
        );

        return;

    }


    /* Check draw */

    if (ticBoard.every(cell => cell !== "")) {

        finishTicDraw();

        return;

    }


    /* Switch player */

    ticCurrentPlayer =
        ticCurrentPlayer === "X"
            ? "O"
            : "X";


    updateTicStatus();

}


/* =========================================
   CHECK WINNER
========================================= */

function checkTicWinner() {

    for (
        const combination
        of ticWinningCombinations
    ) {

        const [
            a,
            b,
            c
        ] = combination;


        if (
            ticBoard[a] !== "" &&
            ticBoard[a] === ticBoard[b] &&
            ticBoard[a] === ticBoard[c]
        ) {

            return combination;

        }

    }


    return null;

}


/* =========================================
   FINISH WIN
========================================= */

function finishTicGame(
    winner,
    winningCombination
) {

    ticGameOver = true;


    ticScores[winner]++;


    winningCombination.forEach(index => {

        const cell =
            document.querySelector(
                `.tic-cell[data-index="${index}"]`
            );


        if (cell) {

            cell.classList.add(
                "winning-cell"
            );

        }

    });


    const result =
        document.getElementById(
            "tic-result"
        );


    if (result) {

        result.innerHTML = `

            <span class="winner-icon">
                <i class="fa-solid fa-trophy"></i>
            </span>

            PLAYER ${winner} WINS!

        `;

        result.classList.add(
            "game-won"
        );

    }


    updateTicScoreBoard();

}


/* =========================================
   FINISH DRAW
========================================= */

function finishTicDraw() {

    ticGameOver = true;


    ticScores.draws++;


    const result =
        document.getElementById(
            "tic-result"
        );


    if (result) {

        result.innerHTML = `

            <span class="draw-icon">
                <i class="fa-solid fa-handshake"></i>
            </span>

            IT'S A DRAW!

        `;

        result.classList.add(
            "game-draw"
        );

    }


    document
        .querySelectorAll(".tic-cell")
        .forEach(cell => {

            cell.classList.add(
                "draw-cell"
            );

        });


    updateTicScoreBoard();

}


/* =========================================
   UPDATE STATUS
========================================= */

function updateTicStatus() {

    const currentPlayer =
        document.getElementById(
            "tic-current-player"
        );


    const result =
        document.getElementById(
            "tic-result"
        );


    if (!currentPlayer) {

        return;

    }


    currentPlayer.textContent =
        `PLAYER ${ticCurrentPlayer}`;


    currentPlayer.className =
        `tic-current-player player-${ticCurrentPlayer.toLowerCase()}`;


    if (result && !ticGameOver) {

        result.textContent =
            `PLAYER ${ticCurrentPlayer}'S TURN`;

        result.className =
            "tic-result";

    }


    updateTicScoreBoard();

}


/* =========================================
   UPDATE SCORE BOARD
========================================= */

function updateTicScoreBoard() {

    const scoreX =
        document.getElementById(
            "tic-score-x"
        );


    const scoreO =
        document.getElementById(
            "tic-score-o"
        );


    const scoreDraw =
        document.getElementById(
            "tic-score-draw"
        );


    if (scoreX) {

        scoreX.textContent =
            ticScores.X;

    }


    if (scoreO) {

        scoreO.textContent =
            ticScores.O;

    }


    if (scoreDraw) {

        scoreDraw.textContent =
            ticScores.draws;

    }

}


/* =========================================
   START NEW ROUND
========================================= */

function startNewTicRound() {

    ticBoard = [
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        ""
    ];

    ticCurrentPlayer = "X";

    ticGameOver = false;


    renderTicTacToe();

}


/* =========================================
   RESET SCORES
========================================= */

function resetTicScores() {

    ticScores = {
        X: 0,
        O: 0,
        draws: 0
    };


    startNewTicRound();

}


/* =========================================
   TIC TAC TOE STYLES
========================================= */

function addTicTacToeStyles() {

    if (
        document.getElementById(
            "tic-tac-toe-styles"
        )
    ) {

        return;

    }


    const style =
        document.createElement("style");


    style.id =
        "tic-tac-toe-styles";


    style.textContent = `

        /* =================================
           TIC TAC TOE WRAPPER
        ================================= */

        .tic-game-wrapper {
            width: min(700px, 100%);
            margin: 0 auto;
        }


        /* =================================
           STATUS
        ================================= */

        .tic-status {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 25px;
            margin-bottom: 30px;
        }


        .tic-player-status {
            min-width: 150px;
        }


        .tic-status-label {
            display: block;
            margin-bottom: 8px;
            color: #6e6e88;
            font-family: "Orbitron", sans-serif;
            font-size: 8px;
            letter-spacing: 1.5px;
        }


        .tic-current-player {
            font-family: "Orbitron", sans-serif;
            font-size: 17px;
            font-weight: 700;
            transition: 0.3s ease;
        }


        .tic-current-player.player-x {
            color: #9b5cff;
            text-shadow:
                0 0 15px rgba(155, 92, 255, 0.45);
        }


        .tic-current-player.player-o {
            color: #00d9ff;
            text-shadow:
                0 0 15px rgba(0, 217, 255, 0.45);
        }


        /* =================================
           SCORE BOARD
        ================================= */

        .tic-score-board {
            display: flex;
            align-items: center;
            gap: 13px;
        }


        .tic-score {
            display: flex;
            align-items: center;
            gap: 8px;
        }


        .tic-score-label {
            color: #6e6e88;
            font-family: "Orbitron", sans-serif;
            font-size: 7px;
            letter-spacing: 0.5px;
        }


        .tic-score-value {
            font-family: "Orbitron", sans-serif;
            font-size: 18px;
            font-weight: 700;
        }


        .score-x {
            color: #9b5cff;
        }


        .score-o {
            color: #00d9ff;
        }


        .tic-score-divider {
            color: #55556b;
            font-family: "Orbitron", sans-serif;
        }


        .tic-draw-score {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-left: 8px;
            padding-left: 15px;
            border-left: 1px solid rgba(255,255,255,0.08);
        }


        .tic-draw-score span {
            color: #6e6e88;
            font-family: "Orbitron", sans-serif;
            font-size: 6px;
            letter-spacing: 0.5px;
        }


        .tic-draw-score strong {
            margin-top: 3px;
            color: #ffd166;
            font-family: "Orbitron", sans-serif;
            font-size: 14px;
        }


        /* =================================
           BOARD
        ================================= */

        .tic-board {
            width: min(440px, 100%);
            aspect-ratio: 1;
            margin: 0 auto;
            padding: 10px;

            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;

            border: 1px solid rgba(155, 92, 255, 0.15);
            border-radius: 20px;

            background:
                rgba(10, 10, 22, 0.7);

            box-shadow:
                inset 0 0 35px rgba(155, 92, 255, 0.04),
                0 20px 60px rgba(0,0,0,0.25);
        }


        /* =================================
           CELLS
        ================================= */

        .tic-cell {
            position: relative;

            display: flex;
            align-items: center;
            justify-content: center;

            border: 1px solid rgba(255,255,255,0.07);
            border-radius: 13px;

            color: white;
            background:
                rgba(255,255,255,0.025);

            font-family: "Orbitron", sans-serif;
            font-size: clamp(35px, 8vw, 58px);
            font-weight: 800;

            transition:
                background 0.2s ease,
                border-color 0.2s ease,
                transform 0.2s ease;
        }


        .tic-cell:hover:not(.filled) {
            border-color:
                rgba(155, 92, 255, 0.35);

            background:
                rgba(155, 92, 255, 0.07);

            transform: scale(0.97);
        }


        .tic-cell.player-x {
            color: #9b5cff;
            text-shadow:
                0 0 20px rgba(155, 92, 255, 0.5);
        }


        .tic-cell.player-o {
            color: #00d9ff;
            text-shadow:
                0 0 20px rgba(0, 217, 255, 0.5);
        }


        .tic-cell.filled {
            cursor: default;
            animation: ticPop 0.25s ease;
        }


        @keyframes ticPop {

            0% {
                transform: scale(0.6);
                opacity: 0;
            }

            100% {
                transform: scale(1);
                opacity: 1;
            }

        }


        .tic-cell.winning-cell {
            border-color:
                rgba(0, 245, 160, 0.6);

            background:
                rgba(0, 245, 160, 0.1);

            color: #00f5a0;

            box-shadow:
                0 0 25px rgba(0, 245, 160, 0.15);

            animation:
                winningPulse 0.9s ease-in-out infinite alternate;
        }


        @keyframes winningPulse {

            from {
                box-shadow:
                    0 0 10px rgba(0,245,160,0.1);
            }

            to {
                box-shadow:
                    0 0 30px rgba(0,245,160,0.3);
            }

        }


        .tic-cell.draw-cell {
            opacity: 0.75;
        }


        /* =================================
           RESULT
        ================================= */

        .tic-result {
            min-height: 30px;

            margin-top: 25px;

            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;

            color: #9b5cff;

            font-family: "Orbitron", sans-serif;
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 1px;

            transition: 0.3s ease;
        }


        .tic-result.game-won {
            color: #00f5a0;
            text-shadow:
                0 0 15px rgba(0,245,160,0.35);
        }


        .tic-result.game-draw {
            color: #ffd166;
        }


        .winner-icon,
        .draw-icon {
            font-size: 13px;
        }


        /* =================================
           CONTROLS
        ================================= */

        .tic-controls {
            display: flex;
            justify-content: center;
            gap: 12px;
            margin-top: 25px;
        }


        .tic-control-button {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;

            padding: 12px 17px;

            border-radius: 9px;

            font-family: "Orbitron", sans-serif;
            font-size: 8px;
            font-weight: 600;
            letter-spacing: 0.6px;

            transition: 0.25s ease;
        }


        .tic-control-button.primary {
            color: white;

            border: 1px solid
                rgba(155,92,255,0.4);

            background:
                rgba(155,92,255,0.12);
        }


        .tic-control-button.secondary {
            color: #8d8da5;

            border: 1px solid
                rgba(255,255,255,0.08);

            background:
                rgba(255,255,255,0.03);
        }


        .tic-control-button:hover {
            transform: translateY(-2px);
        }


        .tic-control-button.primary:hover {
            border-color: #9b5cff;

            background:
                rgba(155,92,255,0.2);

            box-shadow:
                0 0 20px rgba(155,92,255,0.15);
        }


        .tic-control-button.secondary:hover {
            color: white;

            border-color:
                rgba(255,255,255,0.2);
        }


        /* =================================
           MOBILE
        ================================= */

        @media (max-width: 600px) {

            .tic-status {
                flex-direction: column;
                align-items: stretch;
            }


            .tic-player-status {
                text-align: center;
            }


            .tic-score-board {
                justify-content: center;
                flex-wrap: wrap;
            }


            .tic-board {
                gap: 7px;
                padding: 7px;
            }


            .tic-cell {
                border-radius: 10px;
            }


            .tic-controls {
                flex-direction: column;
            }


            .tic-control-button {
                width: 100%;
            }

        }

    `;


    document.head.appendChild(style);

}



