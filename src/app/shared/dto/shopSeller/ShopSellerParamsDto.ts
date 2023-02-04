import {activeType} from "../../enums/activeType";
import {sortType} from "../../enums/sortType";

export class shopSellerParamsDto{
  id:string;
  pageIndex:number=1;
  pageSize:number=7;
  name:string;
  phoneNumber:string;
  mobileNumber:string;
  userId:string;
  activeType:activeType=activeType.notImportant;
  sortType:sortType=sortType.Desc;
}
