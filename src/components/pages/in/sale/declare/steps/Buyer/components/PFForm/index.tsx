import FormGroup from '@components/FormGroup';
import { Input, MaskInput } from '@components/Input';
import { FieldsetDeclare } from '../../../../Fieldset';
import { RightFormInfo } from '../RightFormInfo';
import { ContentFormGrid } from '../styled';

export function PFForm() {
  return (
    <FieldsetDeclare title="">
      <ContentFormGrid>
        <div>
          <h2>Informações</h2>

          <FormGroup label={{ title: 'Nome Completo', forId: 'social' }}>
            <Input id="social" />
          </FormGroup>

          <FormGroup label={{ title: 'CPF', forId: 'cpf' }}>
            <MaskInput mask="000.000.000-00" id="cpf" />
          </FormGroup>

          <FormGroup label={{ title: 'RG', forId: 'rg' }}>
            <Input />
          </FormGroup>

          <FormGroup label={{ title: 'E-mail', forId: 'email' }}>
            <Input id="email" />
          </FormGroup>

          <FormGroup label={{ title: 'Telefone', forId: 'phone' }}>
            <MaskInput mask="(00) 0000-0000" id="phone" />
          </FormGroup>
        </div>

        <RightFormInfo />
      </ContentFormGrid>
    </FieldsetDeclare>
  );
}
