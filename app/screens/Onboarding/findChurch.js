import React from 'react';
import {
  StyleSheet,
  Platform,
  ScrollView,
  View,
  FlatList,
  Image,
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
} from '../../store/actions';
import img from '../../images';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FindChurch = ({navigation: {navigate}, route}) => {
  const dispatch = useDispatch();
  const countryList = useSelector(({country: {country}}) => country);
  const stateList = useSelector(({country: {state}}) => state);
  const [country, setCountry] = React.useState('');
  const [state, setState] = React.useState('');
  const [search, setSearch] = React.useState('');
  const [churchList, setChurchList] = React.useState([]);
  const [filterList, setFilterList] = React.useState([]);
  const [selected, setSelected] = React.useState('');

  console.log('churchList', churchList);
  console.log('selected', selected);
  // console.log('country', country);

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
        `${api.church}?country=${country}&state=${state}`
      );

      setChurchList(churchData.data.data);
      setFilterList(churchData.data.data);
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
    const church = churchList.filter((v, i) => v._id === selected);

    await AsyncStorage.setItem("church", JSON.stringify(church[0]));

    dispatch(accountAction.updateChurchData(church[0]));
    navigate("Dashboard");
  };

  return (
    <View style={classes.root}>
      <View style={classes.headerRoot}>
        <Subheading style={classes.headerText}>
          Search for your church within our platform
        </Subheading>
        <Caption>Join any congregation of your choice</Caption>
      </View>
      <Surface style={classes.surface}>
        <ScrollView style={classes.form}>
          <Dropdown
            items={countryList}
            label="Select a country"
            labelRoot={{width: 110}}
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
              label="Select a state"
              onValueChange={
                Platform.OS === 'android'
                  ? handleSelectStateChurch
                  : handleSelectState
              }
              onDonePress={handleSelectStateChurchIOS}
              labelRoot={{width: 100}}
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
        <Surface style={classes.buttonRoot}>
          <Button
            label="Join This Congregation"
            onPress={() => handleCompleted()}
          />
        </Surface>
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
    flex: 2,
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
