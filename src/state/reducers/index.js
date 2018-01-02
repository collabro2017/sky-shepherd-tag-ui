import map from "./map"
import nav from "./nav"
import { combineReducers } from "redux"

const rootReducer = combineReducers({
  map,
  nav
})

export default rootReducer
export { map, nav }
