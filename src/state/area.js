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
  switch (action.type) {
    case "tag/area/LOADED":
      return { ...state, areas: (action.payload: Area[]) }
    case "tag/area/SELECTED":
      return { ...state, selectedId: action.payload }
    default:
      return state
  }
}

// INTERFACE
export default reducer
export { selectors as areaSelectors }
export { initialState as initialAreaState }
export type { AreaState, AreaAction }
