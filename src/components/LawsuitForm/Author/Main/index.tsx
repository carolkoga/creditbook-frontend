import { Direction } from '@components/Direction';
import FieldCorporationNameOrName from '@components/LawsuitForm/components/FieldCorporationNameOrName';
import FieldCPForCNPJ from '@components/LawsuitForm/components/FieldCPForCNPJ';
import { Section } from '@components/Section';
import { useFormContext } from 'react-hook-form';

export default function MainAuthor() {
  const { register } = useFormContext();
  return (
    <Direction>
      <Section.Title as="strong" textColor="dark">
        Autor Principal
      </Section.Title>

      <FieldCPForCNPJ name="mainActorCpfOrCnpj" />
      <FieldCorporationNameOrName
        {...register('mainActorCorporationNameOrName')}
      />
    </Direction>
  );
}
