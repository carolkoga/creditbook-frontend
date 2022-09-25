import styled from 'styled-components';

export const Wrapper = styled.div`
  background: ${({ theme }) => theme.colors.grey[10]};
  border-radius: 15px;
  padding: 31px 46px;
  max-width: 501px;
  margin-top: 132px;

  form {
    display: flex;
    flex-direction: column;
    gap: 16px;
    .actions {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      margin-left: auto;
      gap: 8px;
      button {
        margin-top: 16px;
      }
    }
  }
`;

export const ContentHeader = styled.div`
  margin-bottom: 32px;
  color: ${({ theme }) => theme.colors.grey[40]};
  strong {
    font-size: 20px;
    text-align: left;
    color: ${({ theme }) => theme.colors.grey[80]};

  }

  p {
    margin: 16px 0;
    line-height: 24px;
    font-size: 13px;

  }

  > div {
    &, small {
      font-size: 13px;
      line-height: 16px;
    }

    ol {
      margin-top: 12px;
      list-style: none;
    }
  }
`;
