import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider } from 'react-hook-form';

import { Button } from '@components/Button';
import { Overlay } from '@components/Overlay';
import ReactPortal from '@components/ReactPortal';

import { schemaBatchFormValidation } from '@validations/yup/Batch';
import { NewBatchParams } from '@type/creditbook/Batch';

import { Wrapper, ContentHeader } from './styled';
import BatchForm from '../BatchForm';

interface IProps {
  isVisible: boolean,
  onCloseModal: () => void,
  // eslint-disable-next-line no-unused-vars
  onCreateBatch: (data: NewBatchParams) => Promise<void>,
}

export function NewBatchFormModal({ isVisible, onCloseModal, onCreateBatch }: IProps) {
  const methods = useForm<NewBatchParams>({
    resolver: yupResolver(schemaBatchFormValidation),
    mode: 'all',
  });

  const { handleSubmit, reset, clearErrors } = methods;

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

          <FormProvider {...methods}>
            <BatchForm onSubmit={handleSubmit(stackToSubmit)}>
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
            </BatchForm>
          </FormProvider>
        </Wrapper>
      </Overlay>
    </ReactPortal>
  );
}
