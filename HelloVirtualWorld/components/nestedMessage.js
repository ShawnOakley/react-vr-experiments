import React from "react";
import {
  AppRegistry,
  asset,
  Pano,
  Text,
  View,
  VrButton
} from 'react-vr';

export default class HelloVirtualWorld extends React.Component {
render() {
    return (
      <View>
        <Pano source={asset('horseshoe-bend.jpg')}/>
        <NestedMessage message={"Hello Nested Message"}/>
      </View>
    );
  }
};