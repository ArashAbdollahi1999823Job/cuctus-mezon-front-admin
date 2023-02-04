import {IRoleDto} from "./IRoleDto";

export interface IUserForAdminDto {
  username: string
  phoneNumber: string
  id: string
  phoneNumberConfirmed: boolean
  password: string
  roles: IRoleDto[]
}
