import {combineReducers, configureStore} from '@reduxjs/toolkit';
import tokenReducer from './token/tokenSlice';
import authReducer from './auth/authSlice';
import photosReducer from './photo/photosSlice';
import imageReducer from './imageSlice/imageSlice';

const rootReducer = combineReducers({
  token: tokenReducer,
  auth: authReducer,
  photos: photosReducer,
  image: imageReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];
export type RootState = ReturnType<typeof rootReducer>;
