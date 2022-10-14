import { Button } from '@components/Button';
import { CreditCard } from 'phosphor-react';
// import Image from 'next/image';
import React from 'react';
import { Container, WrapperImage } from './styled';

export default function DebitAndCreditCard() {
  return (
    <Container>
      <div className="wrapper__content">
        <WrapperImage>
          <CreditCard size={64} />
        </WrapperImage>
        <strong>****** 8295</strong>
      </div>
      <Button size="small" variant="danger">Excluir</Button>
    </Container>
  );
}
