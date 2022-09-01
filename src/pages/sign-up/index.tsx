import { Button } from '@components/Button/styled';
import LegalEntity from '@components/pages/signup/LegalEntity';
import PrivateIndividual from '@components/pages/signup/PrivateIndividual';
import { Direction, HeaderSection, TitleSection } from '@styles/pages/home';
import { useState } from 'react';

export default function SignUp() {
  const [registerPersonType, setRegisterPersonType] = useState<'privateIndividual' | 'legalEntity'>('privateIndividual');

  function handleToggleRegisterPersonType() {
    setRegisterPersonType((oldState) => (oldState === 'privateIndividual' ? 'legalEntity' : 'privateIndividual'));
  }

  function handleSubmitRegisterToPrivateIndividual() {
    console.log('pessoa física');
  }

  function handleSubmitRegisterToLegalEntity() {
    console.log('pessoa física');
  }

  return (
    <>
      <HeaderSection>
        <Direction>
          <TitleSection as="h2" textColor="dark">Cadastro</TitleSection>
          <Button type="button" onClick={() => handleToggleRegisterPersonType()}>
            Cadastrar pessoa
            {' '}
            {registerPersonType === 'privateIndividual' ? 'jurídica' : 'física'}
          </Button>
        </Direction>
      </HeaderSection>

      {registerPersonType === 'privateIndividual' && (
        <PrivateIndividual
          onSubmit={() => handleSubmitRegisterToPrivateIndividual()}
        />
      )}

      {registerPersonType === 'legalEntity' && (
        <LegalEntity
          onSubmit={() => handleSubmitRegisterToLegalEntity()}
        />
      )}
    </>
  );
}
