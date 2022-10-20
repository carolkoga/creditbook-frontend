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
  const [initialPetition, initialPetitionUrl] = watch(['initialPetition', 'initialPetitionUrl']);
  const [sentence, sentenceUrl] = watch(['sentence', 'sentenceUrl']);
  const [resources, resourcesUrl] = watch(['resources', 'resourcesUrl']);
  const [contestation, contestationUrl] = watch(['contestation', 'contestationUrl']);
  const [accordion, accordionUrl] = watch(['accordion', 'accordionUrl']);
  const [finalCertificate, finalCertificateUrl] = watch(['finalCertificate', 'finalCertificateUrl']);
  const [judgmentOfApprovalOfLaborCalculations, judgmentOfApprovalOfLaborCalculationsUrl] = watch(['judgmentOfApprovalOfLaborCalculations', 'judgmentOfApprovalOfLaborCalculationsUrl']);
  const [anotherRelevantParts, anotherRelevantPartsUrl] = watch(['anotherRelevantParts', 'anotherRelevantPartsUrl']);

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
              {...register('initialPetition')}
              error={errors?.initialPetition?.message}
              fileName={initialPetitionUrl}
              file={initialPetition?.[0]}
              label="Petição inicial (obrigatório)"
            />

            <FieldFile
              {...register('sentence')}
              file={sentence?.[0]}
              fileName={sentenceUrl}
              label="Setença"
            />

            <FieldFile
              {...register('resources')}
              file={resources?.[0]}
              fileName={resourcesUrl}
              label="Recursos"
            />

            <FieldFile
              {...register('contestation')}
              file={contestation?.[0]}
              fileName={contestationUrl}
              label="Contestação"
            />

            <FieldFile
              {...register('accordion')}
              file={accordion?.[0]}
              fileName={accordionUrl}
              label="Acordão"
            />

            <FieldFile
              {...register('finalCertificate')}
              file={finalCertificate?.[0]}
              fileName={finalCertificateUrl}
              label="Cert. transitado em julgado"
            />

            <FieldFile
              {...register('judgmentOfApprovalOfLaborCalculations')}
              file={judgmentOfApprovalOfLaborCalculations?.[0]}
              fileName={judgmentOfApprovalOfLaborCalculationsUrl}
              label="Sentença de homologação de cálculos trabalhistas"
            />

            <FieldFile
              {...register('anotherRelevantParts')}
              file={anotherRelevantParts?.[0]}
              fileName={anotherRelevantPartsUrl}
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
