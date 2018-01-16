// @flow
import type { Reducer } from "redux"
import type { Area } from "../data/types"
import type { AreaAction, AreaState, State } from "./types"

// SELECTORS
const selectors = {
  getAreas: (state: State): Area[] => state.area.areas
}

const initialState: AreaState = {
  areas: []
}

// REDUCERS

const reducer: Reducer<AreaState, AreaAction> = (
  state: AreaState = initialState,
  action: AreaAction
): AreaState => {
  if (
    action.type === "tag/area/LOADED_AREAS" &&
    action.payload instanceof Array
  ) {
    return { ...state, areas: (action.payload: Area[]) }
  } else {
    return state
  }
}

// INTERFACE
export default reducer
export { selectors as areaSelectors }
export { initialState as initialAreaState }
export type { AreaState, AreaAction }
