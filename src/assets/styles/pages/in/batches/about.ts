import styled from 'styled-components';

export const AboutContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;


  .actions {
    margin-top: 8px;
  }

  max-width: 60%;
`;

export const GroupInformation = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  &:last-child {
    strong {
      font-weight: 700;
    }
  }
`;

export const TitleInformation = styled.small`
  color: ${({ theme }) => theme.colors.grey[40]};
  font-weight: 400;
  font-size: 13px;
  line-height: 24px;
`;

export const ContentInformation = styled.strong`
  color: ${({ theme }) => theme.colors.grey[80]};
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
`;
