let SuperEventEmitter = require('super-event-emitter');

let PLAYER = require('../constants/player');

function getTemplate(data = {}) {
    return `
        <input type="text" value="${data.value}">
    `;
}

const NICK_INPUT_ID = 'nick-input';

class DOMNickInput {
    $app = null;
    $input = null;

    constructor(defaultValue) {
        SuperEventEmitter.mixin(this);
        this.$app = document.querySelector('#app');
        this.render({ value: defaultValue });
    }

    setupListener() {
        let $wrapper = this._getWrapper();
        this.$input = $wrapper.querySelector('input');
        this.$input.addEventListener('keydown', () => {
            this.trigger(DOMNickInput.EVENTS.VALUE, this.$input.value);
        });
    }

    _getWrapper() {
        return this.$app.querySelector('#' + NICK_INPUT_ID);
    }

    render(data) {
        let $div = document.createElement('div');
        $div.id = NICK_INPUT_ID;
        $div.innerHTML = getTemplate(data);
        this.$app.appendChild($div);
    }

    focus() {
        this.$input.focus();
    }

    destroy() {
        let $wrapper = this._getWrapper();
        $wrapper.parentNode.removeChild($wrapper);
    }

    isValid() {
        let length = this.$input.value.length;
        return length >= PLAYER.NICK_LENGTH_MIN_LIMIT && length <= PLAYER.NICK_LENGTH_MAX_LIMIT;
    }
}

DOMNickInput.EVENTS = {
    VALUE: 'nick-input: value'
};

module.exports = DOMNickInput;
