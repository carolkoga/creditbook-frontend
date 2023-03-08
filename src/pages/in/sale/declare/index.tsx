import { ThirdStepPaymentInformation } from '@components/pages/in/sale/declare/steps/PaymentInformation';
import { useReducer } from 'react';
import { LastStepEmitContractForm } from '@components/pages/in/sale/declare/steps/EmitContract';
import { SecondStepBuyer } from '@components/pages/in/sale/declare/steps/Buyer';
import { FirstStepProcess } from '@components/pages/in/sale/declare/steps/Process';
import { Button } from '@components/Button';
import { Container, Action } from '@components/pages/in/sale/declare/styles';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { declareSaleValidation } from '@validations/yup/declareSale';

const MAX_LAST_STEP = 3;

interface StepReducer {
  action: { type: 'next' | 'prev' },
  state: number,
}

function stepReducer(state: StepReducer['state'], action: StepReducer['action']) {
  if (action.type === 'next') {
    return state === MAX_LAST_STEP ? MAX_LAST_STEP : state + 1;
  }

  if (action.type === 'prev') {
    return state === 1 ? 1 : state - 1;
  }

  return state;
}

export default function DeclareSalePage() {
  const [step, dispatch] = useReducer(stepReducer, 1);
  const methods = useForm({
    mode: 'all',
    resolver: yupResolver(declareSaleValidation),
    defaultValues: {
      buyer: {
        personType: 'pj',
      },
      payment: {
        paymentType: 'installments',
      },
    },
  });

  console.log(methods.formState.errors);

  return (
    <FormProvider {...methods}>
      <Container>
        {step === 1 && (
          <FirstStepProcess />
        )}

        {step === 2 && (
          <SecondStepBuyer />
        )}

        {step === MAX_LAST_STEP && (
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
              onClick={() => dispatch({ type: 'prev' })}
            >
              VOLTAR
            </Button>
          )}

          {step !== 3 && (
            <Button
              type="button"
              size="large"
              onClick={() => dispatch({ type: 'next' })}
            >
              CONTINUAR
            </Button>
          )}

          {step === 3 && (
            <Button type="submit" size="large">DECLARAR</Button>
          )}
        </Action>
      </Container>
    </FormProvider>
  );
}
