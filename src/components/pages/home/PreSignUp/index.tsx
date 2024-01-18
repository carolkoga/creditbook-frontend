import { Button } from '@components/Button';
import FormGroup from '@components/FormGroup';
import { Input } from '@components/Input';
import { yupResolver } from '@hookform/resolvers/yup';
import { preSignUpValidation } from '@validations/yup/UserForm/preSignUp';
import { useRouter } from 'next/router';
import { Controller, useForm } from 'react-hook-form';
import { InputPhone } from '@components/Form/Input/Mask/InputPhone';
import { userCreditbookService } from '@type/user/index';
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
    register, control, formState: { errors }, handleSubmit, setError,
  } = useForm<PreSignUParams>({
    resolver: yupResolver(preSignUpValidation),
    mode: 'onSubmit',
  });

  async function handleContinueSignUp(data: PreSignUParams) {
    const response = await userCreditbookService.verifyEmailInUse(data.email);

    if (response.data.emailInUse) {
      setError('email', { message: 'Email está em uso' });
    } else {
      router.push({
        pathname: '/sign-up',
        query: {
          name: data.name,
          email: data.email,
          cellphone: data.cellphone,
        },
      });
    }
  }

  if (!isVisible) return null;

  return (
    <Container noValidate onSubmit={handleSubmit(handleContinueSignUp)} className="pre-sign-up-form">
      <Header>
        <h3>Faça seu cadastro</h3>
        <h4>Crie seu anúncio. Procure as melhores oportunidade para investir. Tudo online.</h4>
      </Header>

      <Content>
        <FormGroup
          error={errors?.name?.message}
        >
          <Input id="name" placeholder="Nome" {...register('name')} />
        </FormGroup>

        <FormGroup
          error={errors?.email?.message}
        >
          <Input id="email" type="email" placeholder="E-mail" {...register('email')} />
        </FormGroup>

        <Controller
          name="cellphone"
          defaultValue=""
          control={control}
          render={({ field }) => (
            <FormGroup
              error={errors?.cellphone?.message}
            >
              <InputPhone
                id="phone"
                placeholder="Telefone"
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
