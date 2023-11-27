import {createAsyncThunk} from '@reduxjs/toolkit';

type ThunkApiConfig = {
  state: {token: {token: string}} & {photos: {page: number}} & {
    photos: {isLast: boolean};
  };
  rejectValue: string;
};

export const createAppAsyncThunk = createAsyncThunk.withTypes<ThunkApiConfig>();
