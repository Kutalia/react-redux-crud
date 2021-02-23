import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist'
import storage from 'redux-persist/lib/storage';

import userReducer from './user/userSlice';
import shopReducer from './shop/shopSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({ user: userReducer, shop: shopReducer });

const persistedReducer = persistReducer(persistConfig, rootReducer);

const constructStore = () => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
  });
  const persistor = persistStore(store);
  return { store, persistor };
};

export default constructStore;
