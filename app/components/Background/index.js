import React from 'react';
import {ImageBackground} from 'react-native';
import img from '../../images';
import {useSelector} from 'react-redux';
import {api} from '../../api';

const Wrapper = (props) => {
  const {church} = useSelector(({church}) => church);

  return (
    <ImageBackground
      // source={img.bgImg}
      source={{uri: `${api.image}${church?.img}`}}
      style={[
        {
          flex: 1,
          resizeMode: 'cover',
          justifyContent: 'center',
        },
        props.root,
      ]}>
      {props.children}
    </ImageBackground>
  );
};
export default Wrapper;
