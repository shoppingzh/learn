namespace Extend {

  interface AbsAnimal {
    sayHello(): void;
  }

  class Animal implements AbsAnimal {
    private name: string;
    constructor(name: string) {
      this.name = name
    }

    sayHello(): void {
      console.log(`My name is ${this.name}`)
    }
  }
  
  class Dog extends Animal {
    constructor(name: string) {
      super(name)
    }

    sayHello(): void {
      console.log('I\'am a dog')
      super.sayHello()
    }
  }

  const dog = new Dog('Lili')
  dog.sayHello()
  // console.log(dog.name)
  
}