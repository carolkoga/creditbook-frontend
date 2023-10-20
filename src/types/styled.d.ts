import 'styled-components';
import { light } from '@components/Button/light';

declare module 'styled-components' {
  type LightThemeType = typeof light;
  export interface DefaultTheme extends LightThemeType { }
}
