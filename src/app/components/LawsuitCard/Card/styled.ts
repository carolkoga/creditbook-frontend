import styled, { css, CSSProp } from 'styled-components';
import { ISuits } from '@type/index';

interface IHeaderCard {
  suit: keyof ISuits<CSSProp>
}

const headerCardSuit: ISuits<CSSProp> = {
  civil: css`
    background-color: #CECAF3;
  `,

  labor: css`
    background-color: #F3DFC2;
  `,

  precatory: css`
    background-color: #DDF3D2;
  `,

  fiscal: css`
    background-color: #CFEAEC;
  `,
};

const firstLatterUpercase = css`
  ::first-letter {
    text-transform: uppercase;
  }
`;

export const Container = styled.article`
  max-height: 364px;
  height: 100%;
  max-width: 338px;
  width: 100%;
  border-radius: 10px;
  font-family: 'Roboto', sans-serif;
  box-shadow: 2px 2px 5px rgba(133, 133, 133, 0.1);
  padding-bottom: 15px;
  background: #FFF;
`;

export const Header = styled.header`
  ${({ suit }: IHeaderCard) => headerCardSuit[suit]};
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding: 8px 32px;
  strong {
    ${firstLatterUpercase};
    font-weight: 500;
    font-size: 18px;
    color: #434242;
  }

  .more__information {
    display: flex;
    align-items: center;
    justify-content: center;
    strong {
      ${firstLatterUpercase};
      font-weight: 500;
      color: #1C1C1C;

      + button {
        margin-left: 11px;
      }
    }

    button {
      padding: 0;
      border: none;
      background: none;
    }
  }
`;

const marginOfContentAndActions = css`
  /* top -- horizontal -- bottom */
  margin: 12px 32px 9px;

  @media screen and (max-width: 1262px) {
    margin-left: 24px;
    margin-right: 24px;
  }
`;

export const Content = styled.div`
  color: #929292;

  span {
    font-weight: 400;
    line-height: 15px;
    font-size: 13px;

    ${firstLatterUpercase};

  }

  span.location + div {
    margin-top: 6px;
  }

  ${marginOfContentAndActions};
  margin-bottom: 20px;
`;

export const InformationOfSuit = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;

  &.no__align {
    h3 {
      width: auto;
    }
  }

  &.bold {
    h3, span {
      font-weight: 700;
      color: #434242;
    }

  }

  h3 {
    ${firstLatterUpercase};
    font-weight: 400;
    line-height: 15px;
    font-size: 13px;
    width: 100%;
    max-width: 133px;
    margin: 0;
    margin-right: 10px;
  }

  & + & {
    margin-top: 6px;
  }

  @media screen and (max-width: 392px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const Actions = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 8px;

  span {
    font-size: 10px;
    color: #929292;
    font-weight: 400;
    line-height: 12px;
    margin-top: 6px;
  }

  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
  }

  ${marginOfContentAndActions};
  margin-top: 0;
  margin-bottom: 0;

  @media screen and (max-width: 392px) {
    div {
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
    }

  }
`;
