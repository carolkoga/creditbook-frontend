import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

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

import { NewLawsuitParams } from '@type/creditbook/Lawsuits';
import { handleCatchErrorRequest } from '@utils/handleCatchErrorRequest';
import ProcurationField from '@components/LawsuitForm/ProcurationField';
import ModalToSelectPlan from '@components/LawsuitForm/ModalToSelectPlan';
import ChooseCreditCard from '@components/LawsuitForm/ChooseCreditCard';
import { toast } from 'react-toastify';
import { ModalResume } from '@components/LawsuitForm/ModalResume';

export default function NewLawsuit() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [stepForm, setStepForm] = useState('1');
  const methods = useForm<NewLawsuitParams>({
    resolver: yupResolver(newLawsuitSchemaValidation),
    mode: 'all',
    defaultValues: {
      plan: 'byMonth',
      type: 'digital',
      acceptNegotiation: '1',
      pledgeOrGuarantee: '1',
      ownOrAttorney: 'own',
      isFavorite: false,
      isPremium: false,
    },
  });
  const ownOrAttorneyField = methods.watch('ownOrAttorney');
  const isValidProcessPrice = !methods.formState.errors?.processPrice && methods.watch('processPrice');
  const isValidIncome = !methods.formState.errors?.income && methods.watch('income');
  const isValidToContinue = !(isValidIncome && isValidProcessPrice);
  const [plan, isPremium] = methods.watch(['plan', 'isPremium']);

  function handleNavigateToHome() {
    router.push('/');
  }

  function handleOpenModalToSelectPlan() {
    setStepForm('4');
  }

  async function handleSubmitNewLawsuit(data: any) {
    try {
      setLoading(true);

      const response = await lawsuitService.createLawsuit({
        ...data,
        isPremium: data.isPremium ? '1' : '0',
        isFavorite: data.isFavorite ? '1' : '0',
      });
      router.push(`/in/ads/${response.data.id}`);
    } catch (error) {
      handleCatchErrorRequest(error as any);
    } finally {
      setLoading(false);
    }
  }

  function handleInvalidField() {
    toast.warning('Tem campos obrigatórios faltando');
    setStepForm('0');
    methods.trigger();
    return;
  }

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
              onSubmit={methods.handleSubmit(handleSubmitNewLawsuit, handleInvalidField)}
            >

              <div className="left__content">
                <ProcessInfoForm />
                <AuthorForm />
                <DefendantForm />
              </div>

              <div className="right__content">
                <DocumentForm />
                <OwnerOrAttorney />

                {ownOrAttorneyField === 'attorney' && (
                  <ProcurationField />
                )}

                <PledgeOrGuarantee />
                <AcceptNegotiation />
                <Prices />

                <Button
                  type="button"
                  onClick={handleOpenModalToSelectPlan}
                  disabled={isValidToContinue}
                >
                  Escolher o plano
                </Button>
              </div>

              <ModalToSelectPlan isVisible={stepForm === '4'}>
                <button type="button" onClick={() => setStepForm('0')}>
                  Voltar
                </button>

                {(plan === 'byPercent' && !isPremium) && (
                  <Button onClick={() => setStepForm('6')}>
                    Resumo
                  </Button>
                )}

                {(plan !== 'byPercent' || isPremium) && (
                  <Button isLoading={loading} type="button" onClick={() => setStepForm('5')}>
                    Escolher pagamento
                  </Button>
                )}
              </ModalToSelectPlan>

              <ChooseCreditCard
                isVisible={stepForm === '5'}
                onBack={() => setStepForm('4')}
              >
                <Button onClick={() => setStepForm('6')}>
                  Resumo
                </Button>
              </ChooseCreditCard>

              <ModalResume isVisible={stepForm === '6'} onClose={() => setStepForm('0')}>
                <Button
                  isLoading={loading}
                  type="submit"
                  size="outline-filled-round"
                  disabled={!methods.formState.isValid}
                  onClick={methods.handleSubmit(handleSubmitNewLawsuit)}
                >
                  {!loading ? 'Cadastrar' : 'Cadastrando'}
                </Button>
              </ModalResume>
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
        cancel={{
          label: 'Pagina principal',
          onCancelButton: () => handleNavigateToHome(),
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
        cancel={{
          label: 'Pagina Principal',
          onCancelButton: () => handleNavigateToHome(),
        }}
        confirm={{
          label: 'Voltar',
          onConfirmButton: () => setStepForm('2'),
        }}
        isVisible={stepForm === '3'}
      />
    </>
  );
}
