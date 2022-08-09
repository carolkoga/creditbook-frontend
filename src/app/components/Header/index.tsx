import Image from 'next/image';
import Link from 'next/link';
import {
  Actions, Content, HeaderStyle, Navigation,
} from './styled';

export default function LandingPageHeader() {
  return (
    <HeaderStyle>
      <Content>
        <Image src="/assets/images/logo.svg" width="137px" height="44px" alt="logo" />

        <Navigation>
          <ul>
            <li>
              <Link href="/sobre">
                <a>
                  Sobre
                </a>
              </Link>
            </li>

            <li>
              <Link href="/anuncios">
                <a>
                  Anúncios
                </a>
              </Link>
            </li>

            <li>
              <Link href="/suporte">
                <a>
                  Suporte
                </a>
              </Link>
            </li>

            <li>
              <Link href="/contato">
                <a>
                  Contato
                </a>
              </Link>
            </li>

            <li>
              <Link href="/planos">
                <a>
                  Plano
                </a>
              </Link>
            </li>
          </ul>
        </Navigation>

        <Actions>
          <Link href="/entrar">
            <a>
              Entrar
            </a>
          </Link>

          <Link href="/cadastrar">
            <a>
              Cadastrar
            </a>
          </Link>
        </Actions>
      </Content>
    </HeaderStyle>
  );
}
