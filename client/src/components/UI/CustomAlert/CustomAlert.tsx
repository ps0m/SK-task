import { Alert, AlertColor, Snackbar, SnackbarProps } from '@mui/material';
import { FC, memo } from 'react';

interface ICustomAlert {
  open: boolean;
  handleClose: (event?: React.SyntheticEvent | Event, reason?: string) => void;
  message: string;
  colorType?: AlertColor;
}

const CustomAlert: FC<ICustomAlert & SnackbarProps> = memo(
  ({ open, handleClose, message, colorType, ...arg }) => {
    const severity = colorType ? colorType : 'success';

    return (
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose} {...arg}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    );
  }
);
export default CustomAlert;
