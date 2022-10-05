import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: 20px 32px;
  border-radius: 15px;
  box-shadow: 2px 4px 10px rgba(133, 133, 133, 0.2);
  background: ${({ theme }) => theme.colors.grey[20]};
  min-height: 156px;

  @media (max-width: 700px) {
    gap: 32px 0;
  }
`;

export const LeftContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  max-width: 48%;
  text-align: left;
  @media (max-width: 648px) {
    max-width: 100%;
  }

`;

export const Title = styled.strong`
  color: ${({ theme }) => theme.colors.grey[80]};
  font-size: 18px;
  margin-bottom: 16px;

  &::first-letter {
    text-transform: uppercase;
  }
`;

export const Description = styled.p`
  color: ${({ theme }) => theme.colors.grey[40]};
  font-size: 13px;
  max-height: 48px;
  text-overflow: clip;
  overflow-y: scroll;
  text-align: justify;
  word-break: break-all;

  &::first-letter {
    text-transform: uppercase;
  }
`;

export const QuantityADS = styled.small`
  color: ${({ theme }) => theme.colors.grey[50]};
  font-size: 13px;
  display: flex;
  flex-wrap: wrap;

`;

export const RightContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 14px;
  text-align: left;

  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    align-items: center;
  }

  @media (max-width: 700px) {
    align-items: flex-start;
  }
`;

export const BatchIncome = styled.small`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.grey[50]};
`;
