import { aWss } from '..';
import {
  IContact,
  IdContact,
  MessageForCreatedUpdatedContact,
  MessageForDeletedContact,
  MethodForSend,
} from '../types/types';

const broadcastConnection = (message: string) => {
  aWss.clients.forEach((client) => {
    client.send(message);
  });
};

export const sendDeletedContact = async ({ _id }: IdContact) => {
  try {
    const message: MessageForDeletedContact = { operation: MethodForSend.delete, _id };
    broadcastConnection(JSON.stringify(message));
  } catch (error) {
    console.log(error);
  }
};

export const sendAddedContact = async ({ _id, code, phone }: IContact) => {
  try {
    const message: MessageForCreatedUpdatedContact = {
      operation: MethodForSend.add,
      _id,
      code,
      phone,
    };
    broadcastConnection(JSON.stringify(message));
  } catch (error) {
    console.log(error);
  }
};

export const sendUpdatedContact = async ({ _id, code, phone }: IContact) => {
  try {
    const message: MessageForCreatedUpdatedContact = {
      operation: MethodForSend.update,
      _id,
      code,
      phone,
    };
    broadcastConnection(JSON.stringify(message));
  } catch (error) {
    console.log(error);
  }
};
