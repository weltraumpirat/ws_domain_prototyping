class Aggregate {
  constructor (emitter) {
    this._emitter = emitter;
  }

  _dispatch (event, payload) {
    this._emitter.emit(event, payload);
  }
}

module.exports = Aggregate;
