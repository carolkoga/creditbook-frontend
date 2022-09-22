import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider } from 'react-hook-form';

import { newLawsuitSchemaValidation } from '@validations/yup/LawsuitForm';

import { Button } from '@components/Button';
import AuthorForm from '@components/LawsuitForm/Author/Form';
import { FormLayout } from '@components/LawsuitForm/components/FormLayout';
import DefendantForm from '@components/LawsuitForm/Defendant/Form';
import DocumentForm from '@components/LawsuitForm/DocumentForm';
import ProcessInfoForm from '@components/LawsuitForm/ProcessInfo';

import { Section } from '@components/Section';

export default function NewLawsuit() {
  const methods = useForm({
    resolver: yupResolver(newLawsuitSchemaValidation),
    mode: 'all',
    reValidateMode: 'onBlur',
    defaultValues: {
      type: 'digital',
    },
  });

  function handleSubmitNewLawsuit(data: any) {
    console.log(data);
  }
  return (
    <>
      <Section.Header>
        <Section.Title as="h1" textColor="dark">Cadastrar anúncio</Section.Title>
      </Section.Header>

      <Section.Container>
        <FormProvider {...methods}>
          <FormLayout
            noValidate
            onSubmit={methods.handleSubmit(handleSubmitNewLawsuit)}
          >
            <ProcessInfoForm />
            <AuthorForm />
            <DefendantForm />
            <DocumentForm />

            <Button
              type="submit"
              disabled={!methods.formState.isValid}
            >
              Cadastrar
            </Button>
          </FormLayout>
        </FormProvider>
      </Section.Container>
    </>
  );
}
