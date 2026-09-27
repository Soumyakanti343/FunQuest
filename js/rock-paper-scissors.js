/* =========================================
   GAMEHUB - ROCK PAPER SCISSORS
========================================= */


/* =========================================
   GAME STATE
========================================= */

let rpsPlayerScore = 0;

let rpsComputerScore = 0;

let rpsDrawScore = 0;

let rpsRoundActive = false;


/* =========================================
   CHOICES
========================================= */

const rpsChoices = {

    rock: {
        name: "ROCK",
        icon: "fa-hand-fist"
    },

    paper: {
        name: "PAPER",
        icon: "fa-hand"
    },

    scissors: {
        name: "SCISSORS",
        icon: "fa-hand-scissors"
    }

};


/* =========================================
   INITIALIZE GAME
========================================= */

function initializeRockPaperScissors() {

    const container =
        document.getElementById(
            "rock-paper-scissors-container"
        );


    if (!container) {

        return;

    }


    rpsRoundActive = false;


    renderRockPaperScissors();

}


/* =========================================
   RENDER GAME
========================================= */

function renderRockPaperScissors() {

    const container =
        document.getElementById(
            "rock-paper-scissors-container"
        );


    if (!container) {

        return;

    }


    container.innerHTML = `

        <div class="rps-game-wrapper">


            <!-- =================================
                 SCORE
            ================================== -->

            <div class="rps-score-board">


                <div class="rps-score-item">

                    <span class="rps-score-label">
                        YOU
                    </span>

                    <span
                        id="rps-player-score"
                        class="rps-score-number player-score"
                    >
                        ${rpsPlayerScore}
                    </span>

                </div>


                <div class="rps-score-center">

                    <span>
                        SCORE
                    </span>

                    <div class="rps-score-line"></div>

                </div>


                <div class="rps-score-item">

                    <span class="rps-score-label">
                        COMPUTER
                    </span>

                    <span
                        id="rps-computer-score"
                        class="rps-score-number computer-score"
                    >
                        ${rpsComputerScore}
                    </span>

                </div>


                <div class="rps-draws">

                    DRAWS

                    <strong id="rps-draw-score">
                        ${rpsDrawScore}
                    </strong>

                </div>

            </div>


            <!-- =================================
                 RESULT
            ================================== -->

            <div
                id="rps-result"
                class="rps-result"
            >

                <span class="rps-result-label">
                    MAKE YOUR MOVE
                </span>

                <strong>
                    CHOOSE A WEAPON
                </strong>

            </div>


            <!-- =================================
                 BATTLE AREA
            ================================== -->

            <div class="rps-battle-area">


                <!-- PLAYER -->

                <div
                    id="rps-player-side"
                    class="rps-side"
                >

                    <span class="rps-side-label">
                        YOU
                    </span>


                    <div
                        id="rps-player-choice"
                        class="rps-choice-display player-choice"
                    >

                        <i class="fa-solid fa-question"></i>

                    </div>

                </div>


                <!-- VS -->

                <div class="rps-vs">

                    <span>
                        VS
                    </span>

                </div>


                <!-- COMPUTER -->

                <div
                    id="rps-computer-side"
                    class="rps-side"
                >

                    <span class="rps-side-label">
                        COMPUTER
                    </span>


                    <div
                        id="rps-computer-choice"
                        class="rps-choice-display computer-choice"
                    >

                        <i class="fa-solid fa-question"></i>

                    </div>

                </div>

            </div>


            <!-- =================================
                 CHOICES
            ================================== -->

            <div class="rps-choose-section">

                <span class="rps-choose-label">
                    SELECT YOUR MOVE
                </span>


                <div class="rps-choice-buttons">


                    <button
                        class="rps-choice-button"
                        data-choice="rock"
                    >

                        <span class="rps-button-icon">

                            <i class="fa-solid fa-hand-fist"></i>

                        </span>

                        <span>
                            ROCK
                        </span>

                    </button>


                    <button
                        class="rps-choice-button"
                        data-choice="paper"
                    >

                        <span class="rps-button-icon">

                            <i class="fa-solid fa-hand"></i>

                        </span>

                        <span>
                            PAPER
                        </span>

                    </button>


                    <button
                        class="rps-choice-button"
                        data-choice="scissors"
                    >

                        <span class="rps-button-icon">

                            <i class="fa-solid fa-hand-scissors"></i>

                        </span>

                        <span>
                            SCISSORS
                        </span>

                    </button>


                </div>

            </div>


            <!-- =================================
                 CONTROLS
            ================================== -->

            <div class="rps-controls">

                <button
                    id="rps-reset-game"
                    class="rps-reset-button"
                >

                    <i class="fa-solid fa-rotate-right"></i>

                    RESET GAME

                </button>

            </div>


        </div>

    `;


    addRockPaperScissorsStyles();

    attachRockPaperScissorsEvents();

}


