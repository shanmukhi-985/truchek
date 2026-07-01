/**
 * TruChek — Axios Configuration Constants
 */

import { env } from "./env";

export const axiosConfig = {
  baseURL:         env.API_URL,
  timeout:         30_000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept:         "application/json",
    "X-App-Name":   "TruChek",
    "X-App-Version": "1.0.0",
  },
} as const;
