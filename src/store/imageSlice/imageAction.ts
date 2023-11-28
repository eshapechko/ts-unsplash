import {createAsyncThunk} from '@reduxjs/toolkit';
import {imageType} from './imageSlice';
import {ACCESS_KEY, API_URL} from '../../api/const';
import axios from 'axios';

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
