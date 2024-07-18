import { Link } from '@components/Button';
import { Section } from '@components/Section';
import { ADSContent } from '@styles/pages/support';
import { Direction } from '@components/Direction';

export default function SellAds() {
  return (
    <Direction alignItems="center">
      <Section.Container>
        <ADSContent>
          <h4>Cadastrar Anúncios</h4>
          <p>
            A plataforma Creditbook disponibiliza aos anunciantes uma alternativa inovadora
            para dar liquidez aos processos judiciais.
          </p>

          <p>
            Após o preenchimento das informações relativas ao processo que deseja negociar,
            milhares de interessados poderão adquirir os créditos anunciados de forma simples
            e rápida.
          </p>

          <p>
            Lembre-se de manter seus anúncios constantemente atualizados para que potenciais
            compradores estejam cientes das condições da ação e valores envolvidos na venda.
            <br />
            <br />
            Vamos começar?
          </p>

          <Link legacyBehavior href="/in/ads/new" size="x-large">
            Anunciar
          </Link>
        </ADSContent>
      </Section.Container>
    </Direction>
  );
}
