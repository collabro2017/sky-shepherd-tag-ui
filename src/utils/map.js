import { Dimensions } from "react-native"

const calculateLongitudeDelta = latitudeDelta => {
  const { width, height } = Dimensions.get("window")
  return latitudeDelta * width / height
}

export { calculateLongitudeDelta }
