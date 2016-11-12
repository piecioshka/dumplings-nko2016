let pkg = require('../../../package.json');

function displayVersion(state) {
    let $text = state.add.text(state.game.width - 30, state.game.height - 20, pkg.version);
    $text.setStyle({
        fill: '#ffffff',
        fontSize: 12
    });
}

module.exports = {
    displayVersion: displayVersion
};
