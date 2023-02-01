import { ReactComponent as Flag_GR } from '../assets/flags/GR.svg';
import { ReactComponent as Flag_RU } from '../assets/flags/RU.svg';
import { ReactComponent as Flag_TR } from '../assets/flags/TR.svg';
import { CodeConfigType, CodeType, ISvg } from '../types/types';

export const CODE_CONFIG: CodeConfigType = {
  RU: '+7',
  TR: '+90',
  GR: '+30',
};

export const FLAGS_ICON: Record<CodeType, ISvg> = {
  '+7': { svg: Flag_RU },
  '+90': { svg: Flag_TR },
  '+30': { svg: Flag_GR },
};
