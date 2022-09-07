import styled from 'styled-components';

export const Main = styled.main`
  padding: 56px;
  padding-top: 0;
  height: 100%;

  @media screen and (max-width: 1200px) {
    padding: 42px;
    padding-top: 0;
  }

  @media screen and (max-width: 700px) {
    padding: 32px;
    padding-top: 0;
  }

  @media screen and (max-width: 452px) {
    padding: 24px;
    padding-top: 0;
  }

  @media screen and (max-width: 382px) {
    padding: 14px;
    padding-top: 0;
  }

  @media screen and (max-width: 300px) {
    padding: 18px;
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

`;

export const MainWithSideBar = styled(Main)`
  grid-area: main;
  padding: 32px;
  width: 100%;
  overflow-x: scroll;

  @media screen and (max-width: 1200px) {
    padding: 32px;
  }
`;
