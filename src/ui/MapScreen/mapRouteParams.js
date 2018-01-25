// @flow
import type { MapMode } from "../../state/types"

const titleForMapRouteParams = (params: ?{ [key: string]: mixed }): string => {
  const defaultTitle = "Map"
  if (params != null) {
    const mode = mapMode(params.mode)
    switch (mode) {
      case "create":
        return "New area"
      case "area":
        return nameFromParam(params.area, defaultTitle)
      case "tag":
        return nameFromParam(params.tag, defaultTitle)
      default:
        return defaultTitle
    }
  } else {
    return defaultTitle
  }
}

const mapMode = (param: mixed): MapMode => {
  if (
    typeof param === "string" &&
    (param === "view" ||
      param === "create" ||
      param === "edit" ||
      param === "area" ||
      param === "tag")
  ) {
    return param
  } else {
    return "area"
  }
}

const nameFromParam = (param: mixed, defaultTitle: string): string => {
  if (param != null && typeof param.name === "string") {
    return param.name
  } else {
    return defaultTitle
  }
}

export { titleForMapRouteParams }
