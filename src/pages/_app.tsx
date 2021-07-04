import React from 'react';

import { AppProps } from 'next/app';

import { AnimatePresence } from 'framer-motion';

import Toast from '@/components/atoms/Toast';
import Menu from '@/components/molecules/Menu';
import AppProvider from '@/components/templates/AppProvider';

import GlobalStyle from '@/styles/global';

const MyApp: React.FC<AppProps> = ({ Component, pageProps, router }) => {
  return (
    <AppProvider>
      <GlobalStyle />
      <Menu />
      <AnimatePresence exitBeforeEnter>
        <Component {...pageProps} key={router.route} />
      </AnimatePresence>
      <Toast />
    </AppProvider>
  );
};

export default MyApp;
