import { FieldsetDeclare } from '../../Fieldset';
import { PFForm } from './components/PFForm';
import { PJForm } from './components/PJForm';
import { LabelContainer, WrapperRadio } from './styled';

export function SecondStepBuyer() {
  return (
    <FieldsetDeclare title="2. Dados da parte compradora">
      <WrapperRadio>
        <LabelContainer htmlFor="pj">
          <input type="radio" id="pj" value="pj" name="personType" checked />
          Pessoa Jurídica
        </LabelContainer>

        <LabelContainer htmlFor="pf">
          <input type="radio" id="pf" value="pf" name="personType" />
          Pessoa Física
        </LabelContainer>
      </WrapperRadio>

      <PJForm />
      <PFForm />
    </FieldsetDeclare>
  );
}
