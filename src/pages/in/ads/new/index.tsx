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
import AlertModal from '@components/AlertModal';
import AcceptNegotiation from '@components/LawsuitForm/AcceptNegotiation';
import PledgeOrGuarantee from '@components/LawsuitForm/PledgeOrGuarantee';
import OwnerOrAttorney from '@components/LawsuitForm/OwnerOrAttorney';
import Prices from '@components/LawsuitForm/Prices';

import { lawsuitService } from '@services/creditbook/lawsuit';
import { newLawsuitSchemaValidation } from '@validations/yup/LawsuitForm';

import { LawsuitParams } from '@type/creditbook/Lawsuits';
import { handleCatchErrorRequest } from '@utils/handleCatchErrorRequest';
import { commonToastProps } from '@configs/toast';

export default function NewLawsuit() {
  const [loading, setLoading] = useState(false);
  const [stepForm, setStepForm] = useState('1');
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

              <div className="left__content">
                <ProcessInfoForm />
                <AuthorForm />
                <DefendantForm />
              </div>

              <div className="right__content">
                <DocumentForm />
                <OwnerOrAttorney />
                <PledgeOrGuarantee />
                <AcceptNegotiation />
                <Prices />
                <Button
                  type="submit"
                  isLoading={loading}
                >
                  {!loading && 'Cadastrar'}
                  {loading && 'Cadastrando'}
                </Button>
              </div>
            </FormLayout>
          </LawsuitFormProvider>
        </FormProvider>
      </Section.Container>

      <AlertModal
        title="Cadastro de anúncio"
        description={`
          <p>A plataforma Creditbook disponibiliza aos anunciantes uma alternativa inovadora para dar liquidez aos processos judiciais.</p>
          <br />
          <p>
            Após o preenchimento das informações relativas ao processo que deseja negociar, milhares de interessados poderão adquirir os créditos anunciados de forma simples e rápida.
          </p>
          <br />
          <p>
            Lembre-se de manter seus anúncios constantemente atualizados para que potenciais compradores estejam cientes das condições da ação e valores envolvidos na venda.
          </p>
          <p>
            Vamos começar?
          </p>
        `}
        type="default"
        width="40%"
        confirm={{
          label: 'Entendi, continuar',
          onConfirmButton: () => setStepForm('2'),
        }}
        isVisible={stepForm === '1'}
      />

      <AlertModal
        title="O processo que será anunciado está sob segredo de justiça?"
        description={`
          <strong class="red">Atenção:</strong> Não será permitido cadastrar processos que estão sob segredo de justiça, pois devem ser mantidos em sigilo para evitar exposição pública de informações, resguardando-se a intimidades das partes ou o interesse social.
        `}
        type="default"
        width="40%"
        confirm={{
          label: 'Sim',
          onConfirmButton: () => setStepForm('3'),
        }}
        cancel={{
          label: 'Não',
          onCancelButton: () => setStepForm('0'),
        }}
        isVisible={stepForm === '2'}
      />

      <AlertModal
        title="Infelizmente não será possível cadastrar um anúncio que está sob segredo de justiça"
        description="Não será permitido cadastrar processos que estão sob segredo de justiça, pois devem ser mantidos em sigilo para evitar exposição pública de informações, resguardando-se a intimidades das partes ou o interesse social."
        type="default"
        titleColor="warning"
        width="40%"
        confirm={{
          label: 'Voltar',
          onConfirmButton: () => setStepForm('2'),
        }}
        isVisible={stepForm === '3'}
      />
    </>
  );
}
