import styled from 'styled-components';
import { ReactNode } from 'react';

interface FieldsetDeclareProps {
  title: string,
  children: ReactNode
}

const Container = styled.fieldset`
  legend {
    margin-bottom: 24px;
  }
`;

export function FieldsetDeclare({ children, title }: FieldsetDeclareProps) {
  return (
    <Container>
      <legend>{title}</legend>
      {children}
    </Container>
  );
}
