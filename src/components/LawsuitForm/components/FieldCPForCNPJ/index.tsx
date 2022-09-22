import { Controller, useFormContext } from 'react-hook-form';

import FormGroup from '@components/FormGroup';
import { InputCPForCNPJ } from '@components/Form/Input/Mask/InputCPForCNPJ';
import { CommonFieldTypes } from '../types';

interface IProps extends CommonFieldTypes {
  name: string,
}

export default function FieldCPForCNPJ({ name, error }: IProps) {
  const { control } = useFormContext<any>();
  return (
    <Controller
      control={control}
      name={name}
      defaultValue=""
      render={({ field }) => (
        <FormGroup
          direction="horizontal"
          error={error}
          label={{
            forId: name,
            title: 'CNPJ/CPF',
          }}
        >
          <InputCPForCNPJ {...field} id={name} />
        </FormGroup>
      )}
    />
  );
}
