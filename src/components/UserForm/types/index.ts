import { UserDefaultValues } from '@type/creditbook';

export interface AllCommonType {
  formGroupDirection: 'horizontal' | 'vertical',
}

export interface FormCommonType extends AllCommonType {
  onSubmit: () => void,
  loading: boolean,
  label: string,
  validation: 'register' | 'update',
  defaultValues?: UserDefaultValues
}
