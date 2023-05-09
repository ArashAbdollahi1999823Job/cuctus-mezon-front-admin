import {RoleDto} from "../role/roleDto";
import {UserPictureDto} from "../UserPicture/UserPictureDto";
export interface UserDto {
  username: string;
  phoneNumber: string;
  id: string;
  phoneNumberConfirmed: boolean;
  password: string;
  roles: RoleDto[];
  userPictureDto:UserPictureDto;
}
