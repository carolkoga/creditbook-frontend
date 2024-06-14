/* eslint-disable max-len */
import { useCallback, useEffect, useState } from 'react';
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

import AcceptNegotiation from '@components/LawsuitForm/AcceptNegotiation';
import PledgeOrGuarantee from '@components/LawsuitForm/PledgeOrGuarantee';
import OwnerOrAttorney from '@components/LawsuitForm/OwnerOrAttorney';
import Prices from '@components/LawsuitForm/Prices';

import { LawsuitService, lawsuitService } from '@services/creditbook/lawsuit';
import { updateLawsuitSchemaValidation } from '@validations/yup/LawsuitForm';

import { LawsuitParams, UpdateLawsuitParams } from '@type/creditbook/Lawsuits';
import { handleCatchErrorRequest } from '@utils/handleCatchErrorRequest';
import ProcurationField from '@components/LawsuitForm/ProcurationField';
import ModalToSelectPlan from '@components/LawsuitForm/ModalToSelectPlan';

import { lawsuitActionPhase } from '@mocks/ReactSelectOptions/LawsuitActionPhase';
import { courtsOptions } from '@mocks/ReactSelectOptions/CourtsOptions';
import { lawsuitKind } from '@mocks/ReactSelectOptions/LawsuitKind';
import { lawsuitCategories } from '@mocks/ReactSelectOptions/LawsuitCategories';
import ChooseCreditCard from '@components/LawsuitForm/ChooseCreditCard';
import { Direction } from '@components/Direction';
import FloatWarning from '@components/FloatWarning';
import FloatWarningContainer from '@components/FloatWarning/FloatWarningContainer';
import CreditCardFieldset from '@components/LawsuitForm/CreditCardFieldset';
import MyPlanCleanCard from '@components/pages/in/Settings/MyPlanCard/clean';
import { Fieldset } from '@components/LawsuitForm/components/Fieldset';
import { GetServerSideProps } from 'next';
import { setupAPIClient } from '@api/creditbookApi';
import { UFBrazilType } from '@type/creditbook';
import { toast } from 'react-toastify';

interface IPropsSelect { label: string, value: string }

interface IProps {
  announcement: LawsuitParams
}

interface CustomUpdateLawsuitParams extends Omit<UpdateLawsuitParams,
| 'tribunal'
| 'uf'
| 'city'
| 'actionPhase'
| 'kind'
| 'processGender'
> {
  tribunal: IPropsSelect;
  city: IPropsSelect;
  uf: IPropsSelect;
  processGender: IPropsSelect;
  actionPhase: IPropsSelect;
  kind: IPropsSelect;
}

