import { MaskInput } from '@components/Input';
import { forwardRef, InputHTMLAttributes } from 'react';

interface IProps extends InputHTMLAttributes<HTMLInputElement> { }

export const InputPhone = forwardRef((props: IProps, ref) => (
  <MaskInput
    {...props}
    ref={ref}
    inputMode="numeric"
    mask="'(00) 0000-0000"
  />
));
