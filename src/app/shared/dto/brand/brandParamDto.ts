import {ActiveType} from "../../enums/activeType";
import {SortType} from "../../enums/sortType";

export class BrandParamDto {
  id:string;
  pageIndex:number=1;
  pageSize:number=7;
  name:string;

  sortType:SortType=SortType.desc;
}
