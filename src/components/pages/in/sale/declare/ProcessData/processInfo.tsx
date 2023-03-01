import { Direction } from '@components/Direction';
import { InputCPForCNPJ } from '@components/Form/Input/Mask/InputCPForCNPJ';
import FormGroup from '@components/FormGroup';
import { Select, AsyncSelect } from '@components/Select';
import { UFListAsOptionSelect } from '@mocks/ReactSelectOptions/BrazilStatesInUF';
import { courtsOptions } from '@mocks/ReactSelectOptions/CourtsOptions';
import { lawsuitActionPhase } from '@mocks/ReactSelectOptions/LawsuitActionPhase';
import { lawsuitCategories } from '@mocks/ReactSelectOptions/LawsuitCategories';
import { lawsuitKind } from '@mocks/ReactSelectOptions/LawsuitKind';
import { IBGEService } from '@services/ibge';
import { UFList } from '@type/brazil/BrazilStatesInUFTypes';
import { factoryOptionReactSelect } from '@utils/factoryOptionReactSelect';
import { useCallback, useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { ProcessInfoContainer } from './styles';

export function ProcessInfo() {
  const { watch, control, formState: { errors } } = useFormContext();
  const [citiesOptions, setCitiesOptions] = useState([{ label: 'Selecione um estado', value: '' }]);
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
    <ProcessInfoContainer>
      <Direction>
        <FormGroup
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
              <InputCPForCNPJ {...field} id="processNumber" />
            )}
          />
        </FormGroup>
      </Direction>

      <div className="wrapper--selects">
        <Controller
          name="uf"
          control={control}
          render={({ field }) => (
            <FormGroup
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
          name="kind"
          control={control}
          render={({ field }) => (
            <FormGroup
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
          name="processGender"
          control={control}
          render={({ field }) => (
            <FormGroup
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
          name="actionPhase"
          control={control}
          render={({ field }) => (
            <FormGroup
              error={errors?.actionPhase?.message}
              label={{
                forId: 'actionPhase',
                title: 'Fase de ação',
              }}
            >
              <Select
                options={lawsuitActionPhase}
                placeholder="Fase de ação"
                isSearchable={false}
                id="actionPhase"
                instanceId="actionPhase"
                className="selects"
                {...field}
              />
            </FormGroup>
          )}
        />
      </div>
    </ProcessInfoContainer>
  );
}
