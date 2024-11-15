'use client';

import { configureStore } from '@reduxjs/toolkit';
import HotelReducer from './redux/HotelReducer';

const store = configureStore({
  reducer: {
    hotel: HotelReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
