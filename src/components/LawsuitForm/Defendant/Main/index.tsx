import { Direction } from '@components/Direction';
import FieldCorporationNameOrName from '@components/LawsuitForm/components/FieldCorporationNameOrName';
import FieldCPForCNPJ from '@components/LawsuitForm/components/FieldCPForCNPJ';
import { Section } from '@components/Section';
import { useFormContext } from 'react-hook-form';

export default function MainDefendant() {
  const { register } = useFormContext();
  return (
    <Direction>
      <Section.Title as="strong" textColor="dark">
        Réu Principal
      </Section.Title>

      <FieldCPForCNPJ name="mainDefendantCpjOrCnpj" />
      <FieldCorporationNameOrName
        {...register('mainDefendantCorporationNameOrName')}
      />
    </Direction>
  );
}
