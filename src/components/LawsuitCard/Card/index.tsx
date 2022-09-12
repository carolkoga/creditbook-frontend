/* eslint-disable react/destructuring-assignment */
import React from 'react';
import type { ISuits } from '@type/Suits';

import convertToCurrency from '@utils/convertToCurrency';

import { Heart } from 'phosphor-react';
import { LawsuitCardProps } from '../types/Props';
import {
  Container, Content, Header, InformationOfSuit,
} from './styled';
import Footer from './components/Footer';

export const suitTranslation: ISuits<string> = {
  precatory: 'Precatório',
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
              ? <Heart size={24} color="#F16565" />
              : <Heart size={24} weight="fill" color="#F16565" /> }
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

        <Footer access={props.access} lawsuit={props.lawsuit} />
      </Content>
    </Container>
  );
}
