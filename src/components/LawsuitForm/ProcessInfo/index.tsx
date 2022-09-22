import {
  useCallback, useEffect, useState,
} from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { Direction } from '@components/Direction';
import FormGroup from '@components/FormGroup';
import { Input } from '@components/Input';
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

import { Fieldset } from '../components/Fieldset';

type FormContextType = Pick<
  LawsuitParams, 'uf' | 'city' | 'kind' | 'processNumber' | 'processGender' | 'tribunal' | 'actionPhase'>;

export default function ProcessInfoForm() {
  const {
    control, watch, register, formState: { errors },
  } = useFormContext<FormContextType>();
  const [citiesOptions, setCitiesOptions] = useState([{ label: 'Selecione um estado', value: '' }]);
  const uf = watch('uf') as any;

  const loadCitiesOptions = useCallback(() => {
    (async () => {
      if (uf) {
        const selectUF = uf.value;
        const { data: cities } = await IBGEService.munipilitiesByUF(selectUF as keyof UFList);
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
          direction="horizontal"
          error={errors?.processNumber?.message}
          label={{
            forId: 'process-number',
            title: 'Número do processo',
          }}
        >
          <Input id="process-number" {...register('processNumber')} />
        </FormGroup>
      </Direction>

      <Direction className="wrapper--selects">
        <Controller
          name="uf"
          control={control}
          render={({ field }) => (
            <FormGroup
              direction="horizontal"
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
                {...field}
              />
            </FormGroup>
          )}
        />
      </Direction>

      <Direction className="wrapper--selects">
        <Controller
          name="city"
          control={control}
          render={({ field }) => (
            <FormGroup
              direction="horizontal"
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
      </Direction>

      <Direction className="wrapper--selects">
        <Controller
          name="tribunal"
          control={control}
          render={({ field }) => (
            <FormGroup
              direction="horizontal"
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
                instanceId="tribunal"
                className="selects"
                {...field}
              />
            </FormGroup>
          )}
        />
      </Direction>

      <Direction className="wrapper--selects">
        <Controller
          name="kind"
          control={control}
          render={({ field }) => (
            <FormGroup
              direction="horizontal"
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
                instanceId="kind"
                className="selects"
                {...field}
              />
            </FormGroup>
          )}
        />
      </Direction>

      <Direction className="wrapper--selects">
        <Controller
          name="processGender"
          control={control}
          render={({ field }) => (
            <FormGroup
              direction="horizontal"
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
                {...field}
              />
            </FormGroup>
          )}
        />
      </Direction>

      <Direction className="wrapper--selects">
        <Controller
          name="actionPhase"
          control={control}
          render={({ field }) => (
            <FormGroup
              direction="horizontal"
              error={errors?.actionPhase?.message}
              label={{
                forId: 'actionPhase',
                title: 'Fase de ação',
              }}
            >
              <Select
                options={lawsuitActionPhase}
                placeholder="Fase de ação"
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
