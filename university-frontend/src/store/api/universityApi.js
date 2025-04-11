import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const baseQueryWithAuth = fetchBaseQuery({
  baseUrl: 'https://university-management-system-1-e8yv.onrender.com/api/', // or your backend base URL
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('token');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const universityApi = createApi({
  reducerPath: 'universityApi',
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({
    getTables: builder.query({
      query: () => 'tables/',
    }),
    getTableData: builder.query({
      query: (tableName) => `${tableName}/`,
    }),
    addTableData: builder.mutation({
      query: ({ tname, data }) => ({
        url: `${tname}/`,
        method: 'POST',
        body: data,
      }),
    }),
    getSingleTableData: builder.query({
      query: ({ tableName, id }) => `${tableName}/${id}/`,
    }),
    updateSingleData: builder.mutation({
      query: ({ tableName, data, id }) => ({
        url: `${tableName}/${id}/`,
        method: 'PUT',
        body: data,
      }),
    }),
    deleteSingleData: builder.mutation({
      query: ({ tableName, data, id }) => ({
        url: `${tableName}/${id}/`,
        method: 'DELETE',
        body: data,
      }),
    }),
    getAllUsers: builder.query({
      query: () => `users/`,
    }),
    getSingleUser: builder.query({
      query: (id) => `users/${id}`,
    }),
    grantUserAccess: builder.mutation({
      query: (payload) => ({
        url: `permissions/`,
        method: 'POST',
        body: payload,
      }),
    }),
    grantUserAccessUpdate: builder.mutation({
      query: (payload, id) => ({
        url: `permissions/${id}`,
        method: 'PUT',
        body: payload,
      }),
    }),
  }),
});

export const {
  useGetTablesQuery,
  useGetTableDataQuery,
  useAddTableDataMutation,
  useGetSingleTableDataQuery,
  useDeleteSingleDataMutation,
  useUpdateSingleDataMutation,
  useGetAllUsersQuery,
  useGetSingleUserQuery,
  useGrantUserAccessMutation,
  useLazyGetTableDataQuery,
} = universityApi; 