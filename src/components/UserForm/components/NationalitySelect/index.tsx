/* eslint-disable max-len */
import { useCallback, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import FormGroup from '@components/FormGroup';
import { AsyncSelect } from '@components/Select';

import { countriesService } from '@services/countries';
import { AllCommonType } from '@components/UserForm/types';

interface IProps extends AllCommonType {
  label: string,
}

export default function NationalitySelect({ formGroupDirection, label }: IProps) {
  const { control, formState: { errors } } = useFormContext();
  const [inputNationalityValue, setInputNationalityValue] = useState('');
  const optionsNationalities = useCallback(async () => countriesService.listCountries(), [inputNationalityValue]);

  function handleChangeInputNationality(value: string) {
    setInputNationalityValue(value);
  }
  return (
    <Controller
      control={control}
      name="nationality"
      defaultValue=""
      render={({ field }) => (
        <FormGroup
          direction={formGroupDirection}
          error={errors?.nationality?.message}
          label={{
            forId: 'nationality',
            title: label,
          }}
        >
          <AsyncSelect
            {...field}
            id="nationality"
            instanceId="nationality"
            placeholder={label}
            cacheOptions
            defaultOptions
            onInputChange={handleChangeInputNationality}
            loadOptions={optionsNationalities}
          />
        </FormGroup>
      )}
    />
  );
}
