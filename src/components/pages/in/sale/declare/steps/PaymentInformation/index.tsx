import { InputCPForCNPJ } from '@components/Form/Input/Mask/InputCPForCNPJ';
import FormGroup from '@components/FormGroup';
import { Input } from '@components/Input';
import { Select } from '@components/Select';
import { FieldsetDeclare } from '../../Fieldset';
import { LabelContainer, WrapperRadio } from '../Buyer/styled';

export function ThirdStepPaymentInformation() {
  return (
    <FieldsetDeclare title="Informações do pagamento">
      <div>
        <FormGroup label={{ title: 'Pagamento', forId: 'paymentMethod' }}>
          <Select id="paymentMethod" />
        </FormGroup>

        <div>
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

          <FormGroup label={{ title: 'Quantidade de parcelas', forId: 'installments' }}>
            <Input type="number" inputMode="decimal" min={1} maxLength={2} />
          </FormGroup>
        </div>

        <div>
          <strong>Dados bancários</strong>
          <FormGroup label={{ title: 'Nome do titular', forId: 'name' }}>
            <Input />
          </FormGroup>

          <FormGroup label={{ title: 'CPF do titular', forId: 'cpf' }}>
            <InputCPForCNPJ maxLength={14} />
          </FormGroup>

          <FormGroup label={{ title: 'Tipo de conta', forId: 'accountType' }}>
            <Select id="accountType" />
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
        </div>
      </div>
    </FieldsetDeclare>
  );
}
