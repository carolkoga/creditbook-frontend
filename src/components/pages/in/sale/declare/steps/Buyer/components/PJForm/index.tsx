import FormGroup from '@components/FormGroup';
import { Input, MaskInput } from '@components/Input';
import { Select } from '@components/Select';
import { FieldsetDeclare } from '../../../../Fieldset';
import { RightFormInfo } from '../RightFormInfo';
import { ContentFormGrid } from '../styled';

export function PJForm() {
  return (
    <FieldsetDeclare title="">
      <ContentFormGrid>
        <div>
          <h2>Informações</h2>

          <FormGroup label={{ title: 'Razão Social', forId: 'social' }}>
            <Input id="social" />
          </FormGroup>

          <FormGroup label={{ title: 'CNPJ', forId: 'cnpj' }}>
            <MaskInput mask="00.000.000/0000-00" id="cnpj" />
          </FormGroup>

          <FormGroup label={{ title: 'Local de constituição', forId: 'nationality' }}>
            <Select placeholder="Loca de constituição" />
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
