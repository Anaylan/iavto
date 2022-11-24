import axiosAuth from 'app/axiosAuth';
import { API_URL } from 'app/config';

export const GET_MESSAGES = `${API_URL}/dialogs/getMessage`;
export const GET_DIALOGS = `${API_URL}/dialogs/getUser`;

export const CREATE_CHAT = `${API_URL}/chat/newchat`;
export const SEND_MESSAGE = `${API_URL}/chat/sendmessage`;

// Server should return AuthModel
export function getDialogs() {
  return axiosAuth.post(GET_DIALOGS);
}

export function getMessage(id: number) {
  // Authorization head should be fulfilled in interceptor.
  // Check common redux folder => setupAxios
  return axiosAuth.post(GET_MESSAGES, { id });
}

export function sendMessage(cid: string, message: string) {
  // Authorization head should be fulfilled in interceptor.
  // Check common redux folder => setupAxios
  return axiosAuth.post(CREATE_CHAT, { cid, message });
}

export function requestMessage(
  cid: string | string[] | undefined,
  message: string,
) {
  // Authorization head should be fulfilled in interceptor.
  // Check common redux folder => setupAxios
  return axiosAuth.post(`${SEND_MESSAGE}/${cid}`, { cid, message });
}

// /chat/newchat
