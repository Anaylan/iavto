import { wrapper } from 'app/redux/store'
import { Load } from 'assets/icon/icons'
import { MasterLayout } from 'modules/layouts'
import type { AppProps } from 'next/app'
import { Suspense } from 'react'
import { Provider } from 'react-redux'

import { setupAxios, setupRegion } from 'app'
import axiosAuth from 'app/axiosAuth'
import axios from 'axios'
import 'bootstrap/scss/bootstrap.scss'

import 'assets/sass/globals.scss'
import 'assets/sass/reset.scss'

import { PersistGate } from 'redux-persist/integration/react'

function MyApp({ Component, ...rest }: AppProps) {
  console.log('%cНе лезьте сюда пожалуйста', 'font-size: 45px; color:blue')
  const { store, props }: any = wrapper.useWrappedStore(rest)

  setupAxios(axiosAuth, store)
  setupRegion(axios, store)
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={store.__persistor}>
          <Suspense fallback={<Load />}>
            <MasterLayout>
              <Component {...props.pageProps} />
            </MasterLayout>
          </Suspense>
        </PersistGate>
      </Provider>
    </>
  )
}

export default MyApp
