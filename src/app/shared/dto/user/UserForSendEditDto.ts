import {IRoleDto} from "./IRoleDto";

export class UserForSendEditDto{
  username: string
  phoneNumber: string
  id: string
  phoneNumberConfirmed: boolean
  password: string
  roles: string[]
}

