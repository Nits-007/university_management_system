// src/store/api/authApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQueryWithAuth = fetchBaseQuery({
  baseUrl: 'https://university-management-system-1-e8yv.onrender.com/api/', // or your backend base URL
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('token');
    console.log("tokem ",token)
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: '/register',
        method: 'POST',
        body: userData,
      }),
    }),
    getProfile: builder.query({
      query: () => '/profile',
    }),
    refreshToken: builder.mutation({
      query: (refreshToken) => ({
        url: '/login/refresh',
        method: 'POST',
        body: { refresh: refreshToken },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetProfileQuery,
  useRefreshTokenMutation,
} = authApi;
