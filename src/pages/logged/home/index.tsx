import LawsuitCardList from '@components/LawsuitCard';
import LawsuitCardSwiper from '@components/LawsuitCard/LawsuitCardSwiper/index';
import { ListLayoutSingleLawsuits } from '@components/ListsLayout';
import { lawsuitsMock } from '@mocks/suits';
import { HeaderSection, Section, TitleSection } from '@styles/pages/home';

export default function Home() {
  return (
    <>
      <Section bg="light">
        <TitleSection as="h3">Galeria Premium</TitleSection>
        <LawsuitCardSwiper access="admin" lawsuits={lawsuitsMock} />
      </Section>

      <Section>
        <HeaderSection>
          <TitleSection as="h3">Anúncios gerais</TitleSection>
        </HeaderSection>

        <ListLayoutSingleLawsuits>
          <LawsuitCardList lawsuits={lawsuitsMock} access="logged" />
        </ListLayoutSingleLawsuits>
      </Section>
    </>
  );
}
