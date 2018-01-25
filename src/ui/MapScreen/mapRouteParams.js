// @flow
import React from "react"
import SaveNewAreaButton from "../SaveNewAreaButton"
import styles from "../../styles"
import type { Element } from "react"
import type { MapMode } from "../../state/types"

type MapRouteParams = { [key: string]: mixed }
const titleForMapRouteParams = (params: ?MapRouteParams): string => {
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
    return "view"
  }
}

const nameFromParam = (param: mixed, defaultTitle: string): string => {
  if (param != null && typeof param.name === "string") {
    return param.name
  } else {
    return defaultTitle
  }
}

const headerRightForMapRouteParams = (params: ?MapRouteParams): ?Element<*> => {
  if (params != null) {
    const mode = mapMode(params.mode)
    switch (mode) {
      case "create":
        return <SaveNewAreaButton style={styles.headerButtonRight} />
      default:
        return null
    }
  }
}

export { titleForMapRouteParams, headerRightForMapRouteParams }
