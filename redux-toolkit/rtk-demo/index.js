const store = require("./app/store");
const { fetchUsers } = require("./features/user/userSlice");
const cakeActions = require("./features/cake/cakeSlice").cakeActions;
const icecreamActions = require('./features/icecream/icecreamSlice').icecreamActions

console.log("InitialState", store.getState())

const unsubscribe = store.subscribe(() => {
  console.log("Updated State", store.getState())
})

// store.dispatch(cakeActions.ordered())
// store.dispatch(cakeActions.ordered())
// store.dispatch(cakeActions.ordered())
// store.dispatch(cakeActions.restocked(13))

// store.dispatch(icecreamActions.ordered(3))
// store.dispatch(icecreamActions.ordered(3))
// store.dispatch(icecreamActions.ordered(3))
// store.dispatch(icecreamActions.restocked(3))

store.dispatch(fetchUsers())

// unsubscribe()