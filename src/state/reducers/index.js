import map from "./map"
import { combineReducers } from "redux"

export { default as map } from "./map"

const rootReducer = combineReducers({
  map
})

export default rootReducer
