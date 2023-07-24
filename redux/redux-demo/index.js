const redux = require("redux")
const reduxLogger = require("redux-logger")

const createStore = redux.createStore
const combineReducers = redux.combineReducers
const applyMiddleware = redux.applyMiddleware
const logger = reduxLogger.createLogger()

console.log("redux demo file")

const BUY_CAKE = "BUY_CAKE";
const BUY_ICECREAM = "BUY_ICECREAM";

function buyCake() {
  return {
    type: BUY_CAKE,
    info: "First redux action"
  }
} // buyCacke() returns => {type: BUY_CAKE}

function buyIcecream() {
  return {
    type: BUY_ICECREAM,
    info: "Sectoin redux action"
  }
}


// const initialState = {
//   numberOfCakes: 10,
//   numberOfIcecreams: 15,
// }

const initialCakesState = {
  numberOfCakes: 10
}

const initialIcecreamsState = {
  numberOfIcecreams: 15,
}

// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case BUY_CAKE:
//       return {
//         ...state, numberOfCakes: state.numberOfCakes - 1
//       }
//     case BUY_ICECREAM: {
//       return {
//         ...state, numberOfIcecreams: state.numberOfIcecreams - 1
//       }
//     }
//     default:
//       return state;
//   }
// }

const cakesReducer = (state = initialCakesState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        numberOfCakes: state.numberOfCakes - 1
      }

    default:
      return state;
  }
}

const icecreamsReducer = (state = initialIcecreamsState, action) => {
  switch (action.type) {
    case BUY_ICECREAM: {
      return {
        numberOfIcecreams: state.numberOfIcecreams - 1
      }
    }
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  cakes: cakesReducer,
  icecreams: icecreamsReducer
})

const store = createStore(rootReducer, applyMiddleware(logger))
console.log(store.state)

console.log("Initial State", store.getState())

// const unsubscribe = store.subscribe(() => {
//   console.log("Updated State", store.getState().cakes)
//   console.log("Updated State", store.getState().icecreams)
// })

store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
console.log("*".repeat(29))
store.dispatch(buyIcecream());
store.dispatch(buyIcecream());
store.dispatch(buyIcecream());

// unsubscribe()
// console.log("Updated State", store.getState())