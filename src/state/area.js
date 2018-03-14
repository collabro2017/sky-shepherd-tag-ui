// @flow
import type { Reducer } from "redux"
import type { Area, AreaAction, AreaState, State } from "../types"

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
      return loadAreas(state, action.payload)
    case "tag/area/SELECTED":
      return { ...state, selectedId: action.payload }
    default:
      return state
  }
}

const loadAreas = (state: AreaState, areas: Area[]): AreaState => {
  let sorted = areas.sort((a, b) =>
    a.name.toLowerCase().localeCompare(b.name.toLowerCase())
  )
  return { ...state, areas: sorted }
}

// INTERFACE
export default reducer
export { selectors as areaSelectors }
export { initialState as initialAreaState }
export type { AreaState, AreaAction }
