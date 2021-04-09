import * as React from 'react';
import {FC} from 'react';
import {MentionInput, Suggestion} from 'react-native-controlled-mentions';
import {
  Pressable,
  Text,
  View,
  Platform,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Keyboard,
  SafeAreaView,
  Modal,
} from 'react-native';
import {Surface, Subheading} from 'react-native-paper';
const {width, height} = Dimensions.get('screen');
import {ThemeContext} from '../../../context/ThemeContext';
import WSContext from "../../../context/websocket"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';


const users = [
  {id: '1', name: 'David Tabaka'},
  {id: '2', name: 'Mary'},
  {id: '3', name: 'Tony'},
  {id: '4', name: 'Mike'},
  {id: '5', name: 'Grey'},
];

const hashtags = [
  {id: 'todo', name: 'todo'},
  {id: 'help', name: 'help'},
  {id: 'loveyou', name: 'loveyou'},
];

const TextInput = () => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState('');
  const [height, setHeight] = React.useState(0);
  const socket = React.useContext(WSContext);
  const {user} = useSelector(({account}) => account);
  const {room} = useSelector(({chat}) => chat);

  // console.log("socket", socket);

  const sendMessage = () => {
    try {
      Keyboard.dismiss();
      socket.send(
        '/chatApp/oneToGroup',
        {},
        JSON.stringify({
          senderID: user?._id,
          roomID: room?.roomID,
          messageContent: value,
          messageContentType: 'TEXT',
        }),
      );

      setValue("");
    } catch (error) {
      console.log("error", error);
    }
  }

  const renderSuggestions: (
    suggestions: Suggestion[],
  ) => FC<MentionSuggestionsProps> = (suggestions) => ({
    keyword,
    onSuggestionPress,
  }) => {
    if (keyword == null) {
      // setOpen(false);
      return null;
    }

    return (
      <View style={{ flex: 1 }} >
        <ScrollView>
          {suggestions
            .filter((one) =>
              one.name
                .toLocaleLowerCase()
                .includes(keyword.toLocaleLowerCase()),
            )
            .map((one) => (
              <Pressable
                key={one.id}
                onPress={() => onSuggestionPress(one)}
                style={{padding: 12}}>
                <Text>{one.name}</Text>
              </Pressable>
            ))}
        </ScrollView>
      </View>
    );
  };

  const renderMentionSuggestions = renderSuggestions(users);

  const renderHashtagSuggestions = renderSuggestions(hashtags);

  return (
    <WSContext.Consumer>
      {(socket) => (
        <ThemeContext.Consumer>
          {({theme, baseColor}) => (
            <Surface
              style={[
                classes.root,
                {
                  minHeight: 100,
                },
              ]}>
              <MentionInput
                // autoFocus
                value={value}
                onChange={setValue}
                // keyboardType =" emoji"
                onContentSizeChange={(event) => {
                  // setHeight(event.nativeEvent.contentSize.height)
                  // console.log(
                  //   'event.nativeEvent.contentSize.height',
                  //   event.nativeEvent.contentSize.height,
                  // );
                  setHeight(
                    height >= event.nativeEvent.contentSize.height
                      ? height
                      : event.nativeEvent.contentSize.height + 10,
                  );
                }}
                partTypes={[
                  {
                    trigger: '@',
                    renderSuggestions: renderMentionSuggestions,
                    textStyle: {
                      fontWeight: '500',
                      color: baseColor,
                      fontSize: 15,
                    },
                  },
                  {
                    trigger: '#',
                    allowedSpacesCount: 0,
                    renderSuggestions: renderHashtagSuggestions,
                    textStyle: {
                      fontWeight: '500',
                      color: baseColor,
                      fontSize: 15,
                    },
                  },
                  {
                    pattern: /(https?:\/\/|www\.)[-a-zA-Z0-9@:%._\+~#=]{1,256}\.(xn--)?[a-z0-9-]{2,20}\b([-a-zA-Z0-9@:%_\+\[\],.~#?&\/=]*[-a-zA-Z0-9@:%_\+\]~#?&\/=])*/gi,
                    textStyle: {color: baseColor, fontSize: 15},
                  },
                ]}
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  fontSize: 16,
                  minHeight: 40,
                  fontWeight: '300',
                  // borderTopWidth: 1,
                  // borderTopColor: 'lightgrey',
                  maxHeight: 60,
                  width: width,
                }}
                placeholder="Type here..."
              />
              <View style={classes.linkRoot}>
                <View style={classes.links}>
                  {/* <TouchableOpacity style={classes.item}>
                <Icon name="emoticon-excited-outline" size={25} />
              </TouchableOpacity> */}
                  <TouchableOpacity style={classes.item}>
                    <Icon name="image" size={25} />
                  </TouchableOpacity>
                  <TouchableOpacity style={classes.item}>
                    <Icon name="paperclip" size={25} />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity style={classes.buttonRoot} onPress={sendMessage} >
                  <Subheading>Send</Subheading>
                  <Icon name="send" size={25} />
                </TouchableOpacity>
              </View>
            </Surface>
          )}
        </ThemeContext.Consumer>
      )}
    </WSContext.Consumer>
  );
};

export default TextInput;

const classes = StyleSheet.create({
  root: {
    // flex: 1,
    elevation: 1,
    // width: width,
    alignItems: 'flex-start',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    // marginBottom: 50
  },
  linkRoot: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    // alignItems: 'center',
    width: width,
    marginBottom: 30,
    // marginHorizontal: 20,
    paddingHorizontal: 20,
  },
  links: {
    // justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  item: {
    width: 40,
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
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  surface: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 20,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
