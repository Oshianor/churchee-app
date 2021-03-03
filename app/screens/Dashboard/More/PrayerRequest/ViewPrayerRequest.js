import React from 'react';
import {
  Caption,
  Paragraph,
} from 'react-native-paper';
import {
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import moment from "moment";
import {ThemeContext} from '../../../../context/ThemeContext';
import Icon from "react-native-vector-icons/MaterialCommunityIcons"


const PrayRequestDetail = ({ route }) => {
  return (
    <ThemeContext.Consumer>
      {({theme, baseColor}) => (
    <View style={[classes.root, {backgroundColor: theme.background}]}>
      <ScrollView contentContainerStyle={classes.root}>
        <View style={classes.heading}>
          <Caption>{moment(route.params.createdAt).format('MMM DD')}</Caption>
        </View>
        <Paragraph>{route.params.body}</Paragraph>
        <View
          style={{
            marginVertical: 15,
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
          <Icon name="account" size={25} />
          <Paragraph>Anonymous request</Paragraph>
        </View>
      </ScrollView>
      {/* <View style={classes.fab}>
        <FAB
          small
          icon="add"
          color="white"
          style={{
            backgroundColor: '#4cd964',
          }}
          onPress={() => navigation.navigate('AddPrayerRequestScreen')}
        />
      </View> */}
    </View>
    )}
    </ThemeContext.Consumer>
  );
}

export default PrayRequestDetail;

const classes = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 10,
    // margin: 10,
  },
  heading: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
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
