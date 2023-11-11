import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const API_URL = "http://localhost:5000/limit"

const initialState = { limit: 1 }

export const fetchLimit = createAsyncThunk('limit/fetchLimit', async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI
  try {
    const res = await fetch(API_URL)
    const data = await res.json()
    return data
  } catch (error) {
    rejectWithValue(error.message)
  }
})

export const editLimit = createAsyncThunk('limit/editLimit', async (value, thunkAPI) => {
  const { rejectWithValue } = thunkAPI
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(value),
      headers: { "Content-type": "application/json; charset=UTF-8", }
    })
    const data = await res.json()
    return data
  } catch (error) {
    rejectWithValue(error.message)
  }
})

const limitSlice = createSlice({
  name: 'limit',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLimit.fulfilled, (state, { payload }) => {
        state.limit = payload
      })
      .addCase(editLimit.fulfilled, (state, { payload }) => {
        state.limit = payload
      })
  }
})

export default limitSlice.reducer