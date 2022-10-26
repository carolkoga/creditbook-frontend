import { MaskInput } from '@components/Input';
import { forwardRef, InputHTMLAttributes } from 'react';

interface IProps extends InputHTMLAttributes<HTMLInputElement> { }

export const InputPhone = forwardRef((props: IProps, ref) => (
  <MaskInput
    {...props}
    ref={ref}
    inputMode="numeric"
    mask={[{ mask: '(00) 00000-0000 ' }, { mask: '(00) 0000-0000' }]}
    dispatch={(appended, dynamicMasked) => {
      const phone: string = (dynamicMasked.value + appended).replace(/\D/g, '');
      return phone.length > 10
        ? dynamicMasked.compiledMasks[0]
        : dynamicMasked.compiledMasks[1];
    }}
  />
));
