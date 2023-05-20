import {IsReadType} from "../../../enums/isReadType";

export class MessageSearchDto {
  pageIndex: number=1;
  pageSize: number=50;
  id: string;
  isRead: IsReadType = IsReadType.notImportant;
  responderPhoneNumber:string;
  askerPhoneNumber:string;
  groupName:string;
}
