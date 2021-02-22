import React from 'react';
import Swiper from 'react-native-swiper';
import {StyleSheet, Image, View, Dimensions} from 'react-native';
import img from '../../../images';

const {width, height} = Dimensions.get('screen');

const SwiperComponent = () => {

  const map = [
    img.prayerSection,
    img.sermonSection
  ]
  return (
    <Swiper style={classes.wrapper} autoplay={true}>
      {map.map((img, i) => (
        <View style={classes.slide1} key={i}>
          <Image style={classes.img} source={img} />
        </View>
      ))}
    </Swiper>
  );
}

const classes = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    // height: 400,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: width,
    height: height / 3.2,
  },
});

export default SwiperComponent;
