import { creditbookApi } from '@api/creditbookApi';
import FormGroup from '@components/FormGroup';
import { AsyncSelect, OptionType } from '@components/Select';
import { BatchParams } from '@type/creditbook/Batch';
import { LawsuitParams } from '@type/creditbook/Lawsuits';
import { FieldDeclareFormTypes } from '@type/creditbook/sale/declare';
import { useRouter } from 'next/router';
import {
  memo,
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { FieldsetDeclare } from '../../Fieldset';
import { AnnouncementShow } from './components/Announcement';

interface ProcessAnnouncement {
  type: 'announcement',
  content: LawsuitParams,
}

interface ProcessBatch {
  type: 'batch',
  content: BatchParams,
}

type Process = (ProcessAnnouncement | ProcessBatch) & {
  label: string,
  id: string,
};

export const FirstStepProcess = memo(() => {
  const { query } = useRouter();
  const {
    control,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<Pick<FieldDeclareFormTypes, 'processInfo'>>();
  const [processOptions, setProcessOptions] = useState<OptionType[]>([]);
  const [process, setProcess] = useState<Process[]>([]);
  const selectedProcess = watch('processInfo.processId') as unknown as OptionType;
  const processInfo = useMemo<Process | null | undefined>(() => {
    if (!selectedProcess?.value) {
      return null;
    }

    const processFound = process.find((currentProcess) => (
      currentProcess.id === selectedProcess?.value
    ));

    setValue('processInfo.processType', !processFound ? null : processFound.type);

    return processFound;
  }, [selectedProcess, processOptions]);

  const processByQuery = useCallback(() => {
    const processId = query?.processId;
    const processType = query?.processType;

    if (processId && processType) {
      const processFound = process.find((currentProcess) => currentProcess.id === processId);

      if (!processFound) return;

      setValue('processInfo.processId', { label: processFound.label, value: processFound.id });
    }
  }, [query, process]);

  const loadProcess = useCallback(async () => {
    try {
      const { data } = await creditbookApi.get<Process[]>('/batchies-and-announcements');
      const processData = [] as OptionType[];
      setProcess(data);

      data.forEach((currentProcess) => {
        setProcessOptions((oldState) => {
          const processExists = oldState
            .findIndex((oldCurrentProcess) => oldCurrentProcess.value === currentProcess.id);
          const newOptions = [...oldState];

          if (processExists === -1) {
            newOptions.push({ label: currentProcess.label, value: currentProcess.id });
            processData.push({ label: currentProcess.label, value: currentProcess.id });
            return newOptions;
          }

          return newOptions;
        });
      });

      return processData;
    } catch {
      return [];
    }
  }, []);

  useEffect(() => {
    loadProcess();
  }, [loadProcess]);

  useEffect(() => {
    processByQuery();
  }, [processByQuery]);

  return (
    <FieldsetDeclare title="1. Dados do processo">
      <Controller
        name="processInfo.processId"
        control={control}
        render={({ field }) => (
          <div className="wrapper--select">
            <FormGroup label={{ title: '', forId: 'processId' }} error={errors?.processInfo?.processId?.message}>
              <AsyncSelect
                defaultOptions={processOptions}
                loadOptions={loadProcess}
                placeholder="Escolha o processo"
                instanceId="processId"
                {...field}
              />
            </FormGroup>
          </div>
        )}
      />

      {processInfo?.type === 'announcement' && (
        <AnnouncementShow announcement={processInfo.content} />
      )}
    </FieldsetDeclare>
  );
});
