import { Button } from '@components/Button';
import FormGroup from '@components/FormGroup';
import { Input } from '@components/Input';
import { Container, WrapperInput, Actions } from './styled';

export default function CreditCardForm() {
  return (
    <Container>
      <WrapperInput>
        <FormGroup
          direction="vertical"
          label={{
            forId: 'card-number',
            title: 'Número do cartão',
          }}
        >
          <Input />
        </FormGroup>
      </WrapperInput>

      <WrapperInput>
        <FormGroup
          direction="vertical"
          label={{
            forId: 'expiration-date',
            title: 'Validade',
          }}
        >
          <Input />
        </FormGroup>

        <FormGroup
          direction="vertical"
          label={{
            forId: 'cv-code',
            title: 'CVV',
          }}
        >
          <Input />
        </FormGroup>
      </WrapperInput>

      <WrapperInput>
        <FormGroup
          direction="vertical"
          label={{
            forId: 'card-owner',
            title: 'Nome do titular',
          }}
        >
          <Input />
        </FormGroup>
      </WrapperInput>

      <Actions>
        <Button>Teste</Button>
      </Actions>
    </Container>
  );
}
