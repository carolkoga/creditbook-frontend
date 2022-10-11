import styled from 'styled-components';

export const FormLayout = styled.form`
  /* display: grid;
  grid-template-columns: 45% 45%;
  grid-template-rows: repeat(5, fit-content);
  gap: 24px 32px;
  position: relative; */
  display: flex;
  flex-direction: row;
  gap: 24px;

  .left__content, .right__content {
    display: flex;
    flex-direction: column;
    gap: 24px;
    width: 45%;
  }

  .right__content {
    gap: 72px;
  }

  .left__content > fieldset {
    &:nth-child(1) {
      /* grid-area: 1 / 1 / 1 / 1; */
      display: flex;
      flex-direction: row;
      align-items: center;
      flex-wrap: wrap;
      gap: 12px;

      .wrapper--selects {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        > div {
          width: 45%;
          &:nth-child(5), &:nth-child(6) {
            width: 100%;
            label {
              width: 35%;
              @media (max-width: 460px) {
                width: 100%;
              }
            }
          }
          .selects {
            width: 100%;

          }
        }

        @media (max-width: 1100px) {
          flex-direction: column;

          > div {
            width: 100%;
          }
        }
      }
    }
  }

  > button {
    width: 105px;
    grid-area: 5 / 2 / 5 / 2;
    margin-left: auto;
  }

  @media (max-width: 975px) {
    .left__content > fieldset {
      &:nth-child(1) {
        > div {
          &.wrapper--selects {
            width: 100%;
          }
        }
      }
    }
  }

  @media (max-width: 673px) {
    display: flex;
    flex-direction: column;

    .left__content, .right__content {
      width: 80%;
    }

    > button {
      position: static;
    }
  }

  @media (max-width: 540px) {
    .left__content, .right__content {
      width: 100%;
    }
  }


  @media (max-width: 460px) {
    .left__content > fieldset {
      &:nth-child(1) {
        row-gap: none;
        > div {
          &.wrapper--selects {
            row-gap: none;
          }
        }
      }
    }
  }

`;
