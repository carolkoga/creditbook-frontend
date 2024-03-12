import { useCallback, useState } from 'react';
import { Heart } from 'phosphor-react';
import { useRouter } from 'next/router';

import useAuth from '@hooks/useAuth';

import { Direction } from '@components/Direction';

import { handleCatchErrorRequest } from '@utils/handleCatchErrorRequest';
import convertToCurrency from '@utils/convertToCurrency';
import { BatchParams } from '@type/creditbook/Batch';

import { favoriteAnnouncementService } from '@services/creditbook/favoriteAnnouncement';

import Footer from './components/Footer';
import { Lawsuit } from './styled';
import { processCategoryTranslation, actionPhaseTranslation, processKindTranslation } from './utils/translations';
import { LawsuitCardProps } from '../types/Props';

interface IProps extends LawsuitCardProps {
  userBatches: BatchParams[]
  admin?: boolean
}

interface ChangeFavoriteOptions {
  announcementId: string,
  isFavorite: boolean | undefined,
  userId: string,
  favoriteId?: string | null | undefined
}

export default function LawsuitNewCard({
  lawsuit: originalLawsuit,
  batchIdForActions,
  moreAboutOnly,
  userBatches,
  admin = false,
}: IProps) {
  const { user } = useAuth();
  const [lawsuit, setLawsuit] = useState(originalLawsuit);
  const router = useRouter();

  const handleChangeFavorite = useCallback(async (options: ChangeFavoriteOptions) => {
    try {
      const {
        announcementId, isFavorite, favoriteId = null,
      } = options;

      const response = isFavorite
        ? await favoriteAnnouncementService.remove(favoriteId as string)
        : await favoriteAnnouncementService.favorite({ announcementId });

      setLawsuit({
        ...response.data.announcement,
        favoriteId: response.data.id,
      });

      if (router.pathname === '/in/my-favorites') {
        router.reload();
      }
    } catch (error) {
      handleCatchErrorRequest(error as never);
    }
  }, []);

  return (
    <Lawsuit.Wrapper>
      <Lawsuit.Header.Container category={lawsuit.processGender} status={lawsuit.status} isSold={lawsuit.status === 'sold'}>
        <Lawsuit.Header.Title isSold={lawsuit.status === 'sold'}>
          {processCategoryTranslation[lawsuit.processGender]}
        </Lawsuit.Header.Title>

        <Direction direction="horizontal" gap="8px" alignItems="center">
          {lawsuit.isPremium && (
            <Lawsuit.Header.PremiumTitle isSold={lawsuit.status === 'sold'}>
              Premium
            </Lawsuit.Header.PremiumTitle>
          )}

          {lawsuit.userId !== user?.id && (
            <button
              type="button"
              onClick={() => (
                handleChangeFavorite({
                  announcementId: lawsuit.id,
                  isFavorite: lawsuit.isFavorite,
                  userId: lawsuit.userId,
                  favoriteId: lawsuit?.favoriteId,
                })
              )}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {lawsuit.isFavorite
                ? <Heart size={24} weight="fill" color="#F16565" />
                : <Heart size={24} weight="regular" color="#F16565" />}
            </button>
          )}
        </Direction>
      </Lawsuit.Header.Container>

      <Lawsuit.WrapperContent>
        <Lawsuit.Content>
          <Lawsuit.Info.Container>
            <Lawsuit.Info.KeyInformation>
              {lawsuit.city} - {lawsuit.uf?.toUpperCase()}
            </Lawsuit.Info.KeyInformation>
          </Lawsuit.Info.Container>

          <Lawsuit.Info.Container>
            <Lawsuit.Info.KeyInformation>Espécie:</Lawsuit.Info.KeyInformation>
            <Lawsuit.Info.ValueInformation>
              {processKindTranslation[lawsuit.kind]}
            </Lawsuit.Info.ValueInformation>
          </Lawsuit.Info.Container>

          <Lawsuit.Info.Container>
            <Lawsuit.Info.KeyInformation>Fase do Processo:</Lawsuit.Info.KeyInformation>
            <Lawsuit.Info.ValueInformation>
              {
                actionPhaseTranslation[lawsuit.actionPhase]?.length > 16
                  ? `${actionPhaseTranslation[lawsuit.actionPhase]?.slice(0, 14)}...`
                  : actionPhaseTranslation[lawsuit.actionPhase]
              }
            </Lawsuit.Info.ValueInformation>
          </Lawsuit.Info.Container>

          <Lawsuit.Info.Container>
            <Lawsuit.Info.KeyInformation>Penhora ou garantia:</Lawsuit.Info.KeyInformation>
            <Lawsuit.Info.ValueInformation>Não</Lawsuit.Info.ValueInformation>
          </Lawsuit.Info.Container>

          <Lawsuit.Info.Container>
            <Lawsuit.Info.KeyInformation>Valor do Processo:</Lawsuit.Info.KeyInformation>
            <Lawsuit.Info.ValueInformation>
              {convertToCurrency(lawsuit.processPrice)}
            </Lawsuit.Info.ValueInformation>
          </Lawsuit.Info.Container>

          <Lawsuit.Info.Container>
            <Lawsuit.Info.KeyInformation>
              Valor de liquidação:
            </Lawsuit.Info.KeyInformation>
            <Lawsuit.Info.ValueInformation bold>
              {convertToCurrency(lawsuit.income)}
            </Lawsuit.Info.ValueInformation>
          </Lawsuit.Info.Container>
        </Lawsuit.Content>

        <Footer
          lawsuit={lawsuit}
          mine={lawsuit.userId === user?.id}
          originalBatchId={batchIdForActions}
          moreAboutOnly={moreAboutOnly}
          userBatches={userBatches}
          admin={admin}
        />

        {lawsuit.userId === user?.id && (
          <span style={{ opacity: '.7' }}>

            {lawsuit.batchId && 'Lote'}

            {!lawsuit.batchId
              && (
              <>
                {lawsuit.status === 'accepted' && 'Anúncio Aprovado'}
                {lawsuit.status === 'rejected' && 'Anúncio Reprovado'}
                {lawsuit.status === 'edition_requested' && 'Solicitado Edição'}
                {lawsuit.status === 'pending' && 'Aguardando Aprovação'}
                {lawsuit.status === 'inactive' && 'Anúncio Inativo'}
                {lawsuit.status === 'deleted' && 'Anúncio Deletado'}
                {lawsuit.status === 'payment_failed' && 'Falha no pagamento'}
                {lawsuit.status === 'sold' && 'Anúncio Vendido'}
              </>
              )}
          </span>
        )}
      </Lawsuit.WrapperContent>
    </Lawsuit.Wrapper>
  );
}

LawsuitNewCard.defaultProps = {
  batchIdForActions: '',
  moreAboutOnly: false,
};
