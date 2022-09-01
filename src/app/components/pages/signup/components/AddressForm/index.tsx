import FormGroup from '@components/FormGroup';
import { Input } from '@components/Input';
import { Fieldset } from '../Fieldset';

export default function AddressForm({ formGroupDirection }: { formGroupDirection: 'vertical' | 'horizontal' }) {
  return (
    <Fieldset>
      <legend>Endereço</legend>

      <FormGroup
        direction={formGroupDirection}
        label={{
          forId: 'cep',
          title: 'CEP',
        }}
      >
        <Input id="cep" inputMode="numeric" placeholder="95030-430" />
      </FormGroup>

      <FormGroup
        direction={formGroupDirection}
        label={{
          forId: 'uf',
          title: 'UF',
        }}
      >
        <Input
          id="uf"
          placeholder="RS"
        />
      </FormGroup>

      <FormGroup
        direction={formGroupDirection}
        label={{
          forId: 'city',
          title: 'Cidade',
        }}
      >
        <Input
          id="city"
          placeholder="Caxias do Sul"
        />
      </FormGroup>

      <FormGroup
        direction={formGroupDirection}
        label={{
          forId: 'address',
          title: 'Endereço',
        }}
      >
        <Input
          id="address"
          placeholder="Rua José de Souza Brito"
        />
      </FormGroup>

      <FormGroup
        direction={formGroupDirection}
        label={{
          forId: 'number',
          title: 'Número',
        }}
      >
        <Input id="number" inputMode="numeric" placeholder="157" />
      </FormGroup>

      <FormGroup
        direction={formGroupDirection}
        label={{
          forId: 'complement',
          title: 'Complemento',
        }}
      >
        <Input
          id="complement"
          placeholder=""
          autoComplete="false"
        />
      </FormGroup>
    </Fieldset>
  );
}
