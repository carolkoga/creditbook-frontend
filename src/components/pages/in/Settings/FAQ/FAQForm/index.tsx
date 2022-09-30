import { Button } from '@components/Button';
import FormGroup from '@components/FormGroup';
import { Input, Textarea } from '@components/Input';
import { Overlay } from '@components/Overlay';
import ReactPortal from '@components/ReactPortal';
import { Select } from '@components/Select';
import { yupResolver } from '@hookform/resolvers/yup';
import { FAQSchemaValidation } from '@validations/yup/FAQ';
import { Controller, useForm } from 'react-hook-form';
import { Container } from './styled';

const FAQSections = [
  {
    label: 'Creditbook',
    value: 'creditbook',
  },

  {
    label: 'Venda e Compra de Direitos Creditórios',
    value: 'vendaCompraDireitosCreditoórios',
  },

  {
    label: 'Anúncio',
    value: 'anuncio',
  },

  {
    label: 'Usuários',
    value: 'usuarios',
  },

  {
    label: 'Lotes',
    value: 'lotes',
  },

  {
    label: 'Custos',
    value: 'custos',
  },

  {
    label: 'Outras Perguntas Frequentes',
    value: 'outrasPerguntasFrequentes',
  },
];

interface IProps {
  title: string,
  // eslint-disable-next-line no-unused-vars
  onConfirmForm: (data: any) => Promise<void>,
  labelConfirm: string,
  onCancelForm: () => void,
  isVisible: boolean,
  defaultValues?: null | any,
  isLoading: boolean,
}

export default function FAQForm({
  title, onConfirmForm, labelConfirm, onCancelForm, isVisible, defaultValues, isLoading,
}: IProps) {
  const {
    register, control, handleSubmit, formState: { errors }, reset,
  } = useForm({
    resolver: yupResolver(FAQSchemaValidation),
    mode: 'onBlur',
    defaultValues: !defaultValues ? {} : defaultValues,
  });

  async function onSubmit(data: any) {
    await onConfirmForm(data);
    reset();
  }

  if (!isVisible) return null;
  return (
    <ReactPortal>
      <Overlay>
        <Container>
          <h1>{title}</h1>

          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <Controller
              control={control}
              name="section"
              render={({ field }) => (
                <FormGroup
                  direction="vertical"
                  error={errors?.section?.message}
                  label={{
                    forId: 'section',
                    title: 'Seção da Pergunta',
                  }}
                >
                  <Select
                    {...field}
                    options={FAQSections}
                    isSearchable={false}
                    placeholder="Escolha a seção da pergunta"
                  />
                </FormGroup>
              )}
            />

            <FormGroup
              direction="vertical"
              error={errors?.title?.message}
              label={{
                forId: 'title',
                title: 'Pergunta',
              }}
            >
              <Input
                {...register('title')}
                id="title"
              />
            </FormGroup>

            <FormGroup
              direction="vertical"
              error={errors?.answer?.message}
              label={{
                forId: 'answer',
                title: 'Resposta',
              }}
            >
              <Textarea
                {...register('answer')}
                id="answer"
              />
            </FormGroup>

            <div className="actions">
              <Button type="submit" isLoading={isLoading}>{labelConfirm}</Button>
              <Button
                type="button"
                variant="white"
                onClick={onCancelForm}
              >
                Cancelar
              </Button>
            </div>
          </form>
        </Container>
      </Overlay>
    </ReactPortal>
  );
}

FAQForm.defaultProps = {
  defaultValues: null,
};
