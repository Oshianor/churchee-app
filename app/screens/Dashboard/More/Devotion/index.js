import React from 'react';
import {
  Subheading,
} from 'react-native-paper';
import {
  Image,
  View,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import {api, publicToken} from '../../../../api';
import { devotionAction } from '../../../../store/actions';
import Wrapper from '../../../../components/Background';
import {ThemeContext} from '../../../../context/ThemeContext';


const { width, height } = Dimensions.get('screen');

const Devotion = ({ navigation}) => {
  const [loading, setLoading] = React.useState(false);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const dispatch = useDispatch();
  const devotion = useSelector(({devotion}) => devotion);

  React.useEffect(() => {
    handleData();
  }, []);

  const handleData = async () => {
    try {
      setLoading(true);

      const devotion = await axios.get(api.getDevotion, { headers: { publicToken } });

      console.log('devotion', devotion);

     dispatch(devotionAction.setDevotion(devotion.data));

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      console.log(error.response);
    }
  };

  const handleRefreshData = async () => {
    try {
      setIsRefreshing(true);

      const devotion = await axios.get(api.getDevotion, { headers: { publicToken } });

      dispatch(devotionAction.setDevotion(devotion.data));
      setIsRefreshing(true);
    } catch (error) {
      this.setState({
        isRefreshing: false,
      });
      console.log(error.response);
    }
  };

  return (
    <ThemeContext.Consumer>
      {({theme, baseColor}) => (
        <SafeAreaView
          style={[classes.root, {backgroundColor: theme.background}]}>
          <Wrapper>
            <FlatList
              data={devotion.data}
              keyExtractor={item => item._id}
              refreshing={isRefreshing}
              onRefresh={handleRefreshData}
              onEndReachedThreshold={0.4}
              numColumns={2}
              columnWrapperStyle={classes.contain}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={classes.container}
                  onPress={() =>
                    navigation.navigate('DailyDevotionDetailScreen', item)
                  }>
                  {/* <Surface> */}
                    <Image
                      source={{uri: api.img + item.img}}
                      style={classes.swiper}
                    />
                    <View>
                      <Subheading style={classes.para}>{item.title}</Subheading>
                      {/* <Caption>{moment(item.date).format('MMM DD')}</Caption> */}
                    </View>
                  {/* </Surface> */}
                </TouchableOpacity>
              )}
            />
          </Wrapper>
        </SafeAreaView>
      )}
    </ThemeContext.Consumer>
  );
};

export default Devotion;

const classes = StyleSheet.create({
  root: {
    flex: 1,
    marginHorizontal: 10,
  },
  contain: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    // flexDirection: 'row',
    // flexWrap: 'wrap',
  },
  container: {
    height: height / 4.5,
    width: width / 2,
    // marginVertical: 25,
  },
  swiper: {
    height: height / 6,
    width: width / 2.2,
  },
  headerRight: {
    flex: 1,
    justifyContent: 'flex-end',
    marginHorizontal: 15,
    alignItems: 'center',
    flexDirection: 'row',
  },
  heading: {
    fontSize: 15,
    textAlign: 'center',
  },
  title: {flex: 1, justifyContent: 'flex-start'},
  para: {
    // borderWidth: 3,
    // borderColor: 'white',
  },
  date: {
    paddingLeft: 5,
  },
});