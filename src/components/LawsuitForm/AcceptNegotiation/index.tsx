import { useFormContext } from 'react-hook-form';

import { Direction } from '@components/Direction';
import { Input } from '@components/Input';

import { Fieldset } from '../components/Fieldset';
import { RadioLabel } from '../components/Radio';

export default function AcceptNegotiation() {
  const { register } = useFormContext();

  return (
    <Fieldset>
      <legend>6. Aceita Negociação</legend>
      <Direction direction="horizontal">
        <div>
          <RadioLabel htmlFor="field-yes">
            <Input
              type="radio"
              value="1"
              id="field-yes"
              {...register('acceptNegotiation')}
            />
            Sim
          </RadioLabel>
        </div>

        <div>
          <RadioLabel htmlFor="field-no">
            <input
              type="radio"
              value="0"
              id="field-no"
              {...register('acceptNegotiation')}
            />
            Não
          </RadioLabel>
        </div>
      </Direction>
    </Fieldset>
  );
}
