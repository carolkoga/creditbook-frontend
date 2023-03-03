import styled, { css } from 'styled-components';
import { ReactNode } from 'react';

interface FieldsetDeclareProps {
  title: string,
  children: ReactNode,
  center?: boolean,
}

const Container = styled.fieldset<{ center: boolean }>`
  legend {
    margin-bottom: 24px;
  }

  ${({ center }) => center && css`
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      legend {
        width: auto;
        margin: auto;
      }
  `}
`;

export function FieldsetDeclare({ children, title, center = false }: FieldsetDeclareProps) {
  return (
    <Container center={center}>
      <legend>{title}</legend>
      {children}
    </Container>
  );
}
