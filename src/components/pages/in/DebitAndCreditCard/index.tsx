import { Button, IButtonProps } from '@components/Button';
import { PaymentParams } from '@type/creditbook/payment';
import { CreditCard } from 'phosphor-react';
// import Image from 'next/image';
import React from 'react';
import { Container, WrapperImage } from './styled';

interface IProps {
  card: PaymentParams,
  buttonProps?: Omit<IButtonProps, 'children'>,
  buttonLabel: string,
}

export default function DebitAndCreditCard({ card, buttonProps, buttonLabel }: IProps) {
  return (
    <Container>
      <div className="wrapper__content">
        <WrapperImage>
          <CreditCard size={64} />
        </WrapperImage>
        <strong>
          ******
          {' '}
          {card.cardNumber.split(' ').at(-1)}
        </strong>
      </div>
      <Button size="small" {...buttonProps}>
        {buttonLabel}
      </Button>
    </Container>
  );
}

DebitAndCreditCard.defaultProps = {
  buttonProps: {},
};
