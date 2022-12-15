import styled from 'styled-components';

export const Container = styled.div`
  background: ${({ theme }) => theme.colors.grey[10]};
  padding: 24px;
  border-radius: 10px;
  position: relative;
  max-width: 500px;
  min-height: 246px;
  width: 100%;

  @media (max-width: 540px) {
    margin-top: 262px;

    .header {
      align-items: center;
    }
  }

  section + section {
    margin-top: 24px !important;
  }

  @media (max-width: 440px) {
    padding: 53px 24px;
  }
`;

interface RadioButtonProps {
  chosen: 'true' | 'false'
}

export const ListContainerPayment = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow-y: scroll;
  max-height: 400px;
  li {
    list-style: none;
  }
`;

export const RadioButton = styled.label<RadioButtonProps>`
  cursor: pointer;
  input {
    visibility: hidden;
  }

  .credit__card-container {
    background: ${({ chosen }) => (chosen !== 'true' ? '#eeee' : 'none')};
  }
`;
