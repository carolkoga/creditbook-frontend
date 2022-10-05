import { Controller, useFormContext } from 'react-hook-form';

import FormGroup from '@components/FormGroup';
import { Input, Textarea } from '@components/Input';
import { InputCurrency } from '@components/Form/Input/Mask/InputCurrency';
import { NewBatchParams } from '@type/creditbook/Batch';
import { ReactNode } from 'react';

interface IProps {
  children?: ReactNode,
  onSubmit: () => Promise<void>,
}

export default function BatchForm({ children, onSubmit }: IProps) {
  const {
    register, formState: { errors }, control,
  } = useFormContext<NewBatchParams>();

  return (
    <form noValidate onSubmit={onSubmit}>
      <FormGroup
        direction="vertical"
        error={errors?.name?.message}
        label={{
          forId: 'batch-name',
          title: 'Título do lote',
        }}
      >
        <Input
          {...register('name')}
          id="batch-name"
        />
      </FormGroup>

      <FormGroup
        direction="vertical"
        error={errors?.description?.message}
        label={{
          forId: 'batch-description',
          title: 'Descrição',
        }}
      >
        <Textarea
          {...register('description')}
          id="batch-description"
        />
      </FormGroup>

      <Controller
        control={control}
        name="value"
        defaultValue=""
        render={({ field }) => (
          <FormGroup
            direction="vertical"
            error={errors?.value?.message}
            label={{
              forId: 'value',
              title: 'Valor',
            }}
          >
            <InputCurrency
              id="value"
              {...field}
            />
          </FormGroup>
        )}
      />

      {children}
    </form>
  );
}

BatchForm.defaultProps = {
  children: null,
};
