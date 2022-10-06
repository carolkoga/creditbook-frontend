import { addMethod, mixed } from 'yup';

addMethod(mixed, 'selectOptionValue', function selectOptionValue() {
  return this.transform((option: any) => option.value);
});

addMethod(mixed, 'singleFile', function getSingleFile() {
  return this.transform((files: any) => files[0]);
});
