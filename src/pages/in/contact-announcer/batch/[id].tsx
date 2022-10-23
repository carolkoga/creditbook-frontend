import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import useAuth from '@hooks/useAuth';
import { Button } from '@components/Button';
import FormGroup from '@components/FormGroup';
import { Input, Textarea } from '@components/Input';
import { Form } from '@styles/pages/contact';
import { Section } from '@components/Section';
import { Direction } from '@components/Direction';
import { ContactAnnouncerParams } from '@type/creditbook';

export default function ContactBatchAnnouncer() {
  const router = useRouter();
  const { user } = useAuth();
  const { register, handleSubmit } = useForm<ContactAnnouncerParams>({
    defaultValues: {
      name: user?.fullName,
      email: user?.email,
      phone: user?.cellphone,
      type: 'batch',
      creditId: router.query.id as string,
    },
  });

  function handleSubmitMessage(data: ContactAnnouncerParams) {
    console.log({ data });
  }

  return (
    <Direction alignItems="center">
      <Section.Header>
        <Section.Title as="h1">Entrar em contato</Section.Title>
      </Section.Header>

      <Section.Container>
        <Form noValidate onSubmit={handleSubmit(handleSubmitMessage)}>
          <FormGroup label={{ title: 'Nome', forId: 'name' }}>
            <Input {...register('name')} id="name" />
          </FormGroup>

          <FormGroup label={{ title: 'E-mail', forId: 'email' }}>
            <Input {...register('email')} id="email" type="email" />
          </FormGroup>

          <FormGroup label={{ title: 'Telefone', forId: 'phone' }}>
            <Input {...register('phone')} id="phone" inputMode="numeric" />
          </FormGroup>

          <FormGroup label={{ title: 'Mensagem', forId: 'message' }}>
            <Textarea {...register('message')} id="message" />
          </FormGroup>

          <Direction direction="horizontal">
            <Button type="submit">Enviar Mensagem</Button>
            <Button type="button" variant="white" size="small-large" onClick={() => router.back()}>
              Voltar
            </Button>
          </Direction>
        </Form>
      </Section.Container>
    </Direction>
  );
}
