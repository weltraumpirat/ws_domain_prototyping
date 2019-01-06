const { eventBus } = require('./index');
const Aggregate = require('./domain/aggregate');

describe('All aggregates:', () => {
  it('should dispatch events to the central event bus', done => {
    expect(eventBus).toBeDefined();
    const someAggregate = new Aggregate(eventBus);

    eventBus.on('*', (type, payload) => {
      expect(type).toEqual('test');
      expect(payload).toEqual('payload');
      done();
    });

    someAggregate._dispatch('test', 'payload');
  });
});
