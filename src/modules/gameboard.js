import { shipModule } from "./ship.js";

const gameboardModule = (function () {

    const gameboard = function () {

        let shipArray = [];
        let shipCoordinateObject = {};
        let shipAttackHistoryObject = {};

        const clearGameboard = function () {
            shipArray = [];
            shipCoordinateObject = {};
            shipAttackHistoryObject = {};
        }

        const getShipCoordinateObject = function () {
            return shipCoordinateObject;
        }

        const getShipAttackHistoryObject = function () {
            return shipAttackHistoryObject;
        }

        const placeShip = function (shipObject, startCoordinate, direction) {
            const coordinateArray = [];

            if (startCoordinate[0] < 0 || startCoordinate[1] < 0) {
                return{
                    message: "Invalid Starting Coordinate"
                };
            }

            //GENERATING AND VALIDATING CANDIDATE COORDINATE
            for (let i = 0; i < shipObject.length; i++) {
                const newArray = [];

                //GENERATING CANDIDATE COORDINATE
                if (direction === "vertical") {
                    newArray[0] = startCoordinate[0] + i;
                    newArray[1] = startCoordinate[1];
                }
                else if (direction === "horizontal") {
                    newArray[0] = startCoordinate[0];
                    newArray[1] = startCoordinate[1] + i;
                }

                //VALIDATING CANDIDATE COORDINATE
                if (!(newArray[0] >= 0 && newArray[0] <= 9) || !(newArray[1] >= 0 && newArray[1] <= 9)) {
                    return{
                        message: "Invalid Coordinate"
                    };
                }
                else{
                    coordinateArray.push(newArray);
                }
            }

            //ADD COORDINATE MAPPING TO SHIPS
            const allPassed = coordinateArray.every(function (element) {
                return (shipCoordinateObject[String(element)] === undefined)
            })
            for (const element of coordinateArray) {
                
                if (allPassed === true) {
                    if (shipObject.name === "carrier") {
                        shipCoordinateObject[String(element)] = "carrier";
                    }
                    else if (shipObject.name === "battleship") {
                        shipCoordinateObject[String(element)] = "battleship";
                    }
                    else if (shipObject.name === "submarine") {
                        shipCoordinateObject[String(element)] = "submarine";
                    }
                    else if (shipObject.name === "cruiser") {
                        shipCoordinateObject[String(element)] = "cruiser";
                    }
                    else if (shipObject.name === "destroyer") {
                        shipCoordinateObject[String(element)] = "destroyer";
                    }
                }
                else{
                    return {
                        message: `Coordinate Already Occupied ---> (${String(element)}) : ${shipCoordinateObject[String(element)]}`
                    };
                }
            }

            //ADD SHIPS TO SHIP ARRAY
            const lastElement = coordinateArray[coordinateArray.length - 1];
            if (shipCoordinateObject[String(lastElement)]) {
                shipArray.push(shipObject);
            }
        }

        const receiveAttack = function (coordinate) {
            const coordinateOwner = shipCoordinateObject[String(coordinate)];
            if (shipAttackHistoryObject[String(coordinate)] === undefined) {
                if (coordinateOwner !== undefined) {
                    shipAttackHistoryObject[String(coordinate)] = "hit";
                    for (const shipObj of shipArray) {
                        if (shipObj.name === coordinateOwner) {
                            shipObj.receiveHit();
                            if (shipObj.isSunk() === true) {
                                return(`great...(${coordinate}) is a HIT..!!!\nCONGRATULATIONS...${shipObj.name} sinks and DESTROYED COMPLETELY...!!!`);
                            }
                        }
                    }
                    return(`great...(${coordinate}) is a HIT..!!!`);
                }
                else if (coordinateOwner === undefined) {
                    shipAttackHistoryObject[String(coordinate)] = "miss";
                    return(`sad...(${coordinate}) MISSED..!!!`);
                }
            }
            else{
                return(`(${coordinate}) Has Already Been Attacked. Choose Another Coordinate.`)
            }
        }

        const isAllShipSunk = function () {
            if (shipArray.length === 0) {
                return false;
            }
            const allShipSunk = shipArray.every(function (element) {
                return element.isSunk() === true;
            })
            return allShipSunk;
        }

        return {
            placeShip,
            receiveAttack,
            isAllShipSunk,
            clearGameboard,
            getShipCoordinateObject,
            getShipAttackHistoryObject
        };
    }

    return {
        gameboard
    };
})();

export{ gameboardModule};