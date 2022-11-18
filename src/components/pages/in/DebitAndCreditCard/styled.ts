import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 8px;
  padding: 16px 32px;
  flex-wrap: wrap;
  max-width: 480px;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.grey[10]};
  .wrapper__content {
    display: flex;
    align-items: center;
  }

  strong {
    font-size: 15px;
    margin-left: 12px;
  }

  @media (max-width: 467px) {
    flex-direction: column;
    padding-left: 20px;
    padding-right: 20px;
  }
`;

export const WrapperImage = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 8px;
  color: #464646;
`;
