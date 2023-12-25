export function createWujieAppComponent() {
  const component = window.document.createElement('wujie-app')
  const shadow = component.attachShadow({
    mode: 'open'
  })
  
  return component
}
