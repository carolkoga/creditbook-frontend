import { ReactNode } from 'react';
import { useFormContext, Controller } from 'react-hook-form';

import FormGroup from '@components/FormGroup';
import { Input, MaskInput } from '@components/Input';

import { AllCommonType } from '@components/UserForm/types';
import { InputPhone } from '@components/Form/Input/Mask/InputPhone';
import { Fieldset } from '../Fieldset';
import NationalitySelect from '../NationalitySelect';

interface IProps extends AllCommonType {
  children?: ReactNode,
  type?: 'PJ' | 'PF'
}

export default function InformationForm({
  formGroupDirection, children, type,
}: IProps) {
  const {
    register, formState: { errors }, control,
  } = useFormContext();

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
          title: type === 'PJ' ? 'Nome do representante PJ' : 'Nome Completo',
        }}
      >
        <Input
          id="full-name"
          placeholder=" "
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
          placeholder=" "
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
              title: 'Telefone',
            }}
          >
            <InputPhone
              id="phone"
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
          placeholder=" "
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
          placeholder=" "
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
              placeholder=" "
              mask="000.000.000-00"
            />
          </FormGroup>
        )}
      />

      <NationalitySelect
        formGroupDirection={formGroupDirection}
        label={type === 'PJ' ? 'Local de constituição' : 'Nacionalidade'}
      />
    </Fieldset>
  );
}

InformationForm.defaultProps = {
  children: null,
  type: 'PF',
};
