export class MessageDto {
  id: string
  isRead: boolean
  senderPhoneNumber: string
  receiverPhoneNumber: string
  content: string
  pictureUrl: string
  creationDate: Date
  senderId: string
  receiverId: string
}
