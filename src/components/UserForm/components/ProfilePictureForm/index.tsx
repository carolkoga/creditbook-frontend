import FormGroup from '@components/FormGroup';
import { AllCommonType } from '@components/UserForm/types';
import { UploadSimple } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { WrapperInputFile } from '../WrapperInputFile';

interface IProps extends AllCommonType {
  label?: string,
  size?: number,
}

export default function ProfilePictureForm({ formGroupDirection, label, size = 40 }: IProps) {
  const {
    register, formState: { errors }, watch, setValue,
  } = useFormContext();
  const profilePictureFileList = watch('profilePicture', null);
  const [profilePreview, setProfilePreview] = useState<string | any>('');

  function convertToBase64AndSetPreview(file: File, setPreview: Function) {
    const reader = new FileReader();

    reader.addEventListener('load', () => setPreview((reader.result as string)));
    reader.readAsDataURL(file);
  }

  useEffect(() => {
    if (profilePictureFileList) {
      const profilePicture: File | null | undefined = profilePictureFileList['0'];

      if (profilePicture) {
        setValue('profilePicture', profilePicture);
        convertToBase64AndSetPreview(profilePicture, setProfilePreview);
      }
    }
  }, [profilePictureFileList]);

  return (
    <FormGroup
      direction={formGroupDirection}
      error={errors?.profilePicture?.message}
      label={{
        forId: 'profile-photo',
        title: !label ? '' : label,
      }}
    >
      <WrapperInputFile size={size}>
        {!profilePreview && (
        <label htmlFor="profile-photo">
          <UploadSimple size={!size ? 20 : size / 2} weight="bold" />
        </label>
        )}

        {profilePreview && (
        <label htmlFor="profile-photo" className="--with-img">
          <img src={profilePreview} alt="Foto de perfil" width="100%" height="100%" />
        </label>
        )}

        <input
          type="file"
          id="profile-photo"
          accept="image/*"
          defaultValue=""
          {...register('profilePicture')}
        />
      </WrapperInputFile>
    </FormGroup>
  );
}

ProfilePictureForm.defaultProps = {
  size: 0,
  label: '',
};
