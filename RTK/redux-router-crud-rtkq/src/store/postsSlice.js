import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "http://localhost:5000/posts"

const initialState = {
  records: [],
  record: null,
  loading: false,
  error: null
}

// fetch post
export const fetchPost = createAsyncThunk('posts/fetchPost', async (id, thunkAPI) => {
  const { rejectWithValue } = thunkAPI

  try {
    // const res = await fetch(API_URL + '/' + id)
    const res = await fetch(`${API_URL}/${id}`)
    const data = await res.json()
    return data
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

// fetch posts data
export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
)

// create post
export const insertPost = createAsyncThunk('posts/insertPost', async (item, thunkAPI) => {
  const { rejectWithValue, getState } = thunkAPI
  const { auth } = getState()
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(item),
      headers: { "Content-type": "application/json; charset=UTF-8", }
    })
    const data = await res.json()
    return data
  } catch (error) {
    return rejectWithValue(error.message)
  }
})
// delete post
export const deletePost = createAsyncThunk('posts/deletePost', async (id, thunkAPI) => {
  const { rejectWithValue } = thunkAPI
  try {
    await fetch(API_URL + '/' + id, {
      method: 'DELETE'
    })
    return id
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

// edit post
export const editPost = createAsyncThunk('posts/editPost', async (item, thunkAPI) => {
  const { rejectWithValue } = thunkAPI

  console.log(item?.id)

  try {
    const res = await fetch(API_URL + '/' + item?.id, {
      method: 'PATCH',
      body: JSON.stringify(item),
      headers: { "Content-type": "application/json; charset=UTF-8" }
    })
    const data = await res.json()
    return data
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    cleanRecord: (state) => {
      state.record = null
    }
  },
  extraReducers: (builder) => {
    builder
      //=====> fetch post 
      .addCase(fetchPost.pending, (state) => {
        state.loading = true;
        state.error = null
      })
      .addCase(fetchPost.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.record = payload;
      })
      .addCase(fetchPost.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      //=====> fetch posts
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.records = payload;
      })
      .addCase(fetchPosts.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      //=====> create post
      .addCase(insertPost.pending, (state) => {
        state.loading = true;
        state.error = null
      })
      .addCase(insertPost.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.records.push(payload);
      })
      .addCase(insertPost.rejected, (state, { payload }) => {
        state.error = payload
      })
      //=====> delete post
      .addCase(deletePost.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deletePost.fulfilled, (state, { payload }) => {
        state.loading = false
        state.records = state.records.filter((el) => el.id != payload)
      })
      .addCase(deletePost.rejected, (state, { payload }) => {
        state.error = payload
      })
      //=====> edit post
      .addCase(editPost.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(editPost.fulfilled, (state, { payload }) => {
        state.loading = false
        state.record = payload
      })
      .addCase(editPost.rejected, (state, { payload }) => {
        state.error = payload
      })
  }
  // ! Deprecated redux toolkit syntax
  // extraReducers: {
  // fetch post
  // [fetchPost.pending]: (state) => {
  //   state.loading = true;
  //   state.error = null;
  // },
  // [fetchPost.fulfilled]: (state, { payload }) => {
  //   state.loading = false;
  //   state.record = payload;
  // },
  // [fetchPost.rejected]: (state, { payload }) => {
  //   state.loading = false;
  //   state.error = payload;
  // },
  // // fetch posts
  // [fetchPosts.pending]: (state) => {
  //   state.loading = true;
  //   state.error = null;
  // },
  // [fetchPosts.fulfilled]: (state, { payload }) => {
  //   state.loading = false;
  //   state.records = payload;
  // },
  // [fetchPosts.rejected]: (state, { payload }) => {
  //   state.loading = false;
  //   state.error = payload;
  // },
  // // create post
  // [insertPost.pending]: (state) => {
  //   state.loading = true;
  //   state.error = null
  // },
  // [insertPost.fulfilled]: (state, { payload }) => {
  //   state.loading = false;
  //   state.records.push(payload);
  // },
  // [insertPost.rejected]: (state, { payload }) => {
  //   state.error = payload
  // },
  // // delete post
  // [deletePost.pending]: (state) => {
  //   state.loading = true
  //   state.error = null
  // },
  // [deletePost.fulfilled]: (state, { payload }) => {
  //   state.loading = false
  //   state.records = state.records.filter((el) => el.id != payload)
  // },
  // [deletePost.rejected]: (state, { payload }) => {
  //   state.error = payload
  // },
  // // edit post
  // [editPost.pending]: (state) => {
  //   state.loading = true
  //   state.error = null
  // },
  // [editPost.fulfilled]: (state, { payload }) => {
  //   state.loading = false
  //   state.record = payload
  // },
  // [editPost.rejected]: (state, { payload }) => {
  //   state.error = payload
  // },
  // }
})

export const { cleanRecord } = postsSlice.actions
export default postsSlice.reducer;
