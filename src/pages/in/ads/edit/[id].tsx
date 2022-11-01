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

import AcceptNegotiation from '@components/LawsuitForm/AcceptNegotiation';
import PledgeOrGuarantee from '@components/LawsuitForm/PledgeOrGuarantee';
import OwnerOrAttorney from '@components/LawsuitForm/OwnerOrAttorney';
import Prices from '@components/LawsuitForm/Prices';

import { LawsuitService, lawsuitService } from '@services/creditbook/lawsuit';
import { updateLawsuitSchemaValidation } from '@validations/yup/LawsuitForm';

import { LawsuitParams, UpdateLawsuitParams } from '@type/creditbook/Lawsuits';
import { handleCatchErrorRequest } from '@utils/handleCatchErrorRequest';
import ProcurationField from '@components/LawsuitForm/ProcurationField';
// import ModalToSelectPlan from '@components/LawsuitForm/ModalToSelectPlan';
import { setupAPIClient } from '@api/creditbookApi';
import { GetServerSideProps } from 'next';
import { lawsuitActionPhase } from '@mocks/ReactSelectOptions/LawsuitActionPhase';
import { courtsOptions } from '@mocks/ReactSelectOptions/CourtsOptions';
import { lawsuitKind } from '@mocks/ReactSelectOptions/LawsuitKind';
import { lawsuitCategories } from '@mocks/ReactSelectOptions/LawsuitCategories';
// import ChooseCreditCard from '@components/LawsuitForm/ChooseCreditCard';

interface IProps {
  announcement: LawsuitParams,
}

interface IPropsSelect { label: string, value: string }

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
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [stepForm, setStepForm] = useState('1');
  const methods = useForm<CustomUpdateLawsuitParams>({
    resolver: yupResolver(updateLawsuitSchemaValidation),
    mode: 'all',
    defaultValues: {
      ...announcement,
      digitalProcess: announcement.digitalProcessUrl,
      acceptNegotiation: announcement?.acceptNegotiation ? '1' : '0',
      pledgeOrGuarantee: announcement?.pledgeOrGuarantee ? '1' : '0',
      isFavorite: announcement?.isFavorite ? '1' : '0',
      isPremium: announcement?.isPremium ? '1' : '0',
      city: { label: announcement.city, value: announcement.city },
      uf: { label: announcement.uf, value: announcement.uf },
      // @ts-ignore
      tribunal: courtsOptions[announcement.uf.toUpperCase()]
        .find((court: IPropsSelect) => court.value === announcement.tribunal),
      processGender: lawsuitCategories.find(
        (category) => category.value === announcement.processGender,
      ),
      actionPhase: lawsuitActionPhase.find((action) => action.value === announcement.actionPhase),
      kind: lawsuitKind.find((currentKind) => currentKind.value === announcement.kind),
    },
  });
  // eslint-disable-next-line no-unused-vars
  const [plan, isPremium] = methods.watch(['plan', 'isPremium']);
  const ownOrAttorneyField = methods.watch('ownOrAttorney');
  const isValidToContinue = methods.watch('income');

  function handleOpenModalToSelectPlan() {
    setStepForm('4');
  }

  async function handleSubmitNewLawsuit(data: any) {
    try {
      setLoading(true);
      const response = await lawsuitService.update(data, announcement);
      router.push(`/in/ads/${response.data.id}`);
    } catch (error) {
      handleCatchErrorRequest(error as any);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
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
              </div>

              <div className="right__content">
                <DocumentForm />
                <OwnerOrAttorney />
                <PledgeOrGuarantee />
                <AcceptNegotiation />
                <Prices />
                {ownOrAttorneyField === 'attorney' && (
                  <ProcurationField />
                )}
                <Button
                  type="button"
                  onClick={handleOpenModalToSelectPlan}
                  disabled={!isValidToContinue}
                >
                  Atualizar
                </Button>
              </div>

              <Button isLoading={loading} type="submit">
                {!loading ? 'Cadastrar' : 'Cadastrando'}
              </Button>

              {/*
              <ChooseCreditCard
                isVisible={stepForm === '5'}
                onBack={() => setStepForm('4')}
                loading={loading}
                label={!loading ? 'Cadastrar' : 'Cadastrando'}
              /> */}

              {/* <ModalToSelectPlan isVisible={stepForm === '4'}>
                <button type="button" onClick={() => setStepForm('0')}>
                  Voltar
                </button>

                {(plan === 'byPercent' && isPremium === '0') && (
                  <Button isLoading={loading} type="submit">
                    {!loading ? 'Cadastrar' : 'Cadastrando'}
                  </Button>
                )}

                {(plan !== 'byPercent' || isPremium === '1') && (
                  <Button isLoading={loading} type="button" onClick={() => setStepForm('5')}>
                    Escolher pagamento
                  </Button>
                )}
              </ModalToSelectPlan> */}
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
