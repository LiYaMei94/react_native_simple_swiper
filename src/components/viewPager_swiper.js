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
import swiper_styles from '../css/swiper_style';
export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      pageArr:[require('../../src/images/1.jpg'),require('../../src/images/2.jpg'),require('../../src/images/3.jpg'),require('../../src/images/4.jpg'),require('../../src/images/5.jpg')],
      swiperIndex:0
    }
  }
  componentDidMount(){
  }
  autoplay(){
    
  }
  
  render() {
    const {pageArr,swiperIndex}=this.state;
    return (
      <View style={styles.container}>
        <View style={swiper_styles.swiperContainer}>
          <ViewPager style={swiper_styles.ViewPager}  initialPage={swiperIndex}
            ref='ViewPager'
            onPageSelected={(event)=>{
              this.setState({
                swiperIndex:event.nativeEvent.position 
              })
            }}
          >
            {
              pageArr.map((item,index)=>{
                return (
                  <View style={swiper_styles.pageItem} key={index}>
                    <Image style={swiper_styles.pageItemImg}  source={item}></Image>
                  </View>
                )
              })
            }
          </ViewPager>
          <View style={swiper_styles.pagination}>
            {
              pageArr.map((item,index)=>{
                return (
                  <TouchableHighlight
                    underlayColor='#fff'
                    onPress={()=>{
                      this.refs.ViewPager.setPage(index);//点击滚动到指定页
                      this.setState({
                        swiperIndex:index
                      })
                    }}
                    key={index} style={[swiper_styles.paginationItem,{backgroundColor:index==swiperIndex?"red":"#fff"}]}>
                    <Text></Text>
                  </TouchableHighlight>
                )
              })
            }
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1
  },
});
