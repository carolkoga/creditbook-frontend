import { useRouter } from 'next/router';
import { FormProvider, useForm } from 'react-hook-form';

import useAuth from '@hooks/useAuth';
import { Button } from '@components/Button';
import { Section } from '@components/Section';
import { Direction } from '@components/Direction';
import { ContactAnnouncerParams } from '@type/creditbook';
import ContactAnnouncerForm from '@components/pages/in/contact-announcer/form';

export default function ContactBatchAnnouncer() {
  const router = useRouter();
  const { user } = useAuth();
  const methods = useForm<ContactAnnouncerParams>({
    defaultValues: {
      userId: user?.id,
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
        <FormProvider {...methods}>
          <ContactAnnouncerForm onSubmit={methods.handleSubmit(handleSubmitMessage)}>
            <Button type="submit">Enviar Mensagem</Button>
            <Button type="button" variant="white" size="small-large" onClick={() => router.back()}>
              Voltar
            </Button>
          </ContactAnnouncerForm>
        </FormProvider>
      </Section.Container>
    </Direction>
  );
}
