import { Direction } from '@components/Direction';
import FieldCorporationNameOrName from '@components/LawsuitForm/components/FieldCorporationNameOrName';
import FieldCPForCNPJ from '@components/LawsuitForm/components/FieldCPForCNPJ';
import { Section } from '@components/Section';
import { LawsuitParams } from '@type/creditbook/Lawsuits';
import { useFormContext } from 'react-hook-form';

type FormContextType = Pick<LawsuitParams, 'mainActorCorporationNameOrName' | 'mainActorCpfOrCnpj'>;

export default function MainAuthor() {
  const { register, formState: { errors } } = useFormContext<FormContextType>();
  return (
    <Direction>
      <Section.Title as="strong" textColor="dark">
        Autor Principal
      </Section.Title>
      <FieldCorporationNameOrName
        error={errors?.mainActorCorporationNameOrName?.message}
        {...register('mainActorCorporationNameOrName')}
      />
      <FieldCPForCNPJ
        name="mainActorCpfOrCnpj"
        error={errors?.mainActorCpfOrCnpj?.message}
      />

    </Direction>
  );
}
