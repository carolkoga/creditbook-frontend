import useSidebar from '@hooks/useSidebar';
import Image from 'next/image';
import Link from 'next/link';
import { CaretDoubleLeft, CaretDoubleRight } from 'phosphor-react';
import { Container } from './styled';

export default function Header() {
  const { isCollapsed, handleToggleSidebarIsCollapsed } = useSidebar();
  return (
    <Container>
      <button type="button" onClick={() => handleToggleSidebarIsCollapsed()}>
        {isCollapsed
          ? <CaretDoubleRight size={24} />
          : <CaretDoubleLeft size={24} />}
      </button>

      <div className="wrapper__image">
        <Link legacyBehavior href="/">
          <a>
            <Image src="/assets/images/logo.svg" alt="logo" layout="fixed" width="137" height="50" />
          </a>
        </Link>
      </div>
    </Container>
  );
}
