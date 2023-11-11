import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  posts: [],
  status: 'idle', // idle | loading | succeeded | failed
  error: '',
}

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts'

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get(POSTS_URL)
  return response.data
})

export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost) => {
  const response = await axios.post(POSTS_URL, initialPost)
  return response.data
})


const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchPosts.pending, (state, action) => {
      state.status = 'loading'
      console.log('loading')
    }).addCase(fetchPosts.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.posts = action.payload
    }).addCase(fetchPosts, (state, action) => {
      state.status = 'failed'
      state.posts = []
      state.error = action.error.message
    }).addCase(addNewPost.fulfilled, (state, action) => {
      action.payload.userId = +action.payload.userId
      state.posts.push(action.payload)
    })
  }
})

export default postsSlice.reducer

export const selectAllPosts = (state) => state.posts.posts
export const getPostsStatus = (state) => state.posts.status
export const getPostsError = (state) => state.posts.error