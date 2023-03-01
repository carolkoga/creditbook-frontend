import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 3rem;
`;

export const InfoList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 12px;

  @media (max-width: 720px) {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 20px 12px;
  }

  @media (max-width: 530px) {
    display: flex;
    flex-direction: column;
    gap: 24px
  }
`;

export const ContainerInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const TitleInfo = styled.small`
  font-size: 1.3rem;
  color: ${({ theme }) => theme.colors.grey[50]};
`;

export const ContentInfo = styled.div`
  margin-top: 0.5rem;
  padding: 1rem 1.2rem;
  background: rgba(204, 204, 204, 0.2);
  border-radius: 0.6rem;
`;

export const TextInfo = styled.strong`
  font-size: 1.4rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.grey[70]};
`;

export const AuthorList = styled(InfoList)`
  grid-template-columns: repeat(2, 1fr);
  margin-top: 32px;
`;

export const WrapperInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  h3 {
    margin-bottom: 32px;
  }

  ${ContainerInfo}:last-child {
    margin-top: 18px;
  }
`;
