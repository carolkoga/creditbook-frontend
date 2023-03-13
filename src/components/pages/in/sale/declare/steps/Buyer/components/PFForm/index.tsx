import FormGroup from '@components/FormGroup';
import { Input, MaskInput } from '@components/Input';
import { FieldDeclareFormTypes } from '@type/creditbook/sale/declare';
import { Controller, useFormContext } from 'react-hook-form';

export function PFForm() {
  const { register, control, formState: { errors } } = useFormContext<Pick<FieldDeclareFormTypes, 'buyer'>>();

  return (
    <div>
      <h2>Informações</h2>

      <FormGroup
        error={errors?.buyer?.pf?.name?.message}
        label={{ title: 'Nome Completo', forId: 'name' }}
      >
        <Input id="name" {...register('buyer.pf.name')} />
      </FormGroup>

      <Controller
        control={control}
        name="buyer.pf.cpf"
        render={({ field }) => (
          <FormGroup
            error={errors?.buyer?.pf?.cpf?.message}
            label={{ title: 'CPF', forId: 'cpf' }}
          >
            <MaskInput mask="000.000.000-00" id="cpf" {...field} />
          </FormGroup>
        )}
      />

      <FormGroup
        error={errors?.buyer?.pf?.rg?.message}
        label={{ title: 'RG', forId: 'rg' }}
      >
        <Input id="rg" {...register('buyer.pf.rg')} />
      </FormGroup>

      <FormGroup
        error={errors?.buyer?.pf?.email?.message}
        label={{ title: 'E-mail', forId: 'email' }}
      >
        <Input id="email" {...register('buyer.pf.email')} />
      </FormGroup>

      <Controller
        control={control}
        name="buyer.pf.cellphone"
        render={({ field }) => (
          <FormGroup
            error={errors?.buyer?.pf?.cellphone?.message}
            label={{ title: 'Telefone', forId: 'phone' }}
          >
            <MaskInput mask="(00) 0000-0000" id="phone" {...field} />
          </FormGroup>
        )}
      />
    </div>
  );
}
