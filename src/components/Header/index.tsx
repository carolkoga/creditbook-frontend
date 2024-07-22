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
        {isCollapsed ? (
          <CaretDoubleRight size={24} />
        ) : (
          <CaretDoubleLeft size={24} />
        )}
      </button>

      <div className="wrapper__image">
        <Link legacyBehavior href="/">
          <a>
            <Image
             src="/assets/images/logo_creditbook.svg"
             width="256"
             height="50"
             alt="Logo"
             layout="fixed"
            />
          </a>
        </Link>
      </div>
    </Container>
  );
}
