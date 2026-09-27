/* =========================================
   GAMEHUB - MAIN APP
========================================= */


/* =========================================
   DOM ELEMENTS
========================================= */

const homeScreen = document.getElementById("home-screen");

const ticTacToeScreen =
    document.getElementById("tic-tac-toe-screen");

const rockPaperScissorsScreen =
    document.getElementById("rock-paper-scissors-screen");

const sudokuScreen =
    document.getElementById("sudoku-screen");

const gamesNavLink =
    document.getElementById("games-nav-link");

const navLinks =
    document.querySelectorAll(".nav-link");


/* =========================================
   ALL SCREENS
========================================= */

const screens = {

    home: homeScreen,

    "tic-tac-toe": ticTacToeScreen,

    "rock-paper-scissors": rockPaperScissorsScreen,

    sudoku: sudokuScreen

};


/* =========================================
   SHOW SCREEN
========================================= */

function showScreen(screenName) {

    /* Hide every screen */

    Object.values(screens).forEach(screen => {

        if (screen) {

            screen.classList.remove("active-screen");

        }

    });


    /* Show selected screen */

    const selectedScreen = screens[screenName];

    if (selectedScreen) {

        selectedScreen.classList.add("active-screen");

    }


    /* Update navigation */

    navLinks.forEach(link => {

        link.classList.remove("active");

    });


    if (screenName === "home") {

        const homeLink =
            document.querySelector(
                '.nav-link[onclick="showHome()"]'
            );

        if (homeLink) {

            homeLink.classList.add("active");

        }

    }


    /* Scroll to top */

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


/* =========================================
   SHOW HOME
========================================= */

function showHome() {

    showScreen("home");

}


/* =========================================
   OPEN GAME
========================================= */

function openGame(gameName) {

    if (!screens[gameName]) {

        console.error(
            `Game "${gameName}" does not exist.`
        );

        return;

    }


    showScreen(gameName);


    /* Initialize the selected game */

    if (gameName === "tic-tac-toe") {

        if (
            typeof initializeTicTacToe === "function"
        ) {

            initializeTicTacToe();

        }

    }


    if (gameName === "rock-paper-scissors") {

        if (
            typeof initializeRockPaperScissors === "function"
        ) {

            initializeRockPaperScissors();

        }

    }


    if (gameName === "sudoku") {

        if (
            typeof initializeSudoku === "function"
        ) {

            initializeSudoku();

        }

    }

}


/* =========================================
   SCROLL TO GAMES
========================================= */

function scrollToGames() {

    const gamesSection =
        document.getElementById("games");

    if (!gamesSection) {

        return;

    }


    /* Make sure Home screen is visible */

    showHome();


    /* Small delay allows the screen
       transition to complete */

    setTimeout(() => {

        gamesSection.scrollIntoView({

            behavior: "smooth",

            block: "start"

        });

    }, 100);

}


/* =========================================
   GAMES NAVIGATION
========================================= */

if (gamesNavLink) {

    gamesNavLink.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            scrollToGames();

        }
    );

}


/* =========================================
   INITIAL PAGE STATE
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        showScreen("home");

    }
);


/* =========================================
   PREVENT HASH JUMP
========================================= */

window.addEventListener(
    "hashchange",
    function () {

        if (window.location.hash === "#games") {

            scrollToGames();

        }

    }
);


/* =========================================
   KEYBOARD SHORTCUT
========================================= */

document.addEventListener(
    "keydown",
    function (event) {

        /* ESC = return to Home */

        if (event.key === "Escape") {

            showHome();

        }

    }
);




