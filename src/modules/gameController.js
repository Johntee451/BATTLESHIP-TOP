import { playerModule } from "./player.js";
import { shipModule } from "./ship.js";

const gameControllerModule = (function () {

    const gameController = (function () {
        let humanPlayer = null;
        let computerPlayer = null;
        let currentPlayer = null;
        let winner = null;
        let gameState = null;
        let playerFleetPlaced = false;

        const getHumanPlayer = function () {
            return humanPlayer;
        }

        const getComputerPlayer = function () {
            return computerPlayer;
        }

        const getCurrentPlayer = function () {
            return currentPlayer;
        }

        const getWinner = function () {
            return winner;
        }
        
        const getGameState = function () {
            return gameState;
        }

        const createComputerFleet = function () {
            const computerPlayerGameboard = computerPlayer.getGameboard();
            const computerFleetTemplate = [
                {
                    shipName: "carrier",
                    length: 6,
                    coordinate: [4,3],
                    direction: "horizontal"
                },
                {
                    shipName: "battleship",
                    length: 5,
                    coordinate: [5,5],
                    direction: "vertical"
                },
                {
                    shipName: "submarine",
                    length: 4,
                    coordinate: [5,6],
                    direction: "horizontal"
                },
                {
                    shipName: "cruiser",
                    length: 3,
                    coordinate: [2,1],
                    direction: "horizontal"
                },
                {
                    shipName: "destroyer",
                    length: 2,
                    coordinate: [3,8],
                    direction: "horizontal"
                }
            ]

            computerFleetTemplate.forEach(
                function (eachShipObject) {
                    const shipObject = shipModule.createShip(eachShipObject.length);
                    computerPlayerGameboard.placeShip(shipObject, eachShipObject.coordinate, eachShipObject.direction);
                }
            )
        }

        const initializeGame = function (playerName) {
            humanPlayer = playerModule.createPlayer(playerName);
            computerPlayer = playerModule.createPlayer("Siri");
            currentPlayer = null;
            winner = null;
            gameState = "setup";
            playerFleetPlaced = false;

            createComputerFleet();
        }

        const placePlayerFleet = function (fleetDataObject) {
            if (gameState === "setup") {
                const humanPlayerGameboard = humanPlayer.getGameboard()

                for (const eachFleetDataObject of fleetDataObject) {
                    const coordinate = [eachFleetDataObject.row, eachFleetDataObject.column];
                    const shipObject = shipModule.createShip(eachFleetDataObject.length);
                    const placeShipMessage = humanPlayerGameboard.placeShip(shipObject, coordinate, eachFleetDataObject.direction);
                    if(typeof(placeShipMessage) === "string"){
                        humanPlayerGameboard.clearGameboard();
                        return {
                            message: placeShipMessage
                        };
                    }
                }
                playerFleetPlaced = true;

                return{
                    fleetPlaced: playerFleetPlaced,
                    message: "Fleet Placed Successfully...!!!"
                }
            }
        }

        const isSetupComplete = function () {
            return playerFleetPlaced;
        }

        const startGame = function () {
            if (isSetupComplete() === true) {
                if (gameState === "setup") {
                    currentPlayer = humanPlayer;
                    gameState = "playing";
                    winner = null;
                    return {
                        message: "Game Started...!!!"
                    };
                }
                else{
                    return {
                        message: "Game Already Started or Setup Incomplete...!!!"
                    };
                }
            }
            else {
                return {
                    message: "Cannot Start Game"
                }
            }
        }
        
        const playRound = function (coordinate) {
            const computerPlayerGameboard = computerPlayer.getGameboard();
            const humanPlayerGameboard = humanPlayer.getGameboard();
            let computerMoveCoordinate = null;
            let computerAttack = null;
            let humanAttack = null;
            let winnerStatus = null;

            if (gameState === "playing") {
                if (currentPlayer === humanPlayer) {
                    
                    humanAttack = humanPlayer.attack(coordinate, computerPlayerGameboard);
                    winnerStatus = checkWinner();
                    if (winnerStatus !== null) {
                        return{
                            human: humanAttack,
                            computer: computerAttack,
                            message: `${winnerStatus.getUsername()} Wins!\nIt's GameOver`
                        }
                    }

                    currentPlayer = computerPlayer;
                    computerMoveCoordinate = generateComputerMove();
                    computerAttack = computerPlayer.attack(computerMoveCoordinate, humanPlayerGameboard);
                    winnerStatus = checkWinner();
                    if (winnerStatus !== null) {
                        return{
                            human: humanAttack,
                            computer: computerAttack,
                            message: `${winnerStatus.getUsername()} Wins!\nIt's GameOver`
                        }
                    }
                    currentPlayer = humanPlayer;
                }
                else {
                    return{
                        message: "Invalid Turn...!!!"
                    };
                }
            }
            else{
                return {
                    message: "Game Has Not Started...!!!"
                };
            }
            return{
                human: humanAttack,
                computer: computerAttack,
                message: `No Winner`
            }
        }

        const generateComputerMove = function () {
            const humanPlayerGameboard = humanPlayer.getGameboard();
            const computerAttackHistory = humanPlayerGameboard.getShipAttackHistoryObject();
            let row = Math.floor(Math.random() * 10);
            let column = Math.floor(Math.random() * 10);
            const coordinate = [row, column];

            while (computerAttackHistory[String(coordinate)] !== undefined) {
                row = Math.floor(Math.random() * 10);
                column = Math.floor(Math.random() * 10);
                const newCoordinate = [row, column];
                if (computerAttackHistory[String(newCoordinate)] === undefined) {
                    return newCoordinate;
                }
            }
            return coordinate;
        }

        const checkWinner = function () {
            const computerPlayerGameboard = computerPlayer.getGameboard();
            const humanPlayerGameboard = humanPlayer.getGameboard();
            if (computerPlayerGameboard.isAllShipSunk() === true) {
                winner = humanPlayer;
                gameState = "gameover";
                return winner;
            }
            else if (humanPlayerGameboard.isAllShipSunk() === true) {
                winner = computerPlayer;
                gameState = "gameover";
                return winner;
            }
            else{
                return winner;
            }
        }

        const resetGame = function () {
            const humanPlayerGameBoard = humanPlayer.getGameboard();
            const computerPlayerGameBoard = computerPlayer.getGameboard();
            humanPlayerGameBoard.clearGameboard();
            computerPlayerGameBoard.clearGameboard();
            humanPlayer = null;
            computerPlayer = null;
            currentPlayer = null;
            winner = null;
            gameState = null;
            playerFleetPlaced = false;
        }

        return {
            initializeGame,
            placePlayerFleet,
            isSetupComplete,
            startGame,
            playRound,
            getGameState,
            getWinner,
            getCurrentPlayer,
            getComputerPlayer,
            getHumanPlayer,
            resetGame
        };

    })();

    return {
        gameController
    };

})();

export{ gameControllerModule };