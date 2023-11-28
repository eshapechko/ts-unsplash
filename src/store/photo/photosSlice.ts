import {createSlice} from '@reduxjs/toolkit';
import {photosRequestAsync} from './photoAction';

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
