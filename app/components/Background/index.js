import React, {Component} from 'react';
import {ImageBackground} from 'react-native';
import img from '../../images';

const Wrapper = (props) => (
  <ImageBackground
    source={img.bgImg}
    style={{
      flex: 1,
      resizeMode: 'cover',
      justifyContent: "center"
    }}>
    {props.children}
  </ImageBackground>
);
export default Wrapper;
