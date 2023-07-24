const axios = require("axios")
const redux = require("redux")
const createStore = redux.createStore
const applyMiddleware = redux.applyMiddleware
const reduxThunk = require("redux-thunk").default

const initialState = {
  loading: false,
  users: [],
  error: '',
}

const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST'
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS'
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE'

const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUEST,
  }
}

const fetchUsersSuccess = (users) => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users,
  }
}

const fetchUsersFailure = (error) => {
  return {
    type: FETCH_USERS_FAILURE,
    payload: error,
  }
}


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state, loading: true
      };
    case FETCH_USERS_SUCCESS:
      return {
        loading: false, users: action.payload, error: ''
      };
    case FETCH_USERS_FAILURE:
      return {
        loading: false, users: [], error: action.payload,
      }
  }
}


function fetchUsers() {
  return function (dispatch) {
    dispatch(fetchUsersRequest)
    axios.get('https://jsonplaceholdr.typicode.com/users/1')
      .then((response) => {
        const user = response.data
        dispatch(fetchUsersSuccess(user.name))
      })
      .catch((error) => {
        dispatch(fetchUsersFailure(error.message))
      })
  }
}

const store = createStore(reducer, applyMiddleware(reduxThunk))
store.subscribe(() => { console.log(store.getState()) })
store.dispatch(fetchUsers())