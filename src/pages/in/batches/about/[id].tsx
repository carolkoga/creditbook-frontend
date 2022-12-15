import { useRouter } from 'next/router';

import { Button, Link } from '@components/Button';
import { Section } from '@components/Section';
import { BatchServices } from '@services/creditbook/batch';
import { GetServerSideProps } from 'next';
import { setupAPIClient } from '@api/creditbookApi';
import { BatchParams } from '@type/creditbook/Batch';
import { Direction } from '@components/Direction';
import convertToCurrency from '@utils/convertToCurrency';
import {
  AboutContainer, ContentInformation, GroupInformation, TitleInformation,
} from '@styles/pages/in/batches/about';

import AnnouncementList from '@components/LawsuitCard';
import useAnnouncements from '@services/creditbook/lawsuit/hooks/useAnnouncements';

interface IProps {
  batch: BatchParams
}

export default function BatchInformation({ batch }: IProps) {
  const router = useRouter();
  const announcementsInBatch = useAnnouncements(undefined, {
    params: {
      batchId: router.query.id as string,
    },
  });

  function backToLastRoute() {
    router.back();
  }

  return (
    <>
      <Section.Header>
        <Button variant="white" onClick={backToLastRoute}>Voltar</Button>
      </Section.Header>

      <Section.Container>
        <AboutContainer>
          <Section.Title as="h1">Lote: {batch.name}</Section.Title>

          <Direction>
            <GroupInformation>
              <TitleInformation>Nome do Lote</TitleInformation>
              <ContentInformation>{batch.name}</ContentInformation>
            </GroupInformation>

            <GroupInformation>
              <TitleInformation>Descrição</TitleInformation>
              <ContentInformation>
                {batch.description}
              </ContentInformation>
            </GroupInformation>

            <GroupInformation>
              <TitleInformation>Valor</TitleInformation>
              <ContentInformation>
                {convertToCurrency(Number(batch.value))}
              </ContentInformation>
            </GroupInformation>

            <GroupInformation className="actions">
              <Link href={`/in/contact-announcer/${batch.userId}?type=batch`} size="outline-filled-round">
                Comprar
              </Link>
            </GroupInformation>
          </Direction>
        </AboutContainer>

        {announcementsInBatch?.announcements?.results?.length > 0 && (
          <Section.Container style={{ marginTop: '52px' }}>
            <Section.Title>Anúncios desse lote</Section.Title>
            <AnnouncementList
              {...announcementsInBatch}
              lawsuitCardProps={{
                batchIdForActions: batch.id,
              }}
            />
          </Section.Container>
        )}
      </Section.Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query, req }) => {
  const api = setupAPIClient(req.cookies['nextauth.token']);
  const batchService = new BatchServices(api);
  const { data } = await batchService.show(query.id as string);
  return {
    props: {
      batch: data,
    },
  };
};
