import { areaFromParse, parseAreaFromNameAndCoordinates } from "../parse"
import {
  chesterHillAreaData,
  chesterHillCoordinates
} from "../../fixtures/chesterHill"

test("creates parse area from new changes", () => {
  const parseArea = parseAreaFromNameAndCoordinates(
    null,
    "chester hill",
    chesterHillCoordinates
  )
  const areaData = areaFromParse(parseArea)
  expect(areaData).toEqual(chesterHillAreaData)
})

test("creates parse area from changes to existing", () => {
  const id = "1234abcd"
  const parseArea = parseAreaFromNameAndCoordinates(
    id,
    "chester hill",
    chesterHillCoordinates
  )
  const areaData = areaFromParse(parseArea)
  expect(areaData).toEqual({ id, ...chesterHillAreaData })
})
