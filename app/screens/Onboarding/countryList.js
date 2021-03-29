import React from 'react'
import {View, StyleSheet, TouchableOpacity, FlatList, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Subheading} from 'react-native-paper';
import axios from 'axios';
import { api } from '../../api';
import {useSelector, useDispatch} from 'react-redux';
import {feedbackAction, countryAction} from '../../store/actions';


const CountryList = ({navigation: {navigate}}) => {
  const dispatch = useDispatch();
  const { country } = useSelector(({country}) => country);

  React.useEffect(() => {
    handleCountry();
  }, []);

  const handleCountry = async () => {
    try {
      if (typeof country[0] === 'undefined') {
        dispatch(feedbackAction.launch({loading: true}));

        const countryData = await axios.get(api.country);

        dispatch(countryAction.setCountry({country: countryData?.data?.data}));
        dispatch(feedbackAction.launch({loading: false}));
      }
    } catch (error) {
      console.log('error', error);
      console.log('error', error?.response);
      dispatch(feedbackAction.launch({loading: false}));
    }
  };

  const handleSelect = (item) => {
    dispatch(countryAction.setCountry({selectedCountry: item, state: [], selectedState: null }));

    navigate("StateList");
  };

  return (
    <View style={classes.root}>
      <View style={classes.headerRoot}>
        <Icon name="globe-model" size={20} />
        <Subheading style={classes.headerTitle}>Select Country</Subheading>
      </View>
      <FlatList
        data={country}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({item}) => (
          <TouchableOpacity style={classes.listRoot} onPress={() => handleSelect(item)} >
            <Image
              source={{
                uri: `http://www.geognos.com/api/en/countries/flag/${item.code2}.png`,
              }}
              style={classes.img}
            />
            <Subheading>{item.name}</Subheading>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};;

export default CountryList;

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