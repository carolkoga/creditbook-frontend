import useSidebar from '@hooks/useSidebar';
import Image from 'next/image';
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
        <Image src="/assets/images/logo.svg" layout="fill" />
      </div>
    </Container>
  );
}
