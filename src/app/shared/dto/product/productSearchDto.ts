import {ActiveType} from "../../enums/activeType";
import {SortType} from "../../enums/sortType";

export class ProductSearchDto {
  public pageIndex: number=1;
  public pageSize: number=10;
  public id: string;
  public isActive: ActiveType=ActiveType.notImportant;
  public name: string;
  public slug: string;
  public price: number;
  public inventoryId: string;
  public typeId: string;
  public brandId: string;
  public off: number;
  public sortType: SortType=SortType.desc;
  public storeId: string;
}
