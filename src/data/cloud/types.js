// @flow
import type { ThunkAction } from "../../state/types"
import type { Tag } from "../types"

export interface Cloud {
  authenticate(): ThunkAction;
  getAreas(): ThunkAction;
  getTags(): ThunkAction;
  tagStubs(): Tag[];
}
