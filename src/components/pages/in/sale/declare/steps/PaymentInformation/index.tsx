import { InputCPForCNPJ } from '@components/Form/Input/Mask/InputCPForCNPJ';
import FormGroup from '@components/FormGroup';
import { Input } from '@components/Input';
import { Select } from '@components/Select';
import { FieldDeclareFormTypes } from '@type/creditbook/sale/declare';
import { Controller, useFormContext } from 'react-hook-form';
import { FieldsetDeclare } from '../../Fieldset';
import { LabelContainer, WrapperRadio } from '../Buyer/styled';
import { BankInfo, Content, MaxWidth } from './styled';

const paymentMethodOptions = [
  {
    label: 'PIX',
    value: 'pix',
  },

  {
    label: 'Boleto Bancário',
    value: 'boleto',
  },

  {
    label: 'Transferência bancária',
    value: 'transferencia',
  },
];

const accountTypeOptions = [
  {
    label: 'Poupança',
    value: 'poupança',
  },

  {
    label: 'Corrente',
    value: 'corrente',
  },
];

export function ThirdStepPaymentInformation() {
  const {
    register, control, formState: { errors }, watch,
  } = useFormContext<Pick<FieldDeclareFormTypes, 'payment' | 'buyer'>>();
  const paymentType = watch('payment.paymentType');

  return (
    <FieldsetDeclare title="Informações do pagamento">
      <Content>
        <div className="wrapper--select">
          <Controller
            control={control}
            name="payment.paymentMethod"
            render={({ field }) => (
              <FormGroup
                error={errors?.payment?.paymentMethod?.message}
                label={{ title: 'Pagamento', forId: 'paymentMethod' }}
              >
                <Select
                  options={paymentMethodOptions}
                  id="paymentMethod"
                  placeholder="Selecione a forma de pagamento"
                  {...field}
                />
              </FormGroup>
            )}
          />
        </div>

        <FormGroup
          error={errors?.payment?.paymentType?.message}
          label={{ title: 'Tipo de pagamento', forId: 'paymentType' }}
        >
          <WrapperRadio>
            <LabelContainer htmlFor="installments">
              <input type="radio" id="installments" value="installments" {...register('payment.paymentType')} />
              Parcelado
            </LabelContainer>

            <LabelContainer htmlFor="cash">
              <input type="radio" id="cash" value="cash" {...register('payment.paymentType')} />
              À Vista
            </LabelContainer>
          </WrapperRadio>
        </FormGroup>

        {paymentType === 'installments' && (
          <MaxWidth maxWidth={250}>
            <FormGroup
              error={errors?.payment?.installments?.message}
              label={{ title: 'Quantidade de parcelas', forId: 'qtdInstallments' }}
            >
              <Input
                type="number"
                inputMode="numeric"
                id="qtdInstallments"
                min={1}
                maxLength={2}
                {...register('payment.installments')}
              />
            </FormGroup>
          </MaxWidth>
        )}

        <BankInfo>
          <strong>Dados bancários</strong>
          <FormGroup
            error={errors?.payment?.bankInfo?.holder?.message}
            label={{ title: 'Nome do titular', forId: 'name' }}
          >
            <Input id="name" {...register('payment.bankInfo.holder')} />
          </FormGroup>

          <Controller
            control={control}
            name="payment.bankInfo.holderDocument"
            render={({ field }) => (
              <FormGroup
                error={errors?.payment?.bankInfo?.holderDocument?.message}
                label={{ title: 'Documento do titular', forId: 'holderDocument' }}
              >
                <InputCPForCNPJ id="holderDocument" {...field} />
              </FormGroup>
            )}
          />

          <div className="wrapper--select">
            <Controller
              control={control}
              name="payment.bankInfo.accountType"
              render={({ field }) => (
                <FormGroup
                  error={errors?.payment?.bankInfo?.accountType?.message}
                  label={{ title: 'Tipo de conta', forId: 'accountType' }}
                >
                  <Select
                    id="accountType"
                    options={accountTypeOptions}
                    placeholder="Selecione tipo de conta"
                    {...field}
                  />
                </FormGroup>
              )}
            />
          </div>

          <FormGroup
            error={errors?.payment?.bankInfo?.bank?.message}
            label={{ title: 'Banco', forId: 'bank' }}
          >
            <Input id="bank" {...register('payment.bankInfo.bank')} />
          </FormGroup>

          <FormGroup
            error={errors?.payment?.bankInfo?.numberAccount?.message}
            label={{ title: 'Número da conta', forId: 'number_account' }}
          >
            <Input inputMode="numeric" id="number_account" min="0" {...register('payment.bankInfo.numberAccount')} />
          </FormGroup>

          <FormGroup
            error={errors?.payment?.bankInfo?.agency?.message}
            label={{ title: 'Agẽncia', forId: 'agency' }}
          >
            <Input id="agency" inputMode="numeric" min="0" {...register('payment.bankInfo.agency')} />
          </FormGroup>
        </BankInfo>
      </Content>
    </FieldsetDeclare>
  );
}
