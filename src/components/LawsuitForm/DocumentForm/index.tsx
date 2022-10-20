import { Button } from '@components/Button';
import { Direction } from '@components/Direction';
import FormGroup from '@components/FormGroup';
import { ErrorMessage } from '@components/FormGroup/styled';
import { Input } from '@components/Input';
import { commonToastProps } from '@configs/toast';
import { useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Fieldset } from '../components/Fieldset';
import { LawsuitCheckType } from './components/LawsuitCheckType';
import ModalUploadDocuments from './components/ModalUploadDocuments';

export default function DocumentForm() {
  const {
    control, register, setValue, formState: { errors }, trigger, watch,
  } = useFormContext();
  const [lawsuitType, setLawsuitType] = useState<'digital' | 'physical'>(watch('type') || 'digital');
  const [uploadDocumentsModalIsVisible, setUploadDocumentsModalIsVisible] = useState(false);

  function handleChangeLawsuitType(value: 'digital' | 'physical') {
    setValue('type', value);
    setLawsuitType(() => value);
  }

  async function handleCloseUploadDocumentsModal() {
    const isValidPetition = await trigger('initialPetition');

    if (!isValidPetition) {
      toast.warning('O arquivo de Petição Inicial é obrigatório', commonToastProps);
    }

    setUploadDocumentsModalIsVisible(false);
  }

  function handleOpenUploadDocumentsModal() {
    setUploadDocumentsModalIsVisible(true);
  }

  return (
    <Fieldset>
      <legend>3. Upload de documentos</legend>
      <Direction>
        <Direction direction="horizontal" gap="6px">
          <Controller
            control={control}
            name="type"
            render={({ field }) => (
              <LawsuitCheckType
                htmlFor="lawsuitTypeDigital"
                check={lawsuitType === 'digital'}
              >
                <input
                  type="radio"
                  id="lawsuitTypeDigital"
                  ref={field.ref}
                  name={field.name}
                  onBlur={field.onBlur}
                  value="digital"
                  onChange={() => handleChangeLawsuitType('digital')}
                />
                Digital
              </LawsuitCheckType>
            )}
          />

          <Controller
            control={control}
            name="type"
            render={({ field }) => (
              <LawsuitCheckType
                htmlFor="lawsuitTypePhysical"
                check={lawsuitType === 'physical'}
              >
                <input
                  type="radio"
                  id="lawsuitTypePhysical"
                  ref={field.ref}
                  name={field.name}
                  onBlur={field.onBlur}
                  value="physical"
                  onChange={() => handleChangeLawsuitType('physical')}
                />
                Fisico
              </LawsuitCheckType>
            )}
          />
        </Direction>

        {lawsuitType === 'digital' && (
          <Direction>
            <FormGroup
              direction="horizontal"
              error={errors?.digitalProcess?.message}
              label={{
                forId: 'digital-process',
                title: 'Processo Digital',
              }}
            >
              <Input
                {...register('digitalProcess')}
                id="digital-process"
                placeholder="Coloque o link do processo digital"
              />
            </FormGroup>
          </Direction>
        )}

        {lawsuitType === 'physical' && (
          <>
            {errors?.initialPetition && (
              <ErrorMessage>{errors.initialPetition.message && 'Existe arquivos obrigatórios'}</ErrorMessage>
            )}
            <Button variant="white" size="small" type="button" onClick={handleOpenUploadDocumentsModal}>
              Adicionar Arquivos
            </Button>
          </>
        )}

        <ModalUploadDocuments
          isVisible={uploadDocumentsModalIsVisible && lawsuitType === 'physical'}
          onCloseModal={handleCloseUploadDocumentsModal}
        />
      </Direction>
    </Fieldset>
  );
}
