// import { ReactNode } from 'react';
// import { useFormContext, Controller } from 'react-hook-form';

// import FormGroup from '@components/FormGroup';
// import { Input, MaskInput } from '@components/Input';
// import { Container, WrapperInput, Actions } from './styled';

import { Button } from '@components/Button';
import { CollectPayment } from '@components/CollectPayment';

interface IProps {
  onClose: any
  onNewCard: any
}

export default function CreditCardForm({ onClose, onNewCard }: IProps) {
  // const { register, formState: { errors }, control } = useFormContext();
  // return (
  //   <Container onSubmit={onSubmit} noValidate>
  //     {title && (
  //       <strong className="title">{title}</strong>
  //     )}

  //     <WrapperInput>
  //       <Controller
  //         control={control}
  //         name="cardNumber"
  //         defaultValue=""
  //         render={({ field }) => (
  //           <FormGroup
  //             direction="vertical"
  //             error={errors?.cardNumber?.message}
  //             label={{
  //               forId: 'card-number',
  //               title: 'Número do cartão',
  //             }}
  //           >
  //             <MaskInput
  //               mask="0000 0000 0000 0000"
  //               id="card-number"
  //               inputMode="numeric"
  //               {...field}
  //             />
  //           </FormGroup>
  //         )}
  //       />
  //     </WrapperInput>

  //     <WrapperInput>
  //       <Controller
  //         control={control}
  //         name="validate"
  //         render={({ field }) => (
  //           <FormGroup
  //             direction="vertical"
  //             error={errors?.validate?.message}
  //             label={{
  //               forId: 'expiration-date',
  //               title: 'Validade',
  //             }}
  //           >
  //             <MaskInput
  //               mask={[{ mask: '00/00' }]}
  //               id="expiration-date"
  //               inputMode="numeric"
  //               {...field}
  //             />
  //           </FormGroup>
  //         )}
  //       />

  //       <FormGroup
  //         direction="vertical"
  //         error={errors?.secureCode?.message}
  //         label={{
  //           forId: 'cv-code',
  //           title: 'CVV',
  //         }}
  //       >
  //         <Input id="cv-code" {...register('secureCode')} />
  //       </FormGroup>
  //     </WrapperInput>

  //     <WrapperInput>
  //       <FormGroup
  //         direction="vertical"
  //         error={errors?.completeName?.message}
  //         label={{
  //           forId: 'card-owner',
  //           title: 'Nome do titular',
  //         }}
  //       >
  //         <Input id="card-owner" {...register('completeName')} />
  //       </FormGroup>
  //     </WrapperInput>

  //     {children && (
  //       <Actions>
  //         {children}
  //       </Actions>
  //     )}
  //   </Container>
  // );

  return (
    <div style={{ padding: '14px' }}>
      <Button onClick={onClose}> Fechar </Button>
      <br />

      <CollectPayment onNewCard={onNewCard} />
    </div>
  );
}

CreditCardForm.defaultProps = {
  children: null,
  title: null,
};
