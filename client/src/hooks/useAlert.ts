import { AlertColor } from '@mui/material';
import { SyntheticEvent, useCallback, useState } from 'react';

// interface IUseAlert {
//   initialValue: string;
//   validationFunc: (value: string) => boolean;
// }

export const useAlert = () => {
  const [messageAlert, setMessageAlert] = useState('');
  const [typeAlert, setTypeAlert] = useState<AlertColor>('success');

  const handleCloseAlert = useCallback((event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setMessageAlert('');
    setTypeAlert('success');
  }, []);

  return { messageAlert, setMessageAlert, typeAlert, setTypeAlert, handleCloseAlert };
};
