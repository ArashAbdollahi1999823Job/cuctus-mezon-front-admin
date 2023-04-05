import {InventoryOperationType} from "../../enums/inventoryOperationType";

export class InventoryOperationDto {
  id: number;
  description: string;
  price: number;
  count: number;
  inventoryOperationType: InventoryOperationType;
  inventory: string;
  product: string;
  productId: number;
}
