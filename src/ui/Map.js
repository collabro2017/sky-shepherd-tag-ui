import { connect } from "react-redux"
import { View } from "react-native"
import MapView, { PROVIDER_GOOGLE } from "react-native-maps"
import styles from "../styles"

import { mapSelectors } from "../state/reducers/map"

const onLayout = props => {
  return () => {
    console.log({ event: "layout", region: props.region })
  }
}

const mapStateToProps = state => {
  const region = mapSelectors.getRegion(state)
  const props = {
    mapType: "hybrid",
    region: region,
    provider: PROVIDER_GOOGLE,
    style: styles.map
  }
  return { ...props, onLayout: onLayout(props) }
}

const mapDispatchToProps = () => {
  return {}
}

const Map = connect(mapStateToProps, mapDispatchToProps)(MapView)

Map.propTypes = {
  style: View.propTypes.style,
  initialRegion: MapView.propTypes.initialRegion
}

export default Map
