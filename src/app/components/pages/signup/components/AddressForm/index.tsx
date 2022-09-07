import { Controller, useFormContext } from 'react-hook-form';

import FormGroup from '@components/FormGroup';
import { Input, MaskInput } from '@components/Input';
import CepService, { CepResponse } from '@services/cep';

import { useEffect } from 'react';
import { Fieldset } from '../Fieldset';

interface IProps {
  formGroupDirection: 'vertical' | 'horizontal'
}

interface FieldErrorAddress {
  address: {
    cep: string,
    uf: string,
    address: string,
    complement: string,
    number: string,
    city: string,
  }
}

export default function AddressForm({ formGroupDirection }: IProps) {
  const {
    register, formState: { errors }, watch, setValue, control,
<<<<<<< HEAD
  } = useFormContext<FieldErrorAddress>();
=======
  } = useFormContext();
>>>>>>> 0b507d00fe95416e589a2bd3423f29aba621dcf3
  const cep = watch('address.cep');

  async function setAddressValuesFromCEP() {
    if (cep?.trim().replace('-', '').length === 8) {
      const address: CepResponse = await CepService.getAddressByCep(cep);

      setValue('address.city', address.localidade);
      setValue('address.uf', address.uf);
      setValue('address.address', address.logradouro);
    }
  }

  const registeredFields = {
    cep: register('address.cep', {
      required: 'Campo obrigatório',
    }),

    uf: register('address.uf', {
      required: 'Campo obrigatório',
    }),

    number: register('address.number', {
      required: 'Campo obrigatório',
    }),

    address: register('address.address', {
      required: 'Campo obrigatório',
    }),

    city: register('address.city', {
      required: 'Campo obrigatório',
    }),

    complement: register('address.complement'),
  };

  useEffect(() => {
    setAddressValuesFromCEP();
  }, [cep]);

  return (
    <Fieldset>
      <legend>Endereço</legend>

      <Controller
        name="address.cep"
        control={control}
        render={({ field }) => (
          <FormGroup
            direction={formGroupDirection}
            error={errors?.address?.cep?.message}
            label={{
              forId: 'address.cep',
              title: 'CEP',
            }}
          >
            <MaskInput
              {...field}
              id="address.cep"
              inputMode="numeric"
              placeholder="95030-430"
              mask="00000-000"
            />
          </FormGroup>
        )}
      />

      <FormGroup
        direction={formGroupDirection}
        error={errors?.address?.uf?.message}
        label={{
          forId: 'address.uf',
          title: 'UF',
        }}
      >
        <Input
          id="address.uf"
          placeholder="RS"
          {...registeredFields.uf}
        />
      </FormGroup>

      <FormGroup
        direction={formGroupDirection}
        error={errors?.address?.city?.message}
        label={{
          forId: 'address.city',
          title: 'Cidade',
        }}
      >
        <Input
          id="address.city"
          placeholder="Caxias do Sul"
          {...registeredFields.city}
        />
      </FormGroup>

      <FormGroup
        direction={formGroupDirection}
        error={errors?.address?.address?.message}
        label={{
          forId: 'address.address',
          title: 'Endereço',
        }}
      >
        <Input
          id="address.address"
          placeholder="Rua José de Souza Brito"
          {...registeredFields.address}
        />
      </FormGroup>

      <FormGroup
        direction={formGroupDirection}
        error={errors?.address?.number?.message}
        label={{
          forId: 'address.number',
          title: 'Número',
        }}
      >
        <Input
          id="address.number"
          inputMode="numeric"
          placeholder="157"
          {...registeredFields.number}
        />
      </FormGroup>

      <FormGroup
        direction={formGroupDirection}
        error={errors?.address?.complement?.message}
        label={{
          forId: 'address.complement',
          title: 'Complemento',
        }}
      >
        <Input
          id="address.complement"
          placeholder=""
          autoComplete="false"
          {...registeredFields.complement}
        />
      </FormGroup>
    </Fieldset>
  );
}
