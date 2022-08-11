import styled from 'styled-components';

export const Section = styled.section`
  display: flex;
  flex-direction: column;

  & + & {
    margin-top: 92px;
  }
`;

export const SectionHero = styled(Section)`
  display: grid;
  grid-template-columns: repeat(2, auto);
  gap: 0 127px;

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
    color: #150882;
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

    color: #434242;

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

export const HeaderSection = styled.header`
  margin-bottom: 32px;
`;

export const TitleSection = styled.h3`
  font-weight: 500;
  font-size: 30px;
  line-height: 40px;
  color: #150882;

  @media screen and (max-width: 334px) {
    font-size: 24px;
    line-height: 34px;
  }
`;

export const SubTitleSection = styled.span`
  font-weight: 400;
  font-size: 14px;
  line-height: 30px;
  color: #434242;
`;

export const ContainerVideoAndInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
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
  justify-content: center;
  border: 1px solid #1800E0;
  border-radius: 10px;
  max-width: 141px;
  max-height: 175px;
  height: 100%;
  width: 100%;
  letter-spacing: 0.6%;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.25);
  padding: 28px 10px;
  text-align: center;
  background: #fff;

  span {
    font-weight: 500;
    color: #222222;
    font-size: 13px;
    max-width: 119px;
    width: 100%;
  }

  @media screen and (max-width: 1174px) {
    max-width: 131px;
    max-height: 165px;
  }

  @media screen and (max-width: 502px) {
    max-width: 100px;
    max-height: 145px;
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
