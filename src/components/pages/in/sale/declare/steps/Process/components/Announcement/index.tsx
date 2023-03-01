import {
  Container,
  AuthorList,
  ContainerInfo,
  ContentInfo,
  InfoList,
  TextInfo,
  TitleInfo,
  WrapperInfo,
} from './styled';

export function AnnouncementShow() {
  return (
    <Container>
      <InfoList>
        <ContainerInfo>
          <TitleInfo>Estado</TitleInfo>
          <ContentInfo>
            <TextInfo>SP</TextInfo>
          </ContentInfo>
        </ContainerInfo>

        <ContainerInfo>
          <TitleInfo>Estado</TitleInfo>
          <ContentInfo>
            <TextInfo>SP</TextInfo>
          </ContentInfo>
        </ContainerInfo>

        <ContainerInfo>
          <TitleInfo>Cidade</TitleInfo>
          <ContentInfo>
            <TextInfo>São Paulo</TextInfo>
          </ContentInfo>
        </ContainerInfo>

        <ContainerInfo>
          <TitleInfo>Tribunal</TitleInfo>
          <ContentInfo>
            <TextInfo>1 dois</TextInfo>
          </ContentInfo>
        </ContainerInfo>

        <ContainerInfo>
          <TitleInfo>Espécie</TitleInfo>
          <ContentInfo>
            <TextInfo>Penhora</TextInfo>
          </ContentInfo>
        </ContainerInfo>

        <ContainerInfo>
          <TitleInfo>Gênero do processo</TitleInfo>
          <ContentInfo>
            <TextInfo>Em execução</TextInfo>
          </ContentInfo>
        </ContainerInfo>

        <ContainerInfo>
          <TitleInfo>Fase de ação</TitleInfo>
          <ContentInfo>
            <TextInfo>Teste</TextInfo>
          </ContentInfo>
        </ContainerInfo>
      </InfoList>

      <AuthorList>
        <WrapperInfo>
          <h2>Autor Principal</h2>

          <ContainerInfo>
            <TitleInfo>Nome</TitleInfo>
            <ContentInfo>
              <TextInfo>Robe</TextInfo>
            </ContentInfo>
          </ContainerInfo>

          <ContainerInfo>
            <TitleInfo>CNPJ/CPF</TitleInfo>
            <ContentInfo>
              <TextInfo>123</TextInfo>
            </ContentInfo>
          </ContainerInfo>
        </WrapperInfo>

        <WrapperInfo>
          <h2>Autor Secundário</h2>

          <ContainerInfo>
            <TitleInfo>Nome</TitleInfo>
            <ContentInfo>
              <TextInfo>Robe</TextInfo>
            </ContentInfo>
          </ContainerInfo>

          <ContainerInfo>
            <TitleInfo>CNPJ/CPF</TitleInfo>
            <ContentInfo>
              <TextInfo>123</TextInfo>
            </ContentInfo>
          </ContainerInfo>
        </WrapperInfo>
      </AuthorList>
    </Container>
  );
}
