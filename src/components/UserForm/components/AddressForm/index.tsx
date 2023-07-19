import { useCallback, useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import FormGroup from '@components/FormGroup';
import { Input, MaskInput } from '@components/Input';
import { RegistrationParams } from '@type/creditbook/auth/register';
import { cepService } from '@services/cep';

import { AllCommonType } from '@components/UserForm/types';
import { Select } from '@components/Select';
import { UFListAsOptionSelect } from '@mocks/ReactSelectOptions/BrazilStatesInUF';
import { IBGEService } from '@services/ibge';
import { UFList } from '@type/brazil/BrazilStatesInUFTypes';
import { Fieldset } from '../Fieldset';

export default function AddressForm({ formGroupDirection }: AllCommonType) {
  const [citiesOptions, setCitiesOptions] = useState([{ label: 'Selecione um estado', value: '' }]);

  const {
    register, formState: { errors }, watch, setValue, control,
  } = useFormContext<RegistrationParams<'person'>>();
  const cep = watch('address.cep');
  const uf = watch('address.uf') as any;

  const loadCityOptionsByUf = useCallback(async () => {
    if (uf) {
      const selectedUf = uf.value;

      const { data: cities } = await IBGEService.municipalitiesByUF(selectedUf as keyof UFList);

      const options = cities.map((city: { nome: string }) => ({
        label: city.nome,
        value: city.nome,
      }));

      setCitiesOptions(options);
    }
  }, [uf]);

  async function setAddressValuesFromCEP() {
    if (cep?.trim().replace('-', '').length === 8) {
      const { data: address } = await cepService.getAddressByCep(cep);

      setValue('address.city', { label: address.localidade, value: address.localidade } as any);
      setValue('address.uf', { label: address.uf, value: address.uf } as any);
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

  useEffect(() => {
    loadCityOptionsByUf();
  }, [loadCityOptionsByUf]);

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
              placeholder=" "
              mask="00000-000"
            />
          </FormGroup>
        )}
      />

      {/* <Select
          id="address.uf"
          placeholder=" "
          {...registeredFields.uf}
        /> */}
      <FormGroup
        direction={formGroupDirection}
        error={errors?.address?.uf?.message}
        label={{
          forId: 'address.uf',
          title: 'UF',
        }}
      >

        <Controller
          name="address.uf"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              options={UFListAsOptionSelect}
              placeholder="UF"
              id="uf"
              instanceId="uf"
              className="selects"
              isSearchable={false}
            />

          )}
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
        <Controller
          name="address.city"
          control={control}
          render={({ field }) => (

            <Select
              {...field}
              placeholder="Cidade"
              id="city"
              instanceId="city"
              className="selects"
              isSearchable={false}
              options={citiesOptions}
            />

          )}
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
          placeholder=" "
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
          placeholder=" "
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
          placeholder=" "
          autoComplete="false"
          {...registeredFields.complement}
        />
      </FormGroup>
    </Fieldset>
  );
}
