import {RoleDto} from "../role/roleDto";


export interface UserDto {
  username: string
  phoneNumber: string
  id: string
  phoneNumberConfirmed: boolean
  password: string
  roles: RoleDto[]
}
