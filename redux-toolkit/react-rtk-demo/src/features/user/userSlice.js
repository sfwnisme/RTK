import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios"


const initialState = {
  loading: false,
  users: [],
  error: '',
}

// Generates pending, fulfilled and rejected action types
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () =>
  axios.get("https://jsonplaceholder.typicode.com/udsers")
    .then((response) => response.data.map((user) => user.name))
)

const { pending, fulfilled, rejected } = fetchUsers

const userSlice = createSlice({
  name: 'ueser',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(pending, (state) => {
      state.loading = true
    })
    builder.addCase(fulfilled, (state, action) => {
      state.loading = false
      state.users = action.payload
      state.error = ''
    })
    builder.addCase(rejected, (state, action) => {
      state.loading = false
      state.users = []
      state.error = action.error.message
    })
  }
})


export default userSlice.reducer