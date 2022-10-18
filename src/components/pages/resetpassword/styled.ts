import styled from 'styled-components';

export const FormLayout = styled.form`
  margin: auto;
  max-width: 31.3rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;

  .actions {
    margin-top: 12px;
    width: 100%;
    button {
      width: 100%;
    }
  }
`;
