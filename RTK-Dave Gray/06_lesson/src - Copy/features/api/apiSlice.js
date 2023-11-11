import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3500' }),
  tagTypes: ['todos'],
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => '/todos',
      providesTags: ['todos']
    }),
    addTodo: builder.mutation({
      query: (todo) => ({
        method: 'POST',
        url: '/todos',
        body: todo
      }),
      invalidatesTags: ['tags']
    }),
    updateTodo: builder.mutation({
      query: (todo) => ({
        method: 'PATCH',
        url: `/todos/${todo.id}`,
        body: todo
      }),
      invalidatesTags: ['todos']
    }),
    deleteTodo: builder.mutation({
      query: ({ id }) => ({
        method: 'DELETE',
        url: `/todos/${id}`,
        body: id
      }),
      invalidatesTags: ['todos']
    })
  })
})

export const { useGetTodosQuery, useAddTodoMutation, useUpdateTodoMutation, useDeleteTodoMutation } = apiSlice