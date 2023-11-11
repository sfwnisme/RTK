import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { sub } from "date-fns";

const initialState = {
  status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
  posts: [],
  error: null,
}

const POST_URL = 'https://jsonplaceholder.typicode.com/posts';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get(POST_URL);
  return response.data
})

export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost) => {
  const response = await axios.post(POST_URL, initialPost)
  return response.data
})

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  // reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchPosts.pending, (state, action) => {
      state.status = 'loading'
    }).addCase(fetchPosts.fulfilled, (state, action) => {
      state.status = 'succeeded'

      let min = 1
      const loadedPosts = action.payload.map((post) => {
        post.date = sub(new Date(), { minutes: min++ }).toISOString();
        return post
      })
      console.log('loaded posts',loadedPosts)

      // state.posts = [...state.posts, ...loadedPosts]
      state.posts = state.posts.concat(loadedPosts)
      console.log('redux', state.posts)

    }).addCase(fetchPosts.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error.message

    }).addCase(addNewPost.fulfilled, (state, action) => {
      action.payload.date = new Date().toISOString()
      action.payload.userId = +action.payload.userId
      // action.payload.body = action.payload.body
      console.log(action.payload)
      state.posts.push(action.payload)
    })
  }
})

export const selectAllPosts = (state) => state.posts.posts
export const getPostsStatus = (state) => state.posts.status
export const getPostsError = (state) => state.posts.error
export default postsSlice.reducer