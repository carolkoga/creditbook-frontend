import { Fieldset } from '@components/LawsuitForm/components/Fieldset';
import MainDefendant from '../Main';
import SecondaryDefendant from '../Secondary';

export default function DefendantForm() {
  return (
    <Fieldset>
      <legend>2. Dados da parte adversa</legend>
      <MainDefendant />
      <SecondaryDefendant />
    </Fieldset>
  );
}
