import styled from 'styled-components';

export const ListLayoutSingleLawsuits = styled.div`
  max-width: 1366px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  gap: 24px;

  @media (max-width: 964px) {
    grid-template-columns: repeat(2, 1fr);
    row-gap: 48px;
  }

  @media (max-width: 634px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
