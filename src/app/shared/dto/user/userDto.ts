import {RoleDto} from "../role/roleDto";
import {UserPictureDto} from "../UserPicture/UserPictureDto";
export interface UserDto {
  username: string;
  phoneNumber: string;
  id: string;
  description: string

  phoneNumberConfirmed: boolean;
  password: string;
  roles: RoleDto[];
  userPictureDto:UserPictureDto;
  name:string;
}
