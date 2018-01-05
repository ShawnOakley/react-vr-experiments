import React from 'react';
import {
  AppRegistry,
  asset,
  Pano,
  Text,
  View,
  VrButton,
  Animated
} from 'react-vr';

export default class HelloVirtualWorld extends React.Component {
  render() {
    return (
      <View>
        <Pano source={asset('plain.jpg')}/>
        <NestedMessage/>
      </View>
    );
  }
};

class NestedMessage extends React.Component {
  constructor() {
    super();
    this.state = {
       message: "Hello ",
       showMessage: true,
       fadeAnim: new Animated.Value(0), // init opacity 0
    };
  }

  componentDidMount () {
     Animated.timing(          // Uses easing functions
       this.state.fadeAnim,    // The value to drive
       {toValue: 1}            // Configuration
     ).start();
  }

  componentDidUpdate () {
     Animated.timing(          // Uses easing functions
       this.state.fadeAnim,    // The value to drive
       {toValue: 1}            // Configuration
     ).start();
  }

  handleClick () {
    let showMessage = !this.state.showMessage;
    let message = showMessage ? "Hello" : "Not hello"
     Animated.timing(          // Uses easing functions
       this.state.fadeAnim,    // The value to drive
       {toValue: 0}            // Configuration
     ).start();
     setTimeout(()=>{
        this.setState({showMessage, message})
     }, 1000);
  }

  render() {
    const showMessage = this.state.showMessage;

    return (
      <View>
      <Animated.View
      style={{opacity: this.state.fadeAnim}}>
          <VrButton
            onClick={this.handleClick.bind(this)}
          >
            <Text
              style={{
                backgroundColor: '#777879',
                fontSize: 0.8,
                fontWeight: '400',
                layoutOrigin: [0.5, 0.5],
                paddingLeft: 0.2,
                paddingRight: 0.2,
                textAlign: 'center',
                textAlignVertical: 'center',
                transform: [{translate: [0, 0, -5]}],
              }}
              >
            {this.state.message}
            </Text>
          </VrButton>
      </Animated.View>
      </View>
    );
  }
};

AppRegistry.registerComponent('HelloVirtualWorld', () => HelloVirtualWorld);
