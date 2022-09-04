import { useCallback, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import FormGroup from '@components/FormGroup';
import { AsyncSelect, OptionType } from '@components/Select';

import { factoryOptionReactSelect } from '@utils/factoryOptionReactSelect';

import CountriesService from '@services/countries';

export default function NationalitySelect({ formGroupDirection }: { formGroupDirection: 'vertical' | 'horizontal' }) {
  const { control, formState: { errors } } = useFormContext();
  const [inputNationalityValue, setInputNationalityValue] = useState('');
  const optionsNationalities = useCallback(async () => {
    const nationalities = await CountriesService.listCountries();
    const optionReactSelect = nationalities
      ?.map((country: { flag: string; }, index: any, array: any) => {
        const valuePath: string = `${index}.translations.por.official`;
        const labelPath: string = `${index}.translations.por.common`;
        const option = factoryOptionReactSelect(valuePath, labelPath, array);
        return {
          label: `${country.flag} ${option.label}`,
          value: option.value,
        };
      });

    if (inputNationalityValue) {
      return optionReactSelect.filter((option: OptionType) => (
        option.value.toLowerCase().includes(inputNationalityValue.toLowerCase())
      ));
    }

    return optionReactSelect;
  }, [inputNationalityValue]);

  function handleChangeInputNationality(value: string) {
    setInputNationalityValue(value);
  }
  return (
    <Controller
      control={control}
      name="nationality"
      render={({ field }) => (
        <FormGroup
          direction={formGroupDirection}
          error={errors?.nationality?.message}
          label={{
            forId: 'nationality',
            title: 'Nacionalidade',
          }}
        >
          <AsyncSelect
            {...field}
            id="nationality"
            instanceId="nationality"
            placeholder="Nacionalidade"
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
