import Navigation from '@components/pages/support/navigation';
import { WrapperVideo } from '@components/WrapperVideo';
import { HeaderSection, TitleSection } from '@styles/pages/home';

export default function TutorialVideo() {
  return (
    <>
      <Navigation />
      <HeaderSection>
        <TitleSection as="h1" style={{ textAlign: 'center' }}>Vídeo Tutorial</TitleSection>
      </HeaderSection>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <WrapperVideo width="693px" height="429px">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/w87t420-TWg"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </WrapperVideo>
      </div>
    </>
  );
}
