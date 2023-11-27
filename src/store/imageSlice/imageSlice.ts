import axios from 'axios';
import {ACCESS_KEY, API_URL} from '../../api/const';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

type imageType = {
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

export const imageRequestAsync = createAsyncThunk<
  imageType,
  string,
  {
    state: {token: {token: string}};
    rejectValue: string;
  }
>('image/getImage', async (id, {getState, rejectWithValue}) => {
  const token = getState().token.token;

  const res = await axios.get(
    `${API_URL}/photos/${id}?client_id=${ACCESS_KEY}`,
    {
      headers: {
        Authorization: `${token ? `Bearer ${token}` : ''}`,
      },
    },
  );

  if (res.status !== 200) {
    return rejectWithValue('Can not get response. Server Error!');
  }

  const image = await res.data;
  return image;
});

export const addLike = createAsyncThunk<
  imageType,
  string,
  {
    state: {token: {token: string}};
    rejectValue: string;
  }
>('image/addLike', async (id, {getState, rejectWithValue}) => {
  const token = getState().token.token;
  if (!token) return;

  const res = await axios.post(
    `${API_URL}/photos/${id}/like`,
    {
      client_id: ACCESS_KEY,
      scope: 'write_likes',
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (res.status !== 201) {
    return rejectWithValue('Can not get response. Server Error!');
  }

  const data = res.data;
  return data;
});

export const removeLike = createAsyncThunk<
  imageType,
  string,
  {
    state: {token: {token: string}};
    rejectValue: string;
  }
>('image/removeLike', async (id, {getState, rejectWithValue}) => {
  const token = getState().token.token;
  if (!token) return;

  const res = await axios.delete(`${API_URL}/photos/${id}/like`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status !== 200) {
    return rejectWithValue('Can not get response. Server Error!');
  }

  const data = res.data;
  console.log('data-REMOVE: ', data);
  return data;
});

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
