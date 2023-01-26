export enum MethodForSend {
  add = 'add',
  update = 'update',
  delete = 'delete',
}

export type Contact = {
  phone: string
}

export type MessageForDeletedContact = {
  operation: MethodForSend
  _id: string
}

export type BodyForDeletedContact = Omit<MessageForDeletedContact, "operation">;

// export type AddedContactMessage = {
//   operation: MethodForSend
//   contact: Contact
// }

// export type AddedContact = Omit<AddedContactMessage, "operation">;

export type MessageForCreatedUpdatedContact = {
  operation: MethodForSend
  _id: string
  contact: Contact
}

export type BodyForCreatedUpdatedContact = Omit<MessageForCreatedUpdatedContact, "operation">;



