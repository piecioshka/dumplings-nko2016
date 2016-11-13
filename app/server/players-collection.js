class PlayerCollection {
    constructor() {
        this.players = [];
    }

    add(player) {
        this.players.push(player);
    }

    remove(player) {
        var index = this.players.indexOf(player);
        this.players.splice(index, 1);
    }

    update(playerId, player) {
        let playerIndex = -1;
        this.players.forEach((player, index) => {
            if (player.id === playerId) {
                playerIndex = index;
            }
        });
        this.players[playerIndex] = player;
    }
}

module.exports = PlayerCollection;
