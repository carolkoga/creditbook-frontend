import styled from 'styled-components';

export const Container = styled.div`
  text-align: left;
  width: 100%;
  
  .ant-row {
    row-gap: 32px;

    .ant-col {
      h3 {
        margin-bottom: 24px;
        font-weight: 700;
      }
    }

    & + .ant-divider {
      margin-top: 42px;
    }

    @media (max-width: 590px) {
      .ant-space {
        flex-wrap: wrap;
      }
      & {
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
      }
    }
  }
`;

export const Title = styled.strong`
  font-weight: 500;
  font-size: 12px;
`;

export const DescriptionWrapper = styled.div`
  border: 1px solid #ccc;
  width: 100%;
  min-width: 270px;
  max-width: 300px;
  min-height: 490px; /* Garante altura suficiente para o texto e os botões */
  height: 100%;
  padding: 16px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 12px;
  background-color: #ffffff;
  box-sizing: border-border-box;

  /* Estilização para garantir que os botões no final do card fiquem alinhados na base */
  button, 
  a, 
  .actions,
  .buttons-wrapper {
    width: 100%;
  }

  /* Garante que o container de botões fique sempre fixado no rodapé interno do card */
  > div:last-child,
  > button:last-of-type {
    margin-top: auto;
  }
`;

export const Description = styled.p`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  font-size: 13px;
  margin-bottom: 0;

  ::first-letter {
    text-transform: uppercase;
  }

  @media (max-width: 590px) {
    width: fit-content;
  }
`;