// @flow
import { Cloud } from "../data"
import type { Reducer } from "redux"
import type { State, TagState } from "./types"
import type { Tag } from "../data"

type TagAction = { type: "tag/tag/DUMMY_ACTION", payload: string }

// SELECTORS
const selectors = {
  getTags: (state: State): Tag[] => state.tag.tags
}

const initialState: TagState = {
  tags: Cloud.tagStubs()
}

// REDUCERS

const reducer: Reducer<TagState, TagAction> = (
  state: TagState = initialState,
  action: TagAction
): TagState => {
  switch (action.type) {
    case "tag/tag/DUMMY_ACTION":
      // Handle action
      return state
    default:
      ;(action: empty)
      return state
  }
}

// INTERFACE
export default reducer
export { selectors as tagSelectors }
export { initialState as initialTagState }
