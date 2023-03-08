import {RoleType} from "../../enums/RoleType";
import {PhoneConfirmType} from "../../enums/phoneConfirmType";
import {SortType} from "../../enums/sortType";

export class UserParamDto {
  pageIndex:number=1
  pageSize:number=7
  searchUserName: string
  searchPhoneNumber: string
  id: string
  phoneNumberConfirmed: PhoneConfirmType=PhoneConfirmType.notImportant
  roleType: RoleType=RoleType.notImportant
  sortType: SortType=SortType.desc
}
