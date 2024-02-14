import Link from 'next/link';
import { useRouter } from 'next/router';
import { Nav, NavContent, WrapperListNav } from './styled';

interface IProps {
  routes: {
    label: string,
    link: string,
  }[],
}

export default function NavigationTab({ routes }: IProps) {
  const router = useRouter();

  return (
    <Nav>
      <WrapperListNav>
        {routes.map((route) => (
          <NavContent key={route.label} isActive={router.pathname === route.link}>
            <Link legacyBehavior href={route.link}>
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
