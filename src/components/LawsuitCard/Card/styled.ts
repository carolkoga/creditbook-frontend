import { AnnouncementStatus } from '@type/creditbook';
import { AnnouncementGender } from '@type/creditbook/Lawsuits/AnnouncementTypes';
import styled, { css } from 'styled-components';

interface HeaderProps {
  category: keyof AnnouncementGender;
  status: AnnouncementStatus;
  isSold: boolean;
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

const statusColor = {
  sold: css`
    background: #333d5ad1;
    // #394770b5

    small,
    strong {
      color: #fff;
    }
  `,

  rejected: css`
    background: #d9d9d9;
  `,
};

// Wrapper

const WrapperCard = styled.article`
  max-width: 364px;
  flex: 1 1 274px;
  width: auto;
  max-width: 274px;
  border-radius: 10px;
  box-shadow: 2px 2px 5px rgba(133, 133, 133, 0.1);
  padding-bottom: 0;
  background: ${({ theme }) => theme.colors.grey[10]};
  max-height: fit-content;

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
  background: ${({ category }) => headerCategories[category]};

  background: ${({ isSold }) => isSold && '#4d609e'};

  button {
    padding: 0;
    border: none;
    background: none;
  }

  > div {
    width: auto;
  }

  ${({ status }) => (status === 'sold' || status === 'rejected') && statusColor[status]}
`;

const HeaderTitle = styled.strong<{ isSold: boolean }>`
  ${firstLatterUpercase};
  font-weight: 500;
  font-size: 18px;
`;
// color: ${({ theme, isSold }) =>
//  !isSold ? theme.colors.grey[80] : '#fff'};

const PremiumTitle = styled.small<{ isSold: boolean }>`
  font-weight: 500;
  font-size: 16px;
  /* color: ${({ theme, isSold }) => (!isSold ? theme.colors.grey[50] : '#fff')}; */
`;

// Content

const WrapperContent = styled.div`
  padding: 14px;
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

  small.moreSpace {
    margin-left: -10px;
  }
`;

const KeyInformation = styled.strong`
  color: ${({ theme }) => theme.colors.grey[50]};
  font-size: 13px;
`;

const ValueInformation = styled.small`
  font-size: 12px;
  ${({ bold }: { bold?: boolean }) => bold
    && css`
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
