import styled from 'styled-components';

export const Container = styled.article`
  background: ${({ theme }) => theme.colors.grey[10]};
  box-shadow: 2px 4px 10px rgba(133, 133, 133, 0.2);
  border-radius: 15px;
  max-width: 341px;
  width: 100%;
  height: 518px;

  & > header {
    background: ${({ theme }) => theme.colors.primary.main};
    color: ${({ theme }) => theme.colors.grey[10]};
    border-radius: 10px 10px 0px 0px;
    padding: 18px 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 84px;
    h2 {
      font-size: 20px;
      text-align: center;
      color: ${({ theme }) => theme.colors.grey[10]};
    }
  }
`;

export const WrapperContent = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #F5F5F7;
  box-shadow: 2px 4px 10px rgba(133, 133, 133, 0.2);
  border-radius: 15px;
  padding: 32px;
  margin: 48px 32px;

  .body__header, .body__header > div, footer{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .body__header {
    h3, h4, span {
      font-weight: 700;
      font-size: 20px;
      line-height: 29px;
      color: ${({ theme }) => theme.colors.grey[50]};
    }

    > a {
      margin-top: 12px;
      color: #929292;
      text-decoration: none;
      font-size: 13px;

      font-weight: 500;
    }
  }

  footer {
    margin-top: 53px;

    > small {
      color: #929292;
      text-decoration: none;
      font-size: 13px;

      font-weight: 500;
      margin-bottom: 37px;
      max-width: 258px;
      text-align: center;
    }

    > a {
      background: ${({ theme }) => theme.colors.secondary.main};
      border-radius: 5px;
      padding: 5px 15px;
    }
  }
`;
