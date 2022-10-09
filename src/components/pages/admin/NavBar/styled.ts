import styled from 'styled-components';

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.6rem;
  background: #fff;
  height: 100%;

  a {
    height: 35px;
  }

  .last__content {
    display: flex;
    align-items: center;
    gap: 24px;
  }

  @media (min-width: 992px) {
    justify-content: flex-end;
    .menu__button {
      display: none;
    }
  }
`;
