import 'styled-components';
import { light } from '@styles/themes/light';

declare module 'styled-components' {
  type LightThemeType = typeof light;
  export interface DefaultTheme extends LightThemeType { }
}
