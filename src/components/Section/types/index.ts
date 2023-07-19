import { CSSProperties } from 'styled-components';

export interface SectionContainerProps {
  bg?: 'white' | 'light';
  align?: 'center';
}

export interface SectionTitleProps {
  textColor?: 'default' | 'secondary' | 'dark' | 'white';
}

export interface HeaderSectionProps {
  direction?: 'horizontal';
  alignItems?: CSSProperties['alignItems'];
  justifyContent?: CSSProperties['justifyContent'];
  gap?: string;
}
