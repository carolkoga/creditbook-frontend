import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  Actions, CompactMenu, Content, HeaderStyle, Navigation,
} from './styled';

const routes = [
  {
    label: 'Sobre',
    link: '/about',
  },

  {
    label: 'Anúncios',
    link: '/ads',
  },

  {
    label: 'Suporte',
    link: '/support',
  },

  {
    label: 'Contato',
    link: '/contact',
  },

  {
    label: 'Planos',
    link: '/plans',
  },
];

export default function LandingPageHeader() {
  const router = useRouter();
  const [compactMenu, setCompactMenu] = useState<{
    isSmallDevice: boolean,
    isVisibleMenu: boolean,
  }>({
    isSmallDevice: false,
    isVisibleMenu: false,
  });

  function handleToggleVisibilityMenu() {
    setCompactMenu((lastState) => ({
      ...lastState,
      isVisibleMenu: !lastState.isVisibleMenu,
    }));
  }

  useEffect(() => {
    function handleResize() {
      setTimeout(() => {
        setCompactMenu((lastState) => ({
          ...lastState,
          isSmallDevice: window.innerWidth <= 900,
        }));
      }, 800);
    }

    setCompactMenu((lastState) => ({
      ...lastState,
      isSmallDevice: window.innerWidth <= 900,
    }));

    if (router.pathname) {
      setCompactMenu((lastState) => ({
        ...lastState,
        isVisibleMenu: false,
      }));
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [router.pathname]);

  return (
    <HeaderStyle>
      <Content>
        <Link href="/">
          <a>
            <Image src="/assets/images/logo.svg" width="137px" height="44px" alt="logo" />
          </a>
        </Link>

        {!compactMenu.isSmallDevice && (
          <>
            <Navigation>
              <ul>
                {routes.map((route) => (
                  <li key={route.label}>
                    <Link href={route.link}>
                      <a>
                        {route.label}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </Navigation>

            <Actions>
              <Link href="/login">
                <a>
                  Entrar
                </a>
              </Link>

              <Link href="/sign-up">
                <a>
                  Cadastrar
                </a>
              </Link>
            </Actions>
          </>
        )}

        {compactMenu.isSmallDevice && (
          <>
            <button type="button" onClick={() => handleToggleVisibilityMenu()} className="action__menu">
              <Image src="/assets/icons/menu.svg" width="32px" height="32px" layout="fixed" alt="Abri o menu" />
            </button>
            {compactMenu.isVisibleMenu && (
            <CompactMenu>
              <div className="header">
                <button type="button" onClick={() => handleToggleVisibilityMenu()} className="action__menu">
                  <Image src="/assets/icons/close.svg" width="32px" height="32px" layout="fixed" alt="Fecha o menu" />
                </button>
                <Actions>
                  <Link href="/login">
                    <a>
                      Entrar
                    </a>
                  </Link>

                  <Link href="/sign-up">
                    <a>
                      Cadastrar
                    </a>
                  </Link>
                </Actions>
              </div>

              <div className="body">
                <Navigation>
                  <ul>
                    {routes.map((route) => (
                      <li key={route.label}>
                        <Link href={route.link}>
                          <a>
                            {route.label}
                          </a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Navigation>
              </div>
            </CompactMenu>
            )}
          </>
        )}
      </Content>
    </HeaderStyle>
  );
}
