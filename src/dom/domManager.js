import { gameControllerModule } from "../modules/gameController.js";
import { boardRendererModule } from "./boardRenderer.js";
import { eventHandlerModule } from "./eventHandler.js";

const domManagerModule = (function () {

    const currentTurnValue = document.querySelector("#currentTurnValue");
    const gameStatusValue = document.querySelector("#gameStatusValue");
    const lastResultValue = document.querySelector("#lastResultValue");
    const fleetSetupDiv = document.querySelector("#fleetSetupDiv");
    const actionStartGameButton = document.querySelector("#actionStartGameButton");

    const initializeGame = function () {
        const playerName = prompt("Enter Your Preferred Username");
        gameControllerModule.gameController.initializeGame(playerName);
        alert(`Welcome ${playerName} to Battleship Game\nClick "START GAME" to Begin!`);
        boardRendererModule.boardRenderer.createBoard();
        eventHandlerModule.eventHandler.attachBoardListener();
        eventHandlerModule.eventHandler.attachPlaceFleetFormListener();
        eventHandlerModule.eventHandler.attachResetGameListener();
        eventHandlerModule.eventHandler.attachStartGameListener();
        return;
    };

    const handleBoardClick = function (coordinate) {
        const computerPlayer = gameControllerModule.gameController.getComputerPlayer();
        const humanPlayer = gameControllerModule.gameController.getHumanPlayer();
        const returnedMessage = gameControllerModule.gameController.playRound(coordinate);
        const currentPlayer = gameControllerModule.gameController.getCurrentPlayer();
        gameStatusValue.textContent = gameControllerModule.gameController.getGameState();
        currentTurnValue.textContent = currentPlayer.getUsername();
        boardRendererModule.boardRenderer.renderBoard(computerPlayer.getGameboard(), "computer");
        boardRendererModule.boardRenderer.renderBoard(humanPlayer.getGameboard(), "human");
        lastResultValue.textContent = returnedMessage.message;
        return;
    };

    const handleStartGameClick = function () {
        fleetSetupDiv.removeAttribute("hidden");
        actionStartGameButton.setAttribute("hidden", true);
        return;
    };

    const handlePlaceFleetClick = function (fleetDataObject) {
        //gameControllerModule.gameController.initializeGame("Johntee");
        const humanPlayer = gameControllerModule.gameController.getHumanPlayer();
        const returnedMessage = gameControllerModule.gameController.placePlayerFleet(fleetDataObject);
        if (returnedMessage.message === "Fleet Placed Successfully...!!!") {
            alert(returnedMessage.message);
            fleetSetupDiv.setAttribute("hidden", true);
            boardRendererModule.boardRenderer.renderBoard(humanPlayer.getGameboard(), "human");
            const startGameMessage = gameControllerModule.gameController.startGame();
            const currentPlayer = gameControllerModule.gameController.getCurrentPlayer();
            alert(startGameMessage.message);
            gameStatusValue.textContent = gameControllerModule.gameController.getGameState();
            currentTurnValue.textContent = currentPlayer.getUsername();
        }
        else{
            alert(returnedMessage.message);
        }
        console.log(returnedMessage);
        return;
    };

    const handleResetGameClick = function () {
        gameControllerModule.gameController.resetGame();
        boardRendererModule.boardRenderer.clearBoard();
        fleetSetupDiv.setAttribute("hidden", true);
        actionStartGameButton.removeAttribute("hidden");
        currentTurnValue.textContent = "";
        gameStatusValue.textContent = "";
        lastResultValue.textContent = "";
        const playerName = prompt("Enter Your Preferred Username");
        gameControllerModule.gameController.initializeGame(playerName);
        alert(`Welcome ${playerName} to Battleship Game\nClick "START GAME" to Begin!`);
        return;
    };

    return {
        initializeGame,
        handleBoardClick,
        handlePlaceFleetClick,
        handleResetGameClick,
        handleStartGameClick
    };
})();

export{ domManagerModule };