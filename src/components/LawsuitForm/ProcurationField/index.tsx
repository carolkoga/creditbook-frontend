import React from 'react';
import { useFormContext } from 'react-hook-form';
import FieldFile from '../components/FieldFile';
import { Fieldset } from '../components/Fieldset';
import { WarningMessage } from './styled';

export default function ProcurationField() {
  const { formState: { errors }, watch, register } = useFormContext();
  const [procuration, procurationUrl] = watch(['procuration', 'procurationUrl']);
  return (
    <Fieldset>
      <legend>* Procuração</legend>
      <FieldFile
        label="Anexar Procuração"
        error={errors?.procuration?.message}
        file={procuration?.[0]}
        fileName={procurationUrl}
        {...register('procuration')}
      />
      <WarningMessage>
        Atenção: A procuração deverá possuir poderes específicos para transigir,
        receber e dar quitação.
      </WarningMessage>
    </Fieldset>
  );
}
