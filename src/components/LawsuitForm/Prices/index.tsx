import { Controller, useFormContext } from 'react-hook-form';

import { Direction } from '@components/Direction';

import FormGroup from '@components/FormGroup';
import { InputCurrency } from '@components/Form/Input/Mask/InputCurrency';
import { Fieldset } from '../components/Fieldset';
import useLawsuitForm from '../hooks/useLawsuitForm';

export default function Prices() {
  const { control } = useFormContext();
  const { formGroupDirection } = useLawsuitForm();

  return (
    <Fieldset>
      <legend>7. Valores</legend>
      <Direction direction="horizontal">
        <Controller
          control={control}
          name="ownOrAttorney"
          render={({ field }) => (
            <FormGroup
              direction={formGroupDirection}
              label={{
                title: 'Valor estimado da ação',
                forId: 'processPrice',
              }}
            >
              <InputCurrency
                inputMode="numeric"
                id="own"
                {...field}
              />
            </FormGroup>
          )}
        />

        <Controller
          control={control}
          name="ownOrAttorney"
          render={({ field }) => (
            <FormGroup
              direction={formGroupDirection}
              label={{
                title: 'Preço de venda',
                forId: 'income',
              }}
            >
              <InputCurrency
                inputMode="numeric"
                id="attorney"
                {...field}
              />
            </FormGroup>
          )}
        />
      </Direction>
    </Fieldset>
  );
}
