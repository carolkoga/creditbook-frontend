import { ReactNode } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { Direction } from '@components/Direction';
import FormGroup from '@components/FormGroup';
import { Textarea, Input } from '@components/Input';

import { Form } from '@styles/pages/contact';
import { InputPhone } from '@components/Form/Input/Mask/InputPhone';

interface IProps {
  children: ReactNode,
  onSubmit: () => void,
}

export default function ContactAnnouncerForm({ children, onSubmit }: IProps) {
  const { register, control } = useFormContext();
  return (
    <Form noValidate onSubmit={onSubmit}>
      <FormGroup label={{ title: 'Nome', forId: 'name' }}>
        <Input {...register('name')} id="name" disabled />
      </FormGroup>

      <FormGroup label={{ title: 'E-mail', forId: 'email' }}>
        <Input {...register('email')} id="email" type="email" disabled />
      </FormGroup>

      <Controller
        control={control}
        name="phone"
        render={({ field }) => (
          <FormGroup label={{ title: 'Telefone', forId: 'phone' }}>
            <InputPhone {...field} id="phone" inputMode="numeric" />
          </FormGroup>
        )}
      />

      <FormGroup label={{ title: 'Mensagem', forId: 'message' }}>
        <Textarea {...register('message')} id="message" />
      </FormGroup>

      <Direction direction="horizontal">
        {children}
      </Direction>
    </Form>
  );
}
