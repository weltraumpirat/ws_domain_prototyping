## JavaScript Examples

In JavaScript, the most simple mapping I can come up with is something like this:

1. Value Object => Dictionary Object  
```{amount: 50, currency: 'EUR'}```
2. Entity => Class with an ID  
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
3. Aggregate => Class with an ID; commands map to methods
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
 
4. Service => Class without state 
   
5. Repository => Class that contains a dictionary object or array.
       
     
You can find an example of a simple service implementation without events in [schedule_without_events.js](./src/domain/examples/schedule_without_events.js)
 