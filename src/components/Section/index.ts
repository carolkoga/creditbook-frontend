import styled from 'styled-components';
import { HeaderSectionProps, SectionContainerProps, SectionTitleProps } from './types';
import { sectionBgColors, sectionTextColors } from './utils';

const SectionContainer = styled.section<SectionContainerProps>`
  display: flex;
  flex-direction: column;
  border-radius: 10px;

  & + & {
    margin-top: 92px;
  }

  ${({ bg }) => (!bg ? 'none' : sectionBgColors[bg])}

  @media screen and (max-width: 452px) {
    padding: 12px;
  }
`;

const TitleSection = styled.h3<SectionTitleProps>`
  font-weight: 500;
  font-size: 30px;
  line-height: 40px;
  ${({ textColor }) => (!textColor ? sectionTextColors.default : sectionTextColors[textColor])};

  @media screen and (max-width: 334px) {
    font-size: 24px;
    line-height: 34px;
  }
`;

const SubTitleSection = styled.span`
  font-weight: 400;
  font-size: 14px;
  line-height: 30px;
  color: ${({ theme }) => theme.colors.grey[50]};
`;

const HeaderSection = styled.header<HeaderSectionProps>`
  display: flex;
  flex-direction: ${({ direction }) => (direction === 'horizontal' ? 'row' : 'column')};
  align-items: ${({ alignItems }) => (!alignItems ? 'flex-start' : alignItems)};
  justify-content: ${({ justifyContent }) => (!justifyContent ? 'flex-start' : justifyContent)};
  gap: ${({ gap }) => (!gap ? '1.6rem' : gap)};
  margin-bottom: 32px;
`;

export const Section = {
  Container: SectionContainer,
  Header: HeaderSection,
  Title: TitleSection,
  Subtitle: SubTitleSection,
};
