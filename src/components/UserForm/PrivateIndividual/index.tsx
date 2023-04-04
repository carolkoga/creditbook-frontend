import { RegistrationParams } from '@type/creditbook/auth/register';

import { Button, Link } from '@components/Button';
import { Section } from '@components/Section';

import AddressForm from '../components/AddressForm';
import { FormGrid } from '../components/FormGrid';
import InformationForm from '../components/InformationForm';
import PasswordForm from '../components/PasswordForm';
import ProfilePictureForm from '../components/ProfilePictureForm';
import { FormCommonType } from '../types';
import UpdatePasswordForm from '../components/UpdatePasswordForm';

export interface PersonParams extends Omit<RegistrationParams<'person'>, 'type'> {}

export default function PrivateIndividual({
  onSubmit, formGroupDirection, loading, label, validation,
}: FormCommonType) {
  return (
    <Section.Container bg="white">
      {validation === 'register' && (
        <Section.Header>
          <Section.Title as="h1">Cadastro Pessoa Física</Section.Title>
        </Section.Header>
      )}

      <FormGrid
        autoComplete="off"
        noValidate
        onSubmit={onSubmit}
      >
        <InformationForm formGroupDirection={formGroupDirection} nationalityLabel="Nacionalidade">
          {validation === 'register' && (
            <ProfilePictureForm
              label="Foto de Perfil"
              formGroupDirection={formGroupDirection}
            />
          )}

          {validation === 'update' && (
            <ProfilePictureForm
              size={64}
              formGroupDirection={formGroupDirection}
            />
          )}
        </InformationForm>

        <AddressForm formGroupDirection={formGroupDirection} />

        {validation === 'register' && (
          <PasswordForm formGroupDirection={formGroupDirection} />
        )}

        {validation === 'update' && (
          <UpdatePasswordForm formGroupDirection={formGroupDirection} />
        )}

        <div className="actions">
          <Link href="/login" size="outline-filled-round" variant="white">
            Login
          </Link>

          <Button
            type="submit"
            size="outline-filled-round"
            isLoading={loading}
          >
            {label}
          </Button>
        </div>
      </FormGrid>

    </Section.Container>
  );
}
