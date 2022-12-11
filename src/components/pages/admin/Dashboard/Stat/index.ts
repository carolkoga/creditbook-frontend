import styled from 'styled-components';

const List = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  width: 100%;
  gap: 56px;
  flex-wrap: wrap;
  flex-basis: 1;

  @media (max-width: 790px) {
    gap: 32px;
  }
`;

const Container = styled.div`
  flex: 1 1 183px;
  border-radius: 6px;
  background: #fff;
  box-shadow: -3px 2px 4px rgba(0, 0, 0, 0.17);

  border-bottom: 1px solid ${({ theme }) => theme.colors.primary.main};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px;
  gap: 10px;

  text-align: center;
`;

const Text = styled.span`
  font-weight: 500;
  font-size: 32px;
  color: ${({ theme }) => theme.colors.primary.main};
`;

const Label = styled.p`
  font-weight: 500;
  font-size: 32px;
  color: ${({ theme }) => theme.colors.grey[50]};
  font-size: 13px;
`;

export const Stat = {
  List,
  Container,
  Text,
  Label,
};
