import {InventoryOperationType} from "../../enums/inventoryOperationType";

export class InventoryOperationDto {
  id: string;
  description: string;
  price: number;
  count: number;
  inventoryOperationType: InventoryOperationType;
  inventory: string;
  product: string;
  productId: string;
}
