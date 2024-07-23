import styled from 'styled-components';

export const FooterStyle = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 59px 56px;
  background: #efedff;
  border-top: 1px solid #dddddd;
  margin-top: 85px;

  li {
    list-style: none;
  }

  .left-content {
    display: flex;
    flex-direction: column;
    gap: 14px;

    small {
      display: flex;
      align-items: flex-start;
      color: #424242;
      font-size: 13px;
      gap: 8px;
    }

    .networking__media {
      margin-top: 10px;
      display: flex;
      align-items: center;
      gap: 8px;

      li {
        /* background: rgba(22, 8, 131, .13); */
        border-radius: 5px;
        padding: 0px;

        cursor: pointer;
      }
    }
  }

  .right-content {
    display: flex;
    flex-direction: column;
    gap: 14px;

    small {
      display: flex;
      align-items: center;
      color: #424242;
      font-size: 13px;
      gap: 8px;
    }

    .button {
      text-decoration: none;
      padding: 10px;
      font-weight: 500;
      color: ${({ theme }) => theme.colors.grey[10]};
      background: ${({ theme }) => theme.colors.primary.main};
      border-radius: 5px;
    }
  }

  @media screen and (max-width: 900px) {
    padding: 59px 53px;
  }

  @media screen and (max-width: 720px) {
    padding: 59px 42px;
    justify-content: center;
    text-align:center;
    flex-direction: column;
    gap: 50px;

    div{
      width:100%;
      align-items: center;
    }
  }

  @media screen and (max-width: 420px) {
    padding: 59px 10px;
  }

  @media screen and (max-width: 308px) {
    padding: 59px 22px;

    .left-content {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }

  @media screen and (max-width: 236px) {
    .right-content {
      small {
        :first-child {
          display: flex;
          flex-direction: column;
        }
      }
    }

    .left-content {
      .networking__media {
        flex-wrap: wrap;
        justify-content: center;
        ul {
          display: flex;
          align-items: center;
        }
      }
    }
  }
`;
