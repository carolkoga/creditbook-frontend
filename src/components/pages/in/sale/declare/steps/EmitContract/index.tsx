import { FieldsetDeclare } from '../../Fieldset';
import { LabelContainer, WrapperRadio } from '../Buyer/styled';

export function LastStepEmitContractForm() {
  return (
    <FieldsetDeclare title="Deseja emitir o contrato de cessão de créditos?">
      <WrapperRadio>
        <LabelContainer htmlFor="1">
          <input type="radio" id="1" value="1" name="emitContract" checked />
          Emitir Contrato
        </LabelContainer>

        <LabelContainer htmlFor="0">
          <input type="radio" id="0" value="0" name="emitContract" />
          Já tenho o Contrato de Cessão.
        </LabelContainer>
      </WrapperRadio>
    </FieldsetDeclare>
  );
}
