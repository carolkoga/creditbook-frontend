import { Button } from '@components/Button';
import { Direction } from '@components/Direction';
import { Overlay } from '@components/Overlay';
import ReactPortal from '@components/ReactPortal';
import { Section } from '@components/Section';
import { useFormContext } from 'react-hook-form';
import FieldFile from '@components/LawsuitForm/components/FieldFile';
import { ContentWrapper } from './styled';

interface IProps {
  isVisible: boolean,
  onCloseModal: () => void,
}

export default function ModalUploadDocuments({ isVisible, onCloseModal }: IProps) {
  if (!isVisible) {
    return null;
  }
  const { register, watch, formState: { errors } } = useFormContext();
  const initialPetition = watch('inicialPetition');
  const sentence = watch('sentence');
  const resources = watch('resources');
  const contestation = watch('contestation');
  const accordion = watch('accordion');
  const finalCertificate = watch('finalCertificate');
  const judgmentOfApprovalOfLaborCalculations = watch('judgmentOfApprovalOfLaborCalculations');
  const anotherRelevantParts = watch('anotherRelevantParts');

  return (
    <ReactPortal containerId="upload-documents">
      <Overlay>
        <ContentWrapper>
          <Direction gap="0px">
            <Section.Title as="strong">3. Upload de Documentos</Section.Title>
            <small>
              Processo físico:
              {' '}
              <span>
                Suba os documentos abaixo:
              </span>
            </small>
          </Direction>

          <div className="uploads">
            <FieldFile
              {...register('inicialPetition')}
              error={errors?.inicialPetition?.message}
              file={initialPetition?.[0]}
              label="Petição inicial (obrigatório)"
            />

            <FieldFile
              {...register('sentence')}
              file={sentence?.[0]}
              label="Setença"
            />

            <FieldFile
              {...register('resources')}
              file={resources?.[0]}
              label="Recursos"
            />

            <FieldFile
              {...register('contestation')}
              file={contestation?.[0]}
              label="Contestação"
            />

            <FieldFile
              {...register('accordion')}
              file={accordion?.[0]}
              label="Acordão"
            />

            <FieldFile
              {...register('finalCertificate')}
              file={finalCertificate?.[0]}
              label="Cert. transitado em julgado"
            />

            <FieldFile
              {...register('judgmentOfApprovalOfLaborCalculations')}
              file={judgmentOfApprovalOfLaborCalculations?.[0]}
              label="Sentença de homologação de cálculos trabalhistas"
            />

            <FieldFile
              {...register('anotherRelevantParts')}
              file={anotherRelevantParts?.[0]}
              label="Outras peças relevantes"
            />
          </div>

          <Button size="large" onClick={() => onCloseModal()}>
            Salvar
          </Button>
        </ContentWrapper>
      </Overlay>
    </ReactPortal>
  );
}
