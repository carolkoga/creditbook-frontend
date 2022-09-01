import FormGroup from '@components/FormGroup';
import { Input } from '@components/Input';
import { Select } from '@components/Select';
import { UploadSimple } from 'phosphor-react';
import { ReactNode } from 'react';
import { Fieldset } from '../Fieldset';
import { WrapperInputFile } from '../WrapperInputFile';

interface IProps {
  formGroupDirection: 'vertical' | 'horizontal',
  children?: ReactNode,
}

export default function InformationForm({ formGroupDirection, children }: IProps) {
  return (
    <Fieldset vertical>
      <legend>Informações</legend>
      {children}
      <FormGroup
        direction={formGroupDirection}
        label={{
          forId: 'full-name',
          title: 'Nome Completo',
        }}
      >
        <Input id="full-name" placeholder="Beatriz Nair Carvalho" />
      </FormGroup>

      <FormGroup
        direction={formGroupDirection}
        label={{
          forId: 'email',
          title: 'E-mail',
        }}
      >
        <Input
          type="email"
          inputMode="email"
          id="email"
          placeholder="beacar@mail.com"
          autoComplete="off"
        />
      </FormGroup>

      <FormGroup
        direction={formGroupDirection}
        label={{
          forId: 'phone',
          title: 'Celular',
        }}
      >
        <Input
          type="tel"
          id="phone"
          inputMode="numeric"
          placeholder="(54) 98753-0813"
        />
      </FormGroup>

      <FormGroup
        direction={formGroupDirection}
        label={{
          forId: 'born-ate',
          title: 'Data de nascimento',
        }}
      >
        <Input
          type="date"
          id="born-ate"
          placeholder="dd/mm/yyyy"
        />
      </FormGroup>

      <FormGroup
        direction={formGroupDirection}
        label={{
          forId: 'rg',
          title: 'RG',
        }}
      >
        <Input
          id="rg"
          inputMode="numeric"
          placeholder="44.902.756-9"
        />
      </FormGroup>

      <FormGroup
        direction={formGroupDirection}
        label={{
          forId: 'cpf',
          title: 'CPF',
        }}
      >
        <Input
          id="cpf"
          inputMode="numeric"
          placeholder="423.177.667-93"
        />
      </FormGroup>

      {!children && (
        <FormGroup
          direction={formGroupDirection}
          label={{
            forId: 'nationality',
            title: 'Nacionalidade',
          }}
        >
          <Select id="nationality" placeholder="Nacionalidade" />
        </FormGroup>
      )}

      <FormGroup
        direction={formGroupDirection}
        label={{
          forId: 'profile-photo',
          title: 'Foto de perfil',
        }}
      >
        <WrapperInputFile>
          <label htmlFor="profile-photo">
            <UploadSimple size={20} weight="bold" />
          </label>
          <input type="file" id="profile-photo" />
        </WrapperInputFile>
      </FormGroup>
    </Fieldset>
  );
}

InformationForm.defaultProps = {
  children: null,
};
