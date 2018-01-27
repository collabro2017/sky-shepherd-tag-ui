// @flow
import React from "react"
import { connect } from "react-redux"
import { mapSelectors, mapActions } from "../state/map"
import SaveButton from "./SaveButton"
import type { StyleObj } from "react-native/Libraries/StyleSheet/StyleSheetTypes"
import type { Dispatch, State } from "../state/types"
import type { NewArea } from "../data/types"

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
        dispatch(mapActions.saveNewArea(newArea))
      }
    }
  }
}

const areaHasEnoughPoints = (area: NewArea): boolean =>
  area.coordinates.length >= 3

const newAreaValid = (newArea: NewArea): boolean =>
  areaHasEnoughPoints(newArea) && newArea.name.length > 0

const SaveNewAreaButton = (props: Props) => {
  return (
    <SaveButton
      disabled={props.newArea == null || !newAreaValid(props.newArea)}
      onPress={props.onPress}
      style={props.style}
    />
  )
}

type Props = {
  newArea: ?NewArea,
  onPress: () => void,
  style: StyleObj
}

export default connect(mapStateToProps, mapDispatchToProps)(SaveNewAreaButton)
