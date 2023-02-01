import SendIcon from '@mui/icons-material/Send';
import { Button, Paper } from '@mui/material';
import { KeyboardEvent, memo, useEffect } from 'react';
import { CODE_CONFIG } from '../../constants/config';
import { MAX_DIGITS_IN_INPUT, MIN_DIGITS_IN_INPUT } from '../../constants/constants';
import { handlerFetchQueryError, validationInputOneParameter } from '../../helpers';
import { useAlert } from '../../hooks/useAlert';
import { useInput } from '../../hooks/useInput';
import { useSelect } from '../../hooks/useSelect';
import { useAddContactMutation } from '../../store/api/contactsApi';
import { BodyContact, CodeType } from '../../types/types';
import CustomAlert from '../UI/CustomAlert/CustomAlert';
import CustomInput from '../UI/CustomInput/CustomInput';
import CustomSelect from '../UI/CustomSelect/CustomSelect';
import Loader from '../UI/Loader/Loader';
import { BUTTON_TEXT, ERROR_ADD_TEXT, INITIAL_CODE, INITIAL_PHONE, INPUT_TEXT } from './constants';
import style from './Form.module.css';

const validationPhoneInput = validationInputOneParameter(MIN_DIGITS_IN_INPUT, MAX_DIGITS_IN_INPUT);
const optionsForSelect = Object.values(CODE_CONFIG);

// TODO 'Take the logic and UI out of the Form and Cell into a new component'

const Form = memo(() => {
  const {
    value: code,
    setValue: setCode,
    onChange: onChangeCode,
  } = useSelect<CodeType>(INITIAL_CODE);

  const {
    value: phone,
    setValue: setPhone,
    isValid: isValidPhone,
    onChange: onChangePhone,
  } = useInput({ initialValue: INITIAL_PHONE, validationFunc: validationPhoneInput });

  const [addProduct, { isLoading, isError, error }] = useAddContactMutation();
  const { messageAlert, setMessageAlert, handleCloseAlert, typeAlert, setTypeAlert } = useAlert();

  const handlerAdd = async ({ code, phone }: BodyContact) => {
    try {
      await addProduct({ code, phone });
      setCode(INITIAL_CODE);
      setPhone(INITIAL_PHONE);
    } catch (error: unknown) {
      const errorMessage = handlerFetchQueryError(error);
      setTypeAlert('error');
      setMessageAlert(`${ERROR_ADD_TEXT}${errorMessage}`);
    }
  };

  const handlerKeyPressPhone = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!isValidPhone) {
      return;
    }
    switch (event.key) {
      case 'Enter':
        handlerAdd({ code, phone });
        break;
      case 'Escape':
        setCode(INITIAL_CODE);
        setPhone(INITIAL_PHONE);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (isError) {
      const errorMessage = handlerFetchQueryError(error);
      setTypeAlert('error');
      setMessageAlert(`Can't ADD contact with error: ${errorMessage}`);
    }
  }, [error, isError, setMessageAlert, setTypeAlert]);

  return (
    <Paper elevation={5} className={style.form}>
      <Loader isOpen={isLoading} />
      <CustomAlert
        open={!!messageAlert}
        handleClose={handleCloseAlert}
        message={messageAlert}
        colorType={typeAlert}
      />

      <CustomSelect
        selectValue={code}
        changeSelectValue={onChangeCode}
        options={optionsForSelect}
      />
      <CustomInput
        inputValue={phone}
        changeInputValue={onChangePhone}
        isValid={isValidPhone}
        fullWidth
        label={INPUT_TEXT.label}
        placeholder={INPUT_TEXT.placeholder}
        onKeyDown={handlerKeyPressPhone}
      />
      <Button
        variant="contained"
        endIcon={<SendIcon />}
        color="secondary"
        size="large"
        disabled={!isValidPhone}
        onClick={() => handlerAdd({ code, phone })}
      >
        {BUTTON_TEXT}
      </Button>
    </Paper>
  );
});
export default Form;
