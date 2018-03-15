import { Color } from "react-native"
import { Tag } from "../types"
import { colors } from "../styles"

const tagStatusColor = (tag: Tag): Color => {
  switch (tag.region) {
    case 0:
      return colors.statusRed
    case 1:
      return colors.statusBlue
    case 2:
      return colors.statusYellow
    case 3:
      return colors.statusGreen
    default:
      return colors.logoGray
  }
}

export { tagStatusColor }
