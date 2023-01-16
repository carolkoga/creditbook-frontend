import { ReactElement } from 'react';
import { StyledComponent } from 'styled-components';
import { Container, ErrorMessage, Label } from './styled';

interface FormGroupProps {
  children: ReactElement | StyledComponent<any, any, any>,
  direction?: 'vertical' | 'horizontal',
  label?: {
    title: string,
    forId: string,
  } | null,
  error?: string | any,
  alignCenter?: boolean
}

export default function FormGroup({
  children, direction, label, error, alignCenter,
}: FormGroupProps) {
  const childrenType = children.type.target ? children.type.target : children.type;

  return (
    <Container
      hasError={!!error}
      noAlign={alignCenter || ['textarea'].includes(childrenType)}
      direction={direction}
    >
      <div className="content">
        {label?.title && (
          <Label htmlFor={label.forId}>
            {label.title}
          </Label>
        )}
        {children}
      </div>

      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Container>
  );
}

FormGroup.defaultProps = {
  label: null,
  error: null,
  direction: 'vertical',
  alignCenter: false,
};
