import { Button } from '@components/Button';
import FormGroup from '@components/FormGroup';
import { Input, MaskInput } from '@components/Input';
import { yupResolver } from '@hookform/resolvers/yup';
import { preSignUpValidation } from '@validations/yup/UserForm/preSignUp';
import { useRouter } from 'next/router';
import { Controller, useForm } from 'react-hook-form';
import { Container, Content, Header } from './styled';

interface PreSignUpProps {
  isVisible: boolean
}

interface PreSignUParams {
  name: string,
  email: string,
  cellphone: string,
}

export function PreSignUp({ isVisible }: PreSignUpProps) {
  const router = useRouter();
  const {
    register, control, formState: { errors }, handleSubmit,
  } = useForm<PreSignUParams>({
    resolver: yupResolver(preSignUpValidation),
    mode: 'onSubmit',
  });

  function handleContinueSignUp(data: PreSignUParams) {
    router.push({
      pathname: '/sign-up',
      query: {
        name: data.name,
        email: data.email,
        cellphone: data.cellphone,
      },
    });
  }

  if (!isVisible) return null;

  return (
    <Container noValidate onSubmit={handleSubmit(handleContinueSignUp)}>
      <Header>
        <h3>Faça seu cadastro</h3>
        <h4>Crie seu anúncio. Procure as melhores oportunidade para investir. Tudo online.</h4>
      </Header>

      <Content>
        <FormGroup
          error={errors?.name?.message}
          label={{
            forId: 'name',
            title: 'Nome',
          }}
        >
          <Input id="name" {...register('name')} />
        </FormGroup>

        <FormGroup
          error={errors?.email?.message}
          label={{
            forId: 'email',
            title: 'E-mail',
          }}
        >
          <Input id="email" type="email" {...register('email')} />
        </FormGroup>

        <Controller
          name="cellphone"
          defaultValue=""
          control={control}
          render={({ field }) => (
            <FormGroup
              error={errors?.cellphone?.message}
              label={{
                forId: 'phone',
                title: 'Telefone',
              }}
            >
              <MaskInput
                id="phone"
                inputMode="numeric"
                placeholder=" "
                mask="(00) 0000-0000"
                {...field}
              />
            </FormGroup>
          )}
        />

        <Button type="submit">Cadastrar</Button>
      </Content>
    </Container>
  );
}
