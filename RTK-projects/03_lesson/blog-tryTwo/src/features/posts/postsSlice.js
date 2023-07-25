import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { sub } from "date-fns";

const POST_URL = 'https://jsonplaceholder.typicode.com/posts'

const initialState = {
  posts: [],
  status: 'idle', // idle | loading | succeeded | failed
  error: null,
}

// get request for the posts
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get(POST_URL)
  return response.data
})

// post request for new post
export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost) => {
  const response = await axios.post(POST_URL, initialPost)
  return response.data
})

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchPosts.pending, (state, action) => {
      state.status = 'loading'
    }).addCase(fetchPosts.fulfilled, (state, action) => {
      state.status = 'succeeded'
      // Adding date and reactions
      let min = 1;
      const loadedPosts = action.payload.map(post => {
        post.date = sub(new Date(), { minutes: min++ }).toISOString();
        post.reactions = {
          thumbsUp: 0,
          wow: 0,
          heart: 0,
          rocket: 0,
          coffee: 0
        }
        return post;
      });

      // Add any fetched posts to the array
      state.posts = state.posts.concat(loadedPosts)
    }).addCase(fetchPosts.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    }).addCase(addNewPost.fulfilled, (state, action) => {
      action.payload.userId = ++action.payload.userId
      action.payload.date = new Date().toISOString()
      state.posts = [...state.posts, action.payload]
    })
  }
})

export default postsSlice.reducer
export const selectAllPosts = (state) => state.posts.posts

export const getPostsStatus = (state) => state.posts.status
export const getPostsError = (state) => state.posts.error