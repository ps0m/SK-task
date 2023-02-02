import { TextField, TextFieldProps } from '@mui/material';
import { ChangeEvent, FC } from 'react';

interface ICustomInput {
  inputValue: string;
  changeInputValue: (event: ChangeEvent<HTMLInputElement>) => void;
  isValid: boolean;
}

const CustomInput: FC<ICustomInput & TextFieldProps> = ({
  inputValue,
  changeInputValue,
  isValid,
  ...atr
}) => {
  return (
    <TextField
      autoFocus
      autoComplete="off"
      variant="standard"
      color="secondary"
      error={!isValid}
      value={inputValue}
      onChange={changeInputValue}
      {...atr}
    />
  );
};
export default CustomInput;
