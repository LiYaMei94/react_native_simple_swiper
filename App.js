/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Image, StyleSheet, Text, View,TouchableHighlight,Animated} from 'react-native';
import ViewPager from "@react-native-community/viewpager";
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation';
//引入路由文件
import { router } from './src/router';

const AppContainer = createAppContainer(router);
export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      
    }
  }
  
  render() {
    return (
      <AppContainer></AppContainer>
    );
  }
}

const styles = StyleSheet.create({
  
});
