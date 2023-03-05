import { InputCPForCNPJ } from '@components/Form/Input/Mask/InputCPForCNPJ';
import FormGroup from '@components/FormGroup';
import { Input } from '@components/Input';
import { Select } from '@components/Select';
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
  return (
    <FieldsetDeclare title="Informações do pagamento">
      <Content>
        <FormGroup label={{ title: 'Pagamento', forId: 'paymentMethod' }}>
          <Select options={paymentMethodOptions} id="paymentMethod" placeholder="Selecione a forma de pagamento" />
        </FormGroup>

        <FormGroup label={{ title: 'Metódo de pagamento', forId: 'paymentStyle' }}>
          <WrapperRadio>
            <LabelContainer htmlFor="1">
              <input type="radio" id="1" value="1" name="paymentStyle" checked />
              Parcelado
            </LabelContainer>

            <LabelContainer htmlFor="0">
              <input type="radio" id="0" value="0" name="paymentStyle" />
              À Vista
            </LabelContainer>
          </WrapperRadio>
        </FormGroup>

        <MaxWidth maxWidth={250}>
          <FormGroup label={{ title: 'Quantidade de parcelas', forId: 'installments' }}>
            <Input type="number" inputMode="decimal" min={1} maxLength={2} />
          </FormGroup>
        </MaxWidth>

        <BankInfo>
          <strong>Dados bancários</strong>
          <FormGroup label={{ title: 'Nome do titular', forId: 'name' }}>
            <Input />
          </FormGroup>

          <FormGroup label={{ title: 'CPF do titular', forId: 'cpf' }}>
            <InputCPForCNPJ maxLength={14} />
          </FormGroup>

          <FormGroup label={{ title: 'Tipo de conta', forId: 'accountType' }}>
            <Select id="accountType" options={accountTypeOptions} placeholder="Selecione tipo de conta" />
          </FormGroup>

          <FormGroup label={{ title: 'Banco', forId: 'bank' }}>
            <Input />
          </FormGroup>

          <FormGroup label={{ title: 'Número da conta', forId: 'number_account' }}>
            <Input type="number" inputMode="decimal" />
          </FormGroup>

          <FormGroup label={{ title: 'Agẽncia', forId: 'number_bank' }}>
            <Input type="number" inputMode="decimal" />
          </FormGroup>
        </BankInfo>
      </Content>
    </FieldsetDeclare>
  );
}
