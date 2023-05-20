import {HasMessageType} from "../../../enums/hasMessageType";

export class GroupSearchDto{
  name:string;
  hasMessage:HasMessageType=HasMessageType.notImportant;
}
