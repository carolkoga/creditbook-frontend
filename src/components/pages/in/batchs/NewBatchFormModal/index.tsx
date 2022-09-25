import { Button } from '@components/Button';
import FormGroup from '@components/FormGroup';
import { Input, Textarea } from '@components/Input';
import { Overlay } from '@components/Overlay';
import ReactPortal from '@components/ReactPortal';
import { useForm } from 'react-hook-form';
import { Wrapper, ContentHeader } from './styled';

interface IProps {
  isVisible: boolean,
  onCloseModal: () => void,
}

export function NewBatchFormModal({ isVisible, onCloseModal }: IProps) {
  if (!isVisible) {
    return null;
  }

  const { register } = useForm();
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

          <form>
            <FormGroup
              direction="vertical"
              label={{
                forId: 'batch-name',
                title: 'Título do lote',
              }}
            >
              <Input
                {...register('batchName')}
                id="batch-name"
              />
            </FormGroup>

            <FormGroup
              direction="vertical"
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

            <FormGroup
              direction="vertical"
              label={{
                forId: 'batch-price',
                title: 'Valor',
              }}
            >
              <Input
                {...register('price')}
                id="batch-price"
              />
            </FormGroup>

            <div className="actions">
              <Button
                type="button"
                variant="white"
                onClick={onCloseModal}
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
