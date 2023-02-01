import { useEffect } from 'react';
import { handlerFetchQueryError } from '../../helpers';
import { useAlert } from '../../hooks/useAlert';
import { useGetContactsQuery } from '../../store/api/contactsApi';
import Form from '../Form/Form';
import Table from '../Table/Table';
import CustomAlert from '../UI/CustomAlert/CustomAlert';
import Loader from '../UI/Loader/Loader';
import Title from '../UI/Title/Title';
import { OPTIONAL_TABLE_TEXT, TITLE } from './constants';

import style from './PhoneBook.module.css';

const PhoneBook = () => {
  const { data: contacts = [], isLoading, isError, error } = useGetContactsQuery('');
  const { messageAlert, setMessageAlert, handleCloseAlert, typeAlert, setTypeAlert } = useAlert();

  useEffect(() => {
    if (isError) {
      const errorMessage = handlerFetchQueryError(error);
      setTypeAlert('error');
      setMessageAlert(`{$ERROR_GET_CONTACTS_TEXT}${errorMessage}`);
    }
  }, [error, isError, setMessageAlert, setTypeAlert]);

  return (
    <section className={style.section}>
      <Title>{TITLE}</Title>
      <Form />
      <Table contacts={contacts} optionalText={OPTIONAL_TABLE_TEXT} />
      <Loader isOpen={isLoading} />;
      <CustomAlert
        open={!!messageAlert}
        handleClose={handleCloseAlert}
        message={messageAlert}
        colorType={typeAlert}
        autoHideDuration={2000}
      />
    </section>
  );
};

export default PhoneBook;
