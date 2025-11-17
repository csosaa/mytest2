import { apiSlice } from './apiSlice';
import { PREORDERS_URL } from '../constants';

export const preOrderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createPreOrder: builder.mutation({
      query: (preOrder) => ({
        url: PREORDERS_URL,
        method: 'POST',
        body: preOrder,
      }),
      invalidatesTags: ['PreOrder'],
    }),
    getMyPreOrders: builder.query({
      query: () => ({
        url: `${PREORDERS_URL}/mine`,
      }),
      providesTags: ['PreOrder'],
      keepUnusedDataFor: 5,
    }),
    getAllPreOrders: builder.query({
      query: () => ({
        url: PREORDERS_URL,
      }),
      providesTags: ['PreOrder'],
      keepUnusedDataFor: 5,
    }),
    getPreOrderDetails: builder.query({
      query: (id) => ({
        url: `${PREORDERS_URL}/${id}`,
      }),
      providesTags: (result, error, id) => [{ type: 'PreOrder', id }],
      keepUnusedDataFor: 5,
    }),
    updatePreOrder: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `${PREORDERS_URL}/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['PreOrder'],
    }),
    updatePreOrderStatus: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `${PREORDERS_URL}/${id}/status`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['PreOrder'],
    }),
    payPreOrderDeposit: builder.mutation({
      query: ({ id, details }) => ({
        url: `${PREORDERS_URL}/${id}/deposit`,
        method: 'PUT',
        body: details,
      }),
      invalidatesTags: ['PreOrder'],
    }),
    deletePreOrder: builder.mutation({
      query: (id) => ({
        url: `${PREORDERS_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['PreOrder'],
    }),
  }),
});

export const {
  useCreatePreOrderMutation,
  useGetMyPreOrdersQuery,
  useGetAllPreOrdersQuery,
  useGetPreOrderDetailsQuery,
  useUpdatePreOrderMutation,
  useUpdatePreOrderStatusMutation,
  usePayPreOrderDepositMutation,
  useDeletePreOrderMutation,
} = preOrderApiSlice;
