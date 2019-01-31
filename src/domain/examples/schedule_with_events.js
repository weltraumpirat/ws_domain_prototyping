const Service = require('../service');
const schedule = require('../../schedule');

class ScheduleServiceWithEvents extends Service {
  provide (theatre, time, age = 18) {
    const movies = schedule.theatres
      .filter(t => !theatre || t.name === theatre)
      .reduce((all, t) => all.concat(t.showTimes), [])
      .filter(s => s.rating <= age);
    this._dispatch('SCHEDULE_PROVIDED', movies);
  }

  request (theatre, time, age = 18) {
    this._dispatch('SCHEDULE_REQUESTED', { theatre, time, age });
  }
}

module.exports = ScheduleServiceWithEvents;
