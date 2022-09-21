import styled from 'styled-components';

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.grey[10]};
  max-width: 730px;
  width: 100%;

  padding: 41px 44px;
  border-radius: 15px;
  margin: auto;

  div:first-child {
    strong {
      :first-child {
        font-weight: 700;
        font-size: 18px;
      }
    }

    small {
      font-weight: 500;
      font-size: 12px;
      span {
        font-weight: 400;
      }
    }

  }

  .uploads {
    margin: 24px 0;
    display: flex;
    flex-direction: column;
    gap: 24px;
    .content {
      flex-wrap: wrap;
    }
  }
`;
