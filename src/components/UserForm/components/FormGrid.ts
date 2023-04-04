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

      #nationality, .select__control {
        width: 100%;
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
    gap: 1.2rem;
  }

  @media screen and (max-width: 780px) {
    grid-template-areas: "informationForm" "addressForm" "passwordForm" "actions";
    grid-template-columns: auto;
    gap: 42px;

    .actions {
      justify-content: flex-start;
    }
  }

  @media (max-width: 400px) {
    .actions {
      flex-direction: column-reverse;

      button, a {
        width: 100%;
      }
    }
  }

`;
