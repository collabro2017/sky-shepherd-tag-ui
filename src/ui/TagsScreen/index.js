import React from "react"
import { View, Text } from "react-native"

class TagsScreen extends React.Component {
  navigationOptions: {
    title: "List of Tags"
  }
  render() {
    return (
      <View {...this.props}>
        <Text>Tags</Text>
      </View>
    )
  }
}

export default TagsScreen
