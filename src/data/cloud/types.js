// @flow
import type { Area, Tag } from "../types"

interface Backend {
  getAreas(): Area[];
  getTags(): Tag[];
}

export type { Backend }
