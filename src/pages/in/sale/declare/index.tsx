/* eslint-disable no-case-declarations */
import { ThirdStepPaymentInformation } from '@components/pages/in/sale/declare/steps/PaymentInformation';
import { useState } from 'react';
import { LastStepEmitContractForm } from '@components/pages/in/sale/declare/steps/EmitContract';
import { SecondStepBuyer } from '@components/pages/in/sale/declare/steps/Buyer';
import { FirstStepProcess } from '@components/pages/in/sale/declare/steps/Process';
import { Button } from '@components/Button';
import { Container, Action } from '@components/pages/in/sale/declare/styles';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { declareSaleValidation } from '@validations/yup/declareSale';
import { FieldDeclareFormTypes } from '@type/creditbook/sale/declare';
import { toast } from 'react-toastify';
import { contactSale } from '@services/creditbook/contactSale/ContactSaleService';
import { useRouter } from 'next/router';
import { handleCatchErrorRequest } from '@utils/handleCatchErrorRequest';

const LAST_STEP = 2;

export default function DeclareSalePage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const methods = useForm<FieldDeclareFormTypes>({
    mode: 'all',
    resolver: yupResolver(declareSaleValidation),
    defaultValues: {
      buyer: {
        personType: 'pj',
      },
      payment: {
        paymentType: 'installments',
      },
      emitContract: '1',
    },
  });
  const { watch, trigger } = methods;
  const personType = watch('buyer.personType') as 'pj' | 'pf';
  const [isLoading, setIsLoading] = useState(false);

  async function handleWatchField() {
    if (step === 1) {
      const isValid = await trigger(['address', 'processPrice', `buyer.${personType}`, 'processInfo']);

      return isValid;
    }

    return true;
  }

  async function handleDeclareSale() {
    try {
      const isValid = await trigger();

      if (!isValid) {
        toast.error('Precisa preencher todos os campos obrigatórios');
        return;
      }

      setIsLoading(true);
      const data = methods.watch();
      await contactSale.declareSale(data);

      router.replace('/in/home');
    } catch (error) {
      handleCatchErrorRequest(error as never);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleChangeStepForm(type: 'next' | 'prev') {
    const isValidToContinue = { current: await handleWatchField() };

    if (type === 'next' && isValidToContinue.current) {
      setStep(step === LAST_STEP ? LAST_STEP : step + 1);
    }

    if (type === 'prev') {
      setStep(step === 1 ? 1 : step - 1);
    }
  }

  return (
    <FormProvider {...methods}>
      <Container onSubmit={methods.handleSubmit(handleDeclareSale)}>
        {step === 1 && (
          <>
            <FirstStepProcess />
            <br />
            <br />
            <br />
            <br />
            <SecondStepBuyer />
          </>
        )}

        {step === LAST_STEP && (
          <div style={{ width: 'auto', alignSelf: 'center' }}>
            <ThirdStepPaymentInformation />
            <LastStepEmitContractForm />
          </div>
        )}

        <Action>
          {step !== 1 && (
            <Button
              type="button"
              size="large"
              variant="white"
              onClick={() => handleChangeStepForm('prev')}
            >
              VOLTAR
            </Button>
          )}

          <Button
            type="button"
            size="large"
            isLoading={isLoading}
            onClick={step === LAST_STEP
              ? () => handleDeclareSale()
              : () => handleChangeStepForm('next')}
          >
            {step === LAST_STEP ? 'DECLARAR' : 'CONTINUAR'}
          </Button>
        </Action>
      </Container>
    </FormProvider>
  );
}
