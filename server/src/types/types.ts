export enum MethodForSend {
  add = 'add',
  update = 'update',
  delete = 'delete',
}

export interface IContact  {
  _id: string
  code: string
  phone: string
}

export interface IdContact {
  _id: string
}

export interface MessageForDeletedContact extends IdContact {
  operation: MethodForSend
}


export interface MessageForCreatedUpdatedContact extends IContact {
  operation: MethodForSend
}