import styled from 'styled-components';

interface ContainerProps {
  collapsed: boolean,
}

export const Container = styled.header<ContainerProps>`
  display: flex;
  flex-direction: column;
  gap: 53px 0;
  padding: 58px 22px;
  background: ${({ theme }) => theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.grey[10]};
  grid-area: sidebar;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  overflow-y: scroll;
  width: ${({ collapsed }) => (collapsed ? '23rem' : '9.3rem')};;
  padding: auto;

  .button__logout {
    width: 32px;
    height: 32px;
    border: none;
    background: none;
    color: ${({ theme }) => theme.colors.grey[10]};
    margin: auto;
  }

  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) => theme.colors.grey[30]} ${({ theme }) => theme.colors.primary.main};

  /* Works on Chrome, Edge, and Safari */
  ::-webkit-scrollbar {
    width: 12px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.primary.main};
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.grey[30]};
    border-radius: 20px;
    border: 3px solid ${({ theme }) => theme.colors.primary.main};
  }

  transition: all .35s ease;
`;

export const PhotoProfile = styled.div`
  width: 5rem;
  height: 5rem;
  background: ${({ theme }) => theme.colors.grey[30]};
  border-radius: 50%;
  aspect-ratio: 1;
  .wrapper__image {
    width: 5rem;
    height: 5rem;
    aspect-ratio: 1;
  }
`;

export const UserInfo = styled.div`
  display: flex;
  gap: 14px;
  align-items: center;

  strong {
    font-weight: 500;
    max-width: 12.1rem;
    word-break: keep-all;
    font-size: 12px;
    line-height: 14px;
  }
`;

export const Navigation = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 2.7rem;
  align-items: flex-start;
  justify-content: center;
`;

export const Route = styled.li`
  padding: 6px;
  border-radius: 5px;
  list-style: none;

  a {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 16px;
    text-decoration: none;
    color: ${({ theme }) => theme.colors.grey[10]};
    width: 100%;
    font-weight: 500;
    font-size: 13px;
  }
`;
