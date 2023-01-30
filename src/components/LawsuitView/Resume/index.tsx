import { processKindTranslation } from '@components/LawsuitCard/Card/utils/processKindTranslation';
import { NewLawsuitParams } from '@type/creditbook/Lawsuits';
import {
  Divider, Row, Col, Space,
} from 'antd';
import { ReactNode } from 'react';

import {
  Container, Title, Description, DescriptionWrapper,
} from '../styled';

interface IProps {
  children?: ReactNode,
  announcement: NewLawsuitParams
}

export default function Resume({ children = null, announcement }: IProps) {
  return (
    <Container>
      <Divider orientation="left">Dados do processo</Divider>
      <Row
        gutter={{
          xs: 8, sm: 16, md: 24, lg: 32,
        }}
        align="middle"
      >
        <Col>
          <Space direction="vertical" size="middle">
            <Title>Número do processo</Title>
            <DescriptionWrapper>
              <Description>{announcement.processNumber}</Description>
            </DescriptionWrapper>
          </Space>
        </Col>

        <Col>
          <Space direction="vertical" size="middle">
            <Title>Tribunal</Title>
            <DescriptionWrapper>
              <Description>{announcement.tribunal}</Description>
            </DescriptionWrapper>
          </Space>
        </Col>

        <Col>
          <Space direction="vertical" size="middle">
            <Title>Tipo de crédito</Title>
            <DescriptionWrapper>
              <Description>
                {processKindTranslation[announcement.kind]}
              </Description>
            </DescriptionWrapper>
          </Space>
        </Col>

        <Col>
          <Space direction="vertical" size="middle">
            <Title>Estado</Title>
            <DescriptionWrapper>
              <Description>{announcement.uf}</Description>
            </DescriptionWrapper>
          </Space>
        </Col>

        <Col>
          <Space direction="vertical" size="middle">
            <Title>Cidade</Title>
            <DescriptionWrapper>
              <Description>{announcement.city}</Description>
            </DescriptionWrapper>
          </Space>
        </Col>

        <Col>
          <Space direction="vertical" size="middle">
            <Title>Autor Principal:</Title>
            <DescriptionWrapper>
              <Description>
                {announcement.mainActorCorporationNameOrName?.toUpperCase()}
              </Description>
            </DescriptionWrapper>
          </Space>
        </Col>

        <Col>
          <Space direction="vertical" size="middle">
            <Title>CPF/CNPJ:</Title>
            <DescriptionWrapper>
              <Description>{announcement.mainActorCpfOrCnpj}</Description>
            </DescriptionWrapper>
          </Space>
        </Col>

      </Row>

      {announcement?.secondaryActorCorporationNameOrName && (
        <>
          <Divider orientation="left">Autor Secundario</Divider>
          <Row>
            <Col>
              <h3>Reú Secundario</h3>
              <Space size="large">
                <Space direction="vertical" size="middle">
                  <Title>Nome</Title>
                  <DescriptionWrapper>
                    <Description>
                      {announcement.secondaryActorCorporationNameOrName}
                    </Description>
                  </DescriptionWrapper>
                </Space>

                <Space direction="vertical" size="middle">
                  <Title>CPF/CNPJ</Title>
                  <DescriptionWrapper>
                    <Description>
                      {announcement.secondaryActorCpfOrCnpj}
                    </Description>
                  </DescriptionWrapper>
                </Space>
              </Space>
            </Col>
          </Row>
        </>
      )}

      {announcement.type === 'digital' && (
      <>
        <Divider orientation="left">Processo Digital</Divider>
        <Row
          gutter={{
            xs: 8, sm: 16, md: 24, lg: 32,
          }}
          align="middle"
        >
          <Col>
            <Space direction="vertical" size="middle">
              <Title>Link do processo</Title>
              <DescriptionWrapper>
                <Description as="a" href={announcement.digitalProcess}>
                  {announcement.digitalProcess}
                </Description>
              </DescriptionWrapper>
            </Space>
          </Col>
        </Row>
      </>
      )}

      <Divider orientation="left">Dados da parte adversa</Divider>
      <Row
        gutter={{
          xs: 8, sm: 16, md: 24, lg: 32,
        }}
        align="middle"
      >
        <Col>
          <h3>Reú Principal</h3>
          <Space size="large">
            <Space direction="vertical" size="middle">
              <Title>Nome</Title>
              <DescriptionWrapper>
                <Description>
                  {announcement.mainDefendantCorporationNameOrName?.toUpperCase()}
                </Description>
              </DescriptionWrapper>
            </Space>

            <Space direction="vertical" size="middle">
              <Title>CPF/CNPJ</Title>
              <DescriptionWrapper>
                <Description>
                  {announcement.mainDefendantCpfOrCnpj}
                </Description>
              </DescriptionWrapper>
            </Space>
          </Space>
        </Col>

        {announcement?.secondaryDefendantCorporationNameOrName && (
          <Col>
            <h3>Reú Secundario</h3>
            <Space size="large">
              <Space direction="vertical" size="middle">
                <Title>Nome</Title>
                <DescriptionWrapper>
                  <Description>
                    {announcement.secondaryDefendantCorporationNameOrName?.toUpperCase()}
                  </Description>
                </DescriptionWrapper>
              </Space>

              <Space direction="vertical" size="middle">
                <Title>CPF/CNPJ</Title>
                <DescriptionWrapper>
                  <Description>
                    {announcement.secondaryDefendantCpfOrCnpj}
                  </Description>
                </DescriptionWrapper>
              </Space>
            </Space>
          </Col>
        )}
      </Row>

      <Divider orientation="left">Outras informações</Divider>
      <Row
        gutter={{
          xs: 8, sm: 16, md: 24, lg: 32,
        }}
        align="middle"
      >
        <Col>
          <Space direction="vertical" size="middle">
            <Title>Penhora ou outra garantia</Title>
            <DescriptionWrapper>
              <Description>
                {announcement.pledgeOrGuarantee ? 'Sim' : 'Não'}
              </Description>
            </DescriptionWrapper>
          </Space>
        </Col>

        <Col>
          <Space direction="vertical" size="middle">
            <Title>Aceita negociação</Title>
            <DescriptionWrapper>
              <Description>
                {announcement.acceptNegotiation ? 'Sim' : 'Não'}
              </Description>
            </DescriptionWrapper>
          </Space>
        </Col>
      </Row>

      {children}
    </Container>
  );
}
