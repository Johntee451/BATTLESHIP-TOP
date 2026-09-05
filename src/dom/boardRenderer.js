const boardRendererModule = (function () {

    const boardRenderer = (function () {

        const humanBoardGridContainer = document.querySelector("#humanBoardGridContainer");
        const computerBoardGridContainer = document.querySelector("#computerBoardGridContainer");
        let humanBoardCellLookup = {};
        let computerBoardCellLookup = {};

        const createBoard = function () {
            humanBoardGridContainer.replaceChildren();
            humanBoardCellLookup = {};
            computerBoardGridContainer.replaceChildren();
                computerBoardCellLookup = {};
            for (let i = 0; i < 10; i++) {
                const rowContainer = document.createElement("div");
                rowContainer.setAttribute("class", "rowContainer");
                for (let j = 0; j < 10; j++) {
                    const columnContainer = document.createElement("div");
                    columnContainer.setAttribute("class", "columnContainer");
                    columnContainer.setAttribute("data-row", i);
                    columnContainer.setAttribute("data-column", j);
                    rowContainer.appendChild(columnContainer);
                    const coordinateArray = [i, j];
                    humanBoardCellLookup[String(coordinateArray)] = columnContainer;
                }
                humanBoardGridContainer.appendChild(rowContainer);
            }

            for (let i = 0; i < 10; i++) {
                
                const rowContainer = document.createElement("div");
                rowContainer.setAttribute("class", "rowContainer");
                for (let j = 0; j < 10; j++) {
                    const columnContainer = document.createElement("div");
                    columnContainer.setAttribute("class", "columnContainer");
                    columnContainer.setAttribute("data-row", i);
                    columnContainer.setAttribute("data-column", j);
                    rowContainer.appendChild(columnContainer);
                    const coordinateArray = [i, j];
                    computerBoardCellLookup[String(coordinateArray)] = columnContainer;
                }
                computerBoardGridContainer.appendChild(rowContainer);
            }
        }

        const renderBoard = function (gameboard, gameboardType) {
            const shipCoordinateObject = gameboard.getShipCoordinateObject();
            const shipAttackHistoryObject = gameboard.getShipAttackHistoryObject();
            const shipCoordinateArray = [];
            const hitCoordinateArray = [];
            const missCoordinateArray = [];

            for (const eachElement in shipCoordinateObject) {
                if (shipCoordinateObject.hasOwnProperty(eachElement)) {
                    const arr = eachElement.split(",").map(Number);
                    shipCoordinateArray.push(arr);
                }
            }

            for (const eachElement in shipAttackHistoryObject) {
                if (shipAttackHistoryObject.hasOwnProperty(eachElement)) {
                    const arr = eachElement.split(",").map(Number);
                    if (shipAttackHistoryObject[eachElement] === "hit") {
                        hitCoordinateArray.push(arr);
                    }
                    else{
                        missCoordinateArray.push(arr);
                    }
                }
            }

            if (gameboardType === "human") {
                renderShip(shipCoordinateArray);
            }

            renderHit(hitCoordinateArray, gameboardType);
            renderMiss(missCoordinateArray, gameboardType);
        }
        
        const renderHit = function (hitCoordinateArray, gameboardType) {
            hitCoordinateArray.forEach(function (element) {
                if (gameboardType === "human") {
                    const eachDomCell = humanBoardCellLookup[String(element)];
                    eachDomCell.style.backgroundColor = "green";
                }
                else{
                    const eachDomCell = computerBoardCellLookup[String(element)];
                    eachDomCell.style.backgroundColor = "green";
                }
            });
        }

        const renderMiss = function (missCoordinateArray, gameboardType) {
            missCoordinateArray.forEach(function (element) {
                if (gameboardType === "human") {
                    const eachDomCell = humanBoardCellLookup[String(element)];
                    eachDomCell.style.backgroundColor = "grey";
                }
                else{
                    const eachDomCell = computerBoardCellLookup[String(element)];
                    eachDomCell.style.backgroundColor = "grey";
                }
            });
        }

        const renderShip = function (shipCoordinateArray) {
            shipCoordinateArray.forEach(function (element) {
                const eachDomCell = humanBoardCellLookup[String(element)];
                eachDomCell.style.backgroundColor = "blue";
            });
        }

        const clearBoard = function () {
            const humanChildNode = humanBoardGridContainer.children;
            const computerChildNode = computerBoardGridContainer.children;

            for (const child of humanChildNode) {
                for (const innerChild of child.children) {
                    innerChild.style.backgroundColor = "";
                }
            }

            for (const child of computerChildNode) {
                for (const innerChild of child.children) {
                    innerChild.style.backgroundColor = "";
                }
            }
        }

        return {
            createBoard,
            renderBoard,
            clearBoard
        };

    })();

    return {
        boardRenderer
    };

})();

export{ boardRendererModule };