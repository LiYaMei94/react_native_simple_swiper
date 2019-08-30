import React, { Component } from 'react';
import { Easing, Animated,Text,StyleSheet } from "react-native";
import { createStackNavigator, createAppContainer, createBottomTabNavigator, createDrawerNavigator } from 'react-navigation';



//路由文件

import ScrollView from './components/scrollView_swiper';
import ViewPager from '../src/components/viewPager_swiper';

//底部tabbar的图标
const getTabBarIcon = (navigation, focused, tintColor) => {
    const { routeName } = navigation.state;
    let iconName;
    if (routeName === 'ScrollView') {
        iconName = '\ue63e';
    } else if (routeName === 'ViewPager') {
        iconName = '\ue641';
    }
    return <Text style={[styles.iconStyle,{color:tintColor}]}>{iconName}</Text>;
};

//底部tabbar
const TabNavigator = createBottomTabNavigator(
    {
        ScrollView: createStackNavigator(
            {
                ScrollView: {
                    screen: ScrollView,
                    navigationOptions: {
                        header: null,
                    },
                },
            }
        ),
        ViewPager: createStackNavigator(
            {
                ViewPager: {
                    screen: ViewPager,
                    navigationOptions: {
                        header: null,
                    },
                }
            }
        ),
    },

    {
        defaultNavigationOptions: ({ navigation }) => (
            {
                tabBarIcon: ({ focused, tintColor }) =>
                    getTabBarIcon(navigation, focused, tintColor),
            }
        ),
        tabBarOptions: {
            activeTintColor: '#777',
            inactiveTintColor: '#b2bec6',
            style: {
                backgroundColor: '#CDDFEA',
                borderTopColor: "transparent"
            },
        },
    }
);

//创建全局导航器createStackNavigator
export const router = createStackNavigator(
    {
        bottomTabNavigator: TabNavigator,
    },
    {
        initialRouteName: "bottomTabNavigator",
        mode: 'modal',
        defaultNavigationOptions: {
            header: null,
        },
    }
)

const styles = StyleSheet.create({
    iconStyle:{
        fontFamily: "iconfont",
        fontSize: 25,
    }
})