import styled from 'styled-components';

export const Container = styled.form`
  background: #fff;
  padding: 18px;
  border-radius: 10px;
  max-width: 320px;
`;

export const Header = styled.div`
  margin-bottom: 12px;
  h3 {
    font-size: 16px;
  }

  h4 {
    color: ${({ theme }) => theme.colors.grey[40]};
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  button {
    flex: 1;
  }
`;
