import { MenuItem, Select, SelectChangeEvent, SelectProps } from '@mui/material';
import { FC, memo } from 'react';

interface ICustomSelect {
  selectValue: string;
  changeSelectValue: (event: SelectChangeEvent<string>) => void;
  options: string[];
}

const CustomSelect: FC<ICustomSelect & SelectProps> = memo(
  ({ selectValue, changeSelectValue, options }) => {
    return (
      <Select
        variant="standard"
        color="secondary"
        value={selectValue}
        onChange={changeSelectValue}
        sx={{ minWidth: 70 }}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    );
  }
);
export default CustomSelect;
