import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';

import { Button } from '@components/Button';
import FormGroup from '@components/FormGroup';
import { Input, Textarea } from '@components/Input';
import { Overlay } from '@components/Overlay';
import ReactPortal from '@components/ReactPortal';

import { schemaBatchFormValidation } from '@validations/yup/Batch';
import { InputCurrency } from '@components/Form/Input/Mask/InputCurrency';
import { NewBatchParams } from '@type/creditbook/Batch';

import { Wrapper, ContentHeader } from './styled';

interface IProps {
  isVisible: boolean,
  onCloseModal: () => void,
  // eslint-disable-next-line no-unused-vars
  onCreateBatch: (data: NewBatchParams) => Promise<void>,
}

export function NewBatchFormModal({ isVisible, onCloseModal, onCreateBatch }: IProps) {
  const {
    register, formState: { errors }, handleSubmit, control, reset, clearErrors,
  } = useForm<NewBatchParams>({
    resolver: yupResolver(schemaBatchFormValidation),
    mode: 'all',
  });

  if (!isVisible) {
    return null;
  }

  async function stackToSubmit(newBatch: NewBatchParams) {
    try {
      await onCreateBatch(newBatch);
    } catch {
      clearErrors();
    } finally {
      reset();
    }
  }

  function stackToCloseModal() {
    onCloseModal();
    reset();
    clearErrors();
  }

  return (
    <ReactPortal>
      <Overlay>
        <Wrapper>
          <ContentHeader>
            <strong>Adicionar Lote</strong>
            <p>
              Lotes são pacotes de anúncios com um valor fixo.
              Você terá a opção de incluir diversos anúncios que serão
              anunciados e vendidos em conjunto.
            </p>

            <div>
              <small>Para cadastrar um lote é bem simples:</small>
              <ol>
                <li>Passo 1 - Inserir  um título e uma descrição para o lote</li>
                <li>Passo 2 - Inserir o valor pelo qual o lote será vendido</li>
                <li>Passo 3 - Salvar</li>
              </ol>
            </div>
          </ContentHeader>

          <form noValidate onSubmit={handleSubmit(stackToSubmit)}>
            <FormGroup
              direction="vertical"
              error={errors?.name?.message}
              label={{
                forId: 'batch-name',
                title: 'Título do lote',
              }}
            >
              <Input
                {...register('name')}
                id="batch-name"
              />
            </FormGroup>

            <FormGroup
              direction="vertical"
              error={errors?.description?.message}
              label={{
                forId: 'batch-description',
                title: 'Descrição',
              }}
            >
              <Textarea
                {...register('description')}
                id="batch-description"
              />
            </FormGroup>

            <Controller
              control={control}
              name="value"
              defaultValue=""
              render={({ field }) => (
                <FormGroup
                  direction="vertical"
                  error={errors?.value?.message}
                  label={{
                    forId: 'value',
                    title: 'Valor',
                  }}
                >
                  <InputCurrency
                    id="value"
                    {...field}
                  />
                </FormGroup>
              )}
            />

            <div className="actions">
              <Button
                type="button"
                variant="white"
                onClick={stackToCloseModal}
              >
                Cancelar
              </Button>
              <Button type="submit">Salvar</Button>
            </div>
          </form>
        </Wrapper>
      </Overlay>
    </ReactPortal>
  );
}
