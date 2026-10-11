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
  width: 500px; /* Aumentado em +80px (de 256px para 336px) */
  min-width: 500px;
  max-width: 500px;
  padding: 16px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 12px;
  background-color: #ffffff;
  box-sizing: border-box;

  /* Garante que os botões/links ocupem toda a largura interna e fiquem organizados */
  button,
  a,
  div {
    width: 100%;
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
<<<<<<< HEAD
`;
=======
`;

>>>>>>> b7d3b73 (ajustes)
