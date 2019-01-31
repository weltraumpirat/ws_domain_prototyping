## 2.1 Exercise 1: Look ma, no hands

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
