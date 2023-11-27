import {createSlice} from '@reduxjs/toolkit';
import {getToken} from '../../api/token';

interface MyToken {
  loading: boolean;
  token: string;
  error: string;
}

const initialState: MyToken = {
  loading: false,
  token: '',
  error: '',
};

export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    deleteToken: (state) => {
      state.token = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getToken.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(getToken.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
        state.error = '';
      })
      .addCase(getToken.rejected, (state, action) => {
        state.loading = false;
        state.token = '';
        if (action.payload) {
          state.error = action.payload;
        }
      });
  },
});

export const {deleteToken} = tokenSlice.actions;

export default tokenSlice.reducer;
