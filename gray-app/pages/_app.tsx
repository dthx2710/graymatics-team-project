import { ReactElement, ReactNode, useState } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import nProgress from 'nprogress';
import 'nprogress/nprogress.css';
import ThemeProvider from 'src/theme/ThemeProvider';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import createEmotionCache from 'src/createEmotionCache';
import { SidebarProvider } from 'src/contexts/SidebarContext';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import 'react-modal-video/scss/modal-video.scss';

const clientSideEmotionCache = createEmotionCache();

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface GrayAppProps extends AppProps {
  emotionCache?: EmotionCache;
  Component: NextPageWithLayout;
  session: Session;
  pageProps: any;
}

function GrayApp(props: GrayAppProps) {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps,
    session
  } = props;
  const [theme, setTheme] = useState('GraymaticsBaseTheme');
  const getLayout = Component.getLayout ?? ((page) => page);
  pageProps.setTheme = setTheme;
  Router.events.on('routeChangeStart', nProgress.start);
  Router.events.on('routeChangeError', nProgress.done);
  Router.events.on('routeChangeComplete', nProgress.done);

  return (
    <SessionProvider session={session}>
      <CacheProvider value={emotionCache}>
        <Head>
          <title>Graymatics App</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
        </Head>
        <SidebarProvider>
          <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <CssBaseline />
              {getLayout(<Component {...pageProps} />)}
            </LocalizationProvider>
          </ThemeProvider>
        </SidebarProvider>
      </CacheProvider>
    </SessionProvider>
  );
}

export default GrayApp;
