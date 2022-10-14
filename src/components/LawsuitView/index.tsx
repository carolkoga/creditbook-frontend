import {
  Divider, Row, Col, Space,
} from 'antd';
import { File } from 'phosphor-react';
import { ReactNode } from 'react';

import {
  Container, Title, Description, DescriptionWrapper,
} from './styled';

interface IProps {
  children?: ReactNode
}

export default function LawsuitView({ children }: IProps) {
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
              <Description>51605485620228192646</Description>
            </DescriptionWrapper>
          </Space>
        </Col>

        <Col>
          <Space direction="vertical" size="middle">
            <Title>Tribunal</Title>
            <DescriptionWrapper>
              <Description>superior Tribunal de Justiça</Description>
            </DescriptionWrapper>
          </Space>
        </Col>

        <Col>
          <Space direction="vertical" size="middle">
            <Title>Tipo de crédito</Title>
            <DescriptionWrapper>
              <Description>Trabalhista</Description>
            </DescriptionWrapper>
          </Space>
        </Col>

        <Col>
          <Space direction="vertical" size="middle">
            <Title>Estado</Title>
            <DescriptionWrapper>
              <Description>AL</Description>
            </DescriptionWrapper>
          </Space>
        </Col>

        <Col>
          <Space direction="vertical" size="middle">
            <Title>Cidade</Title>
            <DescriptionWrapper>
              <Description>Amaturá</Description>
            </DescriptionWrapper>
          </Space>
        </Col>

        <Col>
          <Space direction="vertical" size="middle">
            <Title>Autor Principal:</Title>
            <DescriptionWrapper>
              <Description>BRENO NATHAN JUAN MONTEIRO</Description>
            </DescriptionWrapper>
          </Space>
        </Col>

        <Col>
          <Space direction="vertical" size="middle">
            <Title>CPF/CNPJ:</Title>
            <DescriptionWrapper>
              <Description>443.176.651-07</Description>
            </DescriptionWrapper>
          </Space>
        </Col>
      </Row>

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
              <Description as="a" href="#procuracao">https://test.com</Description>
            </DescriptionWrapper>
          </Space>
        </Col>

        {/* Para processo fisicos */}
        <Col>
          <Space direction="vertical" size="middle">
            <Title>Petição Inicial</Title>
            <DescriptionWrapper>
              <Description as="a" href="#procuracao" download="procuracao" title="Clique para fazer download">
                <File size={18} />
                Sim
              </Description>
            </DescriptionWrapper>
          </Space>
        </Col>
      </Row>

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
                <Description>Carlos</Description>
              </DescriptionWrapper>
            </Space>

            <Space direction="vertical" size="middle">
              <Title>CPF/CNPJ</Title>
              <DescriptionWrapper>
                <Description>3243434324234</Description>
              </DescriptionWrapper>
            </Space>
          </Space>
        </Col>

        <Col>
          <h3>Reú Secundario</h3>
          <Space size="large">
            <Space direction="vertical" size="middle">
              <Title>Nome</Title>
              <DescriptionWrapper>
                <Description>Carlos</Description>
              </DescriptionWrapper>
            </Space>

            <Space direction="vertical" size="middle">
              <Title>CPF/CNPJ</Title>
              <DescriptionWrapper>
                <Description>3243434324234</Description>
              </DescriptionWrapper>
            </Space>
          </Space>
        </Col>
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
              <Description>Sim</Description>
            </DescriptionWrapper>
          </Space>
        </Col>

        <Col>
          <Space direction="vertical" size="middle">
            <Title>Aceita negociação</Title>
            <DescriptionWrapper>
              <Description>Sim</Description>
            </DescriptionWrapper>
          </Space>
        </Col>

        <Col>
          <Space direction="vertical" size="middle">
            <Title>Procuração</Title>
            <DescriptionWrapper>
              <Description as="a" href="#procuracao" download="procuracao" title="Clique para fazer download">
                <File size={18} />
                Sim
              </Description>
            </DescriptionWrapper>
          </Space>
        </Col>
      </Row>

      {children}
    </Container>
  );
}

LawsuitView.defaultProps = {
  children: null,
};
