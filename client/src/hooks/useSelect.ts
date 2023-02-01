import { SelectChangeEvent } from '@mui/material';
import { useCallback, useState } from 'react';

export const useSelect = <T>(initialValue: T) => {
  const [value, setValue] = useState<T>(initialValue);

  const onChange = useCallback((event: SelectChangeEvent) => {
    const newSelect = event.target.value as T;
    setValue(newSelect);
  }, []);

  return { value, setValue, onChange };
};
