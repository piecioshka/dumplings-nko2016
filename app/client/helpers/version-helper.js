let pkg = require('../../../package.json');

const VERSION_STYLE = {
    fill: '#ffffff',
    fontSize: 12
};

function displayVersion(state) {
    let positionX = state.game.width - 30;
    let positionY = state.game.height - 20;
    let $text = state.add.text(positionX, positionY, pkg.version);
    $text.setStyle(VERSION_STYLE);
}

module.exports = {
    displayVersion: displayVersion
};
