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
  width: 256px;
  padding: 12px;
  border-radius: 3px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
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
