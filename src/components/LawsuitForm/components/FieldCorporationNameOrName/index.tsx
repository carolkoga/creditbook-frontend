import FormGroup from '@components/FormGroup';
import { forwardRef, InputHTMLAttributes } from 'react';
import { Input } from '@components/Input';
import { CommonFieldTypes } from '../types';

interface IProps extends CommonFieldTypes, InputHTMLAttributes<HTMLInputElement>{ }

const FieldCorporationNameOrName = forwardRef(({ error, ...registerField }: IProps, ref) => (
  <FormGroup
    direction="horizontal"
    error={error}
    label={{
      forId: registerField.name as string,
      title: 'Razão social /Nome:',
    }}
  >
    <Input
      ref={ref as never}
      {...registerField}
      id={registerField.name}
    />
  </FormGroup>
));

export default FieldCorporationNameOrName;
