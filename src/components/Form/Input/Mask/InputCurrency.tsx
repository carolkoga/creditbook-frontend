import { forwardRef } from 'react';
import { NumericInputStyled } from '@components/Input';

export const InputCurrency = forwardRef((props: any, refForward: any) => (
  <NumericInputStyled
    getInputRef={refForward}
    {...props}
    type="text"
    inputMode="numeric"
    thousandSeparator="."
    decimalSeparator=","
    prefix="R$ "
  />
));
