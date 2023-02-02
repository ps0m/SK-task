import { FunctionComponent } from 'react';

export type CodeType = '+7' | '+90' | '+30';

export type CodeConfigType = {
  RU: CodeType;
  TR: CodeType;
  GR: CodeType;
};

export interface ISvg {
  svg: FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
}

export interface BodyContact {
  code: CodeType;
  phone: string;
}

export interface IContact extends BodyContact {
  _id: string;
}

export enum MethodForSend {
  add = 'add',
  update = 'update',
  delete = 'delete',
}

export interface MessageFromWS extends IContact {
  operation: MethodForSend;
}
