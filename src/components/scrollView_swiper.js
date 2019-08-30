/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Image, StyleSheet, Text, View,TouchableHighlight,Animated,ScrollView,Dimensions,PanResponder,YellowBox} from 'react-native';
import swiper_styles from '../css/swiper_style';
export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      pageArr:[require('../../src/images/1.jpg'),require('../../src/images/2.jpg'),require('../../src/images/3.jpg'),require('../../src/images/4.jpg'),require('../../src/images/5.jpg')],
      swiperIndex:0,
      screent_width:Dimensions.get('window').width,
      ScrollView_contentOffset_before:0,
      isLeft:false,
    }
    YellowBox.ignoreWarnings([//禁止componentWillMount和componentWillReceiveProps的黄色警告
      'Warning: componentWillMount is deprecated',
      'Warning: componentWillReceiveProps is deprecated',
    ]);
  }
  componentDidMount(){
    if(this.state.isAutoplay){
      this.autoplay()
    }
  }
  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => {},
      onPanResponderGrant: (evt, gestureState) => {},
      onPanResponderStart: (evt, gestureState) => {},
      onPanResponderMove: (evt, gestureState) => {
        let isLeft=false;
        let touch_move=this.state.ScrollView_contentOffset_before;
        let flag=true;
        if (gestureState.dx > 0) {//右移
          isLeft=false;
          touch_move=touch_move-parseInt(gestureState.dx);
        } else {
          isLeft=true;
          touch_move=touch_move+parseInt(Math.abs(gestureState.dx));
        }
        flag=this.isMove(this.state.swiperIndex,isLeft);;
        if(flag){
          this.refs.swiper_ScrollView.scrollTo({ x:touch_move, y: 0, animated: true }, 1);
        }
        this.setState({
          isLeft:isLeft,
        })
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        let flag=this.isMove(this.state.swiperIndex,this.state.isLeft);
        if(flag){
          this.ScrollView_move(true,0);
        }
      },
      onPanResponderTerminate: (evt, gestureState) => {},
      onShouldBlockNativeResponder: (evt, gestureState) => {
        return true;
      },
    });
  }
  isMove(index,isLeft){
    let flag=true;
    if(index==0&&isLeft){//是第一页则可以向左滑
      flag=true;
    }else if(index==0&&!isLeft){//是第一页则不可以右滑
      flag=false;
    }
    if(index==this.state.pageArr.length-1&&isLeft){//是最后页则不能向左滑
      flag=false;
    }else if(index==this.state.pageArr.length-1&&!isLeft){//是第一页则可以右滑
      flag=true;
    }
    return flag;
  }
  
  ScrollView_move(isDrag,index){
    var that = this;
    let { pageArr, isLeft,ScrollView_contentOffset_before,screent_width } = that.state;
    var swiperIndex=index;
    isLeft=isDrag?isLeft:swiperIndex>this.state.swiperIndex?true:false;
    var move_spacing= isLeft ? (screent_width) : (-screent_width);//每次移动多少
    var move_width=ScrollView_contentOffset_before+ move_spacing;//ScrollView移动的距离
   
    if(isDrag){
      swiperIndex=Math.abs(Math.floor(move_width / move_spacing));
    }else{//点击分页按钮
      move_width=ScrollView_contentOffset_before+ move_spacing*Math.abs(index-this.state.swiperIndex);
    }
    that.refs.swiper_ScrollView.scrollTo({ x: move_width, y: 0, animated: true }, 1);
    this.setState({
      ScrollView_contentOffset_before:move_width,
      swiperIndex:swiperIndex,
    })
  }
  render() {
    const {pageArr,swiperIndex,screent_width}=this.state;
    return (
      <View style={styles.container}>
        <View style={swiper_styles.swiperContainer}>
          <ScrollView  
            ref='swiper_ScrollView'
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            {...this._panResponder.panHandlers}
            scrollEnabled={false}
          >
            {
              pageArr.map((item,index)=>{
                return (
                  <View style={[swiper_styles.pageItem,{width:screent_width}]} key={index}>
                    <Image style={swiper_styles.pageItemImg}  source={item}></Image>
                  </View>
                )
              })
            }
          </ScrollView>
          <View style={swiper_styles.pagination}>
            {
              pageArr.map((item,index)=>{
                return (
                  <TouchableHighlight
                    underlayColor='#fff'
                    onPress={this.ScrollView_move.bind(this,false,index)}
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
