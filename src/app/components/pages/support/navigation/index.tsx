import Link from 'next/link';
import { useRouter } from 'next/router';
import { Nav, NavContent, WrapperListNav } from './styled';

const routes = [
  {
    label: 'Dicas de Segurança',
    link: '/support/safety-tips',
  },

  {
    label: 'Vender Anúncios',
    link: '/support/sell-ads',
  },

  {
    label: 'FAQ',
    link: '/support',
  },

  {
    label: 'Termos de uso',
    link: '/support/terms-of-service',
  },

  {
    label: 'Vídeo tutorial',
    link: '/support/tutorial-video',
  },
];

export default function Navigation() {
  const router = useRouter();
  console.log({ routes });
  console.log(router.pathname);

  return (
    <Nav>
      <WrapperListNav>
        {routes.map((route) => (
          <NavContent key={route.label} isActive={router.pathname === route.link}>
            <Link href={route.link}>
              <a>
                {route.label}
              </a>
            </Link>
          </NavContent>
        ))}
      </WrapperListNav>
    </Nav>
  );
}
