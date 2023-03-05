import { MaskInput } from '@components/Input';
import { forwardRef, InputHTMLAttributes } from 'react';

interface IProps extends InputHTMLAttributes<HTMLInputElement> { }

export const InputCPForCNPJ = forwardRef((props: IProps, ref) => (
  <MaskInput
    {...props}
    ref={ref}
    inputMode="numeric"
    mask={[
      {
        mask: '000.000.000-00', overwrite: true,
      },
      { mask: '00.000.000/0000-00', overwrite: true },
    ]}
  />
));
