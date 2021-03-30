import React from 'react';
import {Subheading, Caption} from 'react-native-paper';
import {
  View,
  Dimensions,
  StyleSheet,
  Image,
  Text,
  Share,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {api, baseUrl} from '../../../../api';
import {mediaAction} from '../../../../store/actions';
import {ThemeContext} from '../../../../context/ThemeContext';
import moment from "moment"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const {height, width} = Dimensions.get('screen');


const Media = ({navigation: { navigate }}) => {
  const [loading, setLoading] = React.useState(false);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const media = useSelector(({media}) => media);
  const { church: { publicToken  } } = useSelector(({church}) => church);
  const dispatch = useDispatch();


  React.useEffect(() => {
    if (typeof media.data[0] === "undefined") {
      handleData();
    }
  }, []);

  const handleData = async () => {
    try {
      setLoading(true);

      const mediaLoad = await axios.get(api.media, { headers: { publicToken } });

      console.log('mediaLoad', mediaLoad);

      dispatch(mediaAction.setMedia(mediaLoad.data));
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
      dispatch(mediaAction.setMediaPage(1));

      const mediaLoad = await axios.get(api.media, { headers: { publicToken } });

      console.log('mediaLoad', mediaLoad);

      dispatch(mediaAction.setMedia(mediaLoad.data));

      setIsRefreshing(false);
    } catch (error) {
      setIsRefreshing(false);
      console.log(error.response);
    }
  };

  // const handleLoadMore = async () => {
  //   try {
  //     const num = Number(media.currentPage) + 1;

  //     if (num > media.page) return null;

  //     setLoading(true);

  //     const mediaLoad = await axios.get(api.media + '?page=' + num, { headers: { publicToken } });

  //     dispatch(mediaAction.setMediaPage(num));

  //     const listData = data.concat(mediaLoad.data.data);

  //     dispatch(mediaAction.setMedia({
  //       media: listData,
  //       total: mediaLoad.data.meta.total,
  //       pages: mediaLoad.data.meta.pages,
  //     }));

  //     setLoading(false);
  //   } catch (error) {
  //     setLoading(false);
  //     console.log(error.response);
  //   }
  // };

  const onShare = item => async () => {
    try {
      const result = await Share.share({
        title: item.name,
        // message: `${item.body}/n/n ${moment(item.startDate).format("DDD MM, YY")} /n/n ${baseUrl}/event/${item._id}/${item.title}`,
        message: `${baseUrl}/media/${item._id}/${item.name.replace(
          /\s/g,
          '-',
        )}`,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('result.activityType', result.activityType);

          // shared with activity type of result.activityType
        } else {
          // shared
          console.log('result-type.activityType', result.action);
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
        console.log('result-type.activityType', result.action);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const renderFooter = () => {
    if (!loading) return null;
    return <ActivityIndicator style={{color: '#000'}} />;
  };

  return (
    <ThemeContext.Consumer>
      {({theme, baseColor}) => (
        <View style={[classes.root, {backgroundColor: theme.background}]}>
          <FlatList
            data={media.data}
            extraData={media}
            keyExtractor={item => item._id}
            refreshing={isRefreshing}
            // ListFooterComponent={renderFooter.bind(this)}
            onRefresh={handleRefreshData}
            // onEndReached={handleLoadMore}
            onEndReachedThreshold={0.4}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() =>
                  navigate('MediaDetailScreen', item)
                }>
                <View style={classes.section}>
                  <Subheading style={classes.Subheading}>
                    {item.name}
                  </Subheading>

                  <Image
                    source={{uri: api.img + item.img}}
                    style={classes.swiper}
                  />
                  <View style={classes.headerShare}>
                    <Caption>{moment(item.createdAt).fromNow()}</Caption>
                    <Icon
                      name="share-variant"
                      size={20}
                      onPress={onShare(item)}
                      color={theme.icon}
                      style={classes.icons}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </ThemeContext.Consumer>
  );
};

// export default connect(mapStateToProps, mapDispatchToProps)(Media);
export default Media;

const classes = StyleSheet.create({
  root: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  Subheading: {
    fontSize: 18,
    textTransform: 'capitalize',
    fontWeight: '500',
  },
  section: {
    marginVertical: 5,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    // flex: 1
  },
  swiper: {
    height: height / 4,
    width: width,
  },
  headerShare: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    width: "100%",
    marginTop: 5
  },
  icons: {
    // marginRight: 5,
    // padding: 0,
    // marginLeft: -5,
  },
});
