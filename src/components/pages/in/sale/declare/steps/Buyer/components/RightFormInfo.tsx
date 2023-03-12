import { InputCurrency } from '@components/Form/Input/Mask/InputCurrency';
import FormGroup from '@components/FormGroup';
import { Input, MaskInput } from '@components/Input';
import { FieldDeclareFormTypes } from '@type/creditbook/sale/declare';
import { useCallback, useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { cepService } from '@services/cep';
import { Row } from './styled';

type FieldValues = Pick<FieldDeclareFormTypes, 'address' | 'processPrice'>;

export function RightFormInfo() {
  const {
    register, control, formState: { errors }, watch, reset,
  } = useFormContext<FieldValues>();

  const findAddressByCEP = useCallback(async () => {
    const cep = watch('address.cep');
    if (cep?.length === 9) {
      const { data } = await cepService.getAddressByCep(cep);

      reset({
        ...watch(),
        address: {
          address: data.logradouro,
          city: data.localidade,
          uf: data.uf,
          cep: data.cep,
        },
      }, { keepDefaultValues: true });
    }
  }, [watch('address.cep')]);

  useEffect(() => {
    findAddressByCEP();
  }, [findAddressByCEP]);

  return (
    <div>
      <h2>Endereço</h2>

      <Row>
        <div className="cep">
          <Controller
            control={control}
            name="address.cep"
            render={({ field }) => (
              <FormGroup
                error={errors?.address?.cep?.message}
                label={{
                  forId: 'address.cep',
                  title: 'CEP',
                }}
              >
                <MaskInput
                  id="address.cep"
                  inputMode="numeric"
                  placeholder=" "
                  mask="00000-000"
                  {...field}
                />
              </FormGroup>
            )}
          />
        </div>

        <FormGroup
          error={errors?.address?.address?.message}
          label={{
            forId: 'address.address',
            title: 'Endereço',
          }}
        >
          <Input
            id="address.address"
            placeholder=" "
            {...register('address.address')}
          />
        </FormGroup>

      </Row>

      <FormGroup
        error={errors?.address?.city?.message}
        label={{
          forId: 'address.city',
          title: 'Cidade',
        }}
      >
        <Input
          id="address.city"
          placeholder=" "
          {...register('address.city')}
        />
      </FormGroup>

      <Row>
        <FormGroup
          error={errors?.address?.number?.message}
          label={{
            forId: 'address.number',
            title: 'Número',
          }}
        >
          <Input
            id="address.number"
            inputMode="numeric"
            placeholder=" "
            {...register('address.number')}
          />
        </FormGroup>

        <FormGroup
          error={errors?.address?.uf?.message}
          label={{
            forId: 'address.uf',
            title: 'UF',
          }}
        >
          <Input
            id="address.uf"
            placeholder=" "
            {...register('address.uf')}
            maxLength={2}
          />
        </FormGroup>
      </Row>

      <FormGroup
        error={errors?.address?.complement?.message}
        label={{
          forId: 'address.complement',
          title: 'Complemento',
        }}
      >
        <Input
          id="address.complement"
          placeholder=" "
          autoComplete="false"
          {...register('address.complement')}
        />
      </FormGroup>

      <Controller
        control={control}
        name="processPrice"
        render={({ field }) => (
          <FormGroup
            error={errors?.processPrice?.message}
            label={{
              forId: 'price',
              title: 'Valor de venda da ação',
            }}
          >
            <InputCurrency id="price" {...field} />
          </FormGroup>
        )}
      />
    </div>
  );
}
