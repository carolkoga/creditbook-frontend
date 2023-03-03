import styled from 'styled-components';

export const ContentFormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 2.4rem;

  > div {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .content > div {
    width: 100%;
  }

  @media (max-width: 740px) {
    display: flex;
    flex-direction: column;
  }
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.2rem;
`;
