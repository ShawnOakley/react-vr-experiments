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

const buttonObjects = [
    {name: "Button 1", asset: "chess-world.jpg"},
    {name: "Button 2", asset: "plain.jpg"}
];


export default class Gallery extends React.Component {
  constructor() {
    super();
    this.state = {
       currentAsset: "chess-world.jpg",
       fadeAnim: new Animated.Value(0), // init opacity 0
       backgroundColor: new Animated.Value(0)
    };
  }

    handleClick(backgroundAsset) {
        this.setState({currentAsset: backgroundAsset})
    }

  handleClick (backgroundAsset) {
     Animated.parallel([
         Animated.timing(          // Uses easing functions
           this.state.fadeAnim,    // The value to drive
           {toValue: 0}            // Configuration
         ),
         Animated.timing(          // Uses easing functions
           this.state.backgroundColor,    // The value to drive
           {toValue: new Animated.Value(0)}            // Configuration
         )
     ]).start();
     setTimeout(()=>{
        this.setState({currentAsset: backgroundAsset})
     }, 1000);
  }

  componentDidMount () {
     Animated.parallel([
         Animated.timing(          // Uses easing functions
           this.state.fadeAnim,    // The value to drive
           {toValue: 1}            // Configuration
         ),
         Animated.timing(          // Uses easing functions
           this.state.backgroundColor,    // The value to drive
           {toValue: new Animated.Value(1)}            // Configuration
         )
     ]).start();
  }

  componentDidUpdate () {
     Animated.parallel([
         Animated.timing(          // Uses easing functions
           this.state.fadeAnim,    // The value to drive
           {toValue: 1}           // Configuration
         ),
         Animated.timing(          // Uses easing functions
           this.state.backgroundColor,    // The value to drive
           {toValue: new Animated.Value(0)}            // Configuration
         )
     ]).start();
  }


    render() {
        const {currentAsset, fadeAnim, backgroundColor} = this.state;
        var color = backgroundColor.interpolate({
            inputRange: [0, 1],
            outputRange: ['rgb(0, 0, 0)', 'rgb(255, 255, 255)']
        });
        const buttonArray =  buttonObjects.map((object)=>{
             return <VrButton
                 onClick={this.handleClick.bind(this, object.asset)}
                 key={object.name}
                style={
                    {
                        transform: [{translate: [-0.2, 0.75, -1.5]}],
                        padding: 0.2
                    }
                }
             >
                 <Text>
                 {object.name}
                 </Text>
             </VrButton>
        });

    const viewStyle = {
        opacity: fadeAnim,
        backgroundColor: color
    }

    return (
        <Animated.View style={viewStyle}>
            <Pano source={asset(currentAsset)}/>
            {buttonArray}
        </Animated.View>
    );
    }
};

AppRegistry.registerComponent('Gallery', () => Gallery);
