import React from 'react';
import {
  Subheading,
} from 'react-native-paper';
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import Wrapper from '../../../components/Background';
import {ThemeContext} from '../../../context/ThemeContext';



const MoreScreen = ({ navigation: { navigate } }) => {
  return (
    <ThemeContext.Consumer>
      {({theme, baseColor}) => (
        <View style={[classes.root, {backgroundColor: theme.background}]}>
          <Wrapper root={{justifyContent: 'flex-start'}}>
            <TouchableOpacity
              style={classes.surface}
              onPress={() => navigate('FindChurch')}>
              <View style={classes.left}>
                <Icon
                  name="account-group-outline"
                  color={theme.icon}
                  style={classes.icon}
                  size={25}
                />
                <Subheading style={classes.Subheading}>
                  Join Congregation
                </Subheading>
              </View>
              <Icon name="chevron-right" color={theme.icon} size={25} />
            </TouchableOpacity>
            <TouchableOpacity
              style={classes.surface}
              onPress={() => navigate('Devotion')}>
              <View style={classes.left}>
                <Icon
                  name="book"
                  color={theme.icon}
                  style={classes.icon}
                  size={25}
                />
                <Subheading style={classes.Subheading}>
                  Daily Devotion
                </Subheading>
              </View>
              <Icon name="chevron-right" color={theme.icon} size={25} />
            </TouchableOpacity>
            <TouchableOpacity
              style={classes.surface}
              onPress={() => navigate('Hymn')}>
              <View style={classes.left}>
                <Icon
                  name="book-open"
                  color={theme.icon}
                  style={classes.icon}
                  size={25}
                />
                <Subheading style={classes.Subheading}>Hymns</Subheading>
              </View>
              <Icon name="chevron-right" color={theme.icon} size={25} />
            </TouchableOpacity>
            <TouchableOpacity
              style={classes.surface}
              onPress={() =>
                navigate('Sermon', {
                  screen: 'More',
                })
              }>
              <View style={classes.left}>
                <Icon
                  name="file-document"
                  color={theme.icon}
                  style={classes.icon}
                  size={25}
                />
                <Subheading style={classes.Subheading}>Sermons</Subheading>
              </View>
              <Icon name="chevron-right" color={theme.icon} size={25} />
            </TouchableOpacity>
            <TouchableOpacity
              style={classes.surface}
              onPress={() => navigate('PPR')}>
              <View style={classes.left}>
                <AwesomeIcon
                  name="hands"
                  color={theme.icon}
                  style={classes.icon}
                  size={20}
                />
                <Subheading style={classes.Subheading}>
                  Prayer Requests
                </Subheading>
              </View>
              <Icon name="chevron-right" color={theme.icon} size={25} />
            </TouchableOpacity>
            <TouchableOpacity
              style={classes.surface}
              onPress={() => navigate('Media')}>
              <View style={classes.left}>
                <Icon
                  name="folder-multiple-image"
                  color={theme.icon}
                  style={classes.icon}
                  size={25}
                />
                <Subheading style={classes.Subheading}>Media</Subheading>
              </View>
              <Icon name="chevron-right" color={theme.icon} size={25} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigate('Form')}
              style={classes.surface}>
              <View style={classes.left}>
                <Icon
                  name="format-align-center"
                  color={theme.icon}
                  style={classes.icon}
                  size={25}
                />
                <Subheading style={classes.Subheading}>Forms</Subheading>
              </View>
              <Icon name="chevron-right" color={theme.icon} size={25} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigate('SettingScreen')}
              style={classes.surface}>
              <View style={classes.left}>
                <Icon
                  name="cogs"
                  color={theme.icon}
                  style={classes.icon}
                  size={25}
                />
                <Subheading style={classes.Subheading}>Settings</Subheading>
              </View>
              <Icon name="chevron-right" color={theme.icon} size={25} />
            </TouchableOpacity>
          </Wrapper>
        </View>
      )}
    </ThemeContext.Consumer>
  );
}

export default MoreScreen;

const classes = StyleSheet.create({
  root: {
    flex: 1,
    // marginVertical: 15,
    // marginHorizontal: 5,
    padding: 15,
  },
  headerRight: {
    flex: 1,
    justifyContent: 'flex-end',
    marginHorizontal: 15,
    alignItems: 'center',
    flexDirection: 'row',
  },
  surface: {
    // flex: 1,
    marginVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 5,
    elevation: 4,
  },
  left: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  bibleTypeFontSize: {
    fontSize: 15,
    color: '#4cd964',
  },
  icon: {
    marginRight: 20,
  },
  img: {
    width: 20,
    height: 20,
    marginRight: 20,
  },
  Subheading: {
    fontSize: 18,
  },
  title: {flex: 1, justifyContent: 'flex-start'},
});
