import { useState } from 'react';
import { toast } from 'react-toastify';

import { Button } from '@components/Button';
import FormGroup from '@components/FormGroup';
import { Input, Textarea } from '@components/Input';
import { Form } from '@styles/pages/contact';
import { Section } from '@components/Section';

import { OptionType, Select } from '@components/Select';
import { Direction } from '@components/Direction';
import { Controller, useForm } from 'react-hook-form';
import { ContactSupportParams } from '@type/creditbook';
import { emailServices } from '@services/creditbook/email';
import { handleCatchErrorRequest } from '@utils/handleCatchErrorRequest';
import { InputPhone } from '@components/Form/Input/Mask/InputPhone';

type ContactSupportParamsForm = Omit<ContactSupportParams, 'subject'> & { subject: OptionType };

const subjectSelectOptions = [
  {
    label: 'Dúvida',
    value: 'doubt',
  },

  {
    label: 'Reclamação',
    value: 'report',
  },

  {
    label: 'Sugestão',
    value: 'suggestion',
  },

  {
    label: 'Quero ser um advogado parceiro',
    value: 'lawyerPartner',
  },

  {
    label: 'Outro',
    value: 'other',
  },
];

export default function Contact() {
  const { register, handleSubmit, control } = useForm<ContactSupportParamsForm>();
  const [isLoading, setIsLoading] = useState(false);

  async function handleContactSupport(data: ContactSupportParamsForm) {
    try {
      setIsLoading(true);
      await emailServices.contactSupport({ ...data, subject: data.subject.label });
      toast.success('Obrigado pelo seu feedback!');
    } catch (error) {
      handleCatchErrorRequest(error as never);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <Direction alignItems="center">
      <Section.Header>
        <Section.Title as="h1">Entrar em contato</Section.Title>
      </Section.Header>

      <Form onSubmit={handleSubmit(handleContactSupport)}>
        <FormGroup label={{ title: 'Nome', forId: 'name' }}>
          <Input placeholder=" " {...register('name')} />
        </FormGroup>

        <FormGroup label={{ title: 'E-mail', forId: 'email' }}>
          <Input placeholder=" " id="email" type="email" {...register('email')} />
        </FormGroup>

        <FormGroup label={{ title: 'Escolha um assunto', forId: 'subject' }}>
          <Controller
            name="subject"
            control={control}
            render={({ field }) => (
              <Select
                options={subjectSelectOptions}
                placeholder=" "
                id="subject"
                instanceId="subject"
                {...field}
              />
            )}
          />
        </FormGroup>

        <FormGroup label={{ title: 'Telefone', forId: 'phone' }}>
          <Controller
            control={control}
            name="phone"
            render={({ field }) => (
              <InputPhone {...field} />
            )}
          />
        </FormGroup>

        <FormGroup label={{ title: 'Mensagem', forId: 'feedback' }}>
          <Textarea placeholder=" " id="feedback" {...register('message')} />
        </FormGroup>

        <Button type="submit" isLoading={isLoading}>
          {!isLoading && 'Enviar Feedback'}
          {isLoading && 'Enviando...'}
        </Button>
      </Form>
    </Direction>
  );
}
