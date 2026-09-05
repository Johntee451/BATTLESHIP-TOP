const shipModule = (function () {

    const createShip = function (length) {
        let hit = 0;
        let name = "";

        if (length === 6) {
            name = "carrier";
        }
        else if (length === 5) {
            name = "battleship";
        }
        else if (length === 4) {
            name = "submarine";
        }
        else if (length === 3) {
            name = "cruiser";
        }
        else if (length === 2) {
            name = "destroyer";
        }

        //getHit() IS FOR TESTING PURPOSES ONLY
        const getHit = function () {
            return hit;
        }

        const receiveHit = function () {
            hit++;
        }

        const isSunk = function () {
            if (hit >= length) {
                return true;
            } else {
                return false;
            }
        }

        return {
            name,
            length,
            getHit,
            receiveHit,
            isSunk
        };
    }
    return {
        createShip
    };
})();

export{ shipModule };



/* const carrier = shipModule.createShip(5);
carrier.recieveHit();
carrier.recieveHit();
carrier.recieveHit();
carrier.recieveHit();
carrier.recieveHit();
console.log(carrier.getHit());
console.log(carrier.isSunk());

const cruiser = shipModule.createShip(3);
cruiser.recieveHit();
cruiser.recieveHit();
cruiser.recieveHit();
console.log(cruiser.getHit());
console.log(cruiser.isSunk());
console.log(carrier.length); */

/* const cruiser = shipModule.createShip(6);
console.log(cruiser); */