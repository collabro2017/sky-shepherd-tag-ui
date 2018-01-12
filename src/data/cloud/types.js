// @flow
import type { ThunkAction } from "../../state/types"
import type { Area, Tag } from "../types"

export interface Cloud {
  areaFromJson(json: JsonObject): ?Area;
  areaStubs(): Area[];
  tagStubs(): Tag[];
  getAreas(): ThunkAction;
  getTags(): ThunkAction;
  authenticate(): ThunkAction;
}

export type JsonObject = { [string]: mixed }
