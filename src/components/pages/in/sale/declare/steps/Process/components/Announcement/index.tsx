import { LawsuitParams } from '@type/creditbook/Lawsuits';
import { courtsOptions } from '@mocks/ReactSelectOptions/CourtsOptions';
import { processKindTranslation } from '@components/LawsuitCard/Card/utils/processKindTranslation';
import { processCategoryTranslation } from '@components/LawsuitCard/Card/utils/processCategoryTranslation';
import { actionPhaseTranslation } from '@components/LawsuitCard/Card/utils/actionPhaseTranslation';
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

interface AnnouncementShowProps {
  announcement: LawsuitParams;
}

export function AnnouncementShow({ announcement }: AnnouncementShowProps) {
  const courtName = courtsOptions[announcement.uf as keyof typeof courtsOptions]
    .find((currentCourt) => currentCourt.value === announcement.tribunal);
  return (
    <Container>
      <InfoList>
        <ContainerInfo>
          <TitleInfo>Estado</TitleInfo>
          <ContentInfo>
            <TextInfo>{announcement.uf}</TextInfo>
          </ContentInfo>
        </ContainerInfo>

        <ContainerInfo>
          <TitleInfo>Cidade</TitleInfo>
          <ContentInfo>
            <TextInfo>{announcement.city}</TextInfo>
          </ContentInfo>
        </ContainerInfo>

        <ContainerInfo>
          <TitleInfo>Tribunal</TitleInfo>
          <ContentInfo>
            <TextInfo>
              {courtName?.label}
            </TextInfo>
          </ContentInfo>
        </ContainerInfo>

        <ContainerInfo>
          <TitleInfo>Espécie</TitleInfo>
          <ContentInfo>
            <TextInfo>
              {processKindTranslation[announcement.kind as keyof typeof processKindTranslation]}
            </TextInfo>
          </ContentInfo>
        </ContainerInfo>

        <ContainerInfo>
          <TitleInfo>Gênero do processo</TitleInfo>
          <ContentInfo>
            <TextInfo>
              {
                processCategoryTranslation[
                  announcement.processGender as keyof typeof processCategoryTranslation]
              }
            </TextInfo>
          </ContentInfo>
        </ContainerInfo>

        <ContainerInfo>
          <TitleInfo>Fase de ação</TitleInfo>
          <ContentInfo>
            <TextInfo>
              {
                actionPhaseTranslation[
                  announcement.actionPhase as keyof typeof actionPhaseTranslation]
              }
            </TextInfo>
          </ContentInfo>
        </ContainerInfo>
      </InfoList>

      <AuthorList>
        <WrapperInfo>
          <h2>Autor Principal</h2>

          <ContainerInfo>
            <TitleInfo>Nome</TitleInfo>
            <ContentInfo>
              <TextInfo>
                {announcement.mainActorCorporationNameOrName}
              </TextInfo>
            </ContentInfo>
          </ContainerInfo>

          <ContainerInfo>
            <TitleInfo>CNPJ/CPF</TitleInfo>
            <ContentInfo>
              <TextInfo>{announcement.mainActorCpfOrCnpj}</TextInfo>
            </ContentInfo>
          </ContainerInfo>
        </WrapperInfo>

        {announcement?.secondaryActorCorporationNameOrName && (
        <WrapperInfo>
          <h2>Autor Secundário</h2>

          <ContainerInfo>
            <TitleInfo>Nome</TitleInfo>
            <ContentInfo>
              <TextInfo>{announcement.secondaryActorCorporationNameOrName}</TextInfo>
            </ContentInfo>
          </ContainerInfo>

          <ContainerInfo>
            <TitleInfo>CNPJ/CPF</TitleInfo>
            <ContentInfo>
              <TextInfo>{announcement.secondaryActorCpfOrCnpj}</TextInfo>
            </ContentInfo>
          </ContainerInfo>
        </WrapperInfo>
        )}
      </AuthorList>
    </Container>
  );
}
