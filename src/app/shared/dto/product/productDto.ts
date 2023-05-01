import {OffDto} from "../off/offDto";
import {ProductPictureDto} from "../productPicture/productPictureDto";
import {ColorDto} from "../color/colorDto";

export class ProductDto {
  id: string
  name: string
  slug: string
  description: string
  metaDescription: string
  price: number
  summary: string
  score: number
  count: number
  isActive: boolean
  store: string
  type: string
  typeId:string
  brand: string
  inventory: string
  inventoryId:string
  off: OffDto
  offId:string
  productPictureDtos:ProductPictureDto[];
  colorDtos:ColorDto[];
}
