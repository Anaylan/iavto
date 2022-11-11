import {
  applyMiddleware,
  createStore,
  getDefaultMiddleware,
  Store,
  AnyAction
} from '@reduxjs/toolkit'
import { rootReducer, rootSaga } from './RootReducers'
import createSagaMiddleware from 'redux-saga'
import { createWrapper, MakeStore } from 'next-redux-wrapper'
import { persistStore, persistReducer, Persistor } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const sagaMiddleware = createSagaMiddleware()
const middleware = [
  ...getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false
  }),
  sagaMiddleware
]

interface IStoreProps extends Store<IStoreProps, AnyAction> {
  persistor?: Persistor
}

const bindMiddleware = (middleware: any) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension')
    return composeWithDevTools(applyMiddleware(...middleware))
  }
  return applyMiddleware(...middleware)
}

// type Store = ReturnType<typeof makeStore>

const makeStore: MakeStore<Store<IStoreProps, AnyAction>> = () => {
  // const persistConfig = {
  //   key: 'root',
  //   storage
  // }

  // const persistedReducer = persistReducer(persistConfig, rootReducer)

  const store: IStoreProps = createStore(
    rootReducer,
    bindMiddleware(middleware)
  )

  store.persistor = persistStore(store)

  sagaMiddleware.run(rootSaga)

  return store
}

export const wrapper = createWrapper(makeStore, { debug: true })
