namespace Variable {
  enum Mode {
    Dark,
    Light
  }
  
  let a: number = 1
  const str: string = 'hello'
  const bool: boolean = true
  const arr: Array<number> = [1, 2, 3]
  const mode: Mode = Mode.Dark
  let any1: any = 1
  any1 = '2'
  any1 = {}
  // const never1: never = 1 // error
  const hello = (): void => {
    // return 1 // error
  }
  const hello2 = (a: number): never => {
    throw new Error()
  }

}