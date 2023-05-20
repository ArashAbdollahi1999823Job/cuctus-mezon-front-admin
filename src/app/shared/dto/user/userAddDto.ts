export class UserAddDto {
  username: string
  phoneNumber: string
  id: string
  description: string

  phoneNumberConfirmed: boolean
  password: string
  roles: string[]
}
