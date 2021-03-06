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
import {api} from '../../../../api';
import { devotionAction, feedbackAction } from '../../../../store/actions';
import Wrapper from '../../../../components/Background';
import {ThemeContext} from '../../../../context/ThemeContext';
const { width, height } = Dimensions.get('screen');

const Devotion = ({ navigation}) => {
  // const [loading, setLoading] = React.useState(false);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const dispatch = useDispatch();
  const devotion = useSelector(({devotion}) => devotion);
  const { church: { publicToken } } = useSelector(({church}) => church);

  React.useEffect(() => {
    handleData();
  }, []);

  const handleData = async () => {
    try {
      dispatch(feedbackAction.launch({ loading: true }));

      const resDevotion = await axios.get(api.getDevotion, { headers: { publicToken } });

      console.log('resDevotion', resDevotion);

     dispatch(
       devotionAction.setDevotion({
         data: resDevotion.data.data,
       }),
     );

      dispatch(feedbackAction.launch({loading: false}));
      
    } catch (error) {
      dispatch(feedbackAction.launch({loading: false}));

      console.log(error);
      console.log(error.response);
    }
  };

  const handleRefreshData = async () => {
    try {
      setIsRefreshing(true);

      const resDevotion = await axios.get(api.getDevotion, {
        headers: {publicToken},
      });

      dispatch(
        devotionAction.setDevotion({
          data: resDevotion.data.data,
        }),
      );
      setIsRefreshing(true);
    } catch (error) {
      setIsRefreshing(false);
      // this.setState({
      //   isRefreshing: false,
      // });
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