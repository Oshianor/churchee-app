import React, {Component} from 'react';
import {
  Surface,
  Caption,
  IconButton,
  Subheading,
  Colors,
  Paragraph,
  Avatar,
  Title,
  FAB,
} from 'react-native-paper';
import {
  View,
  Dimensions,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import AwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import {connect} from 'react-redux';

function mapStateToProps(state) {
  return {
    setting: state.setting,
  };
}

const screen = Dimensions.get('screen');

class PrayRequestDetail extends Component {
  static navigationOptions = ({navigation}) => {
    const item = navigation.getParam('item', 'Prayer Request');
    return {
      headerLeft: (
        <IconButton
          icon="arrow-back"
          color={Colors.black}
          size={30}
          onPress={() => navigation.goBack()}
        />
      ),
      headerTitle: <Paragraph style={classes.title}>{item.title}</Paragraph>,
      headerRight: (
        <View style={classes.headerRight}>
          <IconButton
            icon="people"
            color={Colors.black}
            size={30}
            onPress={() => navigation.goBack()}
          />
          <Avatar.Image
            size={24}
            source={{uri: 'https://picsum.photos/75'}}
          />
        </View>
      ),
    };
  };

  render() {
    const {setting, navigation} = this.props;
    const item = navigation.getParam('item', 'Prayer Request');

    return (
      <View style={classes.root}>
        <ScrollView contentContainerStyle={classes.root}>
          <Title>{item.title}</Title>
          <Paragraph>{item.body}</Paragraph>
        </ScrollView>
        <View style={classes.fab}>
          <FAB
            small
            icon="add"
            color="white"
            style={{
              backgroundColor: setting.baseColor,
            }}
            onPress={() =>
              navigation.navigate('AddPersonalPrayerRequestScreen')
            }
          />
        </View>
      </View>
    );
  }
}

export default connect(mapStateToProps)(PrayRequestDetail);

const classes = StyleSheet.create({
  root: {
    flex: 1,
    // paddingHorizontal: 10,
    margin: 10,
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
    alignItems: 'center',
    elevation: 4,
    borderBottomWidth: 1,
    borderColor: '#0000006e',
  },
  left: {
    alignItems: 'center',
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  Subheading: {
    flex: 1,
    fontWeight: '500',
    padding: 0,
    margin: 0,
  },
  para: {
    fontSize: 12,
  },
  title: {flex: 1, justifyContent: 'flex-start'},
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    // position: 'absolute',
    // left: 0,
    // bottom: 0,
    // flexDirection: 'row',
    // justifyContent: 'flex-end',
  },
});
