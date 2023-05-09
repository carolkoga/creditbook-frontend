import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { toast } from 'react-toastify';

import { Button } from '@components/Button';
import { Direction } from '@components/Direction';
import FormGroup from '@components/FormGroup';
import { ErrorMessage } from '@components/FormGroup/styled';
import { Input } from '@components/Input';

import { commonToastProps } from '@configs/toast';

import { Tooltip } from '@components/Tooltip';
import { TooltipIcon } from '@components/Tooltip/styles';
import { Fieldset } from '../components/Fieldset';
import { LawsuitCheckType } from './components/LawsuitCheckType';
import ModalUploadDocuments from './components/ModalUploadDocuments';

export default function DocumentForm() {
  const {
    register, formState: { errors }, trigger, watch,
  } = useFormContext();
  const lawsuitType = watch('type') ?? 'digital';
  const [uploadDocumentsModalIsVisible, setUploadDocumentsModalIsVisible] = useState(false);

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
          <LawsuitCheckType
            htmlFor="lawsuitTypeDigital"
            check={lawsuitType === 'digital'}
          >
            <input
              type="radio"
              id="lawsuitTypeDigital"
              value="digital"
              {...register('type')}
            />
            Digital
          </LawsuitCheckType>

          <LawsuitCheckType
            htmlFor="lawsuitTypePhysical"
            check={lawsuitType === 'physical'}
          >
            <input
              type="radio"
              id="lawsuitTypePhysical"
              value="physical"
              {...register('type')}
            />
            Fisico
          </LawsuitCheckType>
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
              <>
                <Tooltip
                  title="O link do processo pode ser obtido atraves da
                  consulta processual no site do tribunal
                  onde o processo esta localizado."
                >
                  <TooltipIcon>?</TooltipIcon>
                </Tooltip>

                <Input
                  {...register('digitalProcess')}
                  id="digital-process"
                  placeholder="Coloque o link do processo digital"
                />

              </>
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
