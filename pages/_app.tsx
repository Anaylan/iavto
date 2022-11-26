import { wrapper } from 'app/redux/store';
import { Load } from 'assets/icon/icons';
import { MasterLayout } from 'modules/layouts';
import type { AppProps } from 'next/app';
import { Suspense, useMemo } from 'react';
import { Provider } from 'react-redux';

import { setupAxios, setupRegion } from 'app';
import axiosAuth from 'app/axiosAuth';
import axios from 'axios';
import 'bootstrap/scss/bootstrap.scss';

import 'assets/sass/reset.scss';
import 'assets/sass/fonts.scss';
import 'assets/sass/globals.scss';

import { PersistGate } from 'redux-persist/integration/react';

export default function MyApp({ Component, ...rest }: AppProps) {
  useMemo(() => {
    console.log(
      '%cСтоп-стоп-стоп!',
      '-webkit-text-stroke: 2px black; color: #06799F !important; font-size: 45px; font-weight: bold',
    );
    console.log(
      '%cЕсли вас попросили скопировать/вставить что-то сюда, 11 шансов из 10, что вы жертва мошенников.',
      'font-size: 20px;',
    );
    console.log(
      '%cВвод сюда информации может дать мошенникам доступ к вашей учётной записи ЯАВТО.РФ',
      'font-size: 15px; color: red',
    );
    console.log(
      '%cЕсли вы не до конца уверены в том, что вы делаете, лучше закройте это окно и оставайтесь в безопасности.',
      'font-size: 15px;',
    );
    // console.log(
    //   '%cЕсли вы действительно понимаете, что делаете, то приходите к нам работать https://t.me/vodilaNikita',
    //   'font-size: 15px;',
    // );
  }, []);

  const { store, props }: any = wrapper.useWrappedStore(rest);
  setupAxios(axiosAuth, store);
  setupRegion(axios, store);

  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      e.stopPropagation();
    });
    document.onkeydown = function (e) {
      if (e.keyCode == 123) {
        return false;
      }
      if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
        return false;
      }
      if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
        return false;
      }
      if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
        return false;
      }
    };
  }

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={store.persistor}>
          <Suspense fallback={<Load />}>
            <MasterLayout>
              <Component {...props.pageProps} />
            </MasterLayout>
          </Suspense>
        </PersistGate>
      </Provider>
    </>
  );
}
