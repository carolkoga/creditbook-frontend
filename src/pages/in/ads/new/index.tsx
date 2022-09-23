import { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';

import { Button } from '@components/Button';
import { Section } from '@components/Section';

import AuthorForm from '@components/LawsuitForm/Author/Form';
import { FormLayout } from '@components/LawsuitForm/components/FormLayout';
import DefendantForm from '@components/LawsuitForm/Defendant/Form';
import DocumentForm from '@components/LawsuitForm/DocumentForm';
import ProcessInfoForm from '@components/LawsuitForm/ProcessInfo';
import { LawsuitFormProvider } from '@components/LawsuitForm/context/LawsuitFormContext';

import { lawsuitService } from '@services/creditbook/lawsuit';
import { newLawsuitSchemaValidation } from '@validations/yup/LawsuitForm';

import { LawsuitParams } from '@type/creditbook/Lawsuits';
import { handleCatchErrorRequest } from '@utils/handleCatchErrorRequest';
import { commonToastProps } from '@configs/toast';

export default function NewLawsuit() {
  const [loading, setLoading] = useState(false);
  const methods = useForm<Omit<LawsuitParams, 'batchId'>>({
    resolver: yupResolver(newLawsuitSchemaValidation),
    mode: 'all',
    reValidateMode: 'onBlur',
    defaultValues: {
      type: 'digital',
    },
  });

  async function handleSubmitNewLawsuit(data: any) {
    try {
      setLoading(true);
      await lawsuitService.createLawsuit(data);
    } catch (error) {
      setLoading(false);
      handleCatchErrorRequest(error as any);
    }
  }

  useEffect(() => {
    if (methods.formState.errors?.inicialPetition) {
      toast.error('Arquivo de PETIÇÃO INICIAL é obrigatório', commonToastProps);
    }
  }, [methods.formState.errors]);
  return (
    <>
      <Section.Header>
        <Section.Title as="h1" textColor="dark">Cadastrar anúncio</Section.Title>
      </Section.Header>

      <Section.Container>
        <FormProvider {...methods}>
          <LawsuitFormProvider>
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
                isLoading={loading}
              >
                Cadastrar
              </Button>
            </FormLayout>
          </LawsuitFormProvider>
        </FormProvider>
      </Section.Container>
    </>
  );
}
