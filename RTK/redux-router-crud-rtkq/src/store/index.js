import { configureStore } from '@reduxjs/toolkit';
import posts from './postsSlice';
import auth from './authSlice'
import limit from './limitSlice'

const store = configureStore({
  reducer: {
    // the posts reducer initial object key and value => posts: posts , but ES6 allows to write
    // only the key of the object if the value name is the same of the key
    posts,
    auth,
    limit,

  }
});

export default store;