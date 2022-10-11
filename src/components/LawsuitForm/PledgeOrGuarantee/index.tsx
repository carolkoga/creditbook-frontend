import { useFormContext } from 'react-hook-form';

import { Direction } from '@components/Direction';
import { Input } from '@components/Input';

import { Fieldset } from '../components/Fieldset';
import { RadioLabel } from '../components/Radio';

export default function PledgeOrGuarantee() {
  const { register } = useFormContext();

  return (
    <Fieldset>
      <legend>5. Penhora ou outra garantia</legend>
      <Direction direction="horizontal">
        <div>
          <RadioLabel htmlFor="YesPledgeOrGuarantee">
            <Input
              type="radio"
              value="yes"
              id="YesPledgeOrGuarantee"
              checked
              {...register('pledgeOrGuarantee')}
            />
            Sim
          </RadioLabel>
        </div>

        <div>
          <RadioLabel htmlFor="noPledgeOrGuarantee">
            <input
              type="radio"
              value="no"
              id="noPledgeOrGuarantee"
              {...register('pledgeOrGuarantee')}
            />
            Não
          </RadioLabel>
        </div>
      </Direction>
    </Fieldset>
  );
}
