import FieldFile from '@components/LawsuitForm/components/FieldFile';
import { useFormContext } from 'react-hook-form';

export function UploadSocialContract() {
  const { register, watch, formState: { errors } } = useFormContext();
  const socialContract = watch('socialContract');
  const filename = typeof socialContract === 'string' ? socialContract : null;

  return (
    <FieldFile
      {...register('socialContract')}
      error={errors?.socialContract?.message}
      fileName={filename}
      file={socialContract?.[0]}
      label="Contrato Social"
    />
  );
}
