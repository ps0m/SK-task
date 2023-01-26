import { aWss } from ".."
import { BodyForCreatedUpdatedContact, BodyForDeletedContact, MessageForCreatedUpdatedContact, MessageForDeletedContact, MethodForSend } from "../types/types"

const broadcastConnection = (message: string) => {
  aWss.clients.forEach(client => {
    client.send(message)
  })
}

export const sendDeletedContact = async ({ _id }: BodyForDeletedContact) => {
  try {
    const message: MessageForDeletedContact = { operation: MethodForSend.delete, _id }
    broadcastConnection(JSON.stringify(message));
  } catch (error) {
    console.log(error);
  }
}

export const sendAddedContact = ({_id, contact }: BodyForCreatedUpdatedContact) => {
  const message: MessageForCreatedUpdatedContact = { operation: MethodForSend.add, _id, contact }
    broadcastConnection(JSON.stringify(message));

}

export const sendUpdatedContact = async ({ _id, contact }: BodyForCreatedUpdatedContact) => {
  try {
    const message: MessageForCreatedUpdatedContact = { operation: MethodForSend.update, _id, contact }
    broadcastConnection(JSON.stringify(message));
  } catch (error) {
    console.log(error);
  }
}
