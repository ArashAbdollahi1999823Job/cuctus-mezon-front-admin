import {roleType} from "../../enums/RoleType";
import {phoneConfirmType} from "../../enums/phoneConfirmType";
import {sortType} from "../../enums/sortType";

export class UserParamsDto{
  pageIndex:number=1
  pageSize:number=7
  searchUserName: string
  searchPhoneNumber: string
  id: string
  phoneNumberConfirmed: phoneConfirmType=phoneConfirmType.NotImportant
  roleType: roleType=roleType.NotImportant
  sortType: sortType=sortType.Desc
}
