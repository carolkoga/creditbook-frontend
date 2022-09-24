import { Direction } from '@components/Direction';
import useAuth from '@hooks/useAuth';
import { LawsuitParamsID } from '@type/creditbook/Lawsuits';
import convertToCurrency from '@utils/convertToCurrency';
import { Heart } from 'phosphor-react';
import Footer from './components/Footer';
import { Lawsuit } from './styled';
import { processCategoryTranslation, actionPhaseTranslation, processKindTranslation } from './utils/translations';

interface IProps {
  lawsuit: LawsuitParamsID,
}

export default function LawsuitNewCard({ lawsuit }: IProps) {
  const { user } = useAuth();
  return (
    <Lawsuit.Wrapper>
      <Lawsuit.Header.Container category={lawsuit.processGender}>
        <Lawsuit.Header.Title>
          {processCategoryTranslation[lawsuit.processGender]}
        </Lawsuit.Header.Title>

        <Direction direction="horizontal" gap="8px" alignItems="center">
          <Lawsuit.Header.PremiumTitle>Premium</Lawsuit.Header.PremiumTitle>
          <button type="button">
            <Heart size={24} color="#F16565" />
          </button>
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
              {convertToCurrency(1253564)}
            </Lawsuit.Info.ValueInformation>
          </Lawsuit.Info.Container>

          <Lawsuit.Info.Container>
            <Lawsuit.Info.KeyInformation>
              Valor de liquidação:
            </Lawsuit.Info.KeyInformation>
            <Lawsuit.Info.ValueInformation bold>
              {convertToCurrency(125321564)}
            </Lawsuit.Info.ValueInformation>
          </Lawsuit.Info.Container>
        </Lawsuit.Content>

        <Footer
          batchId={lawsuit.batchId}
          lawsuitId={lawsuit.id}
          mine={lawsuit.owner?.toLowerCase() === user?.fullName.toLowerCase()}
        />
      </Lawsuit.WrapperContent>
    </Lawsuit.Wrapper>
  );
}
