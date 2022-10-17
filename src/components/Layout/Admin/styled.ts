import { Layout } from 'antd';
import styled from 'styled-components';

export const Header = styled(Layout.Header)`
  padding: 0;
  background: none;
  width: 100%;
  position: sticky;
  top: 0;
  background: #fff;
  z-index: 999;
`;

export const Content = styled(Layout.Content)`
  padding: 2.4rem;

  @media (max-width: 350px) {
    padding: 1.6rem;
  }
`;
