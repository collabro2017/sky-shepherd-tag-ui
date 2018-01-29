// @flow
import * as React from "react"
import { Animated } from "react-native"

export default class SlideDownFromTopView extends React.Component<
  Props,
  State
> {
  constructor(props: Props) {
    super(props)
    this.state = { marginTop: new Animated.Value(-props.height) }
  }

  componentDidMount() {
    Animated.timing(this.state.marginTop, {
      toValue: 0,
      duration: 1000
    }).start()
  }

  render() {
    return (
      <Animated.View style={{ marginTop: this.state.marginTop }}>
        {this.props.children}
      </Animated.View>
    )
  }
}

type Props = {
  height: number,
  children: ?React.Node
}

type State = {
  marginTop: Animated.Value
}
