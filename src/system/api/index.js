import axios from 'axios';
import { setInterceptors } from './interceptors';

// Create Axios instance without Authorization
export function createHttpInstance() {
  return axios.create({
    baseURL: 'http://localhost:3000/',
  });
}

// Create Axios instance with Authorization & base url
export function createHttpInstanceWithAuth(url) {
  const instance = axios.create({
    baseURL: `http://localhost:3000/${url}`,
  });
  return setInterceptors(instance);
}

export const http = createHttpInstance();
export const authHttp = createHttpInstanceWithAuth('');
// export const posts = createInstanceWithAuth('posts');

// CREATE - posts
// POST - posts
// PUT - posts {id}
// DELETE - posts {id}
