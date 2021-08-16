import { getToken } from './api';

export async function saveToken() {
  const { token } = await getToken();
  localStorage.setItem('token', JSON.stringify(token));
}

export function saveState(state) {
  localStorage.setItem('state', JSON.stringify(state));
}
