import axiosAuth from 'app/axiosAuth';
import { API_URL } from 'app/config';
import { UserModel } from 'app/models';

export const GET_TRANSACTION_TOKEN_URL = `${API_URL}/transaction/getUrl`;
export const ADD_TRANSACTION_URL = `${API_URL}/transaction/add`;
export const GET_TRANSACTION_URL = `${API_URL}/transaction`;
export const OUTPUT_TRANSACTION_URL = `${API_URL}/transaction/getOutputUrl`;

// Server should return AuthModel
export async function requestURLTransaction(amount: string) {
  return await axiosAuth.get(GET_TRANSACTION_TOKEN_URL, {
    params: {
      amount,
    },
  });
}

// Server should return AuthModel
export function requestTransaction(amount: string, token: string) {
  return axiosAuth.post<UserModel>(ADD_TRANSACTION_URL, {
    amount,
    token,
  });
}

// Server should return AuthModel
export function requestTransactionOutput(amount: string, token: string) {
  return axiosAuth.get(OUTPUT_TRANSACTION_URL, {
    params: {
      amount,
      token,
    }
  })
}

export function getTransactions() {
  return axiosAuth.get(GET_TRANSACTION_URL);
}
