import {ActiveType} from "../../enums/activeType";

export class StoreAddDto {

  name:string;
  address:string;
  userId:string;
  description:string;
  mobileNumber:string;
  phoneNumber:string;
  activeType:ActiveType=ActiveType.notImportant;
}
