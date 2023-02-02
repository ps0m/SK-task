import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { Box, IconButton, Paper, Typography } from '@mui/material';
import { FC, KeyboardEvent, memo, useMemo, useState } from 'react';
import { CODE_CONFIG, FLAGS_ICON } from '../../constants/config';
import { MAX_DIGITS_IN_INPUT, MIN_DIGITS_IN_INPUT } from '../../constants/constants';
import { validationInputOneParameter } from '../../helpers';
import { useInput } from '../../hooks/useInput';
import { useSelect } from '../../hooks/useSelect';
import { IContact } from '../../types/types';
import CustomInput from '../UI/CustomInput/CustomInput';
import CustomSelect from '../UI/CustomSelect/CustomSelect';
import style from './Cell.module.css';
import { INPUT_TEXT } from './constants';

const validationPhoneInput = validationInputOneParameter(MIN_DIGITS_IN_INPUT, MAX_DIGITS_IN_INPUT);
const optionsForSelect = Object.values(CODE_CONFIG);

interface ICell {
  contact: IContact;
  updateContact: ({ _id, code, phone }: IContact) => void;
  deleteContact: (id: string) => void;
}

// TODO 'Take the logic and UI out of the Form and Cell into a new component'

const Cell: FC<ICell> = memo(({ contact, deleteContact, updateContact }) => {
  const [isEdit, setIsEdit] = useState(false);
  const { value: code, setValue: setCode, onChange: onChangeCode } = useSelect(contact.code);
  const {
    value: phone,
    setValue: setPhone,
    isValid: isValidPhone,
    onChange: onChangePhone,
  } = useInput({ initialValue: contact.phone, validationFunc: validationPhoneInput });

  const handlerDelete = (id: string) => {
    deleteContact(id);
  };

  const handlerUpdate = ({ _id, code, phone }: IContact) => {
    if (!isValidPhone) {
      return;
    }
    if (isEdit && (code !== contact.code || phone !== contact.phone)) {
      updateContact({ _id, code, phone });
    }
    setIsEdit((prev) => !prev);
  };

  const handlerKeyPressPhone = (event: KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case 'Enter':
        handlerUpdate({ _id: contact._id, code, phone });
        break;
      case 'Escape':
        setCode(contact.code);
        setPhone(contact.phone);
        setIsEdit(false);
        break;
      default:
        break;
    }
  };

  const FlagIcon = useMemo(() => FLAGS_ICON[contact.code].svg, [contact.code]);

  return (
    <Paper elevation={5} className={style.cell}>
      {isEdit ? (
        <Box component="form" className={style.cell__input}>
          <CustomSelect
            selectValue={code}
            changeSelectValue={onChangeCode}
            options={optionsForSelect}
          />
          <CustomInput
            inputValue={phone}
            changeInputValue={onChangePhone}
            isValid={isValidPhone}
            label={INPUT_TEXT.label}
            placeholder={INPUT_TEXT.placeholder}
            onKeyDown={handlerKeyPressPhone}
            fullWidth
          />
        </Box>
      ) : (
        <Box
          className={style.cell__text}
          onClick={() => handlerUpdate({ _id: contact._id, code, phone })}
        >
          <FlagIcon width={60} height={40} />
          <Typography component="p">
            {contact.code} {contact.phone}
          </Typography>
        </Box>
      )}

      <IconButton
        color="secondary"
        disabled={!isValidPhone}
        onClick={() => handlerUpdate({ _id: contact._id, code, phone })}
      >
        <EditIcon />
      </IconButton>
      <IconButton color="secondary" onClick={() => handlerDelete(contact._id)}>
        <DeleteForeverIcon />
      </IconButton>
    </Paper>
  );
});
export default Cell;
