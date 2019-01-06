const EventBus = require('../domain/eventBus');
const EventList = require('./eventList');

describe('EventList', () => {
  it('should record all events in order', () => {
    const eventBus = new EventBus();
    const eventList = new EventList(eventBus);
    eventBus.emit('one', 'one');
    eventBus.emit('two', 'two');
    eventBus.emit('three', 'three');

    expect(eventList.list()).toEqual([['one', 'one'], ['two', 'two'], ['three', 'three']]);
  });
});