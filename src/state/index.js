import { createStore, applyMiddleware } from "redux"
import rootReducer from "./reducers"

function configureStore(initialState = {}) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware()
    // TODO: Add middleware (thunk, logger)
  )
}

export { configureStore }
