import axios from 'axios';
import {ACCESS_KEY, API_URL} from '../../api/const';
import {createSlice} from '@reduxjs/toolkit';
import {createAppAsyncThunk} from '../../hooks/hookCreateAppAsyncThunk';

export interface photo {
  id: string;
  width: number;
  height: number;
  user: {links: {html: string}; name: string};
  html: string;
  alt_description: string;
  urls: {small_s3: string};
  likes: number;
}

interface photosSliceState {
  loading: boolean;
  photos: photo[];
  error: string | null;
  page: number;
  isLast: boolean;
  status: string;
}

export const photosRequestAsync = createAppAsyncThunk(
  'getPhotos',
  async (_, {getState, rejectWithValue}) => {
    const token = getState().token.token;
    const page = getState().photos.page;
    const isLast = getState().photos.isLast;

    if (isLast) return;

    const res = await axios.get(
      `${API_URL}/photos?client_id=${ACCESS_KEY}&page=${page}&per_page=30`,
      {
        headers: {
          Authorization: `${token ? `Bearer ${token}` : ''}`,
        },
      },
    );

    if (res.status !== 200) {
      return rejectWithValue('Can not get response. Server Error!');
    }

    const photos = await res.data;
    return photos;
  },
);

const initialState: photosSliceState = {
  loading: false,
  photos: [],
  error: null,
  page: 1,
  isLast: false,
  status: '',
};

export const photosSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {
    updatePage: (state) => {
      state.page += 1;
    },
    clearPhotos: (state) => {
      state.loading = false;
      state.photos = [];
      state.error = '';
      state.page = 1;
      state.isLast = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(photosRequestAsync.pending, (state) => {
        state.loading = true;
        state.error = '';
        state.status = 'pending';
      })
      .addCase(photosRequestAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.photos = [...state.photos, ...action.payload];
        state.error = '';
        state.isLast = !action.payload;
        state.status = 'fulfilled';
      })
      .addCase(photosRequestAsync.rejected, (state, action) => {
        state.loading = false;
        state.photos = [];
        state.page = 1;
        state.status = 'failure';
        if (action.payload) {
          state.error = action.payload;
        }
      });
  },
});

export const {updatePage, clearPhotos} = photosSlice.actions;

export default photosSlice.reducer;
