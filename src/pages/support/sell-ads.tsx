import Link from 'next/link';
import { Button } from '@components/Button/styled';
import { HeaderSection, Section, TitleSection } from '@styles/pages/home';
import { ADSContent } from '@styles/pages/support';
import Navigation from '@components/pages/support/navigation';

export default function SellAds() {
  return (
    <>
      <Navigation />
      <Section>
        <HeaderSection>
          <TitleSection>Vender Anúncios</TitleSection>
        </HeaderSection>

        <ADSContent>
          <h4>Cadastrar Anúncios</h4>
          <p>
            A plataforma Creditbook disponibiliza aos anunciantes uma alternativa inovadora
            para dar liquidez aos processos judiciais.
            <br />
            <br />
            Após o preenchimento das informações relativas ao processo que deseja negociar,
            milhares de interessados poderão adquirir os créditos anunciados de forma simples
            e rápida.
            <br />
            Lembre-se de manter seus anúncios constantemente atualizados para que potenciais
            compradores estejam cientes das condições da ação e valores envolvidos na venda.
            Vamos começar?
          </p>

          <Link href="/cadastrar">
            <Button as="a" size="x-large">
              Cadastrar
            </Button>
          </Link>
        </ADSContent>
      </Section>
    </>
  );
}
