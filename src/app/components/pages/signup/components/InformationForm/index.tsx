import {
  ReactNode, useEffect, useState,
} from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { UploadSimple } from 'phosphor-react';

import FormGroup from '@components/FormGroup';
import { Input, MaskInput } from '@components/Input';

import { Fieldset } from '../Fieldset';
import { WrapperInputFile } from '../WrapperInputFile';
import NationalitySelect from '../NationalitySelect';

interface IProps {
  formGroupDirection: 'vertical' | 'horizontal',
  children?: ReactNode,
}

export default function InformationForm({ formGroupDirection, children }: IProps) {
  const {
    register, formState: { errors }, watch, setValue, control,
  } = useFormContext();
  const profilePictureFileList = watch('profilePicture', null);
  const [profilePreview, setProfilePreview] = useState<string | any>('');

  function convertToBase64AndSetPreview(file: File, setPreview: Function) {
    const reader = new FileReader();

    reader.addEventListener('load', () => setPreview((reader.result as string)));
    reader.readAsDataURL(file);
  }

  useEffect(() => {
    if (profilePictureFileList) {
      const profilePicture: File | null | undefined = profilePictureFileList['0'];

      if (profilePicture) {
        setValue('profilePicture', profilePicture);
        convertToBase64AndSetPreview(profilePicture, setProfilePreview);
      }
    }
  }, [profilePictureFileList]);

  const registeredFields = {
    fullName: register('fullName', {
      required: 'Campo obrigatório',
    }),

    email: register('email', {
      required: 'Campo obrigatório',
    }),

    bornDate: register('bornDate', {
      required: 'Campo obrigatório',
    }),

    rg: register('rg'),

    profilePicture: register('profilePicture', {
      required: 'Campo obrigatório',
    }),
  };

  return (
    <Fieldset vertical>
      <legend>Informações</legend>
      {children}
      <FormGroup
        direction={formGroupDirection}
        error={errors?.fullName?.message}
        label={{
          forId: 'full-name',
          title: 'Nome Completo',
        }}
      >
        <Input
          id="full-name"
          placeholder="Beatriz Nair Carvalho"
          {...registeredFields.fullName}
        />
      </FormGroup>

      <FormGroup
        direction={formGroupDirection}
        error={errors?.email?.message}
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
          {...registeredFields.email}
        />
      </FormGroup>

      <Controller
        name="cellphone"
        defaultValue=""
        control={control}
        render={({ field }) => (
          <FormGroup
            direction={formGroupDirection}
            error={errors?.cellphone?.message}
            label={{
              forId: 'phone',
              title: 'Celular',
            }}
          >
            <MaskInput
              id="phone"
              inputMode="numeric"
              placeholder="(54) 98753-0813"
              mask="(00) 00000-0000"
              {...field}
            />
          </FormGroup>
        )}
      />

      <FormGroup
        direction={formGroupDirection}
        error={errors?.bornDate?.message}
        label={{
          forId: 'born-date',
          title: 'Data de nascimento',
        }}
      >
        <Input
          type="date"
          id="born-date"
          placeholder="dd/mm/yyyy"
          {...registeredFields.bornDate}
        />
      </FormGroup>

      <FormGroup
        direction={formGroupDirection}
        error={errors?.rg?.message}
        label={{
          forId: 'rg',
          title: 'RG',
        }}
      >
        <Input
          id="rg"
          inputMode="numeric"
          placeholder="44.902.756-9"
          {...registeredFields.rg}
        />
      </FormGroup>

      <Controller
        name="cpf"
        defaultValue=""
        control={control}
        render={({ field }) => (
          <FormGroup
            direction={formGroupDirection}
            error={errors?.cpf?.message}
            label={{
              forId: 'cpf',
              title: 'CPF',
            }}
          >
            <MaskInput
              {...field}
              id="cpf"
              inputMode="numeric"
              placeholder="423.177.667-93"
              mask="000.000.000-00"
            />
          </FormGroup>
        )}
      />

      {!children && <NationalitySelect formGroupDirection={formGroupDirection} />}

      <FormGroup
        direction={formGroupDirection}
        error={errors?.profilePicture?.message}
        label={{
          forId: 'profile-photo',
          title: 'Foto de perfil',
        }}
      >
        <WrapperInputFile>
          {!profilePreview && (
            <label htmlFor="profile-photo">
              <UploadSimple size={20} weight="bold" />
            </label>
          )}

          {profilePreview && (
            <label htmlFor="profile-photo" className="--with-img">
              <img src={profilePreview} alt="Foto de perfil" width="100%" height="100%" />
            </label>
          )}
          <input
            type="file"
            id="profile-photo"
            accept="image/*"
            defaultValue=""
            {...registeredFields.profilePicture}
          />
        </WrapperInputFile>
      </FormGroup>
    </Fieldset>
  );
}

InformationForm.defaultProps = {
  children: null,
};
