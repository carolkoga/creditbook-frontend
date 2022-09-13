import { useRouter } from 'next/router';
import useSidebar from '@hooks/useSidebar';
import Link from 'next/link';
import { Power } from 'phosphor-react';
import useAuth from 'hooks/useAuth';
import Image from 'next/image';
import { routes } from './routes';
import {
  Container, Navigation, PhotoProfile, Route, UserInfo,
} from './styled';

interface IProps {
  // eslint-disable-next-line react/require-default-props
  smallDevice?: boolean,
}

export default function CoreSidebar({ smallDevice }: IProps) {
  const { handleSignOut, user } = useAuth();
  const { asPath } = useRouter();
  const { isCollapsed, handleControlSidebar } = useSidebar();
  const defaultPath = ['logged', 'admin'].includes(asPath.split('/')[1])
    ? `/${asPath.split('/')[1]}`
    : '/logged';

  return (
    <Container collapsed={!isCollapsed}>
      {smallDevice && (
        <div className="close__menu">
          <button type="button" onClick={() => handleControlSidebar(false)}>
            Fechar Menu
          </button>
        </div>
      )}
      <UserInfo>
        <PhotoProfile>
          {user?.profilePictureUrl && (
            <div className="wrapperImage">
              <Image src={user.profilePictureUrl} layout="fill" />
            </div>
          )}
        </PhotoProfile>
        {!isCollapsed && <strong>{user?.fullName}</strong>}
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

      <button type="button" className="button__logout" title="Sair" onClick={handleSignOut}>
        <Power size={32} weight="regular" />
      </button>
    </Container>
  );
}
