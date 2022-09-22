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
import { Fieldset } from '../components/Fieldset';

export default function ProcessInfoForm() {
  const { control, watch, register } = useFormContext();
  const [citiesOptions, setCitiesOptions] = useState([{ label: 'Selecione o Estado', value: '' }]);
  const uf = watch('uf', null);

  const loadCitiesOptions = useCallback(() => {
    (async () => {
      if (uf?.value) {
        const { data: cities } = await IBGEService.munipilitiesByUF(uf.value);
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
          defaultValue=""
          control={control}
          render={({ field }) => (
            <FormGroup
              direction="horizontal"
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
          defaultValue=""
          control={control}
          render={({ field }) => (
            <FormGroup
              direction="horizontal"
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
          defaultValue=""
          control={control}
          render={({ field }) => (
            <FormGroup
              direction="horizontal"
              label={{
                forId: 'tribunal',
                title: 'Tribunal',
              }}
            >
              <Select
                options={uf?.value
                  // @ts-ignore
                  ? (courtsOptions[uf.value as any] as OptionType[])
                  : [{ label: 'Selecione o Estado', value: '' }]}
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
          defaultValue=""
          control={control}
          render={({ field }) => (
            <FormGroup
              direction="horizontal"
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
          defaultValue=""
          control={control}
          render={({ field }) => (
            <FormGroup
              direction="horizontal"
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
          defaultValue=""
          control={control}
          render={({ field }) => (
            <FormGroup
              direction="horizontal"
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
