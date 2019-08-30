import React from 'react';
import {
StyleSheet
} from 'react-native';
const swiper_styles = StyleSheet.create({
    swiperContainer:{
      width:'100%',
      height:200,
      position:'relative',
    },
    ViewPager:{
      width:'100%',
      height:'100%',
    },
    pageItem:{
      width:'100%',
      height:'100%',
    },
    pageItemImg:{
      width:'100%',
      height:'100%'
    },
    pagination:{
      position:"absolute",
      bottom:10,
      zIndex:2,
      height:12,
      width:'100%',
      justifyContent:"center",
      flexDirection:"row",
      alignItems:"center",
    },
    paginationItem:{
      width:10,
      height:10,
      borderRadius:50,
      marginRight:10
    }
  });
  module.exports = swiper_styles;