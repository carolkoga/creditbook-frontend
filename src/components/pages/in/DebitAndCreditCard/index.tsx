import { Button } from '@components/Button';
import React from 'react';
import { Container, WrapperImage } from './styled';

export default function DebitAndCreditCard() {
  return (
    <Container>
      <div className="wrapper__content">
        <WrapperImage />
        <strong>****** 8295</strong>
      </div>
      <Button size="small" variant="danger">Excluir</Button>
    </Container>
  );
}
