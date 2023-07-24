import { createSlice } from '@reduxjs/toolkit'
import { ordered as cakeOrdered } from '../cake/cakeSlice'

const initialState = {
  numOfIcecreams: 20,
}

const icecreamReducer = createSlice({
  name: 'icecream',
  initialState,
  reducers: {
    ordered: (state, action) => {
      state.numOfIcecreams -= action.payload
    },
    restocked: (state, action) => {
      state.numOfIcecreams += action.payload
    }
  },
  // first way to write extraReducers
  // extraReducers: {
  //   ['cake/ordered']: (state) => {
  //     state.numOfIcecreams--
  //   }
  // }

  // second way to write extraReducers
  extraReducers: (builder) => {
    builder.addCase(cakeOrdered, (state) => {
      state.numOfIcecreams--
    })
  }

})

export default icecreamReducer.reducer;
export const { ordered, restocked } = icecreamReducer.actions