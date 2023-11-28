import {createSlice} from '@reduxjs/toolkit';
import {authRequestAsync} from './authAction';

export interface MyAuth {
  loading: boolean;
  data: {name: string; authImg: string};
  error: string | null;
}

const initialState: MyAuth = {
  loading: false,
  data: {name: '', authImg: ''},
  error: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authLogout: (state) => {
      state.data = {name: '', authImg: ''};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authRequestAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(authRequestAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.data.name = action.payload?.name;
        state.data.authImg = action.payload?.authImg;
        state.error = null;
      })
      .addCase(authRequestAsync.rejected, (state, action) => {
        state.loading = false;
        state.data = {name: '', authImg: ''};
        if (action.payload) {
          state.error = action.payload;
        }
      });
  },
});

export const {authLogout} = authSlice.actions;

export default authSlice.reducer;
