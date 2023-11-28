import axios from 'axios';
import {API_URL} from '../../api/const';
import {createAppAsyncThunk} from '../../hooks/hookCreateAppAsyncThunk';

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
