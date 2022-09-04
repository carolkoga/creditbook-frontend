import { useRouter } from 'next/router';
import useSidebar from 'app/hooks/useSidebar';
import Link from 'next/link';
import { Power } from 'phosphor-react';
import { routes } from './routes';
import {
  Container, Navigation, PhotoProfile, Route, UserInfo,
} from './styled';

export default function Sidebar() {
  const { asPath } = useRouter();
  const { isCollapsed } = useSidebar();
  const defaultPath = ['logged', 'admin'].includes(asPath.split('/')[1])
    ? `/${asPath.split('/')[1]}`
    : '/logged';

  return (
    <Container collapsed={!isCollapsed}>
      <UserInfo>
        <PhotoProfile />
        {!isCollapsed && <strong>Matheus Jeronimo Todao</strong>}
      </UserInfo>

      <Navigation>
        {routes.map((route) => (
          <Route key={route.label}>
            <Link href={`${defaultPath}${route.link}`}>
              <a>
                {route.icon}
                {!isCollapsed && route.label}
              </a>
            </Link>
          </Route>
        ))}
      </Navigation>

      <button type="button" className="button__logout" title="Sair">
        <Power size={32} weight="regular" />
      </button>
    </Container>
  );
}
