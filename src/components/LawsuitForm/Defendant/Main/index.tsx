import { useFormContext } from 'react-hook-form';
import { Direction } from '@components/Direction';
import FieldCorporationNameOrName from '@components/LawsuitForm/components/FieldCorporationNameOrName';
import FieldCPForCNPJ from '@components/LawsuitForm/components/FieldCPForCNPJ';
import { Section } from '@components/Section';
import { LawsuitParams } from '@type/creditbook/Lawsuits';

type FormContextType = Pick<LawsuitParams, 'mainDefendantCorporationNameOrName' | 'mainDefendantCpfOrCnpj'>;

export default function MainDefendant() {
  const { register, formState: { errors } } = useFormContext<FormContextType>();
  return (
    <Direction>
      <Section.Title as="strong" textColor="dark">
        Réu Principal
      </Section.Title>
      <FieldCorporationNameOrName
        error={errors?.mainDefendantCorporationNameOrName?.message}
        {...register('mainDefendantCorporationNameOrName')}
      />
      <FieldCPForCNPJ
        error={errors?.mainDefendantCpfOrCnpj?.message}
        name="mainDefendantCpfOrCnpj"
      />

    </Direction>
  );
}
