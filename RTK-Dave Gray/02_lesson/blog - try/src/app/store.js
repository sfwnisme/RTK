import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../features/posts/postsSlice";
import usersReducre from '../features/users/usersSlice'

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducre
  }
})