import styled from 'styled-components';

export const FooterStyle = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 59px 96px;
  background: #EFEDFF;
  border-top: 1px solid #DDDDDD;
  margin-top: 85px;


  li {
    list-style: none;
  }

  .left-content {
    .networking__media {
      margin-top: 63px;
      display: flex;
      align-items: center;
      gap: 18px;

      li {
        background: rgba(22, 8, 131, .13);
        border-radius: 5px;
        padding: 11px;

        cursor: pointer;
      }
    }
  }

  .right-content {
    display: flex;
    flex-direction: column;
    align-self: flex-end;
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
      color: #FFF;
      background: #150882;
      border-radius: 5px;
    }
  }
`;
