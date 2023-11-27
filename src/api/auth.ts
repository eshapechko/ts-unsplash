import {
  ACCESS_KEY,
  API_URL_AUTH,
  REDIRECT_URI,
  RESPONSE_TYPE,
  SCOPE,
} from './const';

const url = new URL(API_URL_AUTH);

url.searchParams.append('client_id', ACCESS_KEY);
url.searchParams.append('redirect_uri', REDIRECT_URI);
url.searchParams.append('response_type', RESPONSE_TYPE);
url.searchParams.append('scope', SCOPE);

export const urlAuth = `${url.toString()}`;
