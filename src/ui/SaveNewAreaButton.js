// @flow
import React from "react"
import { connect } from "react-redux"
import { mapSelectors } from "../state/map"
import SaveButton from "./SaveButton"
import type { StyleObj } from "react-native/Libraries/StyleSheet/StyleSheetTypes"
import type { Action, Dispatch, State } from "../state/types"
import type { Area } from "../data/types"

const mapStateToProps = (state: State, ownProps: Props): Props => {
  return {
    ...ownProps,
    newArea: mapSelectors.getNewArea(state)
  }
}

const mapDispatchToProps = (dispatch: Dispatch, ownProps: Props): Props => {
  return {
    ...ownProps,
    onPress: () => {
      const newArea = ownProps.newArea
      if (newArea != null) {
        dispatch(({ type: "tag/map/SAVE_NEW_AREA", payload: newArea }: Action))
      }
    }
  }
}

const areaHasTooFewPoints = (area: ?Area): boolean => {
  if (area == null) {
    return true
  } else {
    return area.points.pointsArray.length < 3
  }
}

const SaveNewAreaButton = (props: Props) => {
  return (
    <SaveButton
      disabled={areaHasTooFewPoints(props.newArea)}
      onPress={props.onPress}
      style={props.style}
    />
  )
}

type Props = {
  newArea: ?Area,
  onPress: () => void,
  style: StyleObj
}

export default connect(mapStateToProps, mapDispatchToProps)(SaveNewAreaButton)
