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

import 'assets/sass/reset.scss'
import 'assets/sass/fonts.scss'
import 'assets/sass/globals.scss'

import { PersistGate } from 'redux-persist/integration/react'

export default function MyApp({ Component, ...rest }: AppProps) {
  console.log('%cНе лезьте сюда пожалуйста', 'font-size: 45px; color:blue')
  const { store, props }: any = wrapper.useWrappedStore(rest)

  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault()
      e.stopPropagation()
    })
    document.onkeydown = function (e) {
      if (e.keyCode == 123) {
        return false
      }
      if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
        return false
      }
      if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
        return false
      }
      if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
        return false
      }
    }
  }

  setupAxios(axiosAuth, store)
  setupRegion(axios, store)
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={store.persistor}>
          {/* <Suspense fallback={<Load />}> */}
          <MasterLayout>
            <Component {...props.pageProps} />
          </MasterLayout>
          {/* </Suspense> */}
        </PersistGate>
      </Provider>
    </>
  )
}
