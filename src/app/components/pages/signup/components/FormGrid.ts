import styled from 'styled-components';

export const FormGrid = styled.form`
  display: grid;
  grid-template-areas: "informationForm addressForm" "informationForm passwordForm" ". actions";
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, auto);
  gap: 18px;
  width: min-content;
  width: fit-content;

  fieldset {
    > div {
      width: max-content;
    }
    &:nth-child(1) {
      grid-area: informationForm;

      > div {
        width: 80%;
      }
    }

    &:nth-child(0) {
      grid-area: addressForm;
      > div {
        width: 100%;
      }
    }

    &:nth-child(3) {
      grid-area: passwordForm;
      > div {
        width: 100%;
      }
    }
  }

  .actions {
    grid-area: actions;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
`;
