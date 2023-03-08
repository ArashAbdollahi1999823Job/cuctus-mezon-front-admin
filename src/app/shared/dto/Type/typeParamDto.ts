import {ActiveType} from "../../enums/activeType";
import {SortType} from "../../enums/sortType";

export class TypeParamDto {
  id:string;
  pageIndex:number=1;
  pageSize:number=7;
  name:string;
  parentTypeId:number
  activeType:ActiveType=ActiveType.notImportant;
  sortType:SortType=SortType.desc;
}
