import { ChangeEvent, useCallback, useEffect, useState } from 'react';

interface IUseInput {
  initialValue: string;
  validationFunc: (value: string) => boolean;
}

export const useInput = ({ initialValue, validationFunc }: IUseInput) => {
  const [value, setValue] = useState(initialValue);
  const [isValid, setIsValid] = useState(false);

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  useEffect(() => {
    setIsValid(validationFunc(value));
  }, [validationFunc, value]);

  return { value, setValue, isValid, onChange };
};
