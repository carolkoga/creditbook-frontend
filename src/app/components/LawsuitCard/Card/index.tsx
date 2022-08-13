/* eslint-disable react/destructuring-assignment */
import React from 'react';
import type { ISuits } from '@type/Suits';

import convertToCurrency from '@utils/convertToCurrency';
import Link from 'next/link';
import { Button } from '@components/Button/styled';
import { LawsuitCardProps } from '../types/Props';
import {
  Actions,
  Container, Content, Header, InformationOfSuit,
} from './styled';

const suitTranslation: ISuits<string> = {
  precatory: 'precatório',
  labor: 'Trabalhista',
  civil: 'Cível',
  fiscal: 'Fiscal',
};

export default function LawsuitCard(props: LawsuitCardProps) {
  return (
    <Container>
      <Header suit={props.lawsuit.suit}>
        <strong>{suitTranslation[props.lawsuit.suit]}</strong>
        {(props.access !== 'not logged') && (
        <div className="more__information">
          {props.lawsuit.isPremium && <strong>Premium</strong>}

          <button type="button" onClick={() => props.onToggleFavorite()}>
            {props.lawsuit.isFavorite
              ? <span>H</span>
              : <span>HN</span>}
          </button>
        </div>
        )}
      </Header>

      <Content>
        <span className="location">
          {`${props.lawsuit.address.city} - ${props.lawsuit.address.state}`}
        </span>

        <InformationOfSuit className="no__align">
          <h3>Espécie:</h3>
          <span>{props.lawsuit.courtCase}</span>
        </InformationOfSuit>

        {props.access !== 'not logged' && (
        <>
          <InformationOfSuit>
            <h3>Fase do processo:</h3>
            <span>{props.lawsuit.stateOfProcess}</span>
          </InformationOfSuit>

          <InformationOfSuit>
            <h3>Penhora ou garantia:</h3>
            <span>{props.lawsuit.pledgeOrSecure}</span>
          </InformationOfSuit>
        </>
        )}
        <InformationOfSuit>
          <h3>Valor do processo:</h3>
          <span>{convertToCurrency(props.lawsuit.valueSuit)}</span>
        </InformationOfSuit>

        <InformationOfSuit className="bold">
          <h3>Valor de liquidação:</h3>
          <span>{convertToCurrency(props.lawsuit.income)}</span>
        </InformationOfSuit>
      </Content>

      {props.access === 'admin' && (
      <Actions>
        <div>
          <Link href="/informacao" color="secondary">
            <Button as="a" size="small-large" variant="secondary">
              Informação
            </Button>
          </Link>
          <Link href="/">
            <Button as="a" size="small-large" variant="default">
              {props.lawsuit.suit}
            </Button>
          </Link>
        </div>
      </Actions>
      )}

      {props.access === 'logged' && (
      <Actions>
        <div>
          <Link href="/informacao" color="secondary">
            <Button as="a" size="small-large" variant="secondary">
              Informação
            </Button>
          </Link>
          <Link href="/">
            <Button as="a" size="small-large" variant="default">
              Comprar
            </Button>
          </Link>
        </div>
      </Actions>
      )}

      {props.access === 'not logged' && (
      <Actions>
        <div>
          <Link href="/informacao" color="secondary">
            <Button as="a" size="small-large" variant="secondary">
              Cadastrar
            </Button>
          </Link>
          <Link href="/">
            <Button as="a" size="small-large" variant="default">
              Entrar
            </Button>
          </Link>
        </div>

        <span>
          Faça o cadastro para obter mais informações
        </span>
      </Actions>
      )}
    </Container>
  );
}
