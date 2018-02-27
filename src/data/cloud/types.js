// @flow
import type { ThunkAction } from "../../state/types"

export interface Cloud {
  authenticate(): ThunkAction;
  getAreas(): ThunkAction;
  getActiveBoundaries(): ThunkAction;
}
