import React from 'react';
import { StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Surface, Card, Subheading } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import img from "../../../images"
const { width, height } = Dimensions.get("screen");


const Box = ({ title, name, route, imgStyle }) => {
  const { navigate } = useNavigation();

  return (
    <TouchableOpacity
      onPress={() =>
      navigate(route)
      }>
      <Surface style={classes.surface}>
        <Card.Cover style={[classes.img, imgStyle]} source={img[name]} />
      </Surface>
      <Subheading>{title}</Subheading>
    </TouchableOpacity>
  );
}

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
})