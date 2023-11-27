import axios from 'axios';
import {API_URL} from '../../api/const';
import {createSlice} from '@reduxjs/toolkit';
import {createAppAsyncThunk} from '../../hooks/hookCreateAppAsyncThunk';

export interface MyAuth {
  loading: boolean;
  data: {name: string; authImg: string};
  error: string | null;
}

export const authRequestAsync = createAppAsyncThunk(
  'getAuth',
  async (_, {getState, rejectWithValue}) => {
    const token = getState().token.token;
    if (!token) return;

    const data = await axios(`${API_URL}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (data.status !== 200) {
      return rejectWithValue('Can not get auth data. Server Error!');
    }

    const authImg = data.data.profile_image.medium;
    const authName = data.data.name;

    return {name: authName, authImg};
  },
);

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
