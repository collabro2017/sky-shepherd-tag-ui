// @flow
import type { Reducer } from "redux"
import type { State, Tag, TagAction, TagState } from "../types"

// SELECTORS
const selectors = {
  getTags: (state: State): Tag[] => state.tag.tags
}

const initialState: TagState = {
  tags: []
}

// REDUCERS

const reducer: Reducer<TagState, TagAction> = (
  state: TagState = initialState,
  action: TagAction
): TagState => {
  switch (action.type) {
    case "tag/tag/LOADED":
      return { ...state, tags: action.payload }
    default:
      return state
  }
}

// INTERFACE
export default reducer
export { selectors as tagSelectors }
export { initialState as initialTagState }
