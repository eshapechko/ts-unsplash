import {createSlice} from '@reduxjs/toolkit';
import {addLike, imageRequestAsync, removeLike} from './imageAction';

export type imageType = {
  id: string;
  created_at: string;
  alt_description: string;
  urls: {regular: string};
  user: {name: string; links: {html: string}};
  likes: number;
  liked_by_user: boolean;
  photo: {likes: number; liked_by_user: boolean};
};

interface imageSliceState {
  loading: boolean;
  image: imageType | null;
  error: string | null;
  like: number | null;
  likedUser: boolean;
}

const initialState: imageSliceState = {
  loading: false,
  image: null,
  error: null,
  like: null,
  likedUser: false,
};

export const imageSlice = createSlice({
  name: 'image',
  initialState,
  reducers: {
    clearImage: (state) => {
      state.loading = false;
      state.image = null;
      state.error = '';
      state.like = null;
      state.likedUser = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(imageRequestAsync.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(imageRequestAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.image = action.payload;
        state.like = action.payload.likes;
        state.likedUser = action.payload.liked_by_user;
        state.error = '';
      })
      .addCase(imageRequestAsync.rejected, (state, action) => {
        state.loading = false;
        state.image = null;
        if (action.payload) {
          state.error = action.payload;
        }
      })
      .addCase(addLike.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(addLike.fulfilled, (state, action) => {
        state.loading = false;
        state.like = action.payload.photo.likes;
        state.likedUser = action.payload.photo.liked_by_user;
        state.error = '';
      })
      .addCase(addLike.rejected, (state, action) => {
        state.loading = false;
        state.like = null;
        state.likedUser = false;
        if (action.payload) {
          state.error = action.payload;
        }
      })
      .addCase(removeLike.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(removeLike.fulfilled, (state, action) => {
        state.loading = false;
        state.like = action.payload.photo.likes;
        state.likedUser = action.payload.photo.liked_by_user;
        state.error = '';
      })
      .addCase(removeLike.rejected, (state, action) => {
        state.loading = false;
        state.like = null;
        state.likedUser = false;
        if (action.payload) {
          state.error = action.payload;
        }
      });
  },
});

export const {clearImage} = imageSlice.actions;

export default imageSlice.reducer;
