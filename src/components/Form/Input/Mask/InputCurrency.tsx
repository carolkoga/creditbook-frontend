import { NumericInputStyled } from '@components/Input';
import { forwardRef } from 'react';

export const InputCurrency = forwardRef((props: any, refForward: any) => (
  <NumericInputStyled
    getInputRef={refForward}
    {...props}
    type="text"
    value={props.value as any}
    inputMode="numeric"
    thousandSeparator="."
    decimalSeparator=","
    prefix="R$"
  />
));
