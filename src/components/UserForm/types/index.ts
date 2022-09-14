export interface AllCommonType {
 formGroupDirection: 'horizontal' | 'vertical',
}

export interface FormCommonType<Type> extends AllCommonType {
 // eslint-disable-next-line no-unused-vars
  onSubmit: (data: Type) => void
  loading: boolean,
  label: string,
  validation: 'register' | 'update'
}
