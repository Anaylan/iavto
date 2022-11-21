import axiosAuth from 'app/axiosAuth';
import { API_URL } from 'app/config';

export const GET_MESSAGES = `${API_URL}/dialogs/getMessage`;
export const GET_DIALOGS = `${API_URL}/dialogs/getUser`;

// Server should return AuthModel
export function getDialogs() {
  return axiosAuth.post(GET_DIALOGS);
}

export function getMessage(id: number) {
  // Authorization head should be fulfilled in interceptor.
  // Check common redux folder => setupAxios
  return axiosAuth.post(GET_MESSAGES, { id });
}
