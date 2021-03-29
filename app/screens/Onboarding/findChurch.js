
import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Subheading, Headline, Caption } from 'react-native-paper';
import img from '../../images';
import { dimension, colors } from "../../theme"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button } from "../../components/Button"
import {Church} from '../../components/Card';

const JoinChurch = ({ navigation: { navigate } }) => {
  return (
    <SafeAreaView style={classes.root}>
      <View style={classes.header}>
        <Image source={img.churchFind} style={classes.img} />

        <Headline>Find a Church</Headline>
      </View>

      <SearchField navigate={navigate} />
      <View style={classes.filterRoot}>
        <Icon name="filter" size={20} color={colors.primary.main} />
        <TouchableOpacity onPress={() => navigate("CountryList")}>
          <Subheading>Filter by Location</Subheading>
        </TouchableOpacity>
      </View>

      <View style={classes.churchesRoot}>
        <Subheading>Recommended Churches</Subheading>

        <FlatList
          data={[1, 2, 3]}
          keyExtractor={(i) => i.toString()}
          horizontal={true}
          renderItem={({item}) => <Church />}
        />
      </View>
    </SafeAreaView>
  );
}

export default JoinChurch;

const SearchField = ({navigate}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigate('SearchChurch');
      }}
      style={classes.textFieldRoot}>
      <Icon name="home" size={20} color={colors.primary.main} />
      <View style={classes.textField}>
        <Caption style={classes.textFieldtext}>
          Enter your Church Name
        </Caption>
      </View>
      <Icon name="magnify" size={20} color={colors.secondary.main} />
    </TouchableOpacity>
  );
};

const classes = StyleSheet.create({
  root: {
    flex: 1,
    marginHorizontal: 20,
    justifyContent: "center",
    // alignItems: "center"
  },
  header: {
    flex: 2,
    // justifyContent: "center",
    alignItems: 'center',
    marginVertical: 20,
  },
  img: {
    width: dimension.APP_WIDTH / 2,
    height: dimension.APP_HEIGHT / 6,
    marginVertical: 20,
  },
  filterRoot: {
    // flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: 10,
  },
  textFieldRoot: {
    // flex: 1,
    backgroundColor: colors.white,
    borderWidth: 3,
    borderColor: colors.primary.light,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 47,
    marginTop: 20,
    paddingHorizontal: 10,
    width: '100%',
  },
  textField: {
    width: '86%',
    marginHorizontal: 5,
    fontSize: 16,
    fontWeight: '600',
  },
  headerTextHeadline: {
    color: colors.white,
    fontSize: 19,
    fontWeight: '600',
  },
  headerTextPara: {
    color: colors.white,
  },
  textFieldtext: {
    fontSize: 14,
    opacity: 0.5,
  },
  churchesRoot: {
    flex: 3,
    marginVertical: 20
  },
});