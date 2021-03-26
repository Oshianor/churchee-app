import React from 'react';
import {
  StyleSheet,
  Platform,
  ScrollView,
  View,
  FlatList,
  Image,
  Alert,
} from 'react-native';
import {Surface, Subheading, Searchbar, Caption} from 'react-native-paper';
import Dropdown from '../../components/Dropdown';
import {Church} from '../../components/Card';
import {Button} from '../../components/Button';
import axios from 'axios';
import {api} from '../../api';
import {useSelector, useDispatch} from 'react-redux';
import {
  countryAction,
  feedbackAction,
  accountAction,
  eventAction,
  sermonAction,
  devotionAction,
  PRAction,
} from '../../store/actions';
import img from '../../images';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FindChurch = ({navigation: {navigate}, route}) => {
  const dispatch = useDispatch();
  const { lat, lng } = useSelector(({account}) => account);
  const countryList = useSelector(({country: {country}}) => country);
  const stateList = useSelector(({country: {state}}) => state);
  const [country, setCountry] = React.useState("");
  const [state, setState] = React.useState('');
  const [search, setSearch] = React.useState('');
  const [churchList, setChurchList] = React.useState([]);
  const [filterList, setFilterList] = React.useState([]);
  const [selected, setSelected] = React.useState('');

  console.log('churchList', churchList);
  console.log('selected', selected);
  // console.log('country', country);

  const regionMap = [
    "United Kingdom",
    "Canada"
  ]

  React.useEffect(() => {
    handleCountry();
  }, []);

  const handleCountry = async () => {
    try {
      if (typeof countryList[0] === 'undefined') {
        const countryData = await axios.get(api.country, {});

        console.log('countryData.data', countryData.data);

        const doc = [];
        countryData.data.data.forEach((element) => {
          doc.push({label: element.name, value: element.name});
        });

        dispatch(countryAction.setCountry(doc));
      }
    } catch (error) {
      console.log('error', error);
      console.log('error', error.response);
    }
  };

  const handleState = async (countryId) => {
    try {
      const stateData = await axios.get(`${api.country}/${countryId}`, {});

      const doc = [];
      stateData.data.data.forEach((element) => {
        doc.push({label: element.name, value: element.name});
      });

      dispatch(countryAction.setState(doc));
    } catch (error) {
      console.log('error', error);
      console.log('error', error.response);
    }
  };

  const handleGetChurch = async (state) => {
    try {
      const churchData = await axios.get(
        `${api.church}?country=${country}&state=${state}&lat=${lat}&lng=${lng}`
      );

      console.log('churchData?.data?.data?.[0]', churchData?.data?.data?.[0]);
      if (churchData?.data?.data?.[0]) {
        setChurchList(churchData.data.data);
        setFilterList(churchData.data.data);
      } else {
        Alert.alert(
          'Church Not Found',
          'No church was found for the specified location',
        );
      }
      
    } catch (error) {
      console.log('error', error);
      console.log('error', error.response);
    }
  };

  const handleSelectCountryState = (country) => {
    console.log('country', country);
    setCountry(country);
    handleState(country);
    setState('');
    dispatch(countryAction.setState([]));
    setChurchList([]);
    setFilterList([]);
  };

  const handleSelectCountryStateIOS = () => {
    handleState(country);
  };
  
  const handleSelectCountry = (country) => {
    console.log('country', country);
    setCountry(country);
    setState('');
    dispatch(countryAction.setState([]));
    setChurchList([]);
    setFilterList([]);
  };

  const handleSelectStateChurch = (state) => {
    console.log('state', state);
    setState(state);
    handleGetChurch(state);
  };

  const handleSelectStateChurchIOS = () => {
    handleGetChurch(state);
  };

  const handleSelectState = (state) => {
    console.log('state', state);
    setState(state);
  };

  const handleSearchText = (search) => {
    text = search.split(' ');

    if (search !== '') {
      const data = churchList.filter(function (item) {
        return text.every(function (el) {
          return item.name.indexOf(el) > -1;
        });
      });
      console.log('data', data);

      setChurchList(data);
    } else {
      setChurchList(filterList);
    }

    setSearch(text);
  };

  const handleSelectChurch = (churchId) => {
    if (selected === churchId) {
      setSelected('');
    } else {
      setSelected(churchId);
    }
  };

  const handleCompleted = async () => {
    dispatch(feedbackAction.launch({ loading: true }));

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

    await AsyncStorage.setItem("church", JSON.stringify(church));
    await AsyncStorage.setItem('churchList', JSON.stringify(churchDataList));

    await getSermon(church.publicToken);
    await getDevotion(church.publicToken);
    await getLive(church.publicToken);
    await getEvent(church.publicToken);
    await getPR(church.publicToken);

    dispatch(accountAction.updateChurchData(church));
    dispatch(accountAction.churchListData(churchDataList));

    dispatch(feedbackAction.launch({loading: false}));

    navigate("Dashboard");

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

  return (
    <View style={classes.root}>
      <View style={classes.headerRoot}>
        <Subheading style={classes.headerText}>
          Search for your church within our platform
        </Subheading>
        {/* <Caption>Join any congregation of your choice</Caption> */}
      </View>
      <Surface style={classes.surface}>
        <ScrollView style={classes.form}>
          <Dropdown
            items={countryList}
            label="Select a country"
            labelRoot={{width: 110}}
            placeholder="Select a country"
            value={country}
            onValueChange={(val) => {
              Platform.OS === 'android'
                ? handleSelectCountryState(val)
                : handleSelectCountry(val);
            }}
            onDonePress={handleSelectCountryStateIOS}
          />
          {typeof stateList[0] !== 'undefined' && (
            <Dropdown
              items={stateList}
              value={state}
              label={
                !regionMap.includes(country)
                  ? 'Select a state'
                  : 'Select a region'
              }
              placeholder="Select a state"
              onValueChange={
                Platform.OS === 'android'
                  ? handleSelectStateChurch
                  : handleSelectState
              }
              onDonePress={handleSelectStateChurchIOS}
              labelRoot={{width: regionMap.includes(country) ? 120 : 100}}
            />
          )}

          {typeof churchList[0] !== 'undefined' ? (
            <View style={classes.resultRoot}>
              <Searchbar
                placeholder="Find your church"
                onChangeText={(search) => handleSearchText(search)}
                value={search}
              />
              <FlatList
                data={churchList}
                extraData={churchList}
                keyExtractor={(item) => item._id}
                renderItem={({item}) => (
                  <Church
                    {...item}
                    onPress={handleSelectChurch}
                    selected={selected}
                  />
                )}
              />
            </View>
          ) : (
            <View style={classes.findChurch}>
              <Image source={img.findChurch} />
            </View>
          )}
        </ScrollView>
        {typeof churchList[0] !== 'undefined' && (
          <Surface style={classes.buttonRoot}>
            <Button
              label="Join This Congregation"
              disabled={selected ? false : true}
              onPress={() => handleCompleted()}
            />
          </Surface>
        )}
      </Surface>
    </View>
  );
};

export default FindChurch;

const classes = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#101424',
  },
  headerRoot: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontWeight: '500',
  },
  surface: {
    flex: 8,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
  },
  form: {
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  resultRoot: {
    marginTop: 20,
  },
  buttonRoot: {
    height: 95,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    elevation: 9,
  },
  findChurch: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 400,
  },
});
