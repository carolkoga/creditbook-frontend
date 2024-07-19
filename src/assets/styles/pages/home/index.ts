import { Section } from '@components/Section';
import styled from 'styled-components';

import { light } from '@styles/themes/light';

export const PreSignupWrapper = styled.div<{ isVisible: boolean }>`
  display: ${(props) => (props.isVisible ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;

  height: 100%;
  width: 100%;
`;

export const SectionHero = styled(Section.Container)<{ single: boolean }>`
  padding: 90px 10px;
  display: ${(props) => (props.single ? 'flex' : 'grid')};
  align-items: center;
  justify-content: center;

  grid-template-columns: repeat(2, 1fr);
  gap: 0 10px;
  margin-bottom: 32px;

  background-color: ${light.colors.primary.main};

  @media screen and (max-width: 434px) {
    gap: 0;
  }

  @media screen and (max-width: 1000px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 40px 10px;

    gap: 32px;
  }
`;

export const ContentHero = styled.div<{ single: boolean }>`
  padding: 0px 80px;

  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.single ? 'center' : 'left')};
  justify-content: center;

  gap: 10px;

  div.actions {
    z-index: 50;

    max-width: 100%;
    width: ${(props) => (props.single ? '100%' : '80%')};

    display: flex;
    align-items: start;
    justify-content: space-between;

    margin-top: -18%;

    img {
      width: ${(props) => (props.single ? '200px' : '40%')};

      cursor: pointer !important;
    }
  }

  h1 {
    color: ${({ theme }) => theme.colors.primary.main};
    font-size: 25px;
    line-height: 40px;

    &,
    strong {
      font-weight: 500;
    }

    strong {
      display: block;
    }
  }

  h2 {
    font-weight: 400;
    font-size: 18px;
    line-height: 30px;

    color: ${({ theme }) => theme.colors.grey[50]};

    margin: 28px 0;
  }

  h1,
  h2 {
    max-width: 478px;
  }

  @media screen and (max-width: 334px) {
    h1 {
      font-size: 24px;
      line-height: 34px;
    }

    h2 {
      font-size: 16px;
      line-height: 24px;
    }
  }

  @media screen and (max-width: 1000px) {
    height: 420px;

    padding: 20px;
    align-items: center;
    justify-content: space-between;

    div.actions {
      justify-content: center;
      gap: 12%;

      img {
        width: 26%;
      }
    }
  }

@media screen and (max-width: 768px) {
    height: 400px;

    div.actions img {
      width: 40%;
    }    
  }

  @media screen and (max-width: 675px) {
    height: 400px;
  }

  @media screen and (max-width: 600px) {    

    div.actions img {
      width: 55%;
    }    
  }
  
  @media screen and (max-width: 390px) {
    height: 250px;

    div.actions img {
      width: 55%;
    }    
  }
`;

export const WrapperImageHero = styled.div`
  margin-top: -14px;

  width: 527px;
  height: 430px;
  position: relative;

  @media screen and (max-width: 1000px) {
    width: 100%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    margin: auto;
  }

  @media screen and (max-width: 675px) {
    img {
      display: block;
      width: 100%;
      height: auto;
    }
  }
`;

export const RelativeImageWrapper = styled.div`
  position: relative;

  .pre-sign-up-form {
    position: absolute;
    top: 75px;
    left: 10%;
  }
`;

export const ContainerVideoAndInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1250px;
  height: 100%;
  width: 100%;

  @media screen and (max-width: 1000px) {
    flex-direction: column;
    justify-content: flex-start;
    gap: 24px 0;
  }
`;

export const WrapperInfoCard = styled.ul`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 24px 18px;
  flex-wrap: wrap;
  max-width: 567px;

  @media screen and (max-width: 1000px) {
    justify-content: center;
  }
`;

export const InfoCard = styled.li`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 18px 0;
  align-items: center;
  justify-content: space-between;
  border: 1px solid ${({ theme }) => theme.colors.primary.main};
  border-radius: 10px;
  max-width: 176px;
  max-height: 175px;
  /* height: 100%; */
  width: 100%;
  letter-spacing: 0.6%;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.25);
  padding: 18px 10px;
  text-align: center;
  background: ${({ theme }) => theme.colors.grey[10]};

  span {
    font-weight: 500;
    color: ${({ theme }) => theme.colors.grey[50]};
    font-size: 16px;    
    width: 100%;
  }

  @media screen and (max-width: 1174px) {
    max-width: 131px;
    max-height: 165px;
  }

  @media screen and (max-width: 502px) {
    max-width: 154px;
    height: 180px;
  }
`;

export const Direction = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0 24px;

  @media screen and (max-width: 472px) {
    flex-direction: column;
    gap: 24px;
    align-items: flex-start;
  }
`;
