import styled, { css } from 'styled-components';

export const Nav = styled.nav`
  margin-bottom: 42px;
  /* margin-left: 46px; */
`;

export const WrapperListNav = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 18px;
`;

export const NavContent = styled.li`
  list-style: none;
  a {
    font-weight: 500;
    font-size: 14px;
    padding: 12px;
    border-bottom: ${({ theme }) => theme.colors.grey[10]};
    color: #7A70D2;
    text-decoration: none;
    transition: all .25s ease-in;
    border-radius: 3px;
    text-align: center;

    :hover {
      background: #eee;
      border-bottom: 3px solid #7A70D2;
    }

    ${({ isActive }: { isActive: boolean }) => isActive && css`
      border-bottom: 3px solid #7A70D2;
      color: #7A70D2;
      background: #eee;

    `};
  }
`;
