import Head from 'next/head';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { ToastContainer } from 'react-toastify';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';
import 'react-toastify/dist/ReactToastify.css';
import '@validations/yup/methods/string';

import { light } from '@styles/themes/light';
import GlobalStyle from '@styles/global';

import Layout from '@components/Layout';
import SidebarContextProvider from '@context/SidebarContext';
import { AuthProvider } from 'context/AuthContext';

export default function MyApp({ Component, pageProps }: AppProps) {
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
      <AuthProvider>
        <ThemeProvider theme={light}>
          <SidebarContextProvider>
            <GlobalStyle />

            <ToastContainer />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </SidebarContextProvider>
        </ThemeProvider>
      </AuthProvider>
    </>
  );
}
