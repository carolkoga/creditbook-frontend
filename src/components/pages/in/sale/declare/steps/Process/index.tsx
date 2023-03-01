import { AsyncSelect } from '@components/Select';
import { FieldsetDeclare } from '../../Fieldset';
import { AnnouncementShow } from './components/Announcement';

export function FirstStepProcess() {
  return (
    <FieldsetDeclare title="1. Dados do processo">
      <AsyncSelect placeholder="Escolha o processo" />

      <AnnouncementShow />
    </FieldsetDeclare>
  );
}
