import { Direction } from '@components/Direction';
import FieldCorporationNameOrName from '@components/LawsuitForm/components/FieldCorporationNameOrName';
import FieldCPForCNPJ from '@components/LawsuitForm/components/FieldCPForCNPJ';
import { Section } from '@components/Section';
import { useFormContext } from 'react-hook-form';

export default function SecondaryAuthor() {
  const { register, formState: { errors } } = useFormContext();

  return (
    <Direction>
      <Section.Title as="strong" textColor="dark">
        Autor Secundário (opcional):
      </Section.Title>

      <FieldCPForCNPJ
        name="secondaryActorCpfOrCnpj"
        error={errors?.secondaryActorCpfOrCnpj?.message}
      />

      <FieldCorporationNameOrName
        {...register('secondaryActorCorporationNameOrName')}
      />
    </Direction>
  );
}
