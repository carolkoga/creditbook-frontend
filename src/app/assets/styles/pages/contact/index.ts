import styled from 'styled-components';

export const Form = styled.form`
  background: #f9f9f9;
  box-shadow: 2px 2px 10px rgba(35, 31, 32, 0.2);
  border-radius: 15px;
  padding: 56px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px 0;
  max-width: 579px;
  width: 100%;
  padding-right: 156px;

  > div, input, textarea {
    width: 100%;
  }

  #subject {
    width: 100% !important;
  }

  button {
    align-self: flex-end;
  }

  @media screen and (max-width: 700px) {
    padding: 24px;
  }
`;
