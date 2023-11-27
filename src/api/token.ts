import axios from 'axios';
import {ACCESS_KEY, API_URL_TOKEN, REDIRECT_URI, SECRET_KEY} from './const';
import {createAsyncThunk} from '@reduxjs/toolkit';

export const setToken = (token: string) => {
  localStorage.setItem('Bearer', token);
};

export const getToken = createAsyncThunk<
  string,
  undefined,
  {rejectValue: string}
>('token/getToken', async (_, {rejectWithValue}) => {
  let token;

  if (localStorage.getItem('Bearer')) {
    token = localStorage.getItem('Bearer');
    return token;
  }

  if (window.location.search.includes('?code')) {
    const AUTH_CODE = window.location.search.slice(6);

    try {
      const data = await axios.post(
        API_URL_TOKEN,
        {
          client_id: ACCESS_KEY,
          client_secret: SECRET_KEY,
          redirect_uri: REDIRECT_URI,
          code: AUTH_CODE,
          grant_type: 'authorization_code',
        },
        {
          headers: {
            'content-type': 'application/json',
          },
        },
      );
      token = await data.data.access_token;
      setToken(token);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }

  return token;
});