/* =========================================
   EVENT LISTENERS
========================================= */

function attachRockPaperScissorsEvents() {

    const buttons =
        document.querySelectorAll(
            ".rps-choice-button"
        );


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            function () {

                const choice =
                    this.dataset.choice;


                playRockPaperScissors(
                    choice
                );

            }
        );

    });


    const resetButton =
        document.getElementById(
            "rps-reset-game"
        );


    if (resetButton) {

        resetButton.addEventListener(
            "click",
            resetRockPaperScissors
        );

    }

}


/* =========================================
   PLAY ROUND
========================================= */

function playRockPaperScissors(
    playerChoice
) {

    if (rpsRoundActive) {

        return;

    }


    rpsRoundActive = true;


    disableRpsChoiceButtons();


    const computerChoice =
        getComputerChoice();


    showRpsPlayerChoice(
        playerChoice
    );


    animateRpsComputerChoice(
        computerChoice,
        function () {

            const result =
                determineRpsWinner(
                    playerChoice,
                    computerChoice
                );


            displayRpsResult(
                result,
                playerChoice,
                computerChoice
            );


            updateRpsScore(
                result
            );


            enableRpsChoiceButtons();

            rpsRoundActive = false;

        }
    );

}


/* =========================================
   COMPUTER CHOICE
========================================= */

function getComputerChoice() {

    const choices = [
        "rock",
        "paper",
        "scissors"
    ];


    const randomIndex =
        Math.floor(
            Math.random() * choices.length
        );


    return choices[randomIndex];

}


/* =========================================
   PLAYER CHOICE DISPLAY
========================================= */

function showRpsPlayerChoice(
    choice
) {

    const playerDisplay =
        document.getElementById(
            "rps-player-choice"
        );


    if (!playerDisplay) {

        return;

    }


    playerDisplay.innerHTML = `

        <i class="fa-solid ${rpsChoices[choice].icon}"></i>

    `;


    playerDisplay.classList.add(
        "choice-selected"
    );

}


/* =========================================
   COMPUTER ANIMATION
========================================= */

function animateRpsComputerChoice(
    finalChoice,
    callback
) {

    const computerDisplay =
        document.getElementById(
            "rps-computer-choice"
        );


    if (!computerDisplay) {

        return;

    }


    const icons = [
        "fa-hand-fist",
        "fa-hand",
        "fa-hand-scissors"
    ];


    let counter = 0;

    const totalCycles = 9;


    computerDisplay.classList.add(
        "computer-thinking"
    );


    const interval =
        setInterval(() => {

            const icon =
                icons[counter % icons.length];


            computerDisplay.innerHTML = `

                <i class="fa-solid ${icon}"></i>

            `;


            counter++;


            if (counter >= totalCycles) {

                clearInterval(interval);


                computerDisplay.innerHTML = `

                    <i class="fa-solid ${
                        rpsChoices[finalChoice].icon
                    }"></i>

                `;


                computerDisplay.classList.remove(
                    "computer-thinking"
                );


                computerDisplay.classList.add(
                    "choice-selected"
                );


                callback();

            }

        }, 90);

}


/* =========================================
   DETERMINE WINNER
========================================= */

function determineRpsWinner(
    playerChoice,
    computerChoice
) {

    if (
        playerChoice === computerChoice
    ) {

        return "draw";

    }


    if (

        (
            playerChoice === "rock" &&
            computerChoice === "scissors"
        )

        ||

        (
            playerChoice === "paper" &&
            computerChoice === "rock"
        )

        ||

        (
            playerChoice === "scissors" &&
            computerChoice === "paper"
        )

    ) {

        return "player";

    }


    return "computer";

}


/* =========================================
   DISPLAY RESULT
========================================= */

