import {
  useCallback, useEffect, useState,
} from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { Direction } from '@components/Direction';
import FormGroup from '@components/FormGroup';
import { AsyncSelect, OptionType, Select } from '@components/Select';

import { IBGEService } from '@services/ibge';

import { factoryOptionReactSelect } from '@utils/factoryOptionReactSelect';

import { UFListAsOptionSelect } from '@mocks/ReactSelectOptions/BrazilStatesInUF';
import { lawsuitCategories } from '@mocks/ReactSelectOptions/LawsuitCategories';
import { lawsuitActionPhase } from '@mocks/ReactSelectOptions/LawsuitActionPhase';
import { lawsuitKind } from '@mocks/ReactSelectOptions/LawsuitKind';
import { courtsOptions } from '@mocks/ReactSelectOptions/CourtsOptions';

import { LawsuitParams } from '@type/creditbook/Lawsuits';
import { UFList } from '@type/brazil/BrazilStatesInUFTypes';

import { InputProcessNumber } from '@components/Form/Input/Mask/InputProcessNumber';
import { Fieldset } from '../components/Fieldset';
import useLawsuitForm from '../hooks/useLawsuitForm';

type FormContextType = Pick<
LawsuitParams, 'uf' | 'city' | 'kind' | 'processNumber' | 'processGender' | 'tribunal' | 'actionPhase'>;

export default function ProcessInfoForm() {
  const {
    control, watch, formState: { errors },
  } = useFormContext<FormContextType>();
  const [citiesOptions, setCitiesOptions] = useState([{ label: 'Selecione um estado', value: '' }]);
  const { formGroupDirection } = useLawsuitForm();
  const uf = watch('uf') as any;

  const loadCitiesOptions = useCallback(() => {
    (async () => {
      if (uf) {
        const selectUF = uf.value;
        const { data: cities } = await IBGEService.municipalitiesByUF(selectUF as keyof UFList);
        const options = cities.map((_: any, index: any, array: any) => {
          const asPath = `${index}.nome`;
          return factoryOptionReactSelect(asPath, asPath, array);
        });

        setCitiesOptions(options);
      }
    })();
  }, [uf]);

  useEffect(() => {
    loadCitiesOptions();
  }, [loadCitiesOptions]);

  return (
    <Fieldset>
      <legend>1. Dados do processo</legend>
      <Direction>
        <FormGroup
          direction={formGroupDirection}
          error={errors?.processNumber?.message}
          label={{
            forId: 'process-number',
            title: 'Número do processo',
          }}
        >
          <Controller
            name="processNumber"
            control={control}
            render={({ field }) => (
              <InputProcessNumber {...field} id="processNumber" />
            )}
          />
        </FormGroup>
      </Direction>

      <Direction className="wrapper--selects">
        <Controller
          name="uf"
          control={control}
          render={({ field }) => (
            <FormGroup
              direction={formGroupDirection}
              error={errors?.uf?.message}
              label={{
                forId: 'uf',
                title: 'Estado',
              }}
            >
              <Select
                options={UFListAsOptionSelect}
                placeholder="UF"
                id="uf"
                instanceId="uf"
                className="selects"
                isSearchable={false}
                {...field}
              />
            </FormGroup>
          )}
        />

        <Controller
          name="city"
          control={control}
          render={({ field }) => (
            <FormGroup
              direction={formGroupDirection}
              error={errors?.city?.message}
              label={{
                forId: 'city',
                title: 'Cidade',
              }}
            >
              <AsyncSelect
                {...field}
                placeholder="Cidade"
                id="city"
                instanceId="city"
                className="selects"
                cacheOptions
                isSearchable={false}
                defaultOptions={citiesOptions}
                loadOptions={loadCitiesOptions}
              />
            </FormGroup>
          )}
        />

        <Controller
          name="tribunal"
          control={control}
          render={({ field }) => (
            <FormGroup
              direction={formGroupDirection}
              error={errors?.tribunal?.message}
              label={{
                forId: 'tribunal',
                title: 'Tribunal',
              }}
            >
              <Select
                options={uf
                  // @ts-ignore
                  ? (courtsOptions[uf.value as any] as OptionType[])
                  : [{ label: 'Selecione um estado', value: '' }]}
                placeholder="Tribunal"
                id="tribunal"
                isSearchable={false}
                instanceId="tribunal"
                className="selects"
                {...field}
              />
            </FormGroup>
          )}
        />

        <Controller
          name="processGender"
          control={control}
          render={({ field }) => (
            <FormGroup
              direction={formGroupDirection}
              error={errors?.processGender?.message}
              label={{
                forId: 'processGender',
                title: 'Gênero do Processo',
              }}
            >
              <Select
                options={lawsuitCategories}
                placeholder="Gênero do Processo"
                id="processGender"
                instanceId="processGender"
                className="selects"
                isSearchable={false}
                {...field}
              />
            </FormGroup>
          )}
        />

        <Controller
          name="kind"
          control={control}
          render={({ field }) => (
            <FormGroup
              direction={formGroupDirection}
              error={errors?.kind?.message}
              label={{
                forId: 'kind',
                title: 'Espécie',
              }}
            >
              <Select
                options={lawsuitKind}
                placeholder="Espécie"
                id="kind"
                isSearchable={false}
                instanceId="kind"
                className="selects"
                {...field}
              />
            </FormGroup>
          )}
        />

        <Controller
          name="actionPhase"
          control={control}
          render={({ field }) => (
            <FormGroup
              direction={formGroupDirection}
              error={errors?.actionPhase?.message}
              label={{
                forId: 'actionPhase',
                title: 'Fase da ação',
              }}
            >
              <Select
                options={lawsuitActionPhase}
                placeholder="Fase da ação"
                isSearchable={false}
                id="actionPhase"
                instanceId="actionPhase"
                className="selects"
                {...field}
              />
            </FormGroup>
          )}
        />
      </Direction>
    </Fieldset>
  );
}
