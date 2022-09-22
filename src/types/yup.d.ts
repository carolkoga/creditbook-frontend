/* eslint-disable no-unused-vars */
import { AnyObject, Maybe } from 'yup/lib/types';
import * as yup from 'yup';

declare module 'yup' {
  interface StringSchema<
    TType extends Maybe<string> = string | undefined,
    TContext extends AnyObject = AnyObject,
    TOut extends TType = TType,
  > extends yup.BaseSchema<TType, TContext, TOut> {
    cpfOrcnpj(messageError?: string): StringSchema<TType, TContext>;
  }

  interface MixedSchema extends yup.BaseSchema {
    selectValueOption(): MixedSchema;
  }
}
