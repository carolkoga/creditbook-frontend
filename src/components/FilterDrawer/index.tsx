import { useCallback, useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import { FunnelSimple } from 'phosphor-react';
import { Drawer, Space } from 'antd';

import { Button } from '@components/Button';
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

import { filterSchemaValidation } from '@validations/yup/Filter';

import { lawsuitService } from '@services/creditbook/lawsuit';
import { batchServices } from '@services/creditbook/batch';

import { handleCatchErrorRequest } from '@utils/handleCatchErrorRequest';

import { LawsuitParams } from '@type/creditbook/Lawsuits';
import { BatchParams } from '@type/creditbook/Batch';

import { factoryOptionReactSelect } from '@utils/factoryOptionReactSelect';
import { UFList } from '@type/brazil/BrazilStatesInUFTypes';
import { IBGEService } from '@services/ibge';
import {
  Title, Header, RadioLabel, Form,
} from './styled';

export type ResponseFilterCreditsProps<T = 'batches' | 'announcements'> = {
  results: T extends 'batches' ? BatchParams[] : T extends 'announcements' ? LawsuitParams[] : unknown,
  pages: number,
}

interface IProps {
  // eslint-disable-next-line no-unused-vars
  onGetResponseResults: (data: ResponseFilterCreditsProps) => void,
  filter: 'batches' | 'announcements',
}

const rangePrice = [
  'R$ 00,00 - R$ 1.344.695,00',
  'R$ 1.344.695,00 - R$ 2.689.390,00',
  'R$ 2.689.390,00 - R$ 4.034.085,00',
  'R$ 4.034.085,00 - R$ 5.378.780,00',
  'R$ 5.378.780,00 - R$ 9.412.865,00',
  'R$ 9.412.865,00 - R$ 10.757.560,00',
  'R$ 10.757.560,00 - R$ 12.102.255,00',
  'R$ 12.102.255,00 - R$ 13.446.950,00',
];

export function FilterDrawer({ onGetResponseResults, filter }: IProps) {
  const {
    register, control, handleSubmit, watch,
  } = useForm({ resolver: yupResolver(filterSchemaValidation) });
  const [open, setOpen] = useState(false);
  const uf = watch('uf') as any;
  const [citiesOptions, setCitiesOptions] = useState([{ label: 'Selecione um estado', value: '' }]);

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

  function showDrawer() {
    setOpen(true);
  }

  function onClose() {
    setOpen(false);
  }

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
        minPrice: rangePriceSuggestion === 'none'
          ? Number(data?.minPrice?.replaceAll(/\D/g, '')) : Number(minPrice),
        maxPrice: rangePriceSuggestion === 'none'
          ? Number(data?.maxPrice?.replaceAll(/\D/g, '')) : Number(maxPrice),
      };

      const filterOptionsParse = {};
      Object.entries(filterOptions).forEach((field) => {
        const [key, value] = field;
        if (key === 'rangePriceSuggestion') return;
        if (!value) return;

        if (key === 'actors' || key === 'defendants') {
          return Object.assign(filterOptionsParse, { [key]: JSON.stringify(value) });
        }

        Object.assign(filterOptionsParse, { [key]: value });
      });

      if (filter === 'batches') {
        const response = await batchServices.list();

        onGetResponseResults({
          results: response.data.announcements,
          pages: response.data.pages,
        } as ResponseFilterCreditsProps<'batches'>);
      }

      const response = await lawsuitService.listAll({ params: filterOptionsParse });
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
      onClose();
    }
  }

  useEffect(() => {
    loadCitiesOptions();
  }, [loadCitiesOptions]);

  return (
    <>
      <Button onClick={showDrawer}>Filtro</Button>
      <Drawer
        title={(
          <Header>
            <FunnelSimple weight="bold" size={32} />
            <Title weight={600}>Filtrar</Title>
          </Header>
        )}
        open={open}
        placement="right"
        closable={false}
        key="right"
        onClose={onClose}
      >
        <Form onSubmit={handleSubmit(handleFilterCredits)}>
          <Title size={20} color="dark" weight={500}>Dados</Title>
          <Space direction="vertical" style={{ width: '100%' }}>
            <FormGroup
              label={{
                forId: 'processNumber',
                title: 'Nome do autor Principal',
              }}
            >
              <Input id="processNumber" {...register('processNumber')} />
            </FormGroup>

            <Controller
              control={control}
              name="uf"
              render={({ field }) => (
                <FormGroup
                  label={{
                    forId: 'uf',
                    title: 'Estado',
                  }}
                >
                  <Select
                    className="custom-react-select-style"
                    options={UFListAsOptionSelect}
                    placeholder="Selecione um estado"
                    {...field}
                  />
                </FormGroup>
              )}
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
                    options={courtsOptions.AC}
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
                    title: 'Categoria',
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

          <Title size={20} color="dark" weight={500}>Autores</Title>
          <Space direction="vertical" style={{ width: '100%' }}>
            <FormGroup
              label={{
                forId: 'main-author-name',
                title: 'Nome do autor Principal',
              }}
            >
              <Input id="main-author-name" {...register('actors.0.corporationNameOrName')} />
            </FormGroup>

            <Controller
              control={control}
              name="actors.0.cpfOrcnpj"
              render={({ field }) => (
                <FormGroup
                  label={{
                    forId: 'main-author-cnpj-cpf',
                    title: 'CNPJ/CPF do autor Secundário',
                  }}
                >
                  <InputCPForCNPJ
                    id="main-author-cnpj-cpf"
                    {...field}
                  />
                </FormGroup>
              )}
            />

            <FormGroup
              label={{
                forId: 'secondary-author-name',
                title: 'Nome do autor Secundário',
              }}
            >
              <Input id="secondary-author-name" {...register('actors.1.corporationNameOrName')} />
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
                  <InputCPForCNPJ
                    id="secondary-author-cnpj-cpf"
                    {...field}
                  />
                </FormGroup>
              )}
            />
          </Space>

          <Title size={20} color="dark" weight={500}>Réus</Title>
          <Space direction="vertical" style={{ width: '100%' }}>
            <FormGroup
              label={{
                forId: 'main-defendant-name',
                title: 'Nome do réu Principal',
              }}
            >
              <Input id="main-defendant-name" {...register('defendants.0.corporationNameOrName')} />
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
              <Input id="secondary-defendant-name" {...register('defendants.1.corporationNameOrName')} />
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

          <Title size={20} color="dark" weight={500}>Preço de Venda</Title>
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
      </Drawer>
    </>
  );
}
