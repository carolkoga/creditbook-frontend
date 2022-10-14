import { Link, Button } from '@components/Button';
import {
  Container, Footer, TagHeader, Header, Body, Information,
} from './styled';

export default function MyPlanCard() {
  return (
    <Container>
      <Header>
        <TagHeader type="batch">Em Lote</TagHeader>
      </Header>

      <Body>
        <Information.Container>
          <Information.Title>Número do processo</Information.Title>
          <Information.Content>51605485620228192646</Information.Content>
        </Information.Container>

        <Information.Container>
          <Information.Title>Plano</Information.Title>
          <Information.Content>R$ 69.90 + 8%</Information.Content>
        </Information.Container>

        <Information.Container>
          <Information.Title>Premium</Information.Title>
          <Information.Content>R$ 69.90</Information.Content>
        </Information.Container>
      </Body>

      <Footer>
        <Link as="a" size="x-large" variant="secondary" href="/in/ads/123">
          Sobre Anúncio
        </Link>

        <Button>
          Trocar cartão
        </Button>
      </Footer>
    </Container>
  );
}
