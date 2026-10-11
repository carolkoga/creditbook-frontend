import styled from 'styled-components';

export const Main = styled.main`
  padding: 56px;
  padding-top: 0;
  height: 100%;

  @media (max-width: 1200px) {
    padding: 42px;
    padding-top: 0;
  }

  @media (max-width: 700px) {
    padding: 32px;
    padding-top: 0;
  }

  @media (max-width: 452px) {
    padding: 24px;
    padding-top: 0;
  }

  @media screen and (max-width: 382px) {
    padding: 12px;
    padding-top: 0;
  }
`;

interface WrapperMainAndSidebarProps {
  sidebarCollapsed: boolean,
}

export const WrapperMainAndSidebar = styled.div<WrapperMainAndSidebarProps>`
  display: grid;
  grid-template-columns: ${({ sidebarCollapsed }) => (sidebarCollapsed ? '9.3rem' : '23rem')} 1fr;
  grid-template-rows: 60px 1fr;
  grid-template-areas: 'sidebar header' 'sidebar main';
  height: 100vh;

  @media screen and (max-width: 914px) {
    grid-template-columns: auto;
    grid-template-areas: 'header' 'main';
  }

`;

export const MainWithSideBar = styled(Main)`
  grid-area: main;
  padding: 32px;
  width: 100%;
  overflow-x: scroll;

  @media (max-width: 500px) {
    padding: 32px;
  }

  @media (max-width: 452px) {
    padding: 10px;
    padding-top: 36px;
  }
`;

export const ContainerLayout = styled.div`
  max-width: ${({ customMaxWidth }: { customMaxWidth?: number }) => (
    customMaxWidth ? `${customMaxWidth}px` : '1365px')};
  margin: auto;
  position: relative;
`;

