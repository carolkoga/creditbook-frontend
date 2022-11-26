import { Section } from '@components/Section';
import styled from 'styled-components';

export const SectionHero = styled(Section.Container)`
  display: grid;
  grid-template-columns: repeat(2, auto);
  gap: 0 127px;
  margin-bottom: 32px;

  @media screen and (max-width: 434px) {
    gap: 0;
  }
`;

export const ContentHero = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  h1 {
    color: ${({ theme }) => theme.colors.primary.main};
    font-size: 25px;
    line-height: 40px;

    &, strong {
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

  h1, h2 {
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
`;

export const WrapperImageHero = styled.div`
  width: 527px;
  height: 430px;
  position: relative;

  @media screen and (max-width: 1027px) {
    width: 427px;
    height: 330px;
  }

  @media screen and (max-width: 900px) {
    display: none;
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
  max-width: 141px;
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
    font-size: 13px;
    max-width: 119px;
    width: 100%;
  }

  @media screen and (max-width: 1174px) {
    max-width: 131px;
    max-height: 165px;
  }

  @media screen and (max-width: 502px) {
    max-width: 124px;
    max-height: 180px;
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
