import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  FlatList,
} from 'react-native';
import {Caption, Headline, Subheading} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../../theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {accountAction} from '../../store/actions';
import {useDispatch, useSelector} from 'react-redux';
import { api } from "../../api";
import { version } from "../../../package.json";
import {ThemeContext} from '../../context/ThemeContext';


const CustomDrawerContentComponent = ({navigation: {navigate}}) => {
  const dispatch = useDispatch();
  const {churchList, church} = useSelector(({account}) => account);

  return (
    <ThemeContext.Consumer>
      {({theme, baseColor}) => (
        <SafeAreaView style={[classes.root, {backgroundColor: baseColor}]}>
          <Headline style={classes.header}>Church Spaces</Headline>
          <View style={classes.body}>
            <FlatList
              data={churchList}
              extraData={church}
              keyExtractor={(item) => item._id}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={classes.content}
                  onPress={() => navigate('Home')}>
                  <View style={classes.content}>
                    <View style={classes.imageRoot}>
                      <Image
                        source={{uri: api.img + item.img}}
                        style={classes.image}
                      />
                    </View>
                    <View>
                      <Subheading style={classes.bodyText}>
                        {item.name.length > 18
                          ? item.name.substring(0, 18) + '...'
                          : item.name}
                      </Subheading>
                      <Caption style={classes.bodyCaption}>
                        {item.address.length > 35
                          ? item.address.substring(0, 35) + '...'
                          : item.address}
                      </Caption>
                    </View>
                  </View>
                  <Icon name="chevron-right" size={20} color="white" />
                </TouchableOpacity>
              )}
            />
          </View>

          <View
            style={{bottom: 10, position: 'absolute', paddingHorizontal: 20}}>
            <TouchableOpacity
              style={classes.buttonRoot}
              onPress={() => {
                AsyncStorage.clear();
                dispatch(accountAction.setToken(null));
                dispatch(accountAction.setUserData(null));
                // navigate('Onboarding');
              }}>
              <Icon name="logout" size={20} style={classes.buttonIcon} />
              <Subheading style={classes.buttonText}>Logout</Subheading>
            </TouchableOpacity>
            <Caption style={classes.version}>v{version}</Caption>
          </View>
          {/* <Logout open={open} setOpen={() => setOpen(false)} /> */}
        </SafeAreaView>
      )}
    </ThemeContext.Consumer>
  );
};

const classes = StyleSheet.create({
  root: {
    flex: 1,
    // backgroundColor: colors.primary.main,
  },
  header: {
    marginLeft: 10,
    color: 'white',
    fontWeight: '600',
    // letterSpacing: 1,
    textTransform: "uppercase"
  },
  headerImg: {
    height: 33.08,
    width: 149,
  },
  body: {
    // backgroundColor: colors.primary.main,
    paddingHorizontal: 10,
    marginVertical: 20
  },
  buttonRoot: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginVertical: 15,
  },
  buttonIcon: {
    marginRight: 10,
    color: '#FFF',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '300',
  },
  version: {
    color: 'white',
    opacity: 0.5,
  },
  image: {
    width: 55,
    height: 55,
  },
  imageRoot: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyText: {
    fontSize: 17,
    lineHeight: 20,
    marginLeft: 10,
    color: 'white',
    fontWeight: '500',
  },
  bodyCaption: {
    fontSize: 10,
    lineHeight: 10,
    color: 'white',
    fontWeight: '300',
    marginLeft: 10,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 5
  },
});

export default CustomDrawerContentComponent;
