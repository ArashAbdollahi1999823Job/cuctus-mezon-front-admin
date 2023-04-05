import {InventoryOperationType} from "../../enums/inventoryOperationType";

export class InventoryOperationAddDto {
   description: string;
   price: number;
   count: number;
   inventoryOperationType: InventoryOperationType;
   productId: number;
}
