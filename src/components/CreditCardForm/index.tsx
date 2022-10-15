import { ReactNode } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { IMask } from 'react-imask';

import FormGroup from '@components/FormGroup';
import { Input, MaskInput } from '@components/Input';
import { Container, WrapperInput, Actions } from './styled';

interface IProps {
  children?: ReactNode,
  title?: string | null,
  onSubmit: () => void,
}

export default function CreditCardForm({ children, title, onSubmit }: IProps) {
  const { register, formState: { errors }, control } = useFormContext();
  return (
    <Container onSubmit={onSubmit} noValidate>
      {title && (
        <strong className="title">{title}</strong>
      )}

      <WrapperInput>
        <Controller
          control={control}
          name="cardNumber"
          render={({ field }) => (
            <FormGroup
              direction="vertical"
              error={errors?.cardNumber?.message}
              label={{
                forId: 'card-number',
                title: 'Número do cartão',
              }}
            >
              <MaskInput
                mask={[
                  { mask: '0000 0000 0000 0000' },
                  { mask: '0000 000000 00000' },
                  { mask: '0000 000000 0000' },
                ]}
                dispatch={(appended: string, dynamicMasked: IMask.MaskedDynamic) => {
                  const cardNumber: string = (dynamicMasked.value + appended).replace(/\D/g, '');

                  switch (cardNumber.length) {
                    case 16:
                      return dynamicMasked.compiledMasks[0];

                    case 15:
                      return dynamicMasked.compiledMasks[1];

                    case 14:
                      return dynamicMasked.compiledMasks[2];

                    default:
                      return dynamicMasked.compiledMasks[0];
                  }
                }}
                id="card-number"
                inputMode="numeric"
                {...field}
              />
            </FormGroup>
          )}
        />
      </WrapperInput>

      <WrapperInput>
        <Controller
          control={control}
          name="validate"
          render={({ field }) => (
            <FormGroup
              direction="vertical"
              error={errors?.validate?.message}
              label={{
                forId: 'expiration-date',
                title: 'Validade',
              }}
            >
              <MaskInput
                mask={[{ mask: '00/00' }]}
                id="expiration-date"
                inputMode="numeric"
                {...field}
              />
            </FormGroup>
          )}
        />

        <FormGroup
          direction="vertical"
          error={errors?.secureCode?.message}
          label={{
            forId: 'cv-code',
            title: 'CVV',
          }}
        >
          <Input id="cv-code" {...register('secureCode')} />
        </FormGroup>
      </WrapperInput>

      <WrapperInput>
        <FormGroup
          direction="vertical"
          error={errors?.completeName?.message}
          label={{
            forId: 'card-owner',
            title: 'Nome do titular',
          }}
        >
          <Input id="card-owner" {...register('completeName')} />
        </FormGroup>
      </WrapperInput>

      {children && (
        <Actions>
          {children}
        </Actions>
      )}
    </Container>
  );
}

CreditCardForm.defaultProps = {
  children: null,
  title: null,
};
