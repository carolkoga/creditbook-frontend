import styled from 'styled-components';

export const WrapperRadio = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 0.8rem;

  margin-top: 1rem;
`;

export const LabelContainer = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;

  padding: 1rem 2.4rem;

  background: rgba(204, 204, 204, 0.1);
`;

export const ContainerMainFormContent = styled.div`
  display: flex;
  gap: 3.2rem;
`;

export const ProcessInfoContainer = styled.div`
  .wrapper--selects {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2.4rem;
  }
`;
