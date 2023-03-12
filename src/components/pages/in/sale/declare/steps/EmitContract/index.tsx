import { useFormContext } from 'react-hook-form';
import { FieldsetDeclare } from '../../Fieldset';
import { LabelContainer } from '../Buyer/styled';
import { Container } from './styled';

export function LastStepEmitContractForm() {
  const { register } = useFormContext();

  return (
    <FieldsetDeclare title="Deseja emitir o contrato de cessão de créditos?">
      <Container>
        <LabelContainer htmlFor="emitContract-1">
          <input type="radio" id="emitContract-1" value="1" {...register('emitContract')} />
          Emitir Contrato
        </LabelContainer>

        <LabelContainer htmlFor="emitContract-0">
          <input type="radio" id="emitContract-0" value="0" {...register('emitContract')} />
          Já tenho o Contrato de Cessão.
        </LabelContainer>
      </Container>
    </FieldsetDeclare>
  );
}
