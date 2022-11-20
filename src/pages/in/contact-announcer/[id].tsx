import { useRouter } from 'next/router';
import { useForm, FormProvider } from 'react-hook-form';

import useAuth from '@hooks/useAuth';
import { Button } from '@components/Button';
import { Section } from '@components/Section';
import { Direction } from '@components/Direction';
import { ContactAnnouncerParams } from '@type/creditbook';
import ContactAnnouncerForm from '@components/pages/in/contact-announcer/form';
import { emailServices } from '@services/creditbook/email';
import { handleCatchErrorRequest } from '@utils/handleCatchErrorRequest';
import { toast } from 'react-toastify';

export default function ContactAnnouncementAnnouncer() {
  const router = useRouter();
  const { user } = useAuth();

  const methods = useForm<ContactAnnouncerParams & { name: string, email: string }>({
    defaultValues: {
      userId: user?.id,
      name: user?.fullName,
      email: user?.email,
      phone: user?.cellphone,
      type: router.query?.type as 'announcement' | 'batch' ?? 'announcement',
      creditId: router.query?.id as string ?? '',
    },
  });

  async function handleSubmitMessage(data: ContactAnnouncerParams) {
    try {
      await emailServices.contactAnnouncer(data);
      toast.success('Mensagem enviada com sucesso!');
      router.replace('/in/buy-credits');
    } catch (error) {
      handleCatchErrorRequest(error as never);
    }
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
