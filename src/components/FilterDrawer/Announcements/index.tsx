/* eslint-disable no-console */
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';

import { InputCPForCNPJ } from '@components/Form/Input/Mask/InputCPForCNPJ';
import { InputCurrency } from '@components/Form/Input/Mask/InputCurrency';
import FormGroup from '@components/FormGroup';
import { Input } from '@components/Input';
import { AsyncSelect, Select } from '@components/Select';

import { UFListAsOptionSelect } from '@mocks/ReactSelectOptions/BrazilStatesInUF';
import { lawsuitActionPhase } from '@mocks/ReactSelectOptions/LawsuitActionPhase';
import { lawsuitCategories } from '@mocks/ReactSelectOptions/LawsuitCategories';
import { lawsuitKind } from '@mocks/ReactSelectOptions/LawsuitKind';
import { courtsOptions } from '@mocks/ReactSelectOptions/CourtsOptions';

import { filterAnnouncementSchemaValidation } from '@validations/yup/Filter';

import { lawsuitService } from '@services/creditbook/lawsuit';

import { handleCatchErrorRequest } from '@utils/handleCatchErrorRequest';

import { LawsuitParams } from '@type/creditbook/Lawsuits';
import { BatchParams } from '@type/creditbook/Batch';

import { factoryOptionReactSelect } from '@utils/factoryOptionReactSelect';
import { IBGEService } from '@services/ibge';
import { QueriesToIndexAnnouncements, UFBrazilType } from '@type/creditbook';
import { useCallback, useEffect, useState } from 'react';
import { Space } from 'antd';
import { Button } from '@components/Button';
import { FilterDrawer } from '..';
import { Form, RadioLabel, Title } from '../styled';

export type ResponseFilterCreditsProps<T = 'batches' | 'announcements'> = {
  results: T extends 'batches'
    ? BatchParams[]
    : T extends 'announcements'
      ? LawsuitParams[]
      : unknown;
  pages: number;
};

interface IProps {
  // eslint-disable-next-line no-unused-vars
  onGetResponseResults: (
    data: ResponseFilterCreditsProps<'announcements'>
  ) => void;
  customQuery?: QueriesToIndexAnnouncements['params'];
}

const rangePrice = [
  'R$ 00,00 - R$ 50.000,00',
  'R$ 50.000,00 - R$ 100.000,00',
  'R$ 100.000,00 - R$ 300.000,00',
  'R$ 300.000,00 - R$ 500.000,00',
  'R$ 500.000,00 - R$ 700.000,00',
  'R$ 700.000,00 - R$ 1.000.000,00',
  'R$ 1.000.000,00 - R$ 10.000.000,00',
  'R$ 10.000.000,00 - R$ 20.000.000,00',
];

