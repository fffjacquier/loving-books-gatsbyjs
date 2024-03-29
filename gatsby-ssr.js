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
