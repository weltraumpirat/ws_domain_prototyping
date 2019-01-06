const events = require('events');
const eventBus = new events.EventEmitter();

const Aggregate = require('./aggregate');

describe('Aggregate:', () => {
  it('should dispatch domain events with payload to an event bus', done => {
    expect(eventBus).toBeDefined();
    const myAggregate = new Aggregate(eventBus);

    eventBus.on('test', (payload) => {
      expect(payload).toEqual('payload');
      done();
    });

    myAggregate._dispatch('test', 'payload');
  });
});
