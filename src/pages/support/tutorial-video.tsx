import WrapperSupport from '@components/pages/support/WrapperSupport';
import { WrapperVideo } from '@components/WrapperVideo';
import { Section } from '@components/Section';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';

export default function TutorialVideo() {
  return (
    <WrapperSupport>
      <Section.Header>
        <Section.Title as="h1" style={{ textAlign: 'center' }}>Vídeo Tutorial</Section.Title>
      </Section.Header>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <WrapperVideo width="693px" height="429px">
          <LiteYouTubeEmbed id="w87t420-TWg" title="Creditbook" poster="hqdefault" />
        </WrapperVideo>
      </div>
    </WrapperSupport>
  );
}
