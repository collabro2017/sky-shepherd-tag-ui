import { combineReducers } from 'redux'

// TODO: Add real reducers
const noop = function (state = {}) {
  return state
}

const rootReducer = combineReducers({
  noop
})

export default rootReducer
