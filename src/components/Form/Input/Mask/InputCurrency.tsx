import { MaskInput } from '@components/Input';
import { forwardRef, InputHTMLAttributes } from 'react';

interface IProps extends InputHTMLAttributes<HTMLInputElement> { }

export const InputCurrency = forwardRef((props: IProps, ref) => (
  <MaskInput
    {...props}
    ref={ref}
    inputMode="numeric"
    mask="R$ num"
    lazy={false}
    blocks={{
      num: {
        mask: Number,
        max: 999999999999999,
        thousandsSeparator: '.',
      },
    }}
  />
));
