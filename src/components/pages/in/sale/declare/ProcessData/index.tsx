import { ErrorMessage } from '@components/FormGroup/styled';
import { FormProvider, useForm } from 'react-hook-form';
import { ProcessInfo } from './processInfo';
import { ContainerMainFormContent, LabelContainer, WrapperRadio } from './styles';

export function ProcessDataFormStep() {
  const methods = useForm({
    defaultValues: {
      personType: 'pj',
      processNumber: '',
    },
  });

  const { register, formState: { errors } } = methods;

  return (
    <FormProvider {...methods}>
      <fieldset>
        <legend>1. Dados do processo</legend>

        <WrapperRadio>
          <LabelContainer htmlFor="pj">
            <input type="radio" id="pj" value="pj" {...register('personType')} />
            Pessoa Jurídica
          </LabelContainer>

          <LabelContainer htmlFor="pf">
            <input type="radio" id="pf" value="pf" {...register('personType')} />
            Pessoa Física
          </LabelContainer>

          {errors?.personType?.message && (
            <ErrorMessage>{errors?.personType?.message}</ErrorMessage>
          )}
        </WrapperRadio>

        <ContainerMainFormContent>
          <ProcessInfo />
        </ContainerMainFormContent>
      </fieldset>
    </FormProvider>
  );
}
