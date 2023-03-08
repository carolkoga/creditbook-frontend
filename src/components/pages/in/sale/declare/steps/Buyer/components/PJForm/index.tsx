import FormGroup from '@components/FormGroup';
import { Input, MaskInput } from '@components/Input';
import { FieldDeclareFormTypes } from '@type/creditbook/sale/declare';
import { Controller, useFormContext } from 'react-hook-form';
import { FieldsetDeclare } from '../../../../Fieldset';
import { RightFormInfo } from '../RightFormInfo';
import { ContentFormGrid } from '../styled';

export function PJForm() {
  const { register, control, formState: { errors } } = useFormContext<Pick<FieldDeclareFormTypes, 'buyer'>>();

  return (
    <FieldsetDeclare title="">
      <ContentFormGrid>
        <div>
          <h2>Informações</h2>

          <FormGroup
            error={errors?.buyer?.pj?.socialName?.message}
            label={{ title: 'Razão Social', forId: 'social' }}
          >
            <Input id="social" {...register('buyer.pj.socialName')} />
          </FormGroup>

          <Controller
            control={control}
            name="buyer.pj.cnpj"
            render={({ field }) => (
              <FormGroup
                error={errors?.buyer?.pj?.cnpj?.message}
                label={{ title: 'CNPJ', forId: 'cnpj' }}
              >
                <MaskInput mask="00.000.000/0000-00" id="cnpj" {...field} />
              </FormGroup>
            )}
          />

          <FormGroup
            error={errors?.buyer?.pj?.email?.message}
            label={{ title: 'E-mail', forId: 'email' }}
          >
            <Input id="email" {...register('buyer.pj.email')} />
          </FormGroup>

          <Controller
            control={control}
            name="buyer.pj.cellphone"
            render={({ field }) => (
              <FormGroup
                error={errors?.buyer?.pj?.cellphone?.message}
                label={{ title: 'Telefone', forId: 'cellphone' }}
              >
                <MaskInput mask="(00) 0000-0000" id="cellphone" {...field} />
              </FormGroup>
            )}
          />
        </div>

        <RightFormInfo />
      </ContentFormGrid>
    </FieldsetDeclare>
  );
}
