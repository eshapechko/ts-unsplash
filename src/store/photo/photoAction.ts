import axios from 'axios';
import {ACCESS_KEY, API_URL} from '../../api/const';
import {createAppAsyncThunk} from '../../hooks/hookCreateAppAsyncThunk';

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
