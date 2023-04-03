import {ActiveType} from "../../enums/activeType";

export class InventoryParamDto {
  id:string;
  name:string;
  storeId:string
  activeType:ActiveType=ActiveType.notImportant;
}
