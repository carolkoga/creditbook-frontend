import { Button } from '@components/Button';
import { Direction } from '@components/Direction';
import Resume from '@components/LawsuitView/Resume';
import ReactPortal from '@components/ReactPortal';
import { Section } from '@components/Section';
import { NewLawsuitParams } from '@type/creditbook/Lawsuits';
import { ReactNode } from 'react';
import { useFormContext } from 'react-hook-form';
import { OverlayStyled } from './styled';

interface ModalResumeProps {
  isVisible: boolean,
  onClose: () => void,
  children?: ReactNode,
}

export function ModalResume({ isVisible, onClose, children }: ModalResumeProps) {
  const { watch } = useFormContext();
  const announcement = watch();

  if (!isVisible || !announcement) return null;

  return (
    <ReactPortal>
      <OverlayStyled>
        <Section.Header>
          <Direction alignItems="center">
            <Button variant="white" size="small" onClick={() => onClose()}>
              Voltar
            </Button>
            <Section.Title as="h1">
              Resumo do anúncio
            </Section.Title>
          </Direction>
        </Section.Header>

        <Section.Container>
          <Resume
            announcement={{
              ...announcement as NewLawsuitParams,
              city: announcement.city?.value,
              actionPhase: announcement.actionPhase?.value,
              kind: announcement.kind?.value,
              processGender: announcement.processGender?.value,
              tribunal: announcement.tribunal?.value,
              uf: announcement.uf?.value,
            }}
          />
        </Section.Container>

        <Section.Container>
          {children}
        </Section.Container>
      </OverlayStyled>
    </ReactPortal>
  );
}
