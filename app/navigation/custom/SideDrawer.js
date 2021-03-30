import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  FlatList,
} from 'react-native';
import {Caption, Headline, Subheading, Surface} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../../theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  accountAction,
  feedbackAction,
  devotionAction,
  sermonAction,
  eventAction,
  PRAction,
  churchAction,
  mediaAction,
} from '../../store/actions';
import {useDispatch, useSelector} from 'react-redux';
import { api } from "../../api";
import { version } from "../../../package.json";
import {ThemeContext} from '../../context/ThemeContext';
import axios from 'axios';
import {moveElement} from '../../utils';



const CustomDrawerContentComponent = ({
  navigation: {navigate, closeDrawer},
}) => {
  const dispatch = useDispatch();
  const {churchList, church} = useSelector(({church}) => church);
  const {token} = useSelector(({account}) => account);

  const changeChurch = async (item) => {
    try {
      if (item._id === church._id) {
        closeDrawer();
        return
      }

      dispatch(feedbackAction.launch({loading: true}));
      resetData();
      closeDrawer();

      const elementPos = churchList
        .map((x) => {
          x._id === item._id;
          return x._id;
        })
        .indexOf();
      const newChurchArr = moveElement(churchList, elementPos, 0);

      dispatch(
        churchAction.setChurchData({church: item, churchList: newChurchArr}),
      );
      await AsyncStorage.setItem("church", JSON.stringify(item));
      await AsyncStorage.setItem('churchList', JSON.stringify(newChurchArr));
      
      dispatch(feedbackAction.launch({loading: false}));
    } catch (error) {
      console.log('error', error);
      console.log('error', error.response);
      dispatch(
        feedbackAction.launch({
          loading: false,
          open: true,
          msg: 'An error occured while trying to change church space',
          severity: "w",
        }),
      );

    }

    await getLive(item.publicToken);

  };
  
  const resetData = () => {
    // remove all the data for all service
    dispatch(eventAction.setEvent({data: [], page: 0, total: 0}));
    dispatch(devotionAction.setDevotion({data: [], page: 0, total: 0}));
    dispatch(sermonAction.setSermon({data: [], page: 0, total: 0}));
    dispatch(PRAction.setPR({data: [], page: 0, total: 0}));
    dispatch(mediaAction.setMedia({data: [], page: 0, total: 0}));
  };

  const getLive = async (publicToken) => {
    try {
      const live = await axios.get(api.live, {
        headers: {publicToken}
      });

      dispatch(accountAction.setAccountData({live: live.data.data}));
    } catch (error) {
      console.log('error', error);
      console.log('error', error.response);
    }
  };

  return (
    <ThemeContext.Consumer>
      {({theme, baseColor}) => (
        <SafeAreaView style={[classes.root, {backgroundColor: baseColor}]}>
          <View style={[classes.headerRoot]}>
            <Headline style={[classes.header, {color: colors.white}]}>
              Churches
            </Headline>
          </View>

          <Surface style={classes.body}>
            <FlatList
              data={churchList}
              extraData={church}
              keyExtractor={(item) => item._id}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={classes.content}
                  onPress={() => changeChurch(item)}>
                  <View style={classes.content}>
                    {church._id === item._id ? (
                      <View
                        style={[
                          classes.border,
                          {borderColor: baseColor, backgroundColor: baseColor},
                        ]}
                      />
                    ) : (
                      <View style={[classes.space]} />
                    )}

                    <View
                      style={[
                        classes.imageRoot,
                        {color: !theme.mode ? colors.black : colors.white},
                      ]}>
                      <Image
                        source={{uri: api.img + item.img}}
                        style={classes.image}
                      />
                    </View>
                    <View>
                      <Subheading
                        style={[
                          classes.bodyText,
                          {color: !theme.mode ? colors.black : colors.white},
                        ]}>
                        {item.name.length > 18
                          ? item.name.substring(0, 18) + '...'
                          : item.name}
                      </Subheading>
                      <Caption
                        style={[
                          classes.bodyCaption,
                          {color: !theme.mode ? colors.black : colors.white},
                        ]}>
                        {`${item.state}, ${item.country}`}
                      </Caption>
                    </View>
                  </View>
                  {/* <Icon name="chevron-right" size={20} color={baseColor} /> */}
                </TouchableOpacity>
              )}
            />
          </Surface>

          <View
            style={{bottom: 10, position: 'absolute', paddingHorizontal: 20}}>
            {token && (
              <TouchableOpacity
                style={classes.buttonRoot}
                onPress={() => {
                  AsyncStorage.clear();
                  dispatch(accountAction.setToken(null));
                  dispatch(accountAction.setUserData(null));
                  navigate('Onboarding');
                }}>
                <Icon
                  name="logout"
                  size={20}
                  style={classes.buttonIcon}
                  color={baseColor}
                />
                <Subheading
                  style={[
                    classes.buttonText,
                    {color: !theme.mode ? colors.black : colors.white},
                  ]}>
                  Logout
                </Subheading>
              </TouchableOpacity>
            )}
            <Caption style={[classes.version, {color: colors.white}]}>
              v{version}
            </Caption>
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
  headerRoot: {
    flex: 1,
    justifyContent: "flex-end",
    // alignItems: "center"
  },
  header: {
    marginLeft: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
    paddingVertical: 10
  },
  headerImg: {
    height: 33.08,
    width: 149,
  },
  body: {
    flex: 9,
    // backgroundColor: colors.primary.main,
    // paddingHorizontal: 10,
    paddingVertical: 20,
    elevation: 0
  },
  buttonRoot: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginVertical: 15,
  },
  buttonIcon: {
    marginRight: 10,
    // color: '#FFF',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '300',
  },
  version: {
    opacity: 0.5,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  imageRoot: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyText: {
    fontSize: 18,
    lineHeight: 20,
    marginLeft: 10,
    fontWeight: '500',
  },
  bodyCaption: {
    fontSize: 12,
    lineHeight: 10,
    fontWeight: '300',
    marginLeft: 10,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  border: {
    width: 5,
    height: 60,
    borderWidth: 1,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    marginRight: 15,
  },
  space: {
    marginRight: 20,
  },
});

export default CustomDrawerContentComponent;
