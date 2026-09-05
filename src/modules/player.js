import { gameboardModule } from "./gameboard.js";

const playerModule = (function () {

    const createPlayer = function (name) {
        let username = null;
        const gameboard = gameboardModule.gameboard();

        if (name === null || name === "") {
            username = `@Captain`;
        }
        else{
            username = `@${name}`;
        }

        const getUsername = function () {
            return username;
        }

        const getGameboard = function () {
            return gameboard;
        }
        
        const attack = function (coordinate, opponentBoard) {
            return opponentBoard.receiveAttack(coordinate);
        }
        return {
            getUsername,
            getGameboard,
            attack
        };
    }
    return {
        createPlayer
    };
})();

export{ playerModule };


/* const Johntee = playerModule.player("Johntee");
const johnteeGameboard = Johntee.getGameboard();

const computer = playerModule.player("computer");
const computerGameboard = computer.getGameboard();

const battleship = shipModule.createShip(5);
computerGameboard.placeShip(battleship, [4,4], "horizontal");

console.log(Johntee.attack([4,4], computerGameboard))
console.log(Johntee.attack([4,5], computerGameboard))
console.log(Johntee.attack([4,6], computerGameboard))
console.log(Johntee.attack([4,7], computerGameboard))
console.log(Johntee.attack([4,9], computerGameboard))
console.log(Johntee.attack([4,8], computerGameboard))
console.log(Johntee.attack([4,8], computerGameboard))

//console.log(Johntee.getGameboard())
console.log(computerGameboard.isAllShipSunk()) */