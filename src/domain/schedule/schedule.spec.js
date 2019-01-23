const EventBus = require('../eventBus');
const { ScheduleService, ScheduleServiceWithEvents } = require('./schedule');

const ALL_MOVIES = [
  {
    'id': 1,
    'start': '13:00',
    'end': '15:00',
    'title': 'Ralph Breaks The Internet',
    'rating': 6
  },
  {
    'id': 2,
    'start': '15:30',
    'end': '17:30',
    'title': 'Bohemian Rhapsody',
    'rating': 6
  },
  {
    'id': 3,
    'start': '18:00',
    'end': '20:00',
    'title': 'Creed II',
    'rating': 12
  },
  {
    'id': 4,
    'start': '20:30',
    'end': '22:30',
    'title': 'Glass',
    'rating': 16
  },
  {
    'id': 5,
    'start': '13:15',
    'end': '15:15',
    'title': 'Ralph Breaks The Internet',
    'rating': 6
  },
  {
    'id': 6,
    'start': '15:45',
    'end': '17:45',
    'title': 'Fantastic Beasts: The Crimes of Grindelwald',
    'rating': 12
  },
  {
    'id': 7,
    'start': '18:15',
    'end': '20:15',
    'title': 'Glass',
    'rating': 16
  },
  {
    'id': 8,
    'start': '20:45',
    'end': '22:45',
    'title': 'Creed II',
    'rating': 12
  },
  {
    'id': 9,
    'start': '13:30',
    'end': '15:30',
    'title': 'Ralph Breaks The Internet',
    'rating': 6
  },
  {
    'id': 10,
    'start': '16:00',
    'end': '18:00',
    'title': 'Creed II',
    'rating': 12
  },
  {
    'id': 11,
    'start': '18:30',
    'end': '20:30',
    'title': 'Bohemian Rhapsody',
    'rating': 6
  },
  {
    'id': 12,
    'start': '21:00',
    'end': '23:00',
    'title': 'Glass',
    'rating': 16
  }];
const ALL_THEATRE_ONE = [
  {
    'id': 1,
    'start': '13:00',
    'end': '15:00',
    'title': 'Ralph Breaks The Internet',
    'rating': 6
  },
  {
    'id': 2,
    'start': '15:30',
    'end': '17:30',
    'title': 'Bohemian Rhapsody',
    'rating': 6
  },
  {
    'id': 3,
    'start': '18:00',
    'end': '20:00',
    'title': 'Creed II',
    'rating': 12
  },
  {
    'id': 4,
    'start': '20:30',
    'end': '22:30',
    'title': 'Glass',
    'rating': 16
  }
];
const ALL_THEATRE_ONE_6 = [
  {
    'id': 1,
    'start': '13:00',
    'end': '15:00',
    'title': 'Ralph Breaks The Internet',
    'rating': 6
  },
  {
    'id': 2,
    'start': '15:30',
    'end': '17:30',
    'title': 'Bohemian Rhapsody',
    'rating': 6
  }
];

describe('Schedule: ', () => {
  describe('Given no theatre specified', () => {
    it('Should include all movies', () => {
      expect(new ScheduleService().request()).toEqual(ALL_MOVIES);
    });
  });
  describe('Given a theatre is specified', () => {
    describe('And no age specified', () => {
      it('Should include all movies from that theatre', () => {
        expect(new ScheduleService().request('Theatre One')).toEqual(ALL_THEATRE_ONE);
      });
    });
  });
  describe('And age specified', () => {
    it('Should only include age appropriate movies from that theatre', () => {
      expect(new ScheduleService().request('Theatre One', null, 6)).toEqual(ALL_THEATRE_ONE_6);
    });
  });
});

const expectProvidedSchedule = (done, expected, ...request) => {
  const eventBus = new EventBus();
  const schedule = new ScheduleServiceWithEvents(eventBus);
  eventBus.on('SCHEDULE_REQUESTED', (query) => {
    schedule.provide(query.theatre, query.time, query.age);
  });
  eventBus.on('SCHEDULE_PROVIDED', (showtimes) => {
    expect(showtimes).toEqual(expected);
    done();
  });
  schedule.request(...request);
};

describe('ScheduleWithEvents: ', () => {
  describe('Given no theatre specified', () => {
    it('Should include all movies', done => {
      expectProvidedSchedule(done, ALL_MOVIES);
    });
  });
  describe('Given a theatre is specified', () => {
    describe('And no age specified', () => {
      it('Should include all movies from that theatre', done => {
        expectProvidedSchedule(done, ALL_THEATRE_ONE, 'Theatre One');
      });
    });
  });
  describe('And age specified', () => {
    it('Should only include age appropriate movies from that theatre', done => {
      expectProvidedSchedule(done, ALL_THEATRE_ONE_6, 'Theatre One', null, 6);
    });
  });
});
