import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from 'react-native';
import { Surface, Card, Subheading } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import img from "../../../images"
import Icon from 'react-native-vector-icons/MaterialIcons';
const {width, height} = Dimensions.get('screen');


const Box = ({title, name, route, imgStyle, onPress, disabled}) => {
  const {navigate} = useNavigation();
  const routed = () => navigate(route);
  return (
    <TouchableOpacity disabled={disabled} onPress={onPress ?? routed}>
      <Surface style={classes.surface}>
        {name === 'liveSection' && !disabled ? (
          <ImageBackground style={classes.imgBack} source={img[name]}>
            <Icon name="play-circle-outline" size={40} style={classes.icon} />
          </ImageBackground>
        ) : (
          <Card.Cover style={[classes.img, imgStyle]} source={img[name]} />
        )}
      </Surface>
      <Subheading>{title}</Subheading>
    </TouchableOpacity>
  );
};

export default Box;

const classes = StyleSheet.create({
  surface: {
    padding: 8,
    height: height / 8,
    width: width / 2.2,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  img: {
    // resizeMode: Image.resizeMode.contain,
    height: height / 8,
    width: width / 2.2,
  },
  imgBack: {
    width: width / 2.2,
    height: height / 7.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});