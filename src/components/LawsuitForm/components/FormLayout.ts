import styled from 'styled-components';

export const FormLayout = styled.form`
  display: grid;
  grid-template-columns: 45% 45%;
  grid-template-rows: repeat(2, auto);
  grid-template-areas: "lawsuitInfo uploadDocuments" "authors defendants";
  gap: 24px 32px;
  position: relative;

  > fieldset {
    &:nth-child(1) {
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
      grid-area: lawsuitInfo;
    }

    &:nth-child(2) {
      grid-area: authors;
    }

    &:nth-child(3) {
      grid-area: uploadDocuments;
    }
  }

  > button {
    width: 105px;
    grid-area: uploadDocuments;

    position: absolute;
    right: 0;
    bottom: -180px;
  }

  @media (max-width: 975px) {
    > fieldset {
      &:nth-child(1) {
        > div {
          &.wrapper--selects {
            width: 100%;
          }
        }
      }
    }
  }

  @media (max-width: 671px) {
    display: flex;
    flex-direction: column;

    > button {
      position: static;
    }
  }


  @media (max-width: 460px) {
    > fieldset {
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
