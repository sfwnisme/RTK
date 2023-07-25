import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = []

const USERS_API = 'https://jsonplaceholder.typicode.com/users'

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get(USERS_API)
  return response.data
})

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    const { fulfilled } = fetchUsers
    builder.addCase(fulfilled, (state, { payload }) => {
      return payload
    })
  }
})

export const selectAllusers = (state) => state.users

export default usersSlice.reducer