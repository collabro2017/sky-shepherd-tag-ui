// @flow
import ParseBackend from "./parse"
import type { Tag } from "../types"
import type { Cloud } from "./types"

const tagStubs = (): Tag[] => {
  return [{ objectId: "1", name: "Andy" }, { objectId: "2", name: "Griff" }]
}

const cloud: Cloud = {
  tagStubs,
  ...ParseBackend
}

export default cloud
