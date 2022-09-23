import styled from 'styled-components';

export const Actions = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 8px;

  small {
    font-size: 10px;
    color: #929292;
    font-weight: 400;
    line-height: 12px;
    margin-top: 6px;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
  width: 100%;

  button, a {
    flex: 1;
  }
`;
