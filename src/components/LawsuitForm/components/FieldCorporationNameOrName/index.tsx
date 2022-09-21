import FormGroup from '@components/FormGroup';
import { InputCPForCNPJ } from '@components/Form/Input/Mask/InputCPForCNPJ';
import { forwardRef, InputHTMLAttributes } from 'react';

interface IProps extends InputHTMLAttributes<HTMLInputElement> { }

const FieldCorporationNameOrName = forwardRef(({ ...registerField }: IProps, ref) => (
  <FormGroup
    direction="horizontal"
    label={{
      forId: registerField.name as string,
      title: 'Razão social /Nome:',
    }}
  >
    <InputCPForCNPJ
      {...registerField}
      ref={ref}
      id={registerField.name}
    />
  </FormGroup>
));

export default FieldCorporationNameOrName;
