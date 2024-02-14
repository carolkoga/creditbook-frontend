import useAuth from '@hooks/useAuth';
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
    label: 'Comprar',
    link: '/ads',
  },

  {
    label: 'Vender',
    link: '/support/sell-ads',
  },

  {
    label: 'Planos',
    link: '/plans',
  },

  {
    label: 'Suporte',
    link: '/support',
  },

  {
    label: 'Contato',
    link: '/contact',
  },
];

export default function LandingPageHeader() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
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
        <Link legacyBehavior href="/">
          <a>
            <Image src="/assets/images/logo.svg" width="137" height="50" alt="logo" layout="fixed" />
          </a>
        </Link>

        {!compactMenu.isSmallDevice && (
          <>
            <Navigation>
              <ul>
                {routes.map((route) => (
                  <li key={route.label}>
                    <Link
                      legacyBehavior
                      href={
                      route.label === 'Comprar'
                        ? isAuthenticated
                          ? route.link : '/login'
                        : route.link
}
                    >
                      <a>
                        {route.label}
                      </a>
                    </Link>
                  </li>
                ))}

              </ul>
            </Navigation>

            <Actions>
              {(isAuthenticated && user?.role === 'admin') && (
                <Link legacyBehavior href="/admin/dashboard">
                  <a>
                    Dashboard
                  </a>
                </Link>
              )}

              {(isAuthenticated && user?.role === 'user') && (
                <Link legacyBehavior href="/in/home">
                  <a>
                    Painel do Usuário
                  </a>
                </Link>
              )}

              {!isAuthenticated && (
                <>
                  <Link legacyBehavior href="/login">
                    <a>
                      Entrar
                    </a>
                  </Link>

                  {/* <Link legacyBehavior  href="/sign-up">
                    <a>
                      Cadastrar
                    </a>
                  </Link> */}
                </>
              )}
            </Actions>
          </>
        )}

        {compactMenu.isSmallDevice && (
          <>
            <button type="button" onClick={() => handleToggleVisibilityMenu()} className="action__menu">
              <Image src="/assets/icons/menu.svg" width="32" height="32" layout="fixed" alt="Abri o menu" />
            </button>
            {compactMenu.isVisibleMenu && (
            <CompactMenu>
              <div className="header">
                <button type="button" onClick={() => handleToggleVisibilityMenu()} className="action__menu">
                  <Image src="/assets/icons/close.svg" width="32" height="32" layout="fixed" alt="Fecha o menu" />
                </button>
                <Actions>
                  {isAuthenticated && (
                    <Link legacyBehavior href={user?.role === 'admin' ? '/admin/dashboard' : '/in/home'}>
                      <a>
                        Acessar
                      </a>
                    </Link>
                  )}

                  {!isAuthenticated && (
                  <>
                    <Link legacyBehavior href="/login">
                      <a>
                        Entrar
                      </a>
                    </Link>

                    {/* <Link legacyBehavior  href="/sign-up">
                      <a>
                        Cadastrar
                      </a>
                    </Link> */}
                  </>
                  )}
                </Actions>
              </div>

              <div className="body">
                <Navigation>
                  <ul>
                    {routes.map((route) => (
                      <li key={route.label}>
                        <Link legacyBehavior href={route.link}>
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
