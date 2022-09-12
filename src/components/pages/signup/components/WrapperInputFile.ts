import styled from 'styled-components';

export const WrapperInputFile = styled.div`
  input {
    display: none;
  }
  width: 40px;
  height: 40px;

  label {
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    padding: 8px;
    background: ${({ theme }) => theme.colors.primary.main};
    color: ${({ theme }) => theme.colors.grey[10]};
    cursor: pointer;

    transition: all 0.3s ease-in;

    &.--with-img {
      padding: 0;
      border: 1px solid ${({ theme }) => theme.colors.primary.main};
      img {
        border-radius: 50%;
        filter: brightness(1.3);

      }
      :hover {
        filter: brightness(1);
      }
    }
    &:hover {
      filter: brightness(1.4);
    }
  }

`;
