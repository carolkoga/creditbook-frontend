import styled from 'styled-components';

export const HeaderStyle = styled.header`
  margin-bottom: 81px;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 56px;
  background: #fff;
`;

export const Navigation = styled.nav`
  width: 50%;
  ul {
    display: flex;
    align-items: center;
    justify-content: space-between;

    li {
      list-style: none;
      a {
        font-weight: 500;
        color: #858585;
        text-decoration: none;
      }
    }
  }
`;

export const Actions = styled.div`
  a {
    padding: 6px 34px;
    background: #5DC8C4;
    border-radius: 5px;
    text-decoration: none;
    color: #fff;
    font-weight: 500;
    font-size: 12px;

    + a {
      margin-left: 8px;
      background: #150882;
    }

  }
`;
