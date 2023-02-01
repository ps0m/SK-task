import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { MessageFromWS } from '../types/types';

export const isValidMessage = (message: MessageFromWS) => {
  return message.operation && message._id;
};

const isNumeric = (value: string) => !!Number(value);

const validationInputLength = (value: string, minValue: number, maxValue: number) =>
  value.length >= minValue && value.length <= maxValue && isNumeric(value);

export const validationInputOneParameter = (minLength: number, maxLength: number) => {
  return (value: string) => validationInputLength(value, minLength, maxLength);
};

const isFetchBaseQueryError = (error: unknown): error is FetchBaseQueryError => {
  return typeof error === 'object' && error != null && 'status' in error;
};

const isErrorWithMessage = (error: unknown): error is { message: string } => {
  return (
    typeof error === 'object' &&
    error != null &&
    'message' in error &&
    typeof error?.message === 'string'
  );
};

export const handlerFetchQueryError = (err: unknown) => {
  if (isFetchBaseQueryError(err)) {
    const errMsg = 'error' in err ? err.error : JSON.stringify(err.data);
    return errMsg;
  } else if (isErrorWithMessage(err)) {
    return err.message;
  }
  return '';
};
