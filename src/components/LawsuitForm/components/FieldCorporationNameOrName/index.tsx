import FormGroup from '@components/FormGroup';
import { forwardRef, InputHTMLAttributes } from 'react';
import { Input } from '@components/Input';

interface IProps extends InputHTMLAttributes<HTMLInputElement> { }

const FieldCorporationNameOrName = forwardRef(({ ...registerField }: IProps, ref) => (
  <FormGroup
    direction="horizontal"
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
