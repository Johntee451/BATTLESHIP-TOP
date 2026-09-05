import { domManagerModule } from "./domManager.js";

const eventHandlerModule = (function () {

    const eventHandler = (function () {

        const computerBoardGridContainer = document.querySelector("#computerBoardGridContainer");
        const fleetSetupSubmitButton = document.querySelector("#fleetSetupSubmitButton");
        const actionStartGameButton = document.querySelector("#actionStartGameButton");
        const actionResetGameButton = document.querySelector("#actionResetGameButton");

        const attachBoardListener = function () {
            const computerRowContainer = computerBoardGridContainer.childNodes;
            computerRowContainer.forEach(function (eachRowDomElement) {
                eachRowDomElement.childNodes.forEach(function (eachColumnDomElement) {
                    eachColumnDomElement.addEventListener("click", function () {
                        const coordinate = [];
                        const row = eachColumnDomElement.getAttribute("data-row");
                        const column = eachColumnDomElement.getAttribute("data-column");
                        coordinate.push(Number(row))
                        coordinate.push(Number(column))
                        domManagerModule.handleBoardClick(coordinate);
                    })
                })
            })
        }

        const attachResetGameListener = function () {
            actionResetGameButton.addEventListener("click", function () {
                domManagerModule.handleResetGameClick();
            })
        }
        
        const attachStartGameListener = function () {
            actionStartGameButton.addEventListener("click", function () {
                domManagerModule.handleStartGameClick();
            })
        }

        const attachPlaceFleetFormListener = function () {
            const carrierRowInput = document.querySelector("#carrierRowInput");
            const carrierColumnInput = document.querySelector("#carrierColumnInput");
            const carrierDirectionInput = document.querySelector("#carrierDirectionInput");

            const battleshipRowInput = document.querySelector("#battleshipRowInput");
            const battleshipColumnInput = document.querySelector("#battleshipColumnInput");
            const battleshipDirectionInput = document.querySelector("#battleshipDirectionInput");

            const submarineRowInput = document.querySelector("#submarineRowInput");
            const submarineColumnInput = document.querySelector("#submarineColumnInput");
            const submarineDirectionInput = document.querySelector("#submarineDirectionInput");

            const cruiserRowInput = document.querySelector("#cruiserRowInput");
            const cruiserColumnInput = document.querySelector("#cruiserColumnInput");
            const cruiserDirectionInput = document.querySelector("#cruiserDirectionInput");

            const destroyerRowInput = document.querySelector("#destroyerRowInput");
            const destroyerColumnInput = document.querySelector("#destroyerColumnInput");
            const destroyerDirectionInput = document.querySelector("#destroyerDirectionInput");

            

            fleetSetupSubmitButton.addEventListener("click", function () {
                const fleetDataObject = [
                    {
                        shipName: "carrier",
                        length: 6,
                        row: Number(carrierRowInput.value),
                        column: Number(carrierColumnInput.value),
                        direction: carrierDirectionInput.value
                    },
                    {
                        shipName: "battleship",
                        length: 5,
                        row: Number(battleshipRowInput.value),
                        column: Number(battleshipColumnInput.value),
                        direction: battleshipDirectionInput.value
                    },
                    {
                        shipName: "submarine",
                        length: 4,
                        row: Number(submarineRowInput.value),
                        column: Number(submarineColumnInput.value),
                        direction: submarineDirectionInput.value
                    },
                    {
                        shipName: "cruiser",
                        length: 3,
                        row: Number(cruiserRowInput.value),
                        column: Number(cruiserColumnInput.value),
                        direction: cruiserDirectionInput.value
                    },
                    {
                        shipName: "destroyer",
                        length: 2,
                        row: Number(destroyerRowInput.value),
                        column: Number(destroyerColumnInput.value),
                        direction: destroyerDirectionInput.value
                    }
                ];

                domManagerModule.handlePlaceFleetClick(fleetDataObject);
            });
        }

        return {
            attachBoardListener,
            attachResetGameListener,
            attachStartGameListener,
            attachPlaceFleetFormListener
        };
    })();

    return {
        eventHandler
    };
})();

export{ eventHandlerModule };