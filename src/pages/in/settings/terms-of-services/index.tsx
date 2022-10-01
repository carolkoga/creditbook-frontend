import { Section } from '@components/Section';
import { StructureSettings } from '@components/pages/in/Settings/StructureSettings';
import { RIchTextEditor } from '@components/pages/in/Settings/RIchTextEditor';

export default function TermsOfServices() {
  return (
    <StructureSettings>
      <Section.Header>
        <Section.Title as="h1" textColor="dark">Termos de Uso</Section.Title>
      </Section.Header>

      <RIchTextEditor
        onSubmit={(terms) => console.log(terms)}
        buttonProps={{
          isLoading: false,
        }}
      />
    </StructureSettings>
  );
}
