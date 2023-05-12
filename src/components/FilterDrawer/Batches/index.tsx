import { Button } from '@components/Button';
import { InputCurrency } from '@components/Form/Input/Mask/InputCurrency';
import FormGroup from '@components/FormGroup';
import { Input } from '@components/Input';
import { batchServices } from '@services/creditbook/batch';
import { QueriesToIndexBatches } from '@type/creditbook';
import { BatchParams } from '@type/creditbook/Batch';
import { handleCatchErrorRequest } from '@utils/handleCatchErrorRequest';
import { Space } from 'antd';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FilterDrawer } from '..';
import { Form, Title } from '../styled';

interface BatchesFilterFields {
  text?: string;
  minValue?: string;
  maxValue?: string;
  announcementQuantity?: number
}

export type ResponseFilterBatchesProps = {
  results: BatchParams[]
};

interface IProps {
  // eslint-disable-next-line no-unused-vars
  onGetResponseResults: (data: ResponseFilterBatchesProps) => void,
  customQuery?: QueriesToIndexBatches['params'],
}

export function BatchesFilterDrawer({ onGetResponseResults, customQuery }: IProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { register, handleSubmit, control } = useForm<BatchesFilterFields>();

  async function handleFilterBatches(data: BatchesFilterFields) {
    try {
      const filterOptions = {
        ...data,
        minValue: data.minValue && Number(data?.minValue?.replaceAll(/\D/g, '')),
        maxValue: data.maxValue && Number(data?.maxValue?.replaceAll(/\D/g, '')),
      };

      const filterOptionsParse: QueriesToIndexBatches['params'] = {};
      Object.entries(filterOptions).forEach((field) => {
        const [key, value] = field;

        if (!value) return;

        Object.assign(filterOptionsParse, { [key]: value });
      });

      const { data: batches } = await batchServices.list({
        params: { ...filterOptionsParse, ...customQuery },
      });

      onGetResponseResults({
        results: batches,
      });
    } catch (error) {
      handleCatchErrorRequest(error as never);
      return {
        results: [],
      };
    } finally {
      setIsOpen(false);
    }
  }

  return (
    <FilterDrawer
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      onOpen={() => setIsOpen(true)}
    >
      <Form onSubmit={handleSubmit(handleFilterBatches)}>
        <Title size={20} color="dark" weight={500}>Dados</Title>

        <Space direction="vertical" style={{ width: '100%' }}>
          <FormGroup
            label={{
              forId: 'batch-name',
              title: 'Nome',
            }}
          >
            <Input id="batch-name" {...register('text')} />
          </FormGroup>

          <FormGroup
            label={{
              forId: 'min-vale-input',
              title: 'Valor mínimo',
            }}
          >
            <Controller
              name="minValue"
              control={control}
              render={({ field }) => (
                <InputCurrency id="min-vale-input" {...field} />
              )}
            />
          </FormGroup>

          <FormGroup
            label={{
              forId: 'max-vale-input',
              title: 'Valor máximo',
            }}
          >
            <Controller
              name="maxValue"
              control={control}
              render={({ field }) => (
                <InputCurrency id="max-vale-input" {...field} />
              )}
            />
          </FormGroup>

          <FormGroup
            label={{
              forId: 'announcements-quantity-input',
              title: 'Quantidade de anúncios',
            }}
          >
            <Input
              type="number"
              {...register('announcementQuantity', {
                valueAsNumber: true,
              })}
              min={0}
            />
          </FormGroup>
        </Space>

        <Button type="submit" size="large" style={{ width: '100%' }}>
          Filtrar
        </Button>
      </Form>
    </FilterDrawer>
  );
}
