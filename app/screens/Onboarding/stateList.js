import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Subheading, Searchbar} from 'react-native-paper';
import axios from 'axios';
import {api} from '../../api';
import {useSelector, useDispatch} from 'react-redux';
import {feedbackAction, countryAction} from '../../store/actions';


const regionMap = ['United Kingdom', 'Canada'];

const StateList = ({navigation: {navigate}}) => {
  const dispatch = useDispatch();
  const {state, selectedCountry} = useSelector(({country}) => country);
  const [search, setSearch] = React.useState('');
  const [localState, setLocalState] = React.useState([]);

  React.useEffect(() => {
    handleCountry();
  }, []);

  const handleCountry = async () => {
    try {
      dispatch(feedbackAction.launch({loading: true}));

      const stateData = await axios.get(
        `${api.country}/${selectedCountry?.name}`,
        {},
      );

      dispatch(countryAction.setCountry({state: stateData?.data?.data}));
      setLocalState(stateData?.data?.data);
      dispatch(feedbackAction.launch({loading: false}));
    } catch (error) {
      console.log('error', error);
      console.log('error', error?.response);
      dispatch(feedbackAction.launch({loading: false}));
    }
  };

  const handleSelect = (item) => {
    dispatch(countryAction.setCountry({selectedState: item}));

    navigate('SearchChurch');
  };

  const handleSearchText = (search) => {
    let text = search.split(' ');

    if (search !== '') {
      const data = localState.filter(function (item) {
        return text.every(function (el) {
          return item.name.indexOf(el) > -1;
        });
      });

      dispatch(countryAction.setCountry({state: data}));
    } else {
      dispatch(countryAction.setCountry({state: localState}));
    }

    setSearch(text);
  };

  return (
    <View style={classes.root}>
      <View style={classes.headerRoot}>
        <Image
          source={{
            uri: `http://www.geognos.com/api/en/countries/flag/${selectedCountry.code2}.png`,
          }}
          style={classes.img}
        />
        <Subheading style={classes.headerTitle}>
          {!regionMap.includes(selectedCountry.name)
            ? 'Select a state'
            : 'Select a region'}
        </Subheading>
      </View>
      <Searchbar
        placeholder="Search"
        onChangeText={(search) => handleSearchText(search)}
        value={search}
      />
      <FlatList
        data={state}
        keyExtractor={(item) => item.name}
        renderItem={({item}) => (
          <TouchableOpacity
            style={classes.listRoot}
            onPress={() => handleSelect(item)}>
            <Subheading>{item.name}</Subheading>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default StateList;

const classes = StyleSheet.create({
  root: {
    flex: 1,
  },
  headerRoot: {
    paddingHorizontal: 20,
    marginVertical: 5,
  },
  headerTitle: {
    fontWeight: '500',
    marginVertical: 10,
  },
  listRoot: {
    marginVertical: 10,
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  img: {
    width: 40,
    height: 25,
    marginRight: 20,
  },
});
