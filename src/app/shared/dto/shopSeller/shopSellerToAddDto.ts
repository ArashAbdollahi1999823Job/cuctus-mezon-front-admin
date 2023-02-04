import {activeType} from "../../enums/activeType";

export class ShopSellerToAddDto {

  name:string;
  address:string;
  userId:string;
  description:string;
  mobileNumber:string;
  phoneNumber:string;
  activeType:activeType=activeType.notImportant;
}
