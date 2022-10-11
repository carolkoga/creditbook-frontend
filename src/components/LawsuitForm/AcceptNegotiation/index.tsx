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
          <RadioLabel htmlFor="YesAcceptNegotiation">
            <Input
              type="radio"
              value="yes"
              id="YesAcceptNegotiation"
              checked
              {...register('acceptNegotiation')}
            />
            Sim
          </RadioLabel>
        </div>

        <div>
          <RadioLabel htmlFor="noAcceptNegotiation">
            <input
              type="radio"
              value="no"
              id="noAcceptNegotiation"
              {...register('acceptNegotiation')}
            />
            Não
          </RadioLabel>
        </div>
      </Direction>
    </Fieldset>
  );
}
