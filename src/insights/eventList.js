class EventList {
  constructor (eventBus) {
    this._events = [];
    this._eventBus = eventBus;
    this._eventBus.on('*', (type, data) => {
      this._events.push([type, data]);
    });
  }

  list () {
    return this._events;
  }
}

module.exports = EventList;