import React from 'react';
import {
  Surface,
  Caption,
  IconButton,
  Subheading,
  Paragraph,
  TextInput,
  Button,
} from 'react-native-paper';
import {
  View,
  Dimensions,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {api} from '../../../../api';
import axios from 'axios';
import moment from 'moment';
import Wrapper from '../../../../components/Background';
import {getDeviceId, getUniqueId} from 'react-native-device-info';
import {ThemeContext} from '../../../../context/ThemeContext';
import {useSelector, useDispatch} from 'react-redux';
import {
  devotionAction,
  feedbackAction,
  PRAction,
} from '../../../../store/actions';
const {width} = Dimensions.get('screen');

const PrayRequest = ({ navigation: { navigate } }) => {
  const dispatch = useDispatch();
  const [deviceId, setDeviceId] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [value, setValue] = React.useState({
    name: "",
    body: ""
  });
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const {
    church: {publicToken},
  } = useSelector(({church}) => church);
  const PR = useSelector(({pr}) => pr);

  console.log('deviceId', deviceId);


  React.useEffect(() => {
    handleDevice();
    handleData();
  }, []);

  const handleDevice = async () => {
    const deviceId = await getUniqueId();
    setDeviceId(deviceId);
  };

  const handleData = async () => {
    try {
      dispatch(feedbackAction.launch({loading: true}));

      const pray = await axios.get(api.getPRWall, {
        headers: {publicToken},
      });

      console.log('pray', pray);

      dispatch(
        PRAction.setPR({
          data: pray.data.data,
          total: pray.data.meta.total,
          page: pray.data.meta.page,
        }),
      );

      dispatch(feedbackAction.launch({loading: false}));
    } catch (error) {
      dispatch(feedbackAction.launch({loading: false}));
      console.log(error.response);
    }
  };

  const handleRefreshData = async () => {
    try {
      setIsRefreshing(true);

      const pray = await axios.get(api.getPRWall, {
        headers: {publicToken},
      });
      console.log('pray-refresh', pray);

      dispatch(
        PRAction.setPR({
          data: pray.data.data,
          total: pray.data.meta.total,
          page: pray.data.meta.page,
        })
      );
      setIsRefreshing(false);
    } catch (error) {
      setIsRefreshing(false);
      console.log(error);
      console.log(error.response);
    }
  };

  const handleLoadMore = async () => {
    try {
      // const {account} = this.props;
      // const {pages, data, pageNumber} = this.state;

      const num = Number(PR.currentPage) + 1;

      if (num > PR.page) return null;

      const pray = await axios.get(api.getPR + '?page=' + num, {
        headers: {publicToken},
      });

      // this.setState({
      //   loading: true,
      //   pageNumber: num,
      // });

      console.log('pray', pray);

      const data = [...PR.data, pray.data.data];
      // const listData = data.concat(pray.data.data);

      // this.setState({
      //   loading: false,
      //   data: listData,
      //   total: pray.data.meta.total,
      //   pages: pray.data.meta.pages,
      // });
      dispatch(
        PRAction.setPR({
          data: data,
          total: pray.data.meta.total,
          page: pray.data.meta.page,
        }),
      );

      dispatch(PRAction.setPRPage(num));
    } catch (error) {
      // this.setState({
      //   loading: false,
      // });
      console.log(error.response);
    }
  };

  const renderFooter = () => {
    //it will show indicator at the bottom of the list when data is loading otherwise it returns null
    if (!loading) return null;
    return <ActivityIndicator style={{color: '#000'}} />;
  };

  const handlePrayrequest = async () => {
    try {
      setLoading(true);
      const prayer = await axios({
        method: 'post',
        data: {
          ...value
        },
        headers: {publicToken},
        url: api.createAnonymousPR,
      });

      console.log('prayer', prayer);

      handleData();

      setValue({
        body: '\n\n\n',
        name: '',
      });
      dispatch(
        feedbackAction.launch({
          open: true,
          msg: prayer.data.msg,
          severity: 's',
        }),
      );

      setLoading(false);
    } catch (error) {
      setLoading(false);
      dispatch(
        feedbackAction.launch({
          open: true,
          msg: error?.response.data.msg,
          severity: 'w',
        }),
      );
      console.log('error', error.response);
      console.log('error', error);
    }
  };

  const handlePrayed = async (prayerId) => {
    console.log('deviceId', deviceId);

    try {
      const pr = await axios.patch(
        api.prayerView + '/' + prayerId,
        {deviceId},
        {
          headers: {
            publicToken,
          },
        },
      );
      console.log('p--------r', pr);

      handleData();
    } catch (error) {
      console.log('handlePrayed', error);
    }
  };

  return (
    <ThemeContext.Consumer>
      {({theme, baseColor}) => (
        <View style={[classes.root, {backgroundColor: theme.background}]}>
          <Wrapper>
            <View style={classes.form}>
              <TextInput
                mode="outlined"
                label="Prayer Request"
                placeholder="Type your prayer request here."
                multiline
                style={classes.TextInput}
                spellCheck={true}
                // autoFocus={true}
                numberOfLines={5}
                maxLength={225}
                value={value.body}
                onChangeText={(body) => setValue({...value, body})}
              />
              <View style={classes.textButton}>
                <TextInput
                  label="Full Name (optional)"
                  mode="outlined"
                  style={classes.accNameTextField}
                  spellCheck={true}
                  value={value.name}
                  onChangeText={(name) => setValue({...value, name})}
                />
                <Button
                  contentStyle={classes.innerButton}
                  mode="contained"
                  disabled={loading}
                  color={baseColor}
                  dark={true}
                  style={classes.button}
                  uppercase
                  onPress={handlePrayrequest}>
                  Submit
                </Button>
              </View>
            </View>

            <FlatList
              contentContainerStyle={classes.container}
              data={PR.data}
              extraData={PR.data}
              keyExtractor={(item) => item._id}
              renderItem={({item, index}) => (
                <Surface
                  style={[
                    classes.surface,
                    {borderColor: theme.mode ? 'white' : '#0000006e'},
                    index % 2 === 0 && {
                      backgroundColor: !theme.mode ? '#e4e4e4' : 'black',
                    },
                  ]}>
                  <TouchableOpacity
                    onPress={() =>
                      navigate('PrayRequestDetailScreen', item)
                    }>
                    <View style={classes.left}>
                      <Subheading>
                        {item.name === '' ? 'Anonymous' : item.name}
                      </Subheading>
                    </View>
                    <Paragraph style={classes.para}>
                      {item.body.replace(/(\r\n|\n|\r)/gm, ' ').length > 200
                        ? item.body
                            .substring(0, 200)
                            .replace(/(\r\n|\n|\r)/gm, ' ') + '...'
                        : item.body.replace(/(\r\n|\n|\r)/gm, ' ')}
                    </Paragraph>
                  </TouchableOpacity>
                  <View style={classes.bottom}>
                    <View style={classes.split}>
                      <TouchableOpacity onPress={() => handlePrayed(item._id)}>
                        <View style={classes.split}>
                          <IconButton
                            icon="thumb-up"
                            size={20}
                            color={
                              item.view.includes(deviceId)
                                ? baseColor
                                : theme.icon
                            }
                          />
                          <Paragraph style={classes.count}>
                            Click to pray
                          </Paragraph>
                        </View>
                      </TouchableOpacity>
                      <View
                        style={{
                          borderRightColor: theme.icon,
                          borderRightWidth: 1,
                          height: 15,
                          marginLeft: 10,
                        }}
                      />
                      <Caption style={classes.count}>
                        {item.view.length}
                      </Caption>
                      <Paragraph>prayed</Paragraph>
                    </View>
                    <Caption>
                      {moment(item.createdAt).format('MMM DD  HH:MM')}
                    </Caption>
                  </View>
                </Surface>
              )}
              refreshing={isRefreshing}
              ListFooterComponent={renderFooter}
              onRefresh={handleRefreshData}
              onEndReached={handleLoadMore}
              onEndReachedThreshold={0.4}
            />
            {/* <View style={classes.fab}>
        <FAB
          small
          icon="add"
          color="white"
          style={{
            backgroundColor: setting.baseColor,
          }}
          onPress={this.handleAdd}
        />
      </View> */}
          </Wrapper>
        </View>
      )}
    </ThemeContext.Consumer>
  );
};

export default PrayRequest;

const classes = StyleSheet.create({
  root: {
    flex: 1,
  },
  headerRight: {
    flex: 1,
    justifyContent: 'flex-end',
    marginHorizontal: 15,
    alignItems: 'center',
    flexDirection: 'row',
  },
  surface: {
    // flex: 1,
    // marginVertical: 0.5,
    alignItems: 'flex-start',
    textAlign: 'left',
    paddingHorizontal: 5,
    paddingTop: 5,
    elevation: 1,
  },
  left: {
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  Subheading: {
    flex: 1,
    fontWeight: '500',
    padding: 0,
    margin: 0,
  },
  para: {
    fontSize: 12,
  },
  title: {flex: 1, justifyContent: 'flex-start'},
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: '#800000',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  },
  bottom: {
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  count: {
    paddingHorizontal: 5,
  },
  split: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  form: {
    paddingHorizontal: 5,
  },
  textButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // width: '100%',
    alignItems: 'center',
  },
  innerButton: {
    height: 50,
    fontSize: 20,
  },
  button: {
    width: width / 2.4,
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    // borderRadius: 30,
    marginTop: 5,
  },
  accNameTextField: {
    width: width / 2.4,
    height: 56,
  },
});
