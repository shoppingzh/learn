import { AppContext } from "./common";

export function createDocumentProxy(app: AppContext) {
  return new Proxy<Document>({} as any, {
    
  })
}