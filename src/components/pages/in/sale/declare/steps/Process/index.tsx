import { AsyncSelect } from '@components/Select';
import { Controller, useFormContext } from 'react-hook-form';
import { FieldsetDeclare } from '../../Fieldset';
import { AnnouncementShow } from './components/Announcement';

export function FirstStepProcess() {
  const { control } = useFormContext();

  return (
    <FieldsetDeclare title="1. Dados do processo">
      <Controller
        name="processInfo.processNumber"
        control={control}
        render={({ field }) => (
          <AsyncSelect placeholder="Escolha o processo" {...field} />
        )}
      />

      <AnnouncementShow />
    </FieldsetDeclare>
  );
}
