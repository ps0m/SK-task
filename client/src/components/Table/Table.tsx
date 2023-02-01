import { Box, Typography } from '@mui/material';
import { FC, memo, useCallback } from 'react';
import { handlerFetchQueryError } from '../../helpers';
import { useAlert } from '../../hooks/useAlert';
import { useDeleteContactMutation, useUpdateContactMutation } from '../../store/api/contactsApi';
import { IContact } from '../../types/types';
import Cell from '../Cell/Cell';
import CustomAlert from '../UI/CustomAlert/CustomAlert';
import Loader from '../UI/Loader/Loader';
import {
  ERROR_DELETE_TEXT,
  ERROR_UPDATE_TEXT,
  SUCCESS_DELETE_TEXT,
  SUCCESS_UPDATE_TEXT,
} from './constants';
import style from './Table.module.css';

interface ITable {
  contacts: IContact[];
  optionalText: string;
}

const Table: FC<ITable> = memo(({ contacts, optionalText }) => {
  const [deleteContact, deleteContactOption] = useDeleteContactMutation();
  const [updateContact, updateContactOption] = useUpdateContactMutation();

  const { messageAlert, setMessageAlert, handleCloseAlert, typeAlert, setTypeAlert } = useAlert();

  const handlerDelete = useCallback(
    async (id: string) => {
      try {
        await deleteContact(id).unwrap();
        setTypeAlert('success');
        setMessageAlert(SUCCESS_DELETE_TEXT);
      } catch (error: unknown) {
        const errorMessage = handlerFetchQueryError(error);
        setTypeAlert('error');
        setMessageAlert(`${ERROR_DELETE_TEXT}${errorMessage}`);
      }
    },
    [deleteContact, setMessageAlert, setTypeAlert]
  );

  const handlerUpdate = useCallback(
    async ({ _id, code, phone }: IContact) => {
      try {
        await updateContact({ _id, code, phone }).unwrap();
        setTypeAlert('success');
        setMessageAlert(SUCCESS_UPDATE_TEXT);
      } catch (error: unknown) {
        const errorMessage = handlerFetchQueryError(error);
        setTypeAlert('error');
        setMessageAlert(`${ERROR_UPDATE_TEXT}${errorMessage}`);
      }
    },
    [setMessageAlert, setTypeAlert, updateContact]
  );

  return (
    <>
      <Box className={style.table}>
        {contacts.length ? (
          contacts.map((contact) => (
            <Cell
              key={contact._id}
              contact={contact}
              deleteContact={handlerDelete}
              updateContact={handlerUpdate}
            />
          ))
        ) : (
          <Typography variant="h5" color="secondary">
            {optionalText}
          </Typography>
        )}
      </Box>
      <Loader isOpen={updateContactOption.isLoading || deleteContactOption.isLoading} />
      <CustomAlert
        open={!!messageAlert}
        handleClose={handleCloseAlert}
        message={messageAlert}
        colorType={typeAlert}
      />
    </>
  );
});
export default Table;
