# Workshop Materials

## 1. Problem Space
We will try to build a ticket sales system for a local cinema (I know, *booring*, but it's a domain we all should be reasonably familiar with).
Here's the output of our initial domain analysis workshop:
- EventStorming output ["The Picture That Explains Everything"](https://realtimeboard.com/app/board/o9J_kyCuemg=/)
- EventStorming output [Aggregates & Services](https://realtimeboard.com/app/board/o9J_kyLn_MM=/)
- ExampleMapping output [Rules & Examples](https://realtimeboard.com/app/board/o9J_kyLtRNY=/)
- [Floor Plan](https://realtimeboard.com/app/board/o9J_kyEXCdI=/) (the cinema has three floors, all of them look the same) 

## 2. Solution Space

Start by looking at the EventStorming output - it should be understandable.
Use the ExampleMapping output to come up with good test cases in a format like this: 
```
    MyAggregate:
        Given {an initial state}
        When {it does something}
        Then {assertion should be true}
```
In JavaScript, we can write very readable and concise tests with Jest:
```
describe('MyAggregate', ()=>{
  describe('Given an initial state', () => {
    
    const aggregate = new MyAggregate();
    
    describe('When it does something', () => {
      
      aggregate.doSomething();
      
      it('Then assertion should be true', () => {
        expect(aggregate.result()).toBeTrue();
      }
    }
  });
});
```

### 2.1 Exercise 1: Look ma, no hands

The first exercise is to build the simplest possible implementation possible. 
That means:
- No GUI, network or database
- No frameworks, libraries, helpers
- No events, publishers and listeners
- Just classes, plain objects, synchronous method calls     
      
For more info on how to do this in JavaScript, see the [JavaScript examples](./javascript_examples.md)      
      
**Further instructions:**
- Take the easiest approach, but make sure to keep the ubiquitous language
- Do not worry about persistence - just use arrays, objects, primitives (but encapsulate!) 
- Do not use event handlers (you may ```emit``` and use the EventList for logging/insights (see below)).                       
- Observe package boundaries: Use the folders to keep things inside their bounded context.

**Some questions:** 
- When is it hard to keep things neatly separated? (Single Responsibility Principle?)
- How often do you have to ```get()``` from another module? (Law of Demeter? Feature envy?) 
- Observe constructor parameters: Anytime a module requires another module, that's a hard dependency. Do they cross context boundaries? How can we mitigate?
- Are there cascading calls? (Sequences in time (chains), call hierarchies)
- What happens if you try to observe the [Hollywood Principle](http://wiki.c2.com/?HollywoodPrinciple)?
- You *could* use interfaces in JavaScript... When might that be a good idea?

### 2.2 Exercise 2: Let's get on the EventBus!

Use the same tools as in exercise 1, but:
- No direct return values, void methods only. Publish events instead.
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
You can find an example of a simple service implementation with events in [schedule_with_events.js](./src/domain/examples/schedule_with_events.js)

**Further instructions:**
- Events sometimes need carry data ("payload"). 
- You may be tempted attach the source aggregate for simplicity - don't: This will lead to side-effects and all sorts of problems. Instead, create a copy of the state you want to transfer.
- Think carefully when designing your payload: Which fields are needed, which are unnecessary?

**Some questions:** 
- How does the increased complexity affect our code? How about the tests?
- What is the effect on coupling/decoupling?
- What if there is more than one instance of ```x```? If you have to wait for response events, how can you make sure they match to the correct request?
- Do you observe any differences in your aggregates when using internal event handlers (i.e., subscribe in constructor and call private method) vs. subscribing outside of the class (e.g. in the test/index.js) and calling a public command method?
- When you compare using events with the full object data attached to events that reduce the payload to changes only, how does this affect the downstream code? Can you observe differences regarding consistency/concurrency? 