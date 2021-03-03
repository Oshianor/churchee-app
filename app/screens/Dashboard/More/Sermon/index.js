import React, {Component} from 'react';
import {
  Surface,
  Caption,
  Subheading,
  Paragraph,
  IconButton,
} from 'react-native-paper';
import {
  Image,
  View,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  ImageBackground
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import { api} from '../../../../api';
import Wrapper from '../../../../components/Background';
import {ThemeContext} from '../../../../context/ThemeContext';
import {sermonAction} from '../../../../store/actions';


const { width, height } = Dimensions.get('screen');


const Sermon = ({navigation: {navigate}}) => {
  const dispatch = useDispatch();
  const sermon = useSelector(({sermon}) => sermon);
  const {
    church: {publicToken},
  } = useSelector(({account}) => account);
  const [loading, setLoading] = React.useState(false);
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  React.useEffect(() => {
    handleData();
  }, []);

  const handleData = async () => {
    if (typeof sermon.data[0] === 'undefined') {
      try {
        setLoading(true);

        const resSermon = await axios.get(api.sermon, {
          headers: {publicToken},
        });

        console.log('resSermon', resSermon);

        setLoading(false);
        dispatch(
          sermonAction.setSermon({
            sermon: resSermon.data.data,
            total: sermon.data.total,
            page: sermon.data.pages,
          }),
        );
      } catch (error) {
        setLoading(false);
        console.log(error.response);
      }
    }
  };

  const handleRefreshData = async () => {
    try {
      setIsRefreshing(true);
      dispatch(sermonAction.setSermonPage(1));

      const resSermon = await axios.get(api.sermon, {headers: {publicToken}});

        console.log('resSermon', resSermon);

      setIsRefreshing(false);

      dispatch(
        sermonAction.setSermon({
          sermon: resSermon.data.data,
          total: sermon.data.total,
          page: sermon.data.pages,
        }),
      );
      // setSermon(sermon.data);
    } catch (error) {
      setIsRefreshing(false);
      console.log(error.response);
    }
  };

  const handleLoadMore = async () => {
    try {
      // const {pages, data, pageNumber} = this.state;

      const num = Number(sermon.currentPage) + 1;

      if (num > sermon.page) return null;

      setLoading(true);

      const sermon = await axios.get(api.sermon + '?pageNumber=' + num, {
        headers: {publicToken},
      });

      dispatch(sermonAction.setSermonPage(num));

      const listData = data.concat(sermon.data.data);

      dispatch(
        sermonAction.setSermon({
          sermon: listData,
          total: sermon.data.total,
          page: sermon.data.pages,
        }),
      );

      setLoading(false);

      console.log('handleLoadMore', this.state);
    } catch (error) {
      setLoading(false);
      console.log(error.response);
    }
  };

  const renderFooter = () => {
    //it will show indicator at the bottom of the list when data is loading otherwise it returns null
    if (!loading) return null;
    return <ActivityIndicator style={{color: '#000'}} />;
  };

  return (
    <ThemeContext.Consumer>
      {({theme, baseColor}) => (
        <SafeAreaView
          style={[classes.root, {backgroundColor: theme.background}]}>
          <Wrapper>
            <FlatList
              data={sermon.data}
              // extraData={this.state}
              keyExtractor={(item) => item._id}
              refreshing={isRefreshing}
              // ListFooterComponent={renderFooter.bind(this)}
              onRefresh={handleRefreshData}
              // onEndReached={handleLoadMore}
              onEndReachedThreshold={0.4}
              numColumns={2}
              columnWrapperStyle={classes.contain}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={classes.container}
                  onPress={() => navigate('SermonDetailScreen', item)}>
                  {/* <Surface> */}
                  <Image
                    source={{uri: api.img + item.img}}
                    style={classes.swiper}
                  />
                  <View style={classes.bottom}>
                    <Subheading style={classes.para}>{item.title}</Subheading>
                    {/* <Caption style={classes.date}>
                        {moment(item.createdAt).format('MMM DD')}
                      </Caption> */}
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

export default Sermon;

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



{/* <FlatList
  data={data}
  // extraData={this.state}
  keyExtractor={item => item._id}
  refreshing={isRefreshing}
  ListFooterComponent={this.renderFooter.bind(this)}
  onRefresh={this.handleRefreshData}
  onEndReached={this.handleLoadMore}
  onEndReachedThreshold={0.4}
  renderItem={({ item }) => (
    <TouchableOpacity
      style={classes.container}
      onPress={() => navigation.navigate('SermonDetailScreen', { item })}>
      <ImageBackground
        source={{ uri: api.img + item.img }}
        style={[classes.swiper, classes.back]}>
        <View style={classes.block}>
        <Subheading style={classes.para}>{item.title}</Subheading>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  )}
/>; */}