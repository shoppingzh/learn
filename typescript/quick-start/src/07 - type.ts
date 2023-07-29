namespace Type {
  type Mode = 'dark' | 'light' | 'auto'
  interface Event {
    type: string;
    data: object;
  }
  type Callback = (event?: Event) => void;

  const mode: Mode = 'dark'
  const callback: Callback = (event) => {
    console.log(event.data)
  }
}
