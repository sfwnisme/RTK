import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const API_URL = "http://localhost:5000"

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: ['Posts', 'Data', 'Users'],
  endpoints: (builder) => ({

    //===== POSTS
    getPosts: builder.query({
      query: () => '/posts',
      providesTags: ['Posts'],
      // do somthing with the endpoint of this query
      transformResponse: res => res.sort((a, b) => b.id - a.id)
    }),
    getPost: builder.query({
      query: (id) => `/posts/${id}`,
      providesTags: ['Posts']
    })
    ,
    addPost: builder.mutation({
      query: (post) => ({
        url: '/posts',
        method: 'POST',
        body: post,
      }),
      invalidatesTags: ['Posts']
    }),
    editPost: builder.mutation({
      query: (post) => ({
        url: `/posts/${post.id}`,
        method: 'PATCH',
        body: post
      }),
      invalidatesTags: ['Posts']
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}`,
        method: 'DELETE',
        body: id
      }),
      invalidatesTags: ['Posts']
    }),

    //===== POSTS LIMITATION
    postsLimit: builder.query({
      query: () => `/data`,
      providesTags: ['Data']
    }),
    addPostsLimit: builder.mutation({
      query: (limit) => ({
        url: `/data`,
        method: 'PATCH',
        body: limit
      }),
      invalidatesTags: ['Data']
    }),
    //===== USERS
    getUsers: builder.query({
      query: () => '/users',
      providesTags: ['Users']
    })
  })
})

export const {
  // posts
  useGetPostsQuery,
  useGetPostQuery,
  useAddPostMutation,
  useEditPostMutation,
  useDeletePostMutation,
  // limitation
  usePostsLimitQuery,
  useAddPostsLimitMutation,
  // users
  useGetUsersQuery
} = apiSlice