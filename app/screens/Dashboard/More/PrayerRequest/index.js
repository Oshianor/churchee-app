import React, { Component } from 'react';
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
  TouchableHighlight
} from 'react-native';
import {connect} from 'react-redux';
import { api, publicToken } from "../../../../api";
import axios from "axios";
import moment from "moment";
import Wrapper from '../../../../components/Background';
// import SnackbarComponent from '../components/Snackbar';
import { getDeviceId, getUniqueId } from 'react-native-device-info';
import {ThemeContext} from '../../../../context/ThemeContext';


function mapStateToProps(state) {
  return {
    account: state.account,
  };
}

const { width } = Dimensions.get('screen');

class PrayRequest extends Component {
  state = {
    loading: true,
    deviceId: null,
    isRefreshing: false,
    data: [],
    pages: 0,
    total: 0,
    pageNumber: 1,
    fullName: '',
    body: '\n\n',
    visible: false,
    loadingButton: false,
    msg: '',
    type: '',
  };

  async componentDidMount() {
    const deviceId = await getUniqueId();
    this.setState({
      deviceId,
    });
    this.handleData();
  }

  handleData = async () => {
    try {
      this.setState({
        loading: true,
      });

      const pray = await axios.get(api.getPR, { headers: { publicToken } });

      this.setState({
        loading: false,
        data: pray.data.prayer,
        total: pray.data.total,
        pages: pray.data.pages,
      });

      console.log('handleData', this.state);
    } catch (error) {
      this.setState({
        loading: false,
      });
      console.log(error.response);
    }
  };

  handleRefreshData = async () => {
    try {
      this.setState({
        isRefreshing: true,
        pageNumber: 1,
      });

      const pray = await axios.get(api.getPR, { headers: { publicToken } });

      this.setState({
        isRefreshing: false,
        data: pray.data.prayer,
        total: pray.data.total,
        pages: pray.data.pages,
      });

      console.log('handleRefreshData', this.state);
    } catch (error) {
      this.setState({
        isRefreshing: false,
      });
      console.log(error.response);
    }
  };

  handleLoadMore = async () => {
    try {
      const { pages, data, pageNumber } = this.state;

      const num = Number(pageNumber) + 1;

      if (num > pages) return null;

      const pray = await axios.get(api.getPR + '?pageNumber=' + num, { headers: { publicToken } });

      this.setState({
        loading: true,
        pageNumber: num,
      });

      console.log('handleLoadMore', pray);

      const listData = data.concat(pray.data.prayer);

      this.setState({
        loading: false,
        data: listData,
        total: pray.data.total,
        pages: pray.data.pages,
      });

      console.log('handleLoadMore', this.state);
    } catch (error) {
      this.setState({
        loading: false,
      });
      console.log(error.response);
    }
  };

  renderFooter = () => {
    const { loading } = this.state;
    //it will show indicator at the bottom of the list when data is loading otherwise it returns null
    if (!loading) return null;
    return <ActivityIndicator style={{ color: '#000' }} />;
  };

  handlePrayrequest = async () => {
    try {
      const { fullName, body } = this.state;
      const { navigation } = this.props;

      this.setState({
        visible: false,
        loadingButton: true,
        msg: '',
      });

      const prayer = await axios({
        method: 'post',
        data: {
          fullName,
          body,
        },
        headers: { publicToken },
        url: api.createAnonymousPR,
      });

      console.log('prayer', prayer);
      this.setState({
        visible: true,
        loadingButton: false,
        msg: prayer.data.msg,
        type: 's',
        body: '\n\n\n',
        fullName: '',
        data: prayer.data.content.prayer,
        total: prayer.data.content.total,
        pages: prayer.data.content.pages,
      });
      // navigation.navigate('RegisterEmailExistScreen');
    } catch (error) {
      this.setState({
        visible: true,
        loadingButton: false,
        type: 'w',
        loading: false,
        msg: error.response.data,
      });
      console.log('error', error.response);
      console.log('error', error);
    }
  };

  handlePrayed = prayerId => async () => {
    const { account } = this.props;
    const { deviceId } = this.state;

    console.log('deviceId', deviceId);

    try {
      const pr = await axios.put(
        api.prayerView + '/' + prayerId,
        { deviceId },
        {
          headers: { 'x-auth-token': account.token, publicToken },
        },
      );
      console.log("pr", pr);
      
      this.handleData();
    } catch (error) {
      console.log('handlePrayed', error);
    }
  };

  handleClose = () => {
    this.setState({ visible: false, msg: '' });
  };

  render() {
    const { navigation } = this.props;
    const { data, isRefreshing, visible, type, msg, deviceId, fullName, body, loadingButton } = this.state;

    
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
              value={body}
              onChangeText={body => this.setState({body})}
            />
            <View style={classes.textButton}>
              <TextInput
                label="Full Name (optional)"
                mode="outlined"
                style={classes.accNameTextField}
                spellCheck={true}
                value={fullName}
                onChangeText={fullName => this.setState({fullName})}
              />
              <Button
                contentStyle={classes.innerButton}
                // style={classes.button}
                mode="contained"
                disabled={loadingButton}
                color={baseColor}
                dark={true}
                style={classes.button}
                uppercase
                onPress={this.handlePrayrequest}>
                Submit
              </Button>
            </View>
          </View>

          <FlatList
            contentContainerStyle={classes.container}
            data={data}
            extraData={this.state}
            keyExtractor={item => item._id}
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
                    navigation.navigate('PrayRequestDetailScreen', item)
                  }>
                  <View style={classes.left}>
                    <Subheading>
                      {item.fullName === '' ? 'Anonymous' : item.fullName}
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
                    <TouchableHighlight onPress={this.handlePrayed(item._id)}>
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
                    </TouchableHighlight>
                    <View
                      style={{
                        borderRightColor: theme.icon,
                        borderRightWidth: 1,
                        height: 15,
                        marginLeft: 10,
                      }}
                    />
                    <Caption style={classes.count}>{item.view.length}</Caption>
                    <Paragraph>prayed</Paragraph>
                  </View>
                  <Caption>
                    {moment(item.createdAt).format('MMM DD  HH:MM')}
                  </Caption>
                </View>
              </Surface>
            )}
            refreshing={isRefreshing}
            ListFooterComponent={this.renderFooter.bind(this)}
            onRefresh={this.handleRefreshData}
            onEndReached={this.handleLoadMore}
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
  }
}

export default connect(mapStateToProps)(PrayRequest);

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
  title: { flex: 1, justifyContent: 'flex-start' },
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
