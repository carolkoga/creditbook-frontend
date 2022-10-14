import styled from 'styled-components';

export const Container = styled.form`
  background: ${({ theme }) => theme.colors.grey[10]};
  border-radius: 10px;
  padding: 22px 32px;
  max-width: 308px;
`;

export const WrapperInput = styled.div`
  display: flex;
  gap: 24px;

  & + & {
    margin-top: 24px;
  }
`;

export const Actions = styled.div`
  margin-top: 32px;
`;
