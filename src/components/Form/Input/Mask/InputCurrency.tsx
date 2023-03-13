import { forwardRef } from 'react';
import { NumericInputStyled } from '@components/Input';
import { InputAttributes } from 'react-number-format';

export const InputCurrency = forwardRef((props: InputAttributes, refForward: any) => (
  <NumericInputStyled
    getInputRef={refForward}
    {...props}
    type="text"
    inputMode="numeric"
    thousandSeparator="."
    decimalSeparator=","
    prefix="R$ "
    decimalScale={2}
  />
));
