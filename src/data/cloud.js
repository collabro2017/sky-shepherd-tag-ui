// @flow
import Parse from "parse/react-native"
import frontPlusJson from "../data/stubs/boundary_OIIFTEBB9A.json"
import black39Json from "../data/stubs/boundary_YYGoMnkP0V.json"
import type { Area, Tag } from "./types"

type JsonObject = { [string]: mixed }

// Parse string from object
const getString = (jsonObject: JsonObject, key: string): ?string => {
  const value: mixed = jsonObject[key]
  if (typeof value === "string") {
    return (value: string)
  } else {
    return null
  }
}

const areaFromJson = (json: JsonObject): ?Area => {
  let objectId: ?string = getString(json, "objectId")
  let name: ?string = getString(json, "name")

  if (
    objectId !== null &&
    typeof objectId !== "undefined" &&
    name !== null &&
    typeof name !== "undefined"
  ) {
    return {
      objectId,
      name
    }
  } else {
    return null
  }
}

// Temp data
const areaStubs = (): Area[] => {
  let rawAreas: any[] = [frontPlusJson, black39Json]
  let areas: Area[] = rawAreas.map(areaFromJson).filter(Boolean)

  const naomis = { objectId: "2", name: "Naomi's" }
  areas.push(naomis)
  return areas
}

const tagStubs = (): Tag[] => {
  return [{ objectId: "1", name: "Andy" }, { objectId: "2", name: "Griff" }]
}

interface Cloud {
  areaFromJson(json: JsonObject, key: string): ?Area;
  areaStubs(): Area[];
  tagStubs(): Tag[];
}

const cloud: Cloud = {
  areaFromJson,
  areaStubs,
  tagStubs
}

export default cloud