export function AnnouncementsFilterDrawer({
  onGetResponseResults,
  customQuery,
}: IProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { register, control, handleSubmit, setValue } = useForm({
    resolver: yupResolver(filterAnnouncementSchemaValidation),
  });
  const [uf, setUf] = useState<UFBrazilType | ''>('');
  const [citiesOptions, setCitiesOptions] = useState([
    { label: 'Selecione um estado', value: '' },
  ]);

  const loadCitiesOptions = useCallback(() => {
    (async () => {
      if (uf) {
        const { data: cities } = await IBGEService.municipalitiesByUF(uf);
        const options = cities.map((_: any, index: any, array: any) => {
          const asPath = `${index}.nome`;
          return factoryOptionReactSelect(asPath, asPath, array);
        });

        setCitiesOptions(
          [{ value: '', label: 'Selecione a cidade' }].concat(options)
        );
      }
    })();
  }, [uf]);

  async function handleFilterCredits(data: any) {
    try {
      const { rangePriceSuggestion } = data;
      const range = rangePriceSuggestion !== 'none' && rangePriceSuggestion?.split(' - ');
      const minPrice = range && range[0].replaceAll(/\D/g, '');
      const maxPrice = range && range[1].replaceAll(/\D/g, '');
      const filterOptions = {
        ...data,
        actors: JSON.stringify(data.actors),
        defendants: JSON.stringify(data.defendants),
        minPrice:
          rangePriceSuggestion === 'none'
            ? Number(data?.minPrice?.replaceAll(/\D/g, ''))
            : Number(minPrice),
        maxPrice:
          rangePriceSuggestion === 'none'
            ? Number(data?.maxPrice?.replaceAll(/\D/g, ''))
            : Number(maxPrice),
      };

      const filterOptionsParse = {};

      Object.entries(filterOptions).forEach((field) => {
        const [key, value] = field;
        if (key === 'rangePriceSuggestion') return;
        if (!value) return;

        if (key === 'actors' || key === 'defendants') {
          return Object.assign(filterOptionsParse, { [key]: value });
        }

        Object.assign(filterOptionsParse, { [key]: value });
      });

      const response = await lawsuitService.listAll({
        params: { ...filterOptionsParse, ...customQuery },
      });

      if (response.data.announcements.length <= 0) {
        return toast.info('Ops, Não há dados relacionado a suas preferências');
      }

      onGetResponseResults({
        results: response.data.announcements,
        pages: response.data.pages,
      } as ResponseFilterCreditsProps<'announcements'>);
    } catch (error) {
      handleCatchErrorRequest(error as never);
      return {
        results: [],
        pages: 0,
      };
    } finally {
      setIsOpen(false);
    }
  }

  useEffect(() => {
    loadCitiesOptions();
  }, [loadCitiesOptions]);

  return (
    <FilterDrawer
      isOpen={isOpen}
      onOpen={() => setIsOpen(true)}
      onClose={() => setIsOpen(false)}
    >
      <Form onSubmit={handleSubmit(handleFilterCredits)}>
        <Title size={20} color="dark" weight={500}>
          Dados
        </Title>
        <Space direction="vertical" style={{ width: '100%' }}>
          <FormGroup
            label={{
              forId: 'processNumber',
              title: 'Número do Processo',
            }}
          >
            <Controller
              name="processNumber"
              control={control}
              render={({ field }) => <Input {...field} id="processNumber" />}
            />
          </FormGroup>

          <Controller
            control={control}
            name="uf"
            render={
              (/* {field} */) => (
                <FormGroup
                  label={{
                    forId: 'uf',
                    title: 'Estado',
                  }}
                >
                  <Select
                    className="custom-react-select-style"
                    options={[
                      { value: '', label: 'Selecionar' },
                      ...UFListAsOptionSelect,
                    ]}
                    placeholder="Selecione um estado"
                    onChange={(value) => {
                      // @ts-ignore
                      if (value.value !== uf) {
                        setValue('city', '');
                        setValue('tribunal', '');
                      }

                      // @ts-ignore
                      setUf(value.value as UFBrazilType);
                    }}
                    // {...field}
                  />
                </FormGroup>
              )
            }
          />

          <Controller
            control={control}
            name="city"
            render={({ field }) => (
              <FormGroup
                label={{
                  forId: 'city',
                  title: 'Cidade',
                }}
              >
                <AsyncSelect
                  className="custom-react-select-style"
                  placeholder="Cidade"
                  id="city"
                  instanceId="city"
                  cacheOptions
                  isSearchable={false}
                  defaultOptions={citiesOptions}
                  loadOptions={loadCitiesOptions}
                  {...field}
                />
              </FormGroup>
            )}
          />

          <Controller
            control={control}
            name="tribunal"
            render={({ field }) => (
              <FormGroup
                label={{
                  forId: 'tribunal',
                  title: 'Tribunal',
                }}
              >
                <Select
                  className="custom-react-select-style"
                  options={[
                    { value: '', label: 'Selecione o tribunal' },
                  ].concat(uf ? courtsOptions[uf] : [])}
                  isSearchable={false}
                  placeholder="Selecione o tribunal"
                  {...field}
                />
              </FormGroup>
            )}
          />

          <Controller
            control={control}
            name="processGender"
            render={({ field }) => (
              <FormGroup
                label={{
                  forId: 'processGender',
                  title: 'Gênero',
                }}
              >
                <Select
                  className="custom-react-select-style"
                  options={lawsuitCategories}
                  isSearchable={false}
                  placeholder="Selecione uma categoria"
                  {...field}
                />
              </FormGroup>
            )}
          />

          <Controller
            control={control}
            name="kind"
            render={({ field }) => (
              <FormGroup
                label={{
                  forId: 'kind',
                  title: 'Espécie',
                }}
              >
                <Select
                  className="custom-react-select-style"
                  isSearchable={false}
                  options={lawsuitKind}
                  placeholder="Selecione um Espécie da ação"
                  {...field}
                />
              </FormGroup>
            )}
          />

          <Controller
            control={control}
            name="actionPhase"
            render={({ field }) => (
              <FormGroup
                label={{
                  forId: 'actionPhase',
                  title: 'Fase da ação',
                }}
              >
                <Select
                  className="custom-react-select-style"
                  isSearchable={false}
                  options={lawsuitActionPhase}
                  placeholder="Selecione um fase da ação"
                  {...field}
                />
              </FormGroup>
            )}
          />
        </Space>

        <Title size={20} color="dark" weight={500}>
          Autores
        </Title>
        <Space direction="vertical" style={{ width: '100%' }}>
          <FormGroup
            label={{
              forId: 'main-author-name',
              title: 'Nome do autor Principal',
            }}
          >
            <Input
              id="main-author-name"
              {...register('actors.0.corporationNameOrName')}
            />
          </FormGroup>

          <Controller
            control={control}
            name="actors.0.cpfOrcnpj"
            render={({ field }) => (
              <FormGroup
                label={{
                  forId: 'main-author-cnpj-cpf',
                  title: 'CNPJ/CPF do autor Principal',
                }}
              >
                <InputCPForCNPJ id="main-author-cnpj-cpf" {...field} />
              </FormGroup>
            )}
          />

          <FormGroup
            label={{
              forId: 'secondary-author-name',
              title: 'Nome do autor Secundário',
            }}
          >
            <Input
              id="secondary-author-name"
              {...register('actors.1.corporationNameOrName')}
            />
          </FormGroup>

          <Controller
            control={control}
            name="actors.1.cpfOrcnpj"
            render={({ field }) => (
              <FormGroup
                label={{
                  forId: 'secondary-author-cnpj-cpf',
                  title: 'CNPJ/CPF do autor Secundário',
                }}
              >
                <InputCPForCNPJ id="secondary-author-cnpj-cpf" {...field} />
              </FormGroup>
            )}
          />
        </Space>

        <Title size={20} color="dark" weight={500}>
          Réus
        </Title>
        <Space direction="vertical" style={{ width: '100%' }}>
          <FormGroup
            label={{
              forId: 'main-defendant-name',
              title: 'Nome do réu Principal',
            }}
          >
            <Input
              id="main-defendant-name"
              {...register('defendants.0.corporationNameOrName')}
            />
          </FormGroup>

          <Controller
            control={control}
            name="defendants.0.cpfOrcnpj"
            render={({ field }) => (
              <FormGroup
                label={{
                  forId: 'main-defendant-cnpj-cpf',
                  title: 'CNPJ/CPF do réu Principal',
                }}
              >
                <InputCPForCNPJ id="main-author-cnpj-cpf" {...field} />
              </FormGroup>
            )}
          />

          <FormGroup
            label={{
              forId: 'secondary-defendant-name',
              title: 'Nome do réu Secundário',
            }}
          >
            <Input
              id="secondary-defendant-name"
              {...register('defendants.1.corporationNameOrName')}
            />
          </FormGroup>

          <Controller
            control={control}
            name="defendants.1.cpfOrcnpj"
            render={({ field }) => (
              <FormGroup
                label={{
                  forId: 'secondary-defendant-cnpj-cpf',
                  title: 'CNPJ/CPF do réu Secundário',
                }}
              >
                <InputCPForCNPJ id="secondary-author-cnpj-cpf" {...field} />
              </FormGroup>
            )}
          />
        </Space>

        <Title size={20} color="dark" weight={500}>
          Preço de Venda
        </Title>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Controller
            control={control}
            name="minPrice"
            render={({ field }) => (
              <FormGroup
                label={{
                  forId: 'minPrice',
                  title: 'Preço Min.',
                }}
              >
                <InputCurrency id="min-price" {...field} />
              </FormGroup>
            )}
          />

          <Controller
            control={control}
            name="maxPrice"
            render={({ field }) => (
              <FormGroup
                label={{
                  forId: 'max-price',
                  title: 'Preço Max.',
                }}
              >
                <InputCurrency id="max-price" {...field} />
              </FormGroup>
            )}
          />
          <Space direction="vertical" style={{ width: '100%' }} size="large">
            <br />
            <Title size={16} color="dark">
              Sugestão
            </Title>

            {rangePrice.map((price) => (
              <RadioLabel key={price} htmlFor={`${price}-field`}>
                <input
                  type="radio"
                  value={price}
                  id={`${price}-field`}
                  {...register('rangePriceSuggestion')}
                />
                {price}
              </RadioLabel>
            ))}
            <RadioLabel htmlFor="none-field">
              <input
                type="radio"
                value="none"
                id="none-field"
                defaultChecked
                {...register('rangePriceSuggestion')}
              />
              Não utilizar
            </RadioLabel>
          </Space>
        </Space>

        <Button type="submit" size="large" style={{ width: '100%' }}>
          Filtrar
        </Button>
      </Form>
    </FilterDrawer>
  );
}
