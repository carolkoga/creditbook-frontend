import styled from 'styled-components';

export const Wrapper = styled.div`
  background: ${({ theme }) => theme.colors.grey[10]};
  border-radius: 15px;
  padding: 31px 46px;
  max-width: 501px;

  margin: auto;

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
      margin-top: 16px;
    }
  }

  @media (max-width: 570px) {
    padding: 34px 24px;
  }

  @media (max-width: 277px) {
    padding: 16px;
    text-align: left;
    form {
      .actions {
        flex-direction: column-reverse;
        gap: 6px;
        margin-left: 0;
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
