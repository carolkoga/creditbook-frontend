import styled from 'styled-components';

interface ContainerProps {
  width?: string,
}

interface TitleProps {
  color?: 'warning'
}

const titleColor = {
  warning: '#BD7100',
};

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  padding: 3.2rem;
  background: ${({ theme }) => theme.colors.grey[10]};
  border-radius: 1rem;
  width: ${({ width }) => (!width ? 'auto' : width)};

  margin: auto;

  gap: 2.4rem;
  max-width: 83.1rem;

  transition: all .30s ease;

  .body__modal {
    color: ${({ theme }) => theme.colors.grey[50]};
    font-size: 1.2rem;
    font-weight: 400;

    .red {
      color: ${({ theme }) => theme.colors.others.actions.danger};
    }
  }

  .footer__modal {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 8px;
  }

  @media (max-width: 750px) {
    width: 85%;
  }

  @media (max-width: 318px) {
    padding: 16px;

    .header__modal {
      > h1 {
        font-size: 20px;
      }
    }

    .footer__modal {
      justify-content: flex-start;
      flex-direction: column;
      width: 100%;
      button {
        width: 100%;
      }
    }
  }
`;

export const Title = styled.h2<TitleProps>`
  color: ${({ color, theme }) => (color ? titleColor[color] : theme.colors.grey[50])};
  text-align: left;
`;
