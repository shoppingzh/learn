namespace FunctionOverload {

  function hello(): void;
  function hello(msg: string): void;


  function hello(x?: any): void {
    console.log(`hello ${typeof x === 'string' ? `, ${x}` : ''}`)
  }

  hello()
  hello('Jack')
  // hello(1) // error
  
}