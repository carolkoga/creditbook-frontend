import { MaskInput } from '@components/Input';
import { forwardRef, InputHTMLAttributes } from 'react';

interface IProps extends InputHTMLAttributes<HTMLInputElement> { }

export const InputPhone = forwardRef((props: IProps, ref) => (
  <MaskInput
    {...props}
    inputMode="numeric"
    mask={[{ mask: '(00) 0000-0000' }, { mask: '(00) 00000-0000' }]}
    dispatch={(value, masked) => {
      const number = (masked.value + value).replace(/\D/g, '');

      if (number.length > 10) {
        return masked.compiledMasks[1];
      }

      return masked.compiledMasks[0];
    }}
    ref={ref}
  />
));
