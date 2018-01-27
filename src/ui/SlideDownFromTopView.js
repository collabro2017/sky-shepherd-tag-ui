// @flow
import * as React from "react"
import { Animated } from "react-native"

export default class SlideDownFromTopView extends React.Component<
  Props,
  State
> {
  constructor(props: Props) {
    super(props)
    this.state = { height: new Animated.Value(0) }
  }

  componentDidMount() {
    Animated.timing(this.state.height, {
      toValue: this.props.height,
      duration: 1000
    }).start()
  }

  render() {
    return (
      <Animated.View style={{ height: this.state.height }}>
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
  height: Animated.Value
}
