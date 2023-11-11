import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const POSTS_URL = 'http://localhost:3500/blog/'

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get(POSTS_URL)
  console.log(response)
  return response.data

})

export const addPost = createAsyncThunk('posts/addPost', async (initialPost) => {
  const response = await axios.post(POSTS_URL, initialPost)
  console.log(response)
  return response.data
})

export const deletePost = createAsyncThunk('posts/deletePost', async (ID) => {
  const response = await axios.delete(`${POSTS_URL}/${ID}`)
  console.log(response)
  return ID
})

const initialState = {
  status: 'idle',  // 'idle' | 'loading' | 'succeeded' | 'failed'
  posts: [],
  error: '',
}

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  extraReducers(builder) {
    builder.addCase(fetchPosts.pending, (state, action) => {
      state.status = 'loading'

    }).addCase(fetchPosts.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.posts = action.payload
      console.log(action.payload)

    }).addCase(fetchPosts.rejected, (state, action) => {
      state.status = 'failed'
      state.posts = []
      state.error = action.payload
      console.log(action.payload)
    }).addCase(addPost.fulfilled, (state, { payload }) => {
      console.log('state', state)
      console.log('payload', payload)
      state.posts.push(payload)
    }).addCase(deletePost.fulfilled, (state, { payload }) => {
      const { id } = payload
      console.log(payload)
      state.posts = state.posts.filter((post) => post.id !== payload)
    })
  }
})

export default postsSlice.reducer
