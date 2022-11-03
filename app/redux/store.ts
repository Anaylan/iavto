import {
  applyMiddleware,
  configureStore,
  createStore,
  getDefaultMiddleware,
  Store
} from '@reduxjs/toolkit'
import { persistStore } from 'redux-persist'
import { rootReducer, rootSaga } from './RootReducers'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import { Context, createWrapper } from 'next-redux-wrapper'

const sagaMiddleware = createSagaMiddleware()
const middleware = [
  ...getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
    thunk: true
  }),
  sagaMiddleware
]

interface IStoreProps {
  isServer?: boolean
}

const bindMiddleware = (middleware: any) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension')
    return composeWithDevTools(applyMiddleware(...middleware))
  }
  return applyMiddleware(...middleware)
}

const makeStore: IStoreProps = ({ isServer }: { isServer: boolean }) => {
  if (isServer) {
    //If it's on server side, create a store
    return createStore(rootReducer, bindMiddleware(middleware))
  } else {
    //If it's on client side, create a store which will persist
    const { persistStore, persistReducer } = require('redux-persist')
    const storage = require('redux-persist/lib/storage').default

    const persistConfig = {
      key: 'root',
      storage
    }

    const persistedReducer = persistReducer(persistConfig, rootReducer)

    const store = createStore(persistedReducer, bindMiddleware(middleware))

    store.__persistor = persistStore(store)

    sagaMiddleware.run(rootSaga)

    return store
  }
}

export const wrapper = createWrapper(makeStore, { debug: true })
