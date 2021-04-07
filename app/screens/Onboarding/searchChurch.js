import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
} from 'react-native';
import {colors} from '../../theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ChurchList} from '../../components/List';
import axios from 'axios';
import {api} from '../../api';
import {useSelector, useDispatch} from 'react-redux';
import {
  feedbackAction,
  accountAction,
  eventAction,
  sermonAction,
  devotionAction,
  PRAction,
  mediaAction,
  churchAction
} from '../../store/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {moveElement} from "../../utils";
import {Chip} from 'react-native-paper';

// let interval;

const SearchChurch = ({navigation: {navigate}}) => {
  const dispatch = useDispatch();
  const {token} = useSelector(({account}) => account);
  const {churchList} = useSelector(({church}) => church);
  const {selectedCountry, selectedState} = useSelector(({country}) => country);
  const [churches, setChurches] = React.useState([]);
  const [value, setValue] = React.useState('');

  // React.useEffect(() => {
  //   return () => clearInterval(interval);
  // }, []);

  const handleSearch = async (text) => {
    try {
      setValue(text);

      const churchFind = await axios.get(`${api.searchChurch}?name=${text}`);

      console.log('churchFind', churchFind);
      setChurches(churchFind.data.data);

    } catch (error) {
      console.log('error', error);
      console.log('error', error?.response);
      dispatch(feedbackAction.launch({loading: false}));
    }
  };

  const handleSelect = async (item) => {
    try {
      console.log('churchList', churchList);

      if (!token) {
        navigate('Onboarding', {screen: 'Login'});
        return
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

        const join = await axios.post(
          `${api.join}`,
          {
            church: item._id,
          },
          {headers: {'x-auth-token': token}},
        );

        console.log('join', join);

        navigate('Dashboard');
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

      navigate('Dashboard');

      return;
    } catch (error) {
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
  }

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
    <View style={classes.root}>
      <View style={classes.headerRoot}>
        <View style={classes.textFieldRoot}>
          <Icon name="home" size={20} color={colors.primary.main} />
          <TextInput
            placeholder="Enter your Church Name"
            style={classes.textField}
            onChangeText={(text) => handleSearch(text)}
            // onSubmitEditing={handleSearch}
            value={value}
            autoFocus={true}
          />
          <Icon name="magnify" size={20} color={colors.secondary.main} />
        </View>
        {selectedCountry && selectedState && (
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
        )}
      </View>
      <View style={classes.body}>
        <FlatList
          data={churches}
          keyExtractor={(i) => i.toString()}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => handleSelect(item)}>
              <ChurchList item={item} />
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default SearchChurch;

const classes = StyleSheet.create({
  root: {
    flex: 1,
  },
  headerRoot: {
    paddingHorizontal: 20,
    justifyContent: 'center',
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: colors.primary.light,
  },
  body: {
    flex: 6,
  },
  textFieldRoot: {
    backgroundColor: colors.white,
    borderWidth: 3,
    borderColor: colors.primary.light,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 47,
    paddingHorizontal: 10,
    width: '100%',
  },
  textField: {
    width: '86%',
    marginHorizontal: 5,
    fontSize: 16,
    fontWeight: '600',
  },
  locationRoot: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: 5,
  },
  chip: {
    marginHorizontal: 5,
  },
});
