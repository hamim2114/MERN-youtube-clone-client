import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import {
   persistStore,
   persistReducer,
   FLUSH,
   REHYDRATE,
   PAUSE,
   PERSIST,
   PURGE,
   REGISTER,
} from 'redux-persist'; //redux persist for store data in localstorage
import storage from 'redux-persist/lib/storage';
import videoSlice from './videoSlice';

const persistConfig = {
   key: 'root',
   storage,
};

const rootReducer = combineReducers({ user: userSlice, video: videoSlice });

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
   reducer: persistedReducer,
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
         },
      }),
});

export const persistor = persistStore(store);