export default function EditLawsuitByIdPage({ announcement }: IProps) {
  const [loading, setLoading] = useState(false);
  const [premium, setPremium] = useState<'add' | 'remove' | null>(null);
  const [stepForm, setStepForm] = useState('none');
  const router = useRouter();

  const methods = useForm<CustomUpdateLawsuitParams>({
    resolver: yupResolver(updateLawsuitSchemaValidation),
    mode: 'onBlur',
  });

  const [plan, isPremium] = methods.watch(['plan', 'isPremium']);
  const ownOrAttorneyField = methods.watch('ownOrAttorney');

  function handlePremiumToggle() {
    console.log('oi');

    if (premium === 'add' || premium === 'remove') {
      setPremium(null);
    } else {
      if (isPremium) {
        setPremium('remove');
      }

      if (!isPremium) {
        setPremium('add');
      }
    }
  }

  const setDefaultInformationToForm = useCallback(() => {
    methods.reset({
      ...announcement,
      digitalProcess: announcement.digitalProcessUrl,
      acceptNegotiation: Number(announcement?.acceptNegotiation) ? '1' : '0',
      pledgeOrGuarantee: Number(announcement?.pledgeOrGuarantee) ? '1' : '0',
      isFavorite: announcement?.isFavorite,
      isPremium: announcement?.isPremium,
      city: { label: announcement.city, value: announcement.city },
      uf: { label: announcement.uf, value: announcement.uf },
      tribunal: courtsOptions[announcement.uf?.toUpperCase() as UFBrazilType]
        .find((court: IPropsSelect) => court.value === announcement.tribunal),
      processGender: lawsuitCategories.find(
        (category) => category.value === announcement.processGender,
      ),
      actionPhase: lawsuitActionPhase.find((action) => action.value === announcement.actionPhase),
      kind: lawsuitKind.find((currentKind) => currentKind.value === announcement.kind),
    });
  }, []);

  function handleBackPrevModalChooseCreditCard() {
    setStepForm((oldStep) => (oldStep === 'credit-card-plan' ? 'select-plan' : 'none'));
  }

  function handleOpenChooseCreditCardModal() {
    setStepForm((oldStep) => (oldStep === 'select-plan' ? 'credit-card-plan' : 'credit-card'));
  }

  function handleCloseModal() {
    setStepForm('none');
  }

  async function handleSubmitNewLawsuit(data: any) {
    try {
      setLoading(true);
      const response = await lawsuitService.update({ ...data, premium }, announcement);
      router.push(`/in/ads/${response.data.id}`);

      if (data.paymentMethodId) {
        toast.success('seu pagamento será processado!');
      }
    } catch (error) {
      handleCatchErrorRequest(error as any);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setDefaultInformationToForm();
  }, [setDefaultInformationToForm]);

  return (
    <>
      <FloatWarningContainer
        isVisible={!!announcement?.paymentFailed || !announcement.overSixMonths}
      >
        <FloatWarning
          isVisible={!announcement.overSixMonths}
          _alertProps={{
            type: 'info',
            message: 'Só poderá mudar de plano ou valor do processo após 6 meses',
            closable: true,
          }}
        />

        <FloatWarning
          isVisible={!!announcement?.paymentFailed}
          _alertProps={{
            type: 'warning',
            message: 'Pagamento não foi processado',
            description: 'O anúncio vai parar de ser anunciado na plataforma até realização do pagamento.',
            closable: true,
          }}
        />
      </FloatWarningContainer>

      <Section.Header>
        <Button variant="white" size="small-large" onClick={() => router.back()}>
          Voltar
        </Button>
        <Section.Title as="h1" textColor="dark">Atualizar anúncio</Section.Title>
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
                <DocumentForm />
              </div>

              <div className="right__content">
                <OwnerOrAttorney />
                <PledgeOrGuarantee />
                <AcceptNegotiation />
                <Prices
                  fields={{
                    _incomeInputProps: { disabled: !announcement.overSixMonths },
                    _processPriceProps: { disabled: !announcement.overSixMonths },
                  }}
                />

                {ownOrAttorneyField === 'attorney' && (
                  <ProcurationField />
                )}

                <CreditCardFieldset
                  isVisible={announcement.plan !== 'batch'}
                  onOpenChooseCreditCardModal={handleOpenChooseCreditCardModal}
                  creditCard={announcement.paymentMethod}
                />

                <Fieldset style={{ width: '100%' }}>
                  <legend>Plano</legend>
                  <MyPlanCleanCard
                    planMode={plan}
                    onPremiumToggleClick={handlePremiumToggle}
                    plan={announcement.planInfo}
                    isPremium={isPremium}
                    premiumState={premium}
                  />
                </Fieldset>

                <Direction gap="12px">
                  <Button isLoading={loading} type="button" onClick={methods.handleSubmit(handleSubmitNewLawsuit)}>
                    {!loading ? 'Atualizar' : 'Atualizando'}
                  </Button>
                </Direction>
              </div>

              <ChooseCreditCard
                isVisible={stepForm === 'credit-card' || stepForm === 'credit-card-plan'}
                onBack={() => handleBackPrevModalChooseCreditCard()}
                onNewCard={() => {}}
              >
                <Button isLoading={loading} type="button" onClick={handleBackPrevModalChooseCreditCard}>
                  {!loading ? 'Atualizar' : 'Atualizando'}
                </Button>
              </ChooseCreditCard>

              <ModalToSelectPlan isVisible={stepForm === 'select-plan'}>
                <button type="button" onClick={handleCloseModal}>
                  Voltar
                </button>

                {(plan === 'byPercent' && !isPremium) && (
                  <Button isLoading={loading} type="submit">
                    {!loading ? 'Cadastrar' : 'Cadastrando'}
                  </Button>
                )}

                {((plan !== 'byPercent' || isPremium)) && (
                  <Button isLoading={loading} type="button" onClick={() => handleOpenChooseCreditCardModal()}>
                    Escolher pagamento
                  </Button>
                )}
              </ModalToSelectPlan>
            </FormLayout>
          </LawsuitFormProvider>
        </FormProvider>
      </Section.Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
  const api = setupAPIClient(req.cookies['nextauth.token']);
  const announcementServices = new LawsuitService(api);
  const { data } = await announcementServices.getById(query.id as string);

  return {
    props: {
      announcement: data,
    },
  };
};
