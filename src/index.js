const EventBus = require('./domain/eventBus');
const EventList = require('./insights/eventList');

const eventBus = new EventBus();
const eventList = new EventList(eventBus);

module.exports = { eventBus, eventList };
