import { Direction } from '@components/Direction';
import { Heart } from 'phosphor-react';
import Footer from './components/Footer';
import { Lawsuit } from './styled';

export default function LawsuitNewCard() {
  return (
    <Lawsuit.Wrapper>
      <Lawsuit.Header.Container category="civel">
        <Lawsuit.Header.Title>
          Precatório
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
              Americana - SP
            </Lawsuit.Info.KeyInformation>
          </Lawsuit.Info.Container>

          <Lawsuit.Info.Container>
            <Lawsuit.Info.KeyInformation>Espécie:</Lawsuit.Info.KeyInformation>
            <Lawsuit.Info.ValueInformation>Título Judicial</Lawsuit.Info.ValueInformation>
          </Lawsuit.Info.Container>

          <Lawsuit.Info.Container>
            <Lawsuit.Info.KeyInformation>Fase do Processo:</Lawsuit.Info.KeyInformation>
            <Lawsuit.Info.ValueInformation>Incidente em execução</Lawsuit.Info.ValueInformation>
          </Lawsuit.Info.Container>

          <Lawsuit.Info.Container>
            <Lawsuit.Info.KeyInformation>Penhora ou garantia:</Lawsuit.Info.KeyInformation>
            <Lawsuit.Info.ValueInformation>Não</Lawsuit.Info.ValueInformation>
          </Lawsuit.Info.Container>

          <Lawsuit.Info.Container>
            <Lawsuit.Info.KeyInformation>Valor do Processo:</Lawsuit.Info.KeyInformation>
            <Lawsuit.Info.ValueInformation>R$ 123,00</Lawsuit.Info.ValueInformation>
          </Lawsuit.Info.Container>

          <Lawsuit.Info.Container>
            <Lawsuit.Info.KeyInformation>
              Valor de liquidação:
            </Lawsuit.Info.KeyInformation>
            <Lawsuit.Info.ValueInformation bold>
              R$ 123,00
            </Lawsuit.Info.ValueInformation>
          </Lawsuit.Info.Container>
        </Lawsuit.Content>

        <Footer batchId="" mine />
      </Lawsuit.WrapperContent>
    </Lawsuit.Wrapper>
  );
}
