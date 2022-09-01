import styled from 'styled-components';

interface FieldsetProps {
  vertical?: boolean,
}

export const Fieldset = styled.fieldset<FieldsetProps>`
  display: flex;
  flex-wrap: wrap;
  flex-direction: ${({ vertical }) => (!vertical ? 'row' : 'column')};
  align-items: ${({ vertical }) => (!vertical ? 'center' : 'flex-start')};
  justify-content: flex-start;

  gap: 24px;
  border: none;
  legend {
    color: ${({ theme }) => theme.colors.grey[50]};
    font-weight: 500;
    line-height: 24px;
    font-size: 2.4rem;
    margin-bottom: 24px;
  }

  .header {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 12px;
    margin-bottom: 24px;

    legend {
      margin-bottom: 0;
    }

    span {
      color: ${({ theme }) => theme.colors.grey[40]};
    }
  }
`;
