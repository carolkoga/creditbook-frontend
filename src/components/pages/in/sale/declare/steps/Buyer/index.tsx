import { memo } from 'react';
import { useFormContext } from 'react-hook-form';
import { FieldsetDeclare } from '../../Fieldset';
import { PFForm } from './components/PFForm';
import { PJForm } from './components/PJForm';
import { RightFormInfo } from './components/RightFormInfo';
import { ContentFormGrid } from './components/styled';
import { LabelContainer, WrapperRadio } from './styled';

export const SecondStepBuyer = memo(() => {
  const { register, watch } = useFormContext();
  const personType = watch('buyer.personType');

  return (
    <FieldsetDeclare title="2. Dados da parte compradora">
      <WrapperRadio>
        <LabelContainer htmlFor="pj">
          <input type="radio" id="pj" value="pj" {...register('buyer.personType')} defaultChecked />
          Pessoa Jurídica
        </LabelContainer>

        <LabelContainer htmlFor="person-pf">
          <input type="radio" id="person-pf" value="pf" {...register('buyer.personType')} />
          Pessoa Física
        </LabelContainer>
      </WrapperRadio>

      <ContentFormGrid>
        {personType === 'pj' && <PJForm />}
        {personType === 'pf' && <PFForm />}
        <RightFormInfo />
      </ContentFormGrid>

    </FieldsetDeclare>
  );
});
