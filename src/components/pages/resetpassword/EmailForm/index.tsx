import { Button } from '@components/Button';
import FormGroup from '@components/FormGroup';
import { Input } from '@components/Input';
import { useFormContext } from 'react-hook-form';
import { FormLayout } from '../styled';
import { CommonPropsType } from '../types';

export function EmailForm({ isDisabled, isLoading, onSubmit }: CommonPropsType) {
  const { register, formState: { errors } } = useFormContext();
  return (
    <FormLayout noValidate onSubmit={onSubmit}>
      <FormGroup
        direction="vertical"
        error={errors?.email?.message}
        label={{
          forId: 'your-email',
          title: 'E-mail',
        }}
      >
        <Input
          {...register('email')}
          type="email"
          inputMode="email"
          id="your-email"
        />
      </FormGroup>

      <div className="actions">
        <Button type="submit" size="large" disabled={isDisabled} isLoading={isLoading}>
          {!isLoading && 'Enviar E-mail'}
          {isLoading && 'Enviando...'}
        </Button>
      </div>
    </FormLayout>
  );
}
