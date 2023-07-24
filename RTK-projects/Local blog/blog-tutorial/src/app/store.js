import { configureStore } from "@reduxjs/toolkit";
import postsReducer from '../features/posts/postsSlice'
import usersSlice from "../features/posts/users/usersSlice";


export const store = configureStore({
  reducer: {
    posts: postsReducer,
    users: usersSlice
  }
})