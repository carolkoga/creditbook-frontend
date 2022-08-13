import WrapperSupport from '@components/pages/support/WrapperSupport';
import { WrapperVideo } from '@components/WrapperVideo';
import { HeaderSection, TitleSection } from '@styles/pages/home';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';

export default function TutorialVideo() {
  return (
    <WrapperSupport>
      <HeaderSection>
        <TitleSection as="h1" style={{ textAlign: 'center' }}>Vídeo Tutorial</TitleSection>
      </HeaderSection>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <WrapperVideo width="693px" height="429px">
          <LiteYouTubeEmbed id="w87t420-TWg" title="Creditbook" poster="hqdefault" />
        </WrapperVideo>
      </div>
    </WrapperSupport>
  );
}
