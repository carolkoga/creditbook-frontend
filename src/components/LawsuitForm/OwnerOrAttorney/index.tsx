import { useFormContext } from 'react-hook-form';

import { Direction } from '@components/Direction';

import { Fieldset } from '../components/Fieldset';
import { RadioLabel } from '../components/Radio';

export default function OwnerOrAttorney() {
  const { register } = useFormContext();

  return (
    <Fieldset>
      <legend>4. Quem está cadastrando o anúncio</legend>
      <Direction direction="horizontal">
        <div>
          <RadioLabel htmlFor="field-own">
            <input
              type="radio"
              value="own"
              id="field-own"
              {...register('ownOrAttorney')}
            />
            Própria parte
          </RadioLabel>
        </div>

        <div>
          <RadioLabel htmlFor="field-attorney">
            <input
              type="radio"
              value="attorney"
              id="field-attorney"
              {...register('ownOrAttorney')}
            />
            Procurador
          </RadioLabel>
        </div>
      </Direction>
    </Fieldset>
  );
}
