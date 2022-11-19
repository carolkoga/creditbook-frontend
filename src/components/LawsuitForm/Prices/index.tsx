import { InputAttributes } from 'react-number-format';
import { Controller, useFormContext } from 'react-hook-form';

import { Direction } from '@components/Direction';

import FormGroup from '@components/FormGroup';
import { InputCurrency } from '@components/Form/Input/Mask/InputCurrency';
import { Fieldset } from '../components/Fieldset';
import useLawsuitForm from '../hooks/useLawsuitForm';

interface PriceProps {
  fields?: {
    _incomeInputProps?: InputAttributes,
    _processPriceProps?: InputAttributes
  }
}

export default function Prices({ fields }: PriceProps) {
  const { control, formState: { errors } } = useFormContext();
  const { formGroupDirection } = useLawsuitForm();

  return (
    <Fieldset>
      <legend>7. Valores</legend>
      <Direction direction="horizontal">
        <Controller
          control={control}
          name="processPrice"
          render={({ field }) => (
            <FormGroup
              direction={formGroupDirection}
              label={{
                title: 'Valor estimado da ação',
                forId: 'processPrice',
              }}
              error={errors?.processPrice?.message}
            >
              <InputCurrency
                inputMode="numeric"
                id="processPrice"
                {...fields?._processPriceProps}
                {...field}
              />
            </FormGroup>
          )}
        />

        <Controller
          control={control}
          name="income"
          render={({ field }) => (
            <FormGroup
              direction={formGroupDirection}
              label={{
                title: 'Preço de venda',
                forId: 'income',
              }}
              error={errors?.income?.message}
            >
              <InputCurrency
                inputMode="numeric"
                id="income"
                {...fields?._incomeInputProps}
                {...field}
              />
            </FormGroup>
          )}
        />
      </Direction>
    </Fieldset>
  );
}

Prices.defaultProps = {
  fields: null,
};
