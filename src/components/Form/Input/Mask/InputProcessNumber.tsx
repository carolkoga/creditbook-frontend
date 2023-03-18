import { MaskInput } from '@components/Input';
import { forwardRef, InputHTMLAttributes } from 'react';

interface IProps extends InputHTMLAttributes<HTMLInputElement> { }

export const InputProcessNumber = forwardRef((props: IProps, ref) => (
  <MaskInput
    {...props}
    ref={ref}
    mask="0000000-00.0000.0.00.0000"
  />
));
