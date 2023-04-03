import {OffDto} from "../off/offDto";

export class ProductEditDto{
  id: string
  name: string
  slug: string
  description: string
  metaDescription: string
  price: number
  summary: string
  isActive: boolean
  store: string
  typeId:number
  inventoryId:number
}
