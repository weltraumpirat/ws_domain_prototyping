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

## Exercises

[Exercise 1](exercise1.md)
[Exercise 2](exercise2.md)

