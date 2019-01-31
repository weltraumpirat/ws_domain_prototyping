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
There is an EventList class, which you can use to debug/log your events. It will record everything that is emitted on the central EventBus. You can ```require()``` both from [index.js](src/index.js) (or just use them there).
 
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