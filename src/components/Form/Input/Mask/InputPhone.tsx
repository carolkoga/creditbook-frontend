import { MaskInput } from '@components/Input';
import { forwardRef, InputHTMLAttributes } from 'react';

interface IProps extends InputHTMLAttributes<HTMLInputElement> { }

export const InputPhone = forwardRef((props: IProps, ref) => (
  <MaskInput
    {...props}
    inputMode="numeric"
    mask={[{ mask: '(00) 00000-0000' }]}
    ref={ref}
  />
));
