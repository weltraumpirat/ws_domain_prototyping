# Workshop: Domain Prototyping

#### 0. Preparation:

You need a working installation of:

- [NodeJS](https://nodejs.org/)
- [Jest](https://jestjs.io/)
- [Eslint](https://eslint.org/)

Optionally:
- [nvm](https://github.com/creationix/nvm) 

On a Mac, I recommend [using Homebrew to install nvm](http://dev.topheman.com/install-nvm-with-homebrew-to-use-multiple-versions-of-node-and-iojs-easily/), then nvm to install Node, and npm to install the rest:

```
npm install -g jest
npm install -g eslint
```

#### 1. Run stuff

To run tests:

```
jest
```

To run as an app without tests (and live dangerously):

```
npm start
```

#### 2. Workshop materials

We will try to build a ticket sales system for a local cinema (I know, *booring*, but it's a domain we all should be reasonably familiar with).
Here's the output of our initial domain analysis workshop:
- EventStorming output ["The Picture That Explains Everything"](https://realtimeboard.com/app/board/o9J_kyCuemg=/)
- EventStorming output [Aggregates & Services](https://realtimeboard.com/app/board/o9J_kyLn_MM=/)
- ExampleMapping output [Rules & Examples](https://realtimeboard.com/app/board/o9J_kyLtRNY=/)
- [Floor Plan](https://realtimeboard.com/app/board/o9J_kyEXCdI=/) (the cinema has three floors, all of them look the same) 

Start by looking at the EventStorming output - it should be understandable.
Use the ExampleMapping output to come up with good test cases. In JavaScript, we can write very readable and concise tests with Jest:
```
describe('MyAggregate', ()=>{
  describe('Given an initial state', () => {
    
    const aggregate = new MyAggregate();
    
    describe('When it does something', () => {
      
      aggregate.doSomething();
      
      it('Then this assertion should be true', () => {
        expect(aggregate.result()).toBeTrue();
      }
    }
  });
});
```

##### 2.1 Exercise 1: Look ma, no hands

The first exercise is to build the simplest possible implementation possible. In JavaScript, this implies the following mapping:

Value Object => Dictionary Object

```{amount: 50, currency: 'EUR'}```

Entity => Class with an ID

```
class Superhero {
  constructor(id, name, alias) {
    this._id = id;
    this._name = name;
    this._alias = alias;
  }
  
  join( superteam ) {
    superteam.acceptMember(this);
    this._superteam = superteam;
  }
  
  fight(supervillain) {
    //...
  }
}

const spiderman = new Superhero(1, 'Peter Parker', 'Spiderman');
```

Aggregate => Class with an ID; commands map to methods

```
class Superteam {
  constructor(id, name, members = []) {
    this._id = id;
    this._name = name;
    this._members = members; 
  }
  
  acceptMember( superhero ) {
    this._members.push(superhero);
  }
  
  fight (supervillain) {
    this._members.map(m => m.fight(supervillain));
  }
}

const avengers = new Superteam(1, 'Avengers');
spiderman.join(avengers);
``` 
 
Service => Class without state 
       
**Further instructions:**

- Take the easiest approach, but make sure to keep the ubiquitous language
- Do not worry about persistence - just use arrays, objects, primitives (but encapsulate!) 
- Do not use event handlers (you may ```emit``` and use the EventList for logging/insights (see below)).                       
- Observe package boundaries: Use the folders to keep things inside their bounded context.

**Some questions:** 
- When is it hard to keep things neatly separated? (Single Responsibility Principle?)
- How often do you have to ```get()``` from another module? (Law of Demeter? Feature envy?) 
- Are there cascading calls? (Sequences in time (chains), call hierarchies)
- What happens if you try to observe the Hollywood Principle?


##### 2.2 Exercise 2: Let's get on the EventBus!

Use the same tools as in exercise 1, but:
- No direct return values. Send events.
- You may extend the Aggregate class to use the built-in NodeJS event emitter:
```
aggregate.dispatch('MyEvent', data);        
```
- You can subscribe/emit directly on the EventBus (see [index.js](./src/index.js)).
- Use ```done()``` to deal with the async assertions:
```
    it('something should be true', done => {
      eventBus.on('something', data => {
        expect(data).toBeTrue();
        done();
      });
    });
``` 

**Some questions:** 
- How does the increased complexity affect our code? How about the tests?
- What is the effect on coupling/decoupling?
- Do you observe any differences in your aggregates when using internal event handlers (i.e., subscribe in constructor and call private method) vs. subscribing outside of the class (e.g. in the test/index.js) and calling a public command method?