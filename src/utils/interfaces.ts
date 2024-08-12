import { getSpecificType } from './utils';

export interface ComponentInterface {
  name: string;
  func: ComponentFunctionInterface;
}

export type ComponentFunctionInterface = (
  fingerprint: object
) => ComponentOutputInterface;

export interface ComponentOutputInterface {
  status: number;
  value?: string | number | object | boolean | null;
  type?: string;
  isTrusted?: boolean;
}

export const resolveComponent = (
  status: number,
  value?: string | number | object | boolean | null
): ComponentOutputInterface => {
  if (typeof value === 'object' && value !== null) {
    if ('status' in value) {
      throw new Error('Status already exists on the object');
    }
    for (const key in value) {
      if (typeof value[key] === 'object' && value[key] !== null) {
        value[key].status = status;
      }
    }
  }
  return {
    status: status,
    value: value,
    type: getSpecificType(value),
  };
};