function displayRpsResult(
    result,
    playerChoice,
    computerChoice
) {

    const resultElement =
        document.getElementById(
            "rps-result"
        );


    if (!resultElement) {

        return;

    }


    let title = "";

    let message = "";

    let resultClass = "";


    if (result === "player") {

        title = "YOU WIN!";

        message =
            `${rpsChoices[playerChoice].name} BEATS ${rpsChoices[computerChoice].name}`;

        resultClass =
            "result-player";

    }


    else if (result === "computer") {

        title = "COMPUTER WINS!";

        message =
            `${rpsChoices[computerChoice].name} BEATS ${rpsChoices[playerChoice].name}`;

        resultClass =
            "result-computer";

    }


    else {

        title = "DRAW!";

        message =
            `BOTH CHOSE ${rpsChoices[playerChoice].name}`;

        resultClass =
            "result-draw";

    }


    resultElement.innerHTML = `

        <span class="rps-result-label">
            ROUND RESULT
        </span>

        <strong>
            ${title}
        </strong>

        <small>
            ${message}
        </small>

    `;


    resultElement.className =
        `rps-result ${resultClass}`;

}


/* =========================================
   UPDATE SCORE
========================================= */

function updateRpsScore(
    result
) {

    if (result === "player") {

        rpsPlayerScore++;

    }


    else if (result === "computer") {

        rpsComputerScore++;

    }


    else {

        rpsDrawScore++;

    }


    updateRpsScoreDisplay();

}


/* =========================================
   UPDATE SCORE DISPLAY
========================================= */

function updateRpsScoreDisplay() {

    const playerScore =
        document.getElementById(
            "rps-player-score"
        );


    const computerScore =
        document.getElementById(
            "rps-computer-score"
        );


    const drawScore =
        document.getElementById(
            "rps-draw-score"
        );


    if (playerScore) {

        playerScore.textContent =
            rpsPlayerScore;

    }


    if (computerScore) {

        computerScore.textContent =
            rpsComputerScore;

    }


    if (drawScore) {

        drawScore.textContent =
            rpsDrawScore;

    }

}


/* =========================================
   DISABLE BUTTONS
========================================= */

function disableRpsChoiceButtons() {

    document
        .querySelectorAll(
            ".rps-choice-button"
        )
        .forEach(button => {

            button.disabled = true;

            button.classList.add(
                "disabled"
            );

        });

}


/* =========================================
   ENABLE BUTTONS
========================================= */

function enableRpsChoiceButtons() {

    document
        .querySelectorAll(
            ".rps-choice-button"
        )
        .forEach(button => {

            button.disabled = false;

            button.classList.remove(
                "disabled"
            );

        });

}


/* =========================================
   RESET GAME
========================================= */

function resetRockPaperScissors() {

    rpsPlayerScore = 0;

    rpsComputerScore = 0;

    rpsDrawScore = 0;

    rpsRoundActive = false;


    renderRockPaperScissors();

}


/* =========================================
   ROCK PAPER SCISSORS STYLES
========================================= */

