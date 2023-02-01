import { CODE_CONFIG } from '../../constants/config';
import { CodeType } from '../../types/types';

export const INITIAL_CODE: CodeType = CODE_CONFIG.RU;
export const INITIAL_PHONE = '';
export const INPUT_TEXT = {
  label: 'Phone number',
  placeholder: 'Enter 3 to 10 digits',
};
export const BUTTON_TEXT = 'Add';
export const ERROR_ADD_TEXT = "Can't Add contact with error: ";
