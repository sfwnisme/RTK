import { sub } from 'date-fns'

import { createSlice, nanoid } from '@reduxjs/toolkit'



let initialState = []

if (localStorage.getItem('local')) {
  initialState = JSON.parse(localStorage.getItem('local'))
} else {
  initialState = []
}


const postsSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    postAdded: {
      reducer(state, { payload }) {
        state.push(payload)
        localStorage.setItem('local', JSON.stringify(state))
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            userId,
            date: new Date().toISOString(),
            reactions: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0
            }
          }
        }
      }
    },
    addReactions(state, { payload }) {
      const { postId, reaction } = payload;
      const existingPost = state.find((post) => post.id === postId)
      if (existingPost) {
        existingPost.reactions[reaction]++
      }
      console.log(existingPost)
    },
    removePost(state, { payload }) {
      console.log(state)
      const postId = payload
      console.log(postId)
      state.splice(postId, 1)
      localStorage.setItem('local', JSON.stringify(state))
    }
  }
})

export const selectAllPosts = (state) => state.posts

export default postsSlice.reducer
export const { postAdded, addReactions, removePost } = postsSlice.actions