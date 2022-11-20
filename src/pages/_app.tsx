import Head from 'next/head';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { ToastContainer } from 'react-toastify';
import { ErrorBoundary } from 'react-error-boundary';
import NextNProgress from 'nextjs-progressbar';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-quill/dist/quill.snow.css';
import 'antd/dist/antd.css';
import '@validations/yup/methods';

import { light } from '@styles/themes/light';
import GlobalStyle from '@styles/global';

import Layout from '@components/Layout';
import SidebarContextProvider from '@context/SidebarContext';
import { AuthProvider } from 'context/AuthContext';
import ErrorFallback from '@components/ErrorFallback';

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
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <SidebarContextProvider>
              <GlobalStyle />
              <NextNProgress color="#29D" startPosition={0.3} height={3} />
              <ToastContainer />
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </SidebarContextProvider>
          </ErrorBoundary>
        </ThemeProvider>
      </AuthProvider>
    </>
  );
}
