import React from 'react'
import {
  View,
  StyleSheet,
  Image,
} from 'react-native';
import { Subheading } from 'react-native-paper';
import { Radio } from '../../../../components/Radio';
const CreateRoom = () => {
  return (
    <View style={classes.root}>
      <View style={classes.privacyRoot}>
        <Subheading style={classes.privacyTitle}>Privacy</Subheading>
        <View style={classes.privacyBody}>
          <View style={classes.privacyItem}>
            <Subheading style={classes.privacySubTitle}>Private</Subheading>
            <Radio selected />
          </View>
          <View style={classes.privacyItem}>
            <Subheading style={classes.privacySubTitle}>Public</Subheading>
            <Radio selected />
          </View>
        </View>
      </View>
    </View>
  );
}

export default CreateRoom

const classes = StyleSheet.create({
  root: {
    flex: 1,
    // marginHorizontal: 20,
  },
  privacyRoot: {
    // height: 100,
    paddingVertical: 5,
  },
  privacyTitle: {
    fontWeight: '600',
    marginHorizontal: 20,
  },
  privacyBody: {
    backgroundColor: '#FAFAFA',
    height: 80,
    paddingHorizontal: 20,
  },
  privacyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  privacySubTitle: {
    fontWeight: '400',
  },
});
