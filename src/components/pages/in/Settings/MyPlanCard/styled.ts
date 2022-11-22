import styled from 'styled-components';

interface TagHeaderProps {
  type: 'announcement' | 'batch',
}

export const Container = styled.div`
  padding: 22px 16px;
  flex: 1 1 256px;
  background: ${({ theme }) => theme.colors.grey[10]};
  border-radius: 10px;
  border: 1px solid #E4E4E4;
  transition: all .45s ease;
  max-width: 326px;
  :hover {
    border: 1px solid ${({ theme }) => theme.colors.primary.main};
  }
`;

export const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const TagHeader = styled.span<TagHeaderProps>`
  background: ${({ type }) => (type === 'announcement' ? '#F79E1B' : '#4EBA0C')};
  width: 84px;
  border-radius: 3px;
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.grey[10]};
  display: flex;
  align-items: center;
  justify-content: center;

`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 10px;
  margin-bottom: 32px;
`;

const InformationContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const InformationTitle = styled.strong`
  font-size: 11px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.primary.main};
`;

const InformationContent = styled.small`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.grey[70]};
`;

export const Footer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 14px;

  button, a {
    padding-left: 24px;
    padding-right: 24px;
    flex: 1 1 132px;
  }


    @media (max-width: 342px) {
      gap: 8px;
    }
`;

export const Information = {
  Container: InformationContainer,
  Title: InformationTitle,
  Content: InformationContent,
};
