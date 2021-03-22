import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import MentionsInput, {
  parseMarkdown,
} from '@lowkey/react-native-mentions-input';

const {width} = Dimensions.get('window');

export default function App() {
  const [value, onChangeText] = React.useState('');
  const [markdown, setMarkdown] = React.useState('');
  return (
    <View style={styles.container}>
      <MentionsInput
        textInputTextStyle={styles.textInputTextStyle}
        placeholder={'Message'}
        onFocusStateChange={(focused) =>
          console.log('input focused is focused', focused)
        }
        multiline
        value={value}
        onTextChange={onChangeText}
        onMarkdownChange={(mrkdwn: string) => setMarkdown(mrkdwn)}
        mentionStyle={styles.mentionStyle}
        textInputStyle={styles.textInputStyle}
        users={[
          {
            id: '5f5f2b120a958f2e6b2ff0d1',
            name: 'The Maximus The Bestus',
            avatar:
              'https://images.pexels.com/photos/1561020/pexels-photo-1561020.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=50',
          },
          {
            id: '5f5f2b120a958f2e6b2ff0d1',
            name: 'Joni T',
            avatar:
              'https://images.pexels.com/photos/917494/pexels-photo-917494.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=50',
          },
          {
            id: '5f5f2b120a958f2e6b2ff0d1',
            name: 'ville',
            avatar:
              'https://images.pexels.com/photos/1072179/pexels-photo-1072179.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=50',
          },
        ]}
        suggestedUsersComponent={(users, addMentions) => (
          <View
            style={[
              styles.suggestedUserComponentContainer,
              {top: -(USER_ITEM_HEIGHT * users.length)},
            ]}>
            {users.map((user) => (
              <TouchableOpacity onPress={() => addMentions(user)}>
                <View key={user.id} style={styles.suggestedUserComponentStyle}>
                  <Image
                    source={{uri: user.avatar}}
                    style={styles.suggestedUserComponentImageStyle}
                  />
                  <Text>{user.name}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      />
    </View>
  );
}

const USER_ITEM_HEIGHT = 60;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: "flex-end",
    backgroundColor: '#f5f5f5',
  },
  textInputStyle: {
    backgroundColor: '#fff',
    width: width,
    height: USER_ITEM_HEIGHT,
    borderRadius: 5,
    paddingHorizontal: 10,
    borderColor: '#c1c1c1',
    color: '#000',
    borderWidth: StyleSheet.hairlineWidth,
  },
  textInputTextStyle: {},
  suggestedUserComponentImageStyle: {
    width: USER_ITEM_HEIGHT * 0.65,
    height: USER_ITEM_HEIGHT * 0.65,
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    marginRight: 5,
  },
  suggestedUserComponentContainer: {
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    position: 'absolute',
    left: 0,
    right: 0,
  },
  suggestedUserComponentStyle: {
    alignItems: 'center',
    paddingHorizontal: 10,
    height: USER_ITEM_HEIGHT,
    flexDirection: 'row',
  },
  mentionStyle: {
    fontWeight: '400',
    color: 'blue',
  },
  urlStyle: {
    fontWeight: '400',
    color: 'blue',
    textDecorationLine: 'underline',
  },
  // Example styles
  sendButtonStyle: {
    marginTop: 20,
    width: 100,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#efefef',
    borderRadius: 15,
  },
  exampleContainer: {
    alignSelf: 'stretch',
    flexDirection: 'column',
    paddingHorizontal: 30,
    marginVertical: 30,
  },
  exampleHeader: {
    fontWeight: '700',
  },
});
