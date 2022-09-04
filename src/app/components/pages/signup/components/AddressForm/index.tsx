import { useFormContext } from 'react-hook-form';

import FormGroup from '@components/FormGroup';
import { Input } from '@components/Input';
import { RegistrationParams } from '@services/creditbook/auth/types';
import CepService, { CepResponse } from '@services/cep';

import { useEffect } from 'react';
import { Fieldset } from '../Fieldset';

interface IProps {
  formGroupDirection: 'vertical' | 'horizontal'
}

export default function AddressForm({ formGroupDirection }: IProps) {
  const {
    register, formState: { errors }, watch, setValue,
  } = useFormContext<RegistrationParams>();
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

      <FormGroup
        direction={formGroupDirection}
        error={errors?.address?.cep?.message}
        label={{
          forId: 'address.cep',
          title: 'CEP',
        }}
      >
        <Input
          id="address.cep"
          inputMode="numeric"
          placeholder="95030-430"
          {...registeredFields.cep}
        />
      </FormGroup>

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
