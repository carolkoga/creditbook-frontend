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
import { useCallback, useEffect, useState } from 'react';
import { batchServices } from '@services/creditbook/batch';
import { lawsuitService } from '@services/creditbook/lawsuit';
import convertToCurrency from '@utils/convertToCurrency';

export default function ContactAnnouncementAnnouncer() {
  const router = useRouter();
  const { user } = useAuth();
  const [product, setProduct] = useState({} as any);

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

  const loadProductInformation = useCallback(async () => {
    try {
      const query = router.query?.type as 'announcement' | 'batch' ?? 'announcement';
      const productId = router.query.id as string;

      const response = query === 'batch'
        ? await batchServices.show(productId)
        : await lawsuitService.getById(productId);

      setProduct({
        type: query,
        name: query === 'batch' ? response.data?.name : response.data?.processNumber,
        price: query === 'batch' ? response.data?.value : response.data?.income,
      });
    // eslint-disable-next-line no-empty
    } catch {}
  }, []);

  async function handleSubmitMessage(data: ContactAnnouncerParams) {
    try {
      await emailServices.contactAnnouncer(data);
      toast.success('Mensagem enviada com sucesso!');
      router.replace('/in/buy-credits');
    } catch (error) {
      handleCatchErrorRequest(error as never);
    }
  }

  useEffect(() => {
    loadProductInformation();
  }, [loadProductInformation]);

  return (
    <Direction alignItems="center">
      <Section.Header>
        <Section.Title as="h1">
          Entrar em contato sobre um
          {' '}
          {router.query.type === 'announcement' ? 'anúncio' : 'lote'}
        </Section.Title>
        {product?.type === 'announcement' && (
          <Section.Subtitle>
            <strong>Numero do processo:</strong> {product?.name}
            <br />
            <strong>Valor de venda:</strong> {convertToCurrency(product?.price)}
          </Section.Subtitle>
        )}

        {product?.type === 'batch' && (
          <Section.Subtitle>
            <p>
              <strong>Nome do Lote:</strong> {product?.name}
              <br />
              <strong>Valor de venda:</strong> {convertToCurrency(product?.price)}
            </p>
          </Section.Subtitle>
        )}
      </Section.Header>

      <FormProvider {...methods}>
        <ContactAnnouncerForm onSubmit={methods.handleSubmit(handleSubmitMessage)}>
          <Button type="submit">Enviar Mensagem</Button>
          <Button type="button" variant="white" size="small-large" onClick={() => router.back()}>
            Voltar
          </Button>
        </ContactAnnouncerForm>
      </FormProvider>
    </Direction>
  );
}
