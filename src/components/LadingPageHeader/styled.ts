import styled from 'styled-components';

export const HeaderStyle = styled.header`
  margin-bottom: 81px;

  @media screen and (max-width: 452px) {
    margin-bottom: 32px;
  }
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 56px;
  background: ${({ theme }) => theme.colors.grey[10]};

  .action__menu {
    border: none;
    border-radius: 8px;
    background: none;
  }

  @media screen and (max-width: 452px) {
    padding: 18px 24px;
  }

  @media screen and (max-width: 382px) {
    padding: 18px 14px;
  }

  @media screen and (max-width: 252px) {
    flex-direction: column;
    justify-content: flex-start;
  }
`;

export const Navigation = styled.nav`
  width: 45%;
  display: flex;
  align-items: center;
  justify-content: center;
  ul {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0;

    li {
      list-style: none;
      a {
        font-weight: 500;
        color: #858585;
        text-decoration: none;
        font-size: 1.6rem;
      }
    }
  }
`;

export const NewLink = styled.a`
  background-color: #30d686 !important;
`;

export const Actions = styled.div`
  a {
    padding: 6px 34px;
    background: ${({ theme }) => theme.colors.secondary.main};
    border-radius: 5px;
    text-decoration: none;
    color: ${({ theme }) => theme.colors.grey[10]};
    font-weight: 500;
    font-size: 12px;

    + a {
      margin-left: 8px;
      background: ${({ theme }) => theme.colors.primary.main};
    }
  }
`;

export const CompactMenu = styled.div`
  position: fixed;
  z-index: 15;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(255, 255, 255);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 80px;
  padding: 80px 0;
  transition: all 0.35s ease-in-out;
  overflow-y: scroll;

  .header {
    display: flex;
    gap: 32px;
    flex-direction: column;
    align-items: center;

    div {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;

      a {
        width: 100%;
        text-align: center;

        + a {
          margin-left: 0;
        }
      }
    }
  }

  .body {
    ${Navigation} {
      width: 100%;
      ul {
        flex-direction: column;
        align-items: center;
        gap: 24px;

        li {
          border-bottom: 3px solid ${({ theme }) => theme.colors.grey[10]};
          transition: all 0.35s ease;
          padding: 8px;
          border-radius: 3px;
          :hover {
            background: #eee;
            border-bottom-color: #7a70d2;
          }
        }
      }
    }
  }
`;
