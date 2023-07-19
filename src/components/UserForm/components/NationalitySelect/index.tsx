import { useCallback, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import FormGroup from '@components/FormGroup';
import { AsyncSelect, OptionType } from '@components/Select';

import { factoryOptionReactSelect } from '@utils/factoryOptionReactSelect';

import { countriesService } from '@services/countries';
import { AllCommonType } from '@components/UserForm/types';

interface IProps extends AllCommonType {
  label: string,
}

export default function NationalitySelect({ formGroupDirection, label }: IProps) {
  const { control, formState: { errors } } = useFormContext();
  const [inputNationalityValue, setInputNationalityValue] = useState('');
  const optionsNationalities = useCallback(async () => {
    const { data: nationalities } = await countriesService.listCountries();
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
        option.value.toLowerCase().normalize('NFD').includes(
          inputNationalityValue.toLowerCase().normalize('NFD'),
        )
      ));
    }

    const brasilIndex = optionReactSelect.findIndex(({ value }: OptionType) => value === 'Brasil');
    optionReactSelect.splice(brasilIndex, 1);

    optionReactSelect.sort((a: OptionType, b: OptionType) => {
      if (a.value < b.value) {
        return -1;
      }
      if (a.value > b.value) {
        return 1;
      }
      return 0;
    });

    optionReactSelect.unshift({ value: 'Brasil', label: '🇧🇷 Brasil' });

    return optionReactSelect;
  }, [inputNationalityValue]);

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
