let tilemapJSON = require('./../../../public/assets/maps/warsaw.json');

const STREET_LAYER_INDEX = 1;

class TilemapHelper {
    getMap() {
        return tilemapJSON;
    }

    getCoords(data, layerIndex) {
        let coords = [];

        for (let i = 0; i < data.length; i++) {
            let x = i % 100;
            let y = Math.floor(i / 100); 

            if (data[i] === layerIndex) {
                coords.push({ x, y });
            }
        }

        return coords;
    }

    getStreetLayerCoords() {
        let map = this.getMap();
        let data = map.layers[0].data;
        let coords = this.getCoords(data, STREET_LAYER_INDEX);

        return coords;
    }
}

module.exports = TilemapHelper;
