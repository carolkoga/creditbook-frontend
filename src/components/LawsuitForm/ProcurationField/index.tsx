import React from 'react';
import { useFormContext } from 'react-hook-form';
import FieldFile from '../components/FieldFile';
import { Fieldset } from '../components/Fieldset';

export default function ProcurationField() {
  const { formState: { errors }, watch, register } = useFormContext();
  const procuration = watch('procuration');
  return (
    <Fieldset>
      <legend>8. Procuração</legend>
      <FieldFile
        label="Anexar Procuração"
        error={errors?.procuration?.message}
        file={procuration?.[0]}
        {...register('procuration')}
      />
    </Fieldset>
  );
}
