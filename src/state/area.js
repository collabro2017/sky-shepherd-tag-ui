// @flow
import { Cloud } from "../data"
import type { Reducer } from "redux"
import type { Area } from "../data/types"
import type { AreaState, State } from "./types"

type AreaAction = { type: "tag/area/DUMMY_ACTION", payload: string }

// SELECTORS
const selectors = {
  getAreas: ({ area }: { area: AreaState }): Area[] => area.areas
}

const initialState: AreaState = {
  areas: Cloud.areaStubs()
}

// REDUCERS

const reducer: Reducer<AreaState, AreaAction> = (
  state: AreaState = initialState,
  action: AreaAction
): AreaState => {
  if (action.type === "tag/area/DUMMY_ACTION") {
    // Handle action
    return state
  } else {
    return state
  }
}

// INTERFACE
export default reducer
export { selectors as areaSelectors }
export { initialState as initialAreaState }
export type { AreaState }
