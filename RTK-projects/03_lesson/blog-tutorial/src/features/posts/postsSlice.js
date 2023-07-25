import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { sub } from 'date-fns'

const initialState = {
  posts: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed' 
  error: null,
}

const POST_URL = 'https://jsonplaceholder.typicode.com/posts'

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get(POST_URL)
  return response.data
})

export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost) => {
  const response = await axios.post(POST_URL, initialPost)
  return response.data
})

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload
      const existingPost = state.posts.find((post) => post.id === postId)
      if (existingPost) {
        existingPost.reactions[reaction]++
      }

    }
  },
  extraReducers(builder) {
    const { pending, fulfilled, rejected } = fetchPosts
    builder.addCase(pending, (state, action) => {
      state.status = 'loading'
      console.log('pending', action)
    }).addCase(fulfilled, (state, action) => {
      state.status = 'succeeded'

      console.log('fulfilled', action)

      // adding date and reactions
      let min = 1;
      const loadedPosts = action.payload.map((post) => {
        post.date = sub(new Date(), { minutes: min++ }).toISOString()
        post.reactions = {
          thumbsUp: 0,
          wow: 0,
          heart: 0,
          rocket: 0,
          coffee: 0,
        }
        return post
      })

      state.posts = state.posts.concat(loadedPosts)
      console.log('after addin date and reactions', action.payload)


    }).addCase(rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    })
      .addCase(addNewPost.fulfilled, (state, action) => {
        action.payload.userId = Number(action.payload.userId)
        action.payload.date = new Date().toISOString()
        action.payload.reactions = {
          thumbsUp: 0,
          wow: 0,
          heart: 0,
          rocket: 0,
          coffee: 0,
        }
        console.log('initialPost', action.payload)
        state.posts.push(action.payload)
      })
  }
})

export default postsSlice.reducer
export const { postAdded, reactionAdded } = postsSlice.actions

export const selectAllPosts = (state) => state.posts.posts
export const getPostsStatus = (state) => state.posts.status
export const getPostsError = (state) => state.posts.error