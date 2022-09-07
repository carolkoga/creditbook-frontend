import styled, { CSSProperties } from 'styled-components';

export interface DirectionProps {
  direction?: 'horizontal',
  alignItems?: CSSProperties['alignItems'],
  justifyContent?: CSSProperties['justifyContent']
  gap?: string,
}

export const Direction = styled.div<DirectionProps>`
  display: flex;
  flex-direction: ${({ direction }) => (direction === 'horizontal' ? 'row' : 'column')};
  align-items: ${({ alignItems }) => (!alignItems ? 'flex-start' : alignItems)};
  justify-content: ${({ justifyContent }) => (!justifyContent ? 'flex-start' : justifyContent)};
  gap: ${({ gap }) => (!gap ? '1.6rem' : gap)};
  width: 100%;
  flex-wrap: wrap;
`;
