export class MessageDto {
  id: string
  isRead: boolean
  askerPhoneNumber: string
  responderPhoneNumber: string
  content: string
  pictureUrl: string
  creationDate: Date
  askerId: string
  responderId: string
}
