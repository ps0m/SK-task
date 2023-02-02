import { Response } from 'express';
import { BODY_REQ_TEXT, EXTRA_PROP_TEXT, KEY_REQ_TEXT } from './constants';
import { checkBodyType, createErrorType } from './type';

export const createError: createErrorType = (statusCode, message) => {
  return { statusCode, message };
};

export const handleError = (res: Response, err: unknown) => {
  if (err instanceof Error) {
    res.status(500).send(createError(500, err.message));
  }
};

export const checkBody: checkBodyType = (body, keys) => {
  const bodyKeys = Object.keys(body);
  if (bodyKeys.length === 0) {
    return BODY_REQ_TEXT;
  }
  for (const key of keys) {
    if (!body.hasOwnProperty(key)) {
      return `${key} ${KEY_REQ_TEXT}`;
    }
  }
  if (bodyKeys.length > keys.length) {
    const extraProps = bodyKeys.filter((prop) => !keys.includes(prop));
    return `${EXTRA_PROP_TEXT} [ ${extraProps.join(',')} ]`;
  }
  return null;
};
