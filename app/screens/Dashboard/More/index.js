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
            <ListNav
              name="Join Congregation"
              icon="account-group-outline"
              onPress={() => navigate('Onboarding', {screen: 'FindChurch'})}
            />
            <ListNav
              name="Chat Room"
              icon="wechat"
              onPress={() => navigate('Chat')}
            />
            <ListNav
              name="Daily Devotion"
              icon="book"
              onPress={() => navigate('Devotion')}
            />
            <ListNav
              name="Hymns"
              icon="book-open"
              onPress={() => navigate('Hymn')}
            />
            <ListNav
              name="Sermons"
              icon="file-document"
              onPress={() => navigate('Sermon')}
            />
            <ListNav
              name="Prayer Requests"
              icon="hands"
              iconType="AwesomeIcon"
              onPress={() => navigate('PPR')}
            />
            <ListNav
              name="Media"
              icon="folder-multiple-image"
              onPress={() => navigate('Media')}
            />
            <ListNav
              name="Forms"
              icon="format-align-center"
              onPress={() => navigate('Form')}
            />
            <ListNav
              name="Settings"
              icon="cogs"
              onPress={() => navigate('More', {screen: 'SettingScreen'})}
            />
          </Wrapper>
        </View>
      )}
    </ThemeContext.Consumer>
  );
}


const ListNav = ({name, icon, onPress, iconType="MD"}) => {
  return (
    <ThemeContext.Consumer>
      {({theme}) => (
        <TouchableOpacity style={classes.surface} onPress={onPress}>
          <View style={classes.left}>
            {iconType === 'MD' ? (
              <Icon
                name={icon}
                color={theme?.icon}
                style={classes.icon}
                size={25}
              />
            ) : (
              <AwesomeIcon
                name={icon}
                color={theme.icon}
                style={classes.icon}
                size={20}
              />
            )}

            <Subheading style={classes.Subheading}>{name}</Subheading>
          </View>
          <Icon name="chevron-right" color={theme?.icon} size={25} />
        </TouchableOpacity>
      )}
    </ThemeContext.Consumer>
  );
};

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
