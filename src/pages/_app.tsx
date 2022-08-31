import type { AppProps } from 'next/app';
import Head from 'next/head';
import GlobalStyle from '@styles/global';
import { ThemeProvider } from 'styled-components';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';

import { light } from '@styles/themes/light';
import Layout from '@components/Layout';
import SidebarContextProvider from 'app/context/SidebarContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="theme-color" content="#FFFFFF" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="CreditBook.A revolução do jeito de negociar créditos, ações e direitos judiciais.
Precisando de dinheiro? Procurando uma forma lucrativa para investir? Chegou a plataforma definitiva para negociar créditos, ações e direitos judiciais. É simples, rápido e seguro."
        />
        <title>CreditBook</title>
      </Head>

      <ThemeProvider theme={light}>
        <SidebarContextProvider>
          <GlobalStyle />

          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SidebarContextProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
