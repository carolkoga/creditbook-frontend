import { Fieldset } from '@components/LawsuitForm/components/Fieldset';
import MainAuthor from '../Main';
import SecondaryAuthor from '../Secondary';

export default function AuthorForm() {
  return (
    <Fieldset>
      <MainAuthor />
      <SecondaryAuthor />
    </Fieldset>
  );
}
