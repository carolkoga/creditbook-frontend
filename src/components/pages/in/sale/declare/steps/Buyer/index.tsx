import { useFormContext } from 'react-hook-form';
import { FieldsetDeclare } from '../../Fieldset';
import { PFForm } from './components/PFForm';
import { PJForm } from './components/PJForm';
import { LabelContainer, WrapperRadio } from './styled';

export function SecondStepBuyer() {
  const { register, watch } = useFormContext();
  const personType = watch('buyer.personType');

  return (
    <FieldsetDeclare title="2. Dados da parte compradora">
      <WrapperRadio>
        <LabelContainer htmlFor="pj">
          <input type="radio" id="pj" value="pj" {...register('buyer.personType')} defaultChecked />
          Pessoa Jurídica
        </LabelContainer>

        <LabelContainer htmlFor="pf">
          <input type="radio" id="pf" value="pf" {...register('buyer.personType')} />
          Pessoa Física
        </LabelContainer>
      </WrapperRadio>

      {personType === 'pj' && <PJForm />}
      {personType === 'pf' && <PFForm />}
    </FieldsetDeclare>
  );
}
