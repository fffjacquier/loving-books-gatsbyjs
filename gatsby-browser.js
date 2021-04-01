import React from 'react';
import Layout from './src/components/Layout';
import { OrderProvider } from './src/components/OrderContext';

export function wrapPageElement({ element, props }) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Layout {...props}>{element}</Layout>;
}

// use Root if you want some data to stick from page to page
export function wrapRootElement({ element }) {
  return <OrderProvider>{element}</OrderProvider>;
}

export const onServiceWorkerUpdateReady = () => {
  const answer = window.confirm(
    `Cette application a été mise à jour. ` +
      `Recharger pour accéder à la dernière version ?`
  );
  if (answer === true) {
    window.location.reload();
  }
};

// export const registerServiceWorker = () => true;
