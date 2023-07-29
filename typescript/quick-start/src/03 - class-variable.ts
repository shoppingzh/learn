namespace ClassVariable {
  class Animal {
    protected name: string;
  
    constructor(name: string) {
      this.name = name
    }
  }
  
  class Dog extends Animal {
    readonly age: number;
  
    constructor(name: string, age: number) {
      super(name)
      this.age = age
    }
  
    sayHello() {
      console.log(`My name is ${this.name}`)
    }
  
  }
  
  const dog: Dog = new Dog('Lili', 3)
  // dog.age++ // error
  dog.sayHello()
  
}