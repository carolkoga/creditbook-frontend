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
      > div {
        &.wrapper--selects {
          width: 48%;
          text-align: left;
          label {
            line-height: 13px;
          }

          &:nth-child(7), &:nth-child(8) {
            width: 100%;
            label {
              width: 35%;
            }
          }
        }
      }
      grid-area: lawsuitInfo;
      .selects {
        width: 100%;
      }
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
`;
