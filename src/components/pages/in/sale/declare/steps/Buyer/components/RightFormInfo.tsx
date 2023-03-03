import { InputCurrency } from '@components/Form/Input/Mask/InputCurrency';
import FormGroup from '@components/FormGroup';
import { Input, MaskInput } from '@components/Input';
import { Row } from './styled';

export function RightFormInfo() {
  return (
    <div>
      <h2>Endereço</h2>

      <Row>
        <div className="cep">
          <FormGroup
            label={{
              forId: 'address.cep',
              title: 'CEP',
            }}
          >
            <MaskInput
              id="address.cep"
              inputMode="numeric"
              placeholder=" "
              mask="00000-000"
            />
          </FormGroup>
        </div>

        <FormGroup
          label={{
            forId: 'address.address',
            title: 'Endereço',
          }}
        >
          <Input
            id="address.address"
            placeholder=" "
          />
        </FormGroup>

      </Row>

      <FormGroup
        label={{
          forId: 'address.city',
          title: 'Cidade',
        }}
      >
        <Input
          id="address.city"
          placeholder=" "
        />
      </FormGroup>
      <Row>
        <FormGroup
          label={{
            forId: 'address.number',
            title: 'Número',
          }}
        >
          <Input
            id="address.number"
            inputMode="numeric"
            placeholder=" "
          />
        </FormGroup>

        <FormGroup
          label={{
            forId: 'address.uf',
            title: 'UF',
          }}
        >
          <Input
            id="address.uf"
            placeholder=" "
          />
        </FormGroup>
      </Row>

      <FormGroup
        label={{
          forId: 'address.complement',
          title: 'Complemento',
        }}
      >
        <Input
          id="address.complement"
          placeholder=" "
          autoComplete="false"
        />
      </FormGroup>

      <FormGroup
        label={{
          forId: 'price',
          title: 'Valor de venda da ação',
        }}
      >
        <InputCurrency />
      </FormGroup>
    </div>
  );
}
