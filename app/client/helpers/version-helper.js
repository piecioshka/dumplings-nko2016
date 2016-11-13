let pkg = require('../../../package.json');

const BLACK_COLOR = 'rgb(0, 0, 0)';
const WHITE_COLOR = 'rgb(255, 255, 255)';

const VERSION_STYLE = {
    fill: WHITE_COLOR,
    fontSize: 12
};


function addRectangle(game, x, y, width, height) {
    let rect = game.add.graphics(x, y);

    rect.beginFill(WHITE_COLOR, 0.5);
    rect.drawRect(0, 0, width, height);
    rect.endFill();

    return rect;
}

function getVersion() {
    return pkg.version;
}

function displayGameVersion(state) {
    let positionX = state.game.width - 30;
    let positionY = state.game.height - 18;
    let $background = addRectangle(state.game, positionX - 5, positionY - 2, 35, 20);
    $background.fixedToCamera = true;
    let $text = state.add.text(positionX, positionY, getVersion());
    $text.fixedToCamera = true;
    $text.setStyle(VERSION_STYLE);
}

module.exports = {
    displayGameVersion: displayGameVersion,
    getVersion: getVersion
};
