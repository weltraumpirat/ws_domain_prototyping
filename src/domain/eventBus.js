const events = require('events');

class EventBus extends events.EventEmitter {
  constructor () {
    super();
    this._listeners = {};
    this._monkeyPatchOn();
    this._monkeyPatchEmit();
  }
  /* Replace 'on' with a version that accepts the asterisk wildcard */
  _monkeyPatchOn () {
    const oldOn = this.on;
    this.on = (type, listener) => {
      if (type === '*') {
        if (!this._listeners.hasOwnProperty('*')) {
          this._listeners['*'] = [];
        }
        this._listeners['*'].push(listener);
      } else {
        oldOn.apply(type, listener);
      }
    };
  }
  /* Replace 'emit' with a version that uses the asterisk wildcard */
  _monkeyPatchEmit () {
    const oldEmit = this.emit;
    this.emit = (type, ...args) => {
      if (this._listeners.hasOwnProperty('*')) {
        this._listeners['*'].forEach(listener => listener(type, ...args));
      } else {
        oldEmit.apply(type, args);
      }
    };
  }
}

module.exports = EventBus;
