import { useCallback, useState } from 'react';
import { Heart } from 'phosphor-react';

import { lawsuitService } from '@services/creditbook/lawsuit';

import useAuth from '@hooks/useAuth';

import { Direction } from '@components/Direction';

import { handleCatchErrorRequest } from '@utils/handleCatchErrorRequest';
import convertToCurrency from '@utils/convertToCurrency';

import Footer from './components/Footer';
import { Lawsuit } from './styled';
import { processCategoryTranslation, actionPhaseTranslation, processKindTranslation } from './utils/translations';
import { LawsuitCardProps } from '../types/Props';

interface IProps extends LawsuitCardProps { }

export default function LawsuitNewCard({
  lawsuit: originalLawsuit,
  addToBatchId,
  moreAboutOnly,
}: IProps) {
  const { user, isAuthenticated } = useAuth();
  const [lawsuit, setLawsuit] = useState(originalLawsuit);
  const handleChangeFavorite = useCallback(async (announcementId: string, isFavorite: boolean) => {
    try {
      const { data } = await lawsuitService.changeFavorite({
        id: announcementId,
        isFavorite: isFavorite ? '0' : '1',
      });
      setLawsuit(data);
    } catch (error) {
      handleCatchErrorRequest(error as never);
    }
  }, []);

  return (
    <Lawsuit.Wrapper>
      <Lawsuit.Header.Container category={lawsuit.processGender}>
        <Lawsuit.Header.Title>
          {processCategoryTranslation[lawsuit.processGender]}
        </Lawsuit.Header.Title>

        <Direction direction="horizontal" gap="8px" alignItems="center">
          {lawsuit.isPremium && (
            <Lawsuit.Header.PremiumTitle>Premium</Lawsuit.Header.PremiumTitle>
          )}

          {isAuthenticated && (
            <button
              type="button"
              onClick={() => handleChangeFavorite(lawsuit.id, lawsuit.isFavorite as boolean)}
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
              {lawsuit.city} - {lawsuit.uf.toUpperCase()}
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
              {actionPhaseTranslation[lawsuit.actionPhase]}
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
          mine={lawsuit.userId?.toLowerCase() === user?.id.toLowerCase()}
          originalBatchId={addToBatchId}
          moreAboutOnly={moreAboutOnly}
        />
      </Lawsuit.WrapperContent>
    </Lawsuit.Wrapper>
  );
}

LawsuitNewCard.defaultProps = {
  addToBatchId: '',
  moreAboutOnly: false,
};
