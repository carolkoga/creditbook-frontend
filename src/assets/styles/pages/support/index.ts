import styled from 'styled-components';

export const LayoutWithImage = styled.div`
  display: flex;
  gap: 0 256px;

  @media screen and (max-width: 1290px) {
    gap: 0 96px;
  }

  @media screen and (max-width: 1148px) {
    gap: 96px 0;
    flex-direction: column;
    align-items: center;
    margin: auto;
  }
`;

export const WrapperImage = styled.div`
  @media screen and (max-width: 492px) {
    // display: none;
    img{
      width:100%;
      height:auto;
    }
  }
`;

export const ADSContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.grey[30]};
  box-shadow: 2px 2px 10px rgba(35, 31, 32, 0.2);
  border-radius: 15px;
  padding: 50px 96px;
  /* margin: 0 156px; */

  h4 {
    font-weight: 500;
    color: ${({ theme }) => theme.colors.grey[80]};
    font-size: 20px;
    line-height: 30px;
    text-align: center;
    margin-bottom: 40px;
  }

  p {
    max-width: 789px;
    color: ${({ theme }) => theme.colors.grey[50]};
    font-size: 18px;
    line-height: 30px;

    margin-bottom: 44px;
  }

  @media screen and (max-width: 666px) {
    padding: 50px 0px;
    background: none;
    box-shadow: none;

    p {
      font-size: 16px;
      line-height: 24px;
    }
  }
`;
