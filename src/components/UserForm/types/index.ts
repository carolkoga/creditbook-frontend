import { UserDefaultValues } from '@type/creditbook';

export interface AllCommonType {
 formGroupDirection: 'horizontal' | 'vertical',
}

export interface FormCommonType extends AllCommonType {
 // eslint-disable-next-line no-unused-vars
  onSubmit: (data: any) => void
  loading: boolean,
  label: string,
  validation: 'register' | 'update',
  defaultValues?: UserDefaultValues
}
