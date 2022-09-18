import styled from 'styled-components';

export const Container = styled.header`
  grid-area: header;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;
  background: ${({ theme }) => theme.colors.grey[10]};

  button {
    background: none;
    border: none;
  }

  transition: all .35s ease;

  .wrapper__image {
    position: relative;
    width: 177px;
    height: 43px;
  }
`;
