import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList
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
} from '../../store/actions';

const SearchChurch = ({navigation: {navigate}}) => {
  const dispatch = useDispatch();
  const {token} = useSelector(({account}) => account);
  const [churches, setChurches] = React.useState([]);
  const [value, setValue] = React.useState('');

  const handleSearch = async () => {
    try {
      if (value === '') {
        dispatch(
          feedbackAction.launch({
            open: true,
            msg: 'Please provide a church name',
            severity: 'w',
          }),
        );

        return;
      }

      dispatch(feedbackAction.launch({loading: true}));

      const churchFind = await axios.get(`${api.searchChurch}?name=${value}`);

      console.log('churchFind', churchFind);
      setChurches(churchFind.data.data);

      dispatch(feedbackAction.launch({loading: false}));
    } catch (error) {
      console.log('error', error);
      console.log('error', error?.response);
      dispatch(feedbackAction.launch({loading: false}));
    }
  };

  const handleSelect = async () => {
    dispatch(feedbackAction.launch({loading: true}));

    const church = churchList.find((element) => element._id === selected);
    let churchDataList = await AsyncStorage.getItem('churchList');
    console.log('churchDataList', churchDataList);

    if (churchDataList) {
      churchDataList = JSON.parse(churchDataList);
      const exist = churchDataList?.find(
        (element) => element._id === church?._id,
      );

      if (!exist) {
        churchDataList.push(church);
      }
    } else {
      churchDataList = [church];
    }

    console.log('churchDataList', churchDataList);

    await AsyncStorage.setItem('church', JSON.stringify(church));
    await AsyncStorage.setItem('churchList', JSON.stringify(churchDataList));

    const sermon = await getSermon(church.publicToken);
    const devotion = await getDevotion(church.publicToken);
    const live = await getLive(church.publicToken);
    const event = await getEvent(church.publicToken);
    const pr = await getPR(church.publicToken);

    dispatch(churchAction.setChurchData(church));
    dispatch(accountAction.churchListData(churchDataList));

    dispatch(feedbackAction.launch({loading: false}));

    navigate('Dashboard');
  };



  const getSermon = async (publicToken) => {
    try {
      const resSermon = await axios.get(api.sermon, {
        headers: {publicToken},
      });

      dispatch(
        sermonAction.setSermon({
          sermon: resSermon.data.data,
          total: resSermon.data.meta.total,
          page: resSermon.data.meta.pages,
        }),
      );

      return resSermon?.data?.data;
    } catch (error) {
      console.log('error', error);
      console.log('error', error.response);
    }
  };

  const getDevotion = async (publicToken) => {
    try {
      const resDevotion = await axios.get(api.getDevotion, {
        headers: {publicToken},
      });
      dispatch(
        devotionAction.setDevotion({
          data: resDevotion.data.data,
        }),
      );

      return resDevotion?.data?.data;
    } catch (error) {
      console.log('error', error);
      console.log('error', error.response);
    }
  };

  const getLive = async (publicToken) => {
    try {
      const live = await axios.get(api.live, {
        headers: {publicToken},
      });

      dispatch(accountAction.setAccountData({live: live.data.data}));
      return live?.data?.data;
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
      return event?.data?.data;

    } catch (error) {
      console.log('error', error);
      console.log('error', error.response);
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
      return pray?.data?.data;
    } catch (error) {
      // console.log('error', error);
      // console.log('error', error.response);
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
            onChangeText={(text) => setValue(text)}
            onSubmitEditing={handleSearch}
            value={value}
            autoFocus={true}
          />
          <Icon name="magnify" size={20} color={colors.secondary.main} />
        </View>
      </View>
      <View style={classes.body}>
        <FlatList
          data={churches}
          keyExtractor={(i) => i.toString()}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => handleSelect(item)} >
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
});
