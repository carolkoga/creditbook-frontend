import styled from 'styled-components';

export const Container = styled.div`
  background: ${({ theme }) => theme.colors.grey[10]};
  padding: 24px;
  border-radius: 10px;
  position: relative;
  max-width: 500px;
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
  li {
    list-style: none;
  }
`;

export const RadioButton = styled.label<RadioButtonProps>`
  cursor: pointer;
  input {
    display: none
  }
  .credit__card-container {
    background: ${({ chosen }) => (chosen === 'true' ? '#eeee' : 'none')};
  }
`;
