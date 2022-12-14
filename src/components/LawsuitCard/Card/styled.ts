import { AnnouncementGender } from '@type/creditbook/Lawsuits/AnnouncementTypes';
import styled, { css } from 'styled-components';

interface HeaderProps {
  category: keyof AnnouncementGender,
  status?: boolean
}

// Utils
const firstLatterUpercase = css`
  ::first-letter {
    text-transform: uppercase;
  }
`;

const headerCategories = {
  civel: '#CECAF3',

  trabalhista: '#F3DFC2',

  precatorio: '#DDF3D2',

  fiscal: '#ffa9a9',
};

// Wrapper

const WrapperCard = styled.article`
  max-height: 364px;
  max-width: 364px;
  flex: 1 1 274px;
  height: 100%;
  width: auto;
  border-radius: 10px;
  box-shadow: 2px 2px 5px rgba(133, 133, 133, 0.1);
  padding-bottom: 15px;
  background: ${({ theme }) => theme.colors.grey[10]};
  @media (max-width: 634px) {
    max-width: 345px;
  }
`;

// Header
const HeaderContainer = styled.header<HeaderProps>`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding: 8px 24px;
  background: ${({ category, status }) => (
    !status
      ? headerCategories[category]
      : '#d9d9d9'
  )};

  button {
    padding: 0;
    border: none;
    background: none;
  }

  > div {
    width: auto;
  }
`;

const HeaderTitle = styled.strong`
  ${firstLatterUpercase};
    font-weight: 500;
    font-size: 18px;
    color: ${({ theme }) => theme.colors.grey[80]};
`;

const PremiumTitle = styled.small`
  font-weight: 500;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.grey[50]};
`;

// Content

const WrapperContent = styled.div`
  padding: 14px;
  padding-bottom: 0;
`;

const ContentCard = styled.main`
  margin-bottom: 12px;
`;

const WrapperInformation = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 12px;
  color: ${({ theme }) => theme.colors.grey[40]};

  & + & {
    margin-top: 8px;
  }
`;

const KeyInformation = styled.strong`
  color: ${({ theme }) => theme.colors.grey[50]};
  font-size: 13px;
`;

const ValueInformation = styled.small`
  font-size: 13px;
  ${({ bold }: { bold?: boolean }) => bold && css`
    font-weight: 500;
    color: ${({ theme }) => theme.colors.grey[50]};
  `}

`;

export const Lawsuit = {
  Header: {
    Container: HeaderContainer,
    Title: HeaderTitle,
    PremiumTitle,
  },
  Wrapper: WrapperCard,
  Content: ContentCard,
  WrapperContent,
  Info: {
    Container: WrapperInformation,
    KeyInformation,
    ValueInformation,
  },
};
