import styled from 'styled-components';

export const Container = styled.div`
  text-align: left;
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
`;
