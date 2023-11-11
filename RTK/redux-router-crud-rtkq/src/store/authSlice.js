import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  name: "sfwn",
  id: '1',
  isLoggedIn: true
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {}
})

export default authSlice.reducer