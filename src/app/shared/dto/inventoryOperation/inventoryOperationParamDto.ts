import {InventoryOperationType} from "../../enums/inventoryOperationType";
import {SortType} from "../../enums/sortType";

export class InventoryOperationParamDto {
  id: string
  pageIndex: number = 1;
  pageSize = 10;
  price: number;
  count = -1;
  inventoryOperationType: InventoryOperationType = InventoryOperationType.notImportant;
  productId: string;
  inventoryId: string;
  sortType = SortType.desc;
  storeId:string;
}
