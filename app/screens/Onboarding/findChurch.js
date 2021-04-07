import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {Subheading, Headline, Caption, Chip} from 'react-native-paper';
import img from '../../images';
import {dimension, colors} from '../../theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button} from '../../components/Button';
import {ChurchCard} from '../../components/Card';
import BackButton from '../../navigation/custom/BackButton';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import {api} from '../../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  feedbackAction,
  accountAction,
  eventAction,
  sermonAction,
  devotionAction,
  PRAction,
  mediaAction,
  churchAction,
} from '../../store/actions';
import {moveElement} from '../../utils';
import {ChurchFilter} from '../../components/Modal';

const JoinChurch = ({navigation: {navigate, goBack}}) => {
  const dispatch = useDispatch();
  const {church, churchList, recommend} = useSelector(({church}) => church);
  const {selectedCountry, selectedState} = useSelector(({country}) => country);
  const {token, lat, lng} = useSelector(({account}) => account);


  React.useEffect(() => {
    getTopChurch();
  }, []);

  const getTopChurch = async () => {
    try {

      // dispatch(feedbackAction.launch({loading: true}));

      const churchFind = await axios.get(
        `${api.topChurch}?lat=${lat}&lng=${lng}`,
      );

      console.log('churchFind', churchFind);
      // setRecomend(churchFind.data.data);
        dispatch(churchAction.setChurchData({recomend: churchFind.data.data}));


      if (typeof churchFind.data.data[0] === "undefined") {
        dispatch(churchAction.setChurchData({isFilter: true}));
        return 
      }

      // dispatch(feedbackAction.launch({loading: false}));
    } catch (error) {
      console.log('error', error);
      console.log('error', error?.response);
      // dispatch(feedbackAction.launch({loading: false}));
      dispatch(churchAction.setChurchData({isFilter: true}));

    }
  };

  const handleSelect = async (item) => {
    try {
      console.log('churchList', churchList);

      if (!token) {
        navigate('Onboarding', {screen: 'Login'});
        return;
      }

      dispatch(feedbackAction.launch({loading: true}));

      let churchDataList = await AsyncStorage.getItem('churchList');

      const churchExist = churchList.find(
        (element) => element._id === item._id,
      );

      console.log('churchExist', churchExist);
      if (churchExist) {
        const elementPos = churchList
          .map((x) => {
            x._id === item._id;
            return x._id;
          })
          .indexOf();

        console.log('elementPos', elementPos);
        const newChurchArr = moveElement(churchList, elementPos, 0);
        dispatch(
          churchAction.setChurchData({
            church: churchExist,
            churchList: newChurchArr,
          }),
        );


        // dispatch(churchAction.churchListData(newChurchArr));

        await AsyncStorage.setItem('church', JSON.stringify(item));
        await AsyncStorage.setItem('churchList', JSON.stringify(newChurchArr));
        resetData();

        dispatch(feedbackAction.launch({loading: false}));

        navigate('Dashboard');

      
        const join = await axios.post(
          `${api.join}`,
          {
            church: item._id,
          },
          {headers: {'x-auth-token': token}},
        );

        console.log('join', join);


        return;
      }

      console.log('churchDataList', churchDataList);

      if (churchDataList) {
        churchDataList = JSON.parse(churchDataList);
        const exist = churchDataList?.find(
          (element) => element._id === item?._id,
        );

        if (!exist) {
          churchDataList.unshift(item);
        }
      } else {
        churchDataList = [item];
      }

      console.log('churchDataList', churchDataList);

      await AsyncStorage.setItem('church', JSON.stringify(item));
      await AsyncStorage.setItem('churchList', JSON.stringify(churchDataList));

      dispatch(
        churchAction.setChurchData({church: item, churchList: churchDataList}),
      );
      // dispatch(churchAction.churchListData(churchDataList));

      dispatch(feedbackAction.launch({loading: false}));

      

      console.log('join', join);

      navigate('Dashboard');

      return;
    } catch (error) {
      console.log('error', error);
      console.log('error', error.response);
      dispatch(feedbackAction.launch({loading: false}));
    }
    await getLive(item.publicToken);
    await joinChurch(item._id);
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
        headers: {publicToken},
      });

      dispatch(accountAction.setAccountData({live: live.data.data}));
    } catch (error) {
      console.log('error', error);
      console.log('error', error.response);
    }
  };


  const joinChurch = async (church) => {
    try {
      const join = await axios.post(
        `${api.join}`,
        {
          church,
        },
        {headers: {'x-auth-token': token}},
      );
    } catch (error) {
      console.log('error', error);
      console.log('error', error.response);
    }
  };

  return (
    <SafeAreaView style={classes.root}>
      {token && church && <BackButton goBack={() => navigate('Dashboard')} />}

      <View style={classes.header}>
        <Image source={img.churchFind} style={classes.img} />

        <Headline>Find a Church</Headline>
      </View>

      <View style={classes.searchRoot}>
        <SearchField navigate={navigate} />
        {selectedCountry ? (
          <LocationRoot
            selectedCountry={selectedCountry}
            selectedState={selectedState}
            navigate={navigate}
          />
        ) : (
          <View style={classes.filterRoot}>
            <Icon name="filter" size={20} color={colors.primary.main} />
            <TouchableOpacity onPress={() => navigate('CountryList')}>
              <Subheading>Filter by Location</Subheading>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={classes.churchesRoot}>
        <Subheading style={classes.title}>Recommended Churches</Subheading>

        <FlatList
          data={recommend}
          keyExtractor={(item) => item._id}
          horizontal={true}
          renderItem={({item}) => (
            <ChurchCard item={item} onPress={() => handleSelect(item)} />
          )}
        />
      </View>
      <ChurchFilter />
    </SafeAreaView>
  );
};

export default JoinChurch;

const LocationRoot = ({selectedCountry, selectedState, navigate}) => {
  return (
    <View style={classes.locationRoot}>
      <Chip
        avatar={
          <Image
            source={{
              uri: `http://www.geognos.com/api/en/countries/flag/${selectedCountry?.code2}.png`,
            }}
          />
        }
        style={classes.chip}
        onPress={() => navigate('CountryList')}
        mode="outlined">
        {selectedCountry?.name}
      </Chip>
      <Chip onPress={() => navigate('StateList')} mode="outlined">
        {selectedState?.name}
      </Chip>
    </View>
  );
};

const SearchField = ({navigate}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigate('SearchChurch');
      }}
      style={classes.textFieldRoot}>
      <Icon name="home" size={20} color={colors.primary.main} />
      <View style={classes.textField}>
        <Caption style={classes.textFieldtext}>Enter your Church Name</Caption>
      </View>
      <Icon name="magnify" size={20} color={colors.secondary.main} />
    </TouchableOpacity>
  );
};

const classes = StyleSheet.create({
  root: {
    flex: 1,
    // marginHorizontal: 20,
    justifyContent: 'center',
    // alignItems: "center"
  },
  header: {
    flex: 2,
    // justifyContent: "center",
    alignItems: 'center',
    marginVertical: 20,
    marginHorizontal: 20,
  },
  img: {
    width: dimension.APP_WIDTH / 2,
    height: dimension.APP_HEIGHT / 6,
    marginVertical: 20,
  },
  searchRoot: {
    marginHorizontal: 20,
  },
  filterRoot: {
    // flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: 10,
    marginHorizontal: 20,
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
    // flex: 3,
    marginVertical: 20,
    marginLeft: 20,
  },
  locationRoot: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: 5,
  },
  chip: {
    marginHorizontal: 5,
  },
  title: {
    marginVertical: 10,
  },
});
