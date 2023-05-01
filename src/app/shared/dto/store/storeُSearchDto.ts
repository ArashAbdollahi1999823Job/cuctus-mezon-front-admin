import {SortType} from "../../enums/sortType";
import {ActiveType} from "../../enums/activeType";

export class StoreSearchDto {
  id:string;
  pageIndex:number=1;
  pageSize:number=7;
  name:string;
  phoneNumber:string;
  mobileNumber:string;
  userId:string;
  activeType:ActiveType=ActiveType.notImportant;
  sortType:SortType=SortType.desc;
}
