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
import {
  accountAction,
  feedbackAction,
  devotionAction,
  sermonAction,
  eventAction,
  PRAction,
} from '../../store/actions';
import {useDispatch, useSelector} from 'react-redux';
import { api } from "../../api";
import { version } from "../../../package.json";
import {ThemeContext} from '../../context/ThemeContext';
import axios from 'axios';


const CustomDrawerContentComponent = ({
  navigation: {navigate, closeDrawer},
}) => {
  const dispatch = useDispatch();
  const {churchList, church, token} = useSelector(({account}) => account);

  const changeChurch = async (item) => {
    try {
      if (item._id === church._id) {
        closeDrawer();
        return
      }

      dispatch(feedbackAction.launch({loading: true}));
      dispatch(accountAction.updateChurchData(item));
      await AsyncStorage.setItem("church", JSON.stringify(item));
      
      await getDevotion(item.publicToken);
      await getSermon(item.publicToken);
      await getLive(item.publicToken);
    await getPR(item.publicToken);
    await getEvent(item.publicToken);
      
      dispatch(feedbackAction.launch({loading: false}));
      closeDrawer();
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
  };

  const getPR = async (publicToken) => {
    try {
      const pray = await axios.get(api.getPRWall, {
        headers: {publicToken},
      });

      dispatch(
        PRAction.setPR({
          data: pray.data.data,
          total: pray.data.meta.total,
          page: pray.data.meta.page,
        }),
      );
    } catch (error) {
      // console.log('error', error);
      // console.log('error', error.response);
    }
  };

  const getSermon = async (publicToken) => {
    try {
      const resSermon = await axios.get(api.sermon, {
        headers: {publicToken}
      });

      dispatch(
        sermonAction.setSermon({
          sermon: resSermon.data.data,
          total: resSermon.data.meta.total,
          page: resSermon.data.meta.pages,
        }),
      );
    } catch (error) {
      console.log('error', error);
      console.log('error', error.response);
    }
  };

  const getDevotion = async (publicToken) => {
    try {
      const resDevotion = await axios.get(api.getDevotion, {
        headers: {publicToken}
      });
      dispatch(
        devotionAction.setDevotion({
          data: resDevotion.data.data,
        }),
      );
    } catch (error) {
      console.log('error', error);
      console.log('error', error.response);
    }
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


  const getEvent = async (publicToken) => {
    try {
      const event = await axios.get(api.getEvent, {
        headers: {publicToken},
      });

      dispatch(
        eventAction.setEvent({
          data: event?.data?.data,
          total: event?.data?.meta?.total,
          pages: event?.data?.meta?.page,
        }),
      );
    } catch (error) {
      console.log('error', error);
      console.log('error', error.response);
    }
  };

  return (
    <ThemeContext.Consumer>
      {({theme, baseColor}) => (
        <SafeAreaView
          style={[classes.root, {backgroundColor: theme.background}]}>
          <Headline
            style={[
              classes.header,
              {color: !theme.mode ? colors.black : colors.white},
            ]}>
            Church Spaces
          </Headline>
          <View style={classes.body}>
            <FlatList
              data={churchList}
              extraData={church}
              keyExtractor={(item) => item._id}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={classes.content}
                  onPress={() => changeChurch(item)}>
                  <View style={classes.content}>
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
                        {item.address.length > 35
                          ? item.address.substring(0, 35) + '...'
                          : item.address}
                      </Caption>
                    </View>
                  </View>
                  <Icon name="chevron-right" size={20} color={baseColor} />
                </TouchableOpacity>
              )}
            />
          </View>

          <View
            style={{bottom: 10, position: 'absolute', paddingHorizontal: 20}}>
            {token && (
              <TouchableOpacity
                style={classes.buttonRoot}
                onPress={() => {
                  AsyncStorage.clear();
                  dispatch(accountAction.updateToken(null));
                  dispatch(accountAction.updateUserData(null));
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
            <Caption style={[classes.version, {color: baseColor}]}>
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
  header: {
    marginLeft: 10,
    fontWeight: '600',
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
    width: 55,
    height: 55,
  },
  imageRoot: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyText: {
    fontSize: 17,
    lineHeight: 20,
    marginLeft: 10,
    fontWeight: '500',
  },
  bodyCaption: {
    fontSize: 10,
    lineHeight: 10,
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
