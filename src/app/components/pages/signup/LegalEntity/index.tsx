import { Button } from '@components/Button/styled';
import FormGroup from '@components/FormGroup';
import { Input } from '@components/Input';
import { Select } from '@components/Select';
import { HeaderSection, Section, TitleSection } from '@styles/pages/home';
import { useState } from 'react';
import AddressForm from '../components/AddressForm';
import { FormGrid } from '../components/FormGrid';
import InformationForm from '../components/InformationForm';
import PasswordForm from '../components/PasswordForm';

interface IProps {
  onSubmit: () => void
}

export default function LegalEntity({ onSubmit }: IProps) {
  const [formGroupDirection] = useState<'horizontal'>('horizontal');

  return (
    <Section bg="white">
      <HeaderSection>
        <TitleSection>Cadastro Pessoa Jurídica</TitleSection>
      </HeaderSection>

      <FormGrid noValidate onSubmit={() => onSubmit()}>
        <InformationForm formGroupDirection={formGroupDirection}>
          <FormGroup
            direction={formGroupDirection}
            label={{
              forId: 'social-name',
              title: 'Razão Social',
            }}
          >
            <Input
              id="social-name"
              placeholder="Carvalho & Nair LTDA"
            />
          </FormGroup>

          <FormGroup
            direction={formGroupDirection}
            label={{
              forId: 'cnpj',
              title: 'CNPJ',
            }}
          >
            <Input
              id="cnpj"
              inputMode="numeric"
              placeholder="32.683.609/0001-07"
            />
          </FormGroup>

          <FormGroup
            direction={formGroupDirection}
            label={{
              forId: 'nationality',
              title: 'Local de constituição',
            }}
          >
            <Select id="nationality" placeholder="Nacionalidade" />
          </FormGroup>
        </InformationForm>
        <AddressForm formGroupDirection={formGroupDirection} />
        <PasswordForm formGroupDirection={formGroupDirection} />

        <div className="actions">
          <Button type="submit" size="outline-filled-round">
            Cadastrar
          </Button>
        </div>
      </FormGrid>
    </Section>
  );
}
