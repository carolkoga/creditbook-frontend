import styled, { CSSProperties } from 'styled-components';

export interface ListLayoutSingleLawsuitsProps {
  alignItems?: CSSProperties['alignItems'],
  justifyContent?: CSSProperties['justifyContent']
}

export const ListLayoutSingleLawsuits = styled.div<ListLayoutSingleLawsuitsProps>`
  /* max-width: 1366px; */
  width: 100%;
  display: flex;
  align-items: ${({ alignItems }) => (!alignItems ? 'flex-start' : alignItems)};
  justify-content: ${({ justifyContent }) => (!justifyContent ? 'flex-start' : justifyContent)};



  /* grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto; */
  flex-direction: row;
  flex-wrap: wrap;
  gap: 24px;
  /*
  @media (max-width: 1150px) {
    grid-template-columns: repeat(2, 1fr);
    row-gap: 48px;
  } */

  /* @media (max-width: 634px) {
    grid-template-columns: repeat(1, 1fr);
  } */
`;
