import React from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  Animated,
  Keyboard,
  TouchableOpacity,
  Platform,
} from 'react-native';
import EmojiSelector from 'react-native-emoji-selector';
import { Button, Subheading, Surface } from 'react-native-paper';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {ThemeContext} from '../../../context/ThemeContext';
import { colors } from '../../../theme';
import DeviceInfo from 'react-native-device-info';

const ChatInput = () => {
  const [keyboardOffset, setKeyboardOffset] = React.useState(
    new Animated.Value(1),
  );
  const [height, setHeight] = React.useState(0);

  React.useEffect(() => {
    Keyboard.addListener('keyboardWillShow', (e) => _keyboardWillShow(e));
    Keyboard.addListener('keyboardWillHide', (e) => _keyboardWillHide(e));

    // cleanup function
    return () => {
      Keyboard.removeListener('keyboardWillShow', (e) => _keyboardWillShow(e));
      Keyboard.removeListener('keyboardWillHide', (e) => _keyboardWillHide(e));
    };
  }, []);

  const _keyboardWillShow = (e) => {
    Animated.spring(keyboardOffset, {
      toValue:
        DeviceInfo.getModel() === 'iPhone X'
          ? e.endCoordinates.height - 34
          : e.endCoordinates.height,
      friction: 8,
      // useNativeDriver: true,
    }).start();
  }

  const _keyboardWillHide = (e) => {
    Animated.spring(keyboardOffset, {
      toValue: 0,
      friction: 8,
      // useNativeDriver: true,
    }).start();
  };

  return (
    <ThemeContext.Consumer>
      {({theme}) => (
        <Animated.View style={{marginBottom: keyboardOffset}}>
          <Surface style={classes.root}>
            <TextInput
              placeholder="Message Men's grioup"
              underlineColorAndroid="transparent"
              multiline
              onChange={(event) => {
                event.target.value;
              }}
              onContentSizeChange={(event) =>
                // setHeight(event.nativeEvent.contentSize.height)
                setHeight(
                  40 >=
                    event.nativeEvent.contentSize.height
                    ? 40
                    : event.nativeEvent.contentSize.height + 10,
                )
              }
              style={[
                classes.TextInput,
                {
                  height: Math.min(120, Math.max(35, height)),
                  color: theme.mode ? colors.white : colors.black,
                },
              ]}
            />
            <View style={classes.linkRoot}>
              <View style={classes.links}>
                <TouchableOpacity style={classes.item}>
                  <Icon name="emoticon-excited-outline" size={30} />
                </TouchableOpacity>
                <TouchableOpacity style={classes.item}>
                  <Icon name="at" size={30} />
                </TouchableOpacity>
                <TouchableOpacity style={classes.item}>
                  <Icon name="image" size={30} />
                </TouchableOpacity>
                <TouchableOpacity style={classes.item}>
                  <Icon name="paperclip" size={30} />
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={classes.buttonRoot}>
                <Subheading>Send</Subheading>
                <Icon name="send" size={20} />
              </TouchableOpacity>
            </View>
          </Surface>
        </Animated.View>
      )}
    </ThemeContext.Consumer>
  );
}

export default ChatInput

const classes = StyleSheet.create({
  root: {
    // flex: 1,
    bottom: 0,
    position: 'absolute',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    paddingHorizontal: 20,
    // paddingVertical: 20,
    width: '100%',
  },
  TextInput: {
    // minHeight: 40,
    // fontSize: 18,
    // marginHorizontal: 20,
    marginVertical: 10,
    fontSize: 16,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingLeft: 10,
    paddingTop: 8,
    textAlign: 'left',
    // borderRadius: 5,
  },
  linkRoot: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    // alignItems: 'center',
    marginBottom: 30,
    marginHorizontal: 20,
  },
  links: {
    // justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  item: {
    width: 50,
  },
  buttonRoot: {
    width: 80,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderBottomRightRadius: 20,
    height: 40,
    flexDirection: 'row',
  },
});