function addRockPaperScissorsStyles() {

    if (
        document.getElementById(
            "rps-styles"
        )
    ) {

        return;

    }


    const style =
        document.createElement("style");


    style.id =
        "rps-styles";


    style.textContent = `

        /* =================================
           WRAPPER
        ================================= */

        .rps-game-wrapper {
            width: min(850px, 100%);
            margin: 0 auto;
        }


        /* =================================
           SCORE BOARD
        ================================= */

        .rps-score-board {
            position: relative;

            display: flex;
            align-items: center;
            justify-content: center;

            gap: 45px;

            padding: 20px;

            border-bottom:
                1px solid rgba(255,255,255,0.06);

            margin-bottom: 25px;
        }


        .rps-score-item {
            display: flex;
            flex-direction: column;
            align-items: center;
        }


        .rps-score-label {
            color: #6e6e88;

            font-family: "Orbitron", sans-serif;

            font-size: 8px;

            letter-spacing: 1.5px;

            margin-bottom: 6px;
        }


        .rps-score-number {
            font-family: "Orbitron", sans-serif;

            font-size: 34px;

            font-weight: 800;
        }


        .player-score {
            color: #9b5cff;

            text-shadow:
                0 0 20px rgba(155,92,255,0.4);
        }


        .computer-score {
            color: #ff3cac;

            text-shadow:
                0 0 20px rgba(255,60,172,0.35);
        }


        .rps-score-center {
            display: flex;
            flex-direction: column;
            align-items: center;
        }


        .rps-score-center span {
            color: #55556b;

            font-family: "Orbitron", sans-serif;

            font-size: 7px;

            letter-spacing: 1px;
        }


        .rps-score-line {
            width: 30px;
            height: 1px;

            margin-top: 7px;

            background:
                rgba(255,255,255,0.12);
        }


        .rps-draws {
            position: absolute;

            right: 0;

            display: flex;
            flex-direction: column;
            align-items: center;

            color: #6e6e88;

            font-family: "Orbitron", sans-serif;

            font-size: 7px;

            letter-spacing: 0.8px;
        }


        .rps-draws strong {
            margin-top: 4px;

            color: #ffd166;

            font-size: 13px;
        }


        /* =================================
           RESULT
        ================================= */

        .rps-result {
            min-height: 90px;

            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            text-align: center;
        }


        .rps-result-label {
            color: #6e6e88;

            font-family: "Orbitron", sans-serif;

            font-size: 8px;

            letter-spacing: 1.5px;

            margin-bottom: 6px;
        }


        .rps-result strong {
            color: white;

            font-family: "Orbitron", sans-serif;

            font-size: 22px;

            font-weight: 800;
        }


        .rps-result small {
            margin-top: 7px;

            color: #77778f;

            font-size: 10px;
        }


        .rps-result.result-player strong {
            color: #00f5a0;

            text-shadow:
                0 0 20px rgba(0,245,160,0.35);
        }


        .rps-result.result-computer strong {
            color: #ff3cac;

            text-shadow:
                0 0 20px rgba(255,60,172,0.3);
        }


        .rps-result.result-draw strong {
            color: #ffd166;
        }


        /* =================================
           BATTLE AREA
        ================================= */

        .rps-battle-area {
            display: grid;

            grid-template-columns: 1fr 100px 1fr;

            align-items: center;

            gap: 20px;

            margin: 20px auto 35px;

            max-width: 700px;
        }


        .rps-side {
            display: flex;
            flex-direction: column;
            align-items: center;
        }


        .rps-side-label {
            color: #77778f;

            font-family: "Orbitron", sans-serif;

            font-size: 8px;

            letter-spacing: 1.5px;

            margin-bottom: 12px;
        }


        .rps-choice-display {
            width: 150px;
            height: 150px;

            display: flex;
            align-items: center;
            justify-content: center;

            border: 1px solid
                rgba(255,255,255,0.08);

            border-radius: 25px;

            background:
                rgba(255,255,255,0.025);

            color: #45455b;

            font-size: 55px;

            transition:
                transform 0.3s ease,
                border-color 0.3s ease,
                box-shadow 0.3s ease;
        }


        .player-choice.choice-selected {
            color: #9b5cff;

            border-color:
                rgba(155,92,255,0.35);

            background:
                rgba(155,92,255,0.06);

            box-shadow:
                0 0 35px rgba(155,92,255,0.12);

            animation:
                rpsChoicePop 0.35s ease;
        }


        .computer-choice.choice-selected {
            color: #ff3cac;

            border-color:
                rgba(255,60,172,0.35);

            background:
                rgba(255,60,172,0.06);

            box-shadow:
                0 0 35px rgba(255,60,172,0.12);

            animation:
                rpsChoicePop 0.35s ease;
        }


        @keyframes rpsChoicePop {

            0% {
                transform: scale(0.7);
                opacity: 0.3;
            }

            70% {
                transform: scale(1.08);
            }

            100% {
                transform: scale(1);
                opacity: 1;
            }

        }


        .computer-choice.computer-thinking {
            color: #ff3cac;

            animation:
                rpsThinking 0.2s ease-in-out infinite alternate;
        }


        @keyframes rpsThinking {

            from {
                transform: translateY(-3px);
            }

            to {
                transform: translateY(3px);
            }

        }


        /* =================================
           VS
        ================================= */

        .rps-vs {
            display: flex;
            align-items: center;
            justify-content: center;
        }


        .rps-vs span {
            width: 58px;
            height: 58px;

            display: flex;
            align-items: center;
            justify-content: center;

            border: 1px solid
                rgba(255,255,255,0.1);

            border-radius: 50%;

            color: #77778f;

            background:
                rgba(255,255,255,0.025);

            font-family: "Orbitron", sans-serif;

            font-size: 11px;

            font-weight: 700;

            box-shadow:
                0 0 25px rgba(0,0,0,0.2);
        }


        /* =================================
           CHOOSE SECTION
        ================================= */

        .rps-choose-section {
            text-align: center;

            margin-top: 20px;
        }


        .rps-choose-label {
            display: block;

            color: #6e6e88;

            font-family: "Orbitron", sans-serif;

            font-size: 8px;

            letter-spacing: 1.5px;

            margin-bottom: 17px;
        }


        .rps-choice-buttons {
            display: flex;

            justify-content: center;

            gap: 15px;
        }


        .rps-choice-button {
            width: 145px;

            padding: 17px 12px;

            display: flex;
            flex-direction: column;
            align-items: center;

            gap: 10px;

            border: 1px solid
                rgba(255,255,255,0.08);

            border-radius: 14px;

            color: #9a9ab0;

            background:
                rgba(255,255,255,0.025);

            font-family: "Orbitron", sans-serif;

            font-size: 8px;

            letter-spacing: 1px;

            transition:
                transform 0.25s ease,
                border-color 0.25s ease,
                color 0.25s ease,
                background 0.25s ease;
        }


        .rps-button-icon {
            font-size: 28px;

            color: #77778f;

            transition: 0.25s ease;
        }


        .rps-choice-button:hover {
            transform: translateY(-5px);

            color: white;

            border-color:
                rgba(155,92,255,0.4);

            background:
                rgba(155,92,255,0.08);

            box-shadow:
                0 10px 30px rgba(155,92,255,0.08);
        }


        .rps-choice-button:hover
        .rps-button-icon {
            color: #9b5cff;

            transform: scale(1.1);
        }


        .rps-choice-button.disabled {
            opacity: 0.45;

            cursor: not-allowed;
        }


        .rps-choice-button.disabled:hover {
            transform: none;

            border-color:
                rgba(255,255,255,0.08);

            background:
                rgba(255,255,255,0.025);

            box-shadow: none;
        }


        /* =================================
           RESET
        ================================= */

        .rps-controls {
            display: flex;

            justify-content: center;

            margin-top: 28px;
        }


        .rps-reset-button {
            display: flex;
            align-items: center;
            gap: 8px;

            padding: 11px 16px;

            border: 1px solid
                rgba(255,255,255,0.08);

            border-radius: 9px;

            color: #77778f;

            background:
                rgba(255,255,255,0.025);

            font-family: "Orbitron", sans-serif;

            font-size: 8px;

            letter-spacing: 0.7px;

            transition: 0.25s ease;
        }


        .rps-reset-button:hover {
            color: white;

            border-color:
                rgba(255,255,255,0.2);

            transform: translateY(-2px);
        }


        /* =================================
           MOBILE
        ================================= */

        @media (max-width: 700px) {

            .rps-score-board {
                gap: 22px;
            }


            .rps-score-number {
                font-size: 27px;
            }


            .rps-draws {
                position: static;

                margin-left: 5px;
            }


            .rps-battle-area {
                grid-template-columns:
                    1fr 55px 1fr;

                gap: 5px;
            }


            .rps-choice-display {
                width: 110px;
                height: 110px;

                border-radius: 18px;

                font-size: 40px;
            }


            .rps-vs span {
                width: 45px;
                height: 45px;

                font-size: 9px;
            }


            .rps-choice-buttons {
                gap: 8px;
            }


            .rps-choice-button {
                width: 31%;

                padding: 14px 5px;
            }


            .rps-button-icon {
                font-size: 23px;
            }

        }


        @media (max-width: 430px) {

            .rps-score-board {
                gap: 12px;
                padding-left: 5px;
                padding-right: 5px;
            }


            .rps-score-number {
                font-size: 23px;
            }


            .rps-score-center {
                display: none;
            }


            .rps-score-label {
                font-size: 6px;
            }


            .rps-battle-area {
                grid-template-columns:
                    1fr 42px 1fr;
            }


            .rps-choice-display {
                width: 95px;
                height: 95px;

                font-size: 34px;
            }


            .rps-vs span {
                width: 38px;
                height: 38px;

                font-size: 8px;
            }


            .rps-choice-button {
                padding: 12px 3px;

                font-size: 7px;
            }


            .rps-button-icon {
                font-size: 20px;
            }

        }

    `;


    document.head.appendChild(style);

}





