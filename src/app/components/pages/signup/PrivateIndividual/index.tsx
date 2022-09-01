import { Button } from '@components/Button/styled';
import { HeaderSection, Section, TitleSection } from '@styles/pages/home';
import { useState } from 'react';
import AddressForm from '../components/AddressForm';
import { FormGrid } from '../components/FormGrid';
import InformationForm from '../components/InformationForm';
import PasswordForm from '../components/PasswordForm';

interface IProps {
  onSubmit: () => void
}

export default function PrivateIndividual({ onSubmit }: IProps) {
  const [formGroupDirection] = useState<'horizontal'>('horizontal');

  return (
    <Section bg="white">
      <HeaderSection>
        <TitleSection as="h1">Cadastro Pessoa Física</TitleSection>
      </HeaderSection>
      <FormGrid noValidate onSubmit={() => onSubmit()}>
        <InformationForm formGroupDirection={formGroupDirection} />
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
