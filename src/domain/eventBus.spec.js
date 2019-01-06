const EventBus = require('./eventBus');

describe('EventBus:', () => {
  it('should dispatch all events to asterisk wildcard', done => {
    const bus = new EventBus();
    bus.on('*', (type, payload) => {
      expect(type).toEqual('arbitraryEventType');
      expect(payload).toEqual('payload');
      done();
    });

    bus.emit('arbitraryEventType', 'payload');
  });
});