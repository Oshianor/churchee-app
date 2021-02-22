import React, {Component} from 'react';
import {
  IconButton,
  Paragraph,
} from 'react-native-paper';
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import { config, publicToken} from '../config';
import axios from 'axios';
import SnackBarComponent from '../components/Snackbar';
import AsyncStorage from '@react-native-community/async-storage';
import Wrapper from '../components/Wrapper';

import {ThemeContext} from '../components/ThemeContext';



function mapStateToProps(state) {
  return {
    account: state.account,
  };
}


class HymnFavorite extends Component {
  static navigationOptions = {
    title: 'Favorite Hymns',
  };

  state = {
    loading: true,
    isRefreshing: false,
    data: [],
    pages: 0,
    total: 0,
    pageNumber: 1,
    favourite: [],
  };

  async componentDidMount() {
    try {
      const favouriteHymn = await AsyncStorage.getItem('favouriteHymn');

      const favourite = JSON.parse(favouriteHymn);

      console.log('favouriteHymn-cdm', favouriteHymn);

      this.setState({
        favourite: favourite ? favourite : [],
      });

      // check if there are favorite and then go get them
      if (favourite && favourite.length > 0) {
        const hymn = await axios.post(config.getHymn, { favourite }, { headers: { publicToken } });

        this.setState({
          loading: false,
          data: hymn.data.hymn,
          total: hymn.data.total,
          pages: hymn.data.pages,
        });
      }
    } catch (error) {
      this.setState({
        loading: false,
      });
      console.log('favourite', error);
      console.log('favourite', error.response);
    }
  }

  handleFavoriteHymn = hymnId => async () => {
    const {favourite} = this.state;

    // /check if the event has been added before
    if (!favourite.includes(hymnId)) {
      favourite.push(hymnId);
      console.log('favourite-add', favourite);

      await AsyncStorage.setItem('favouriteHymn', JSON.stringify(favourite));
      this.setState({
        favourite,
        visible: true,
        msg: 'Devotion has been added as a favorite',
        type: 's',
      });
    } else {
      // find the index of the id
      const eventIndex = favourite.indexOf(hymnId);

      favourite.splice(eventIndex, 1);

      await AsyncStorage.setItem('favouriteHymn', JSON.stringify(favourite));

      this.setState({
        favourite,
        visible: true,
        msg: 'Devotion has been removed as a favorite',
        type: 'w',
      });
    }
  };

  handleData = async () => {
    try {
      this.setState({
        loading: true,
      });

      const hymn = await axios.get(config.getHymn, { headers: { publicToken } });

      this.setState({
        loading: false,
        data: hymn.data.hymn,
        total: hymn.data.total,
        pages: hymn.data.pages,
      });

      console.log('hymn', hymn);
    } catch (error) {
      this.setState({
        loading: false,
      });
      console.log(error.response);
    }
  };

  handleRefreshData = async () => {
    // const { favourite } = this.state;
    try {
      this.setState({
        isRefreshing: true,
        pageNumber: 1,
      });

      const favouriteHymn = await AsyncStorage.getItem('favouriteHymn');

      const favourite = JSON.parse(favouriteHymn);

      console.log('favouriteHymn-cdm', favourite);

      const hymn = await axios.post(config.getHymn, { favourite }, { headers: { publicToken } });

      this.setState({
        isRefreshing: false,
        data: hymn.data.hymn,
        total: hymn.data.total,
        favourite: favourite ? favourite : [],
        pages: hymn.data.pages,
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
      const {pages, data, pageNumber} = this.state;

      const num = Number(pageNumber) + 1;

      if (num > pages) return null;

      const hymn = await axios.get(config.getHymn + '?pageNumber=' + num, { headers: { publicToken } });

      this.setState({
        loading: true,
        pageNumber: num,
      });

      console.log('handleLoadMore', pray);

      const listData = data.concat(hymn.data.hymn);

      this.setState({
        loading: false,
        data: listData,
        total: hymn.data.total,
        pages: hymn.data.pages,
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
    const {loading} = this.state;
    //it will show indicator at the bottom of the list when data is loading otherwise it returns null
    if (!loading) return null;
    return <ActivityIndicator style={{color: '#000'}} />;
  };


  handleClose = () => {
    this.setState({
      visible: false,
      login: false,
      msg: '',
      type: '',
    });
  };

  handleAuthClose = (visible, msg, type) => {
    this.setState({
      login: false,
      visible,
      msg,
      type,
    });
  };

  render() {
    const {navigation} = this.props;
    const {data, isRefreshing, favourite, msg, type, visible} = this.state;

    return (
      <ThemeContext.Consumer>
        {({theme, baseColor}) => (
          <View style={[classes.root, {backgroundColor: theme.background}]}>
            <Wrapper>
              <FlatList
                contentContainerStyle={classes.container}
                data={data}
                extraData={this.state}
                keyExtractor={item => item._id}
                renderItem={({item}) => (
                  <View style={classes.surface}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('HymnDetailScreen', {item})
                      }>
                      <Paragraph style={classes.Subheading}>
                        {item.title}
                      </Paragraph>
                    </TouchableOpacity>
                    <IconButton
                      icon={
                        favourite.includes(item._id)
                          ? 'favorite'
                          : 'favorite-border'
                      }
                      color={favourite.includes(item._id) ? baseColor : 'black'}
                      onPress={this.handleFavoriteHymn(item._id)}
                      size={25}
                    />
                  </View>
                )}
                refreshing={isRefreshing}
                ListFooterComponent={this.renderFooter.bind(this)}
                onRefresh={this.handleRefreshData}
                onEndReached={this.handleLoadMore}
                onEndReachedThreshold={0.4}
              />
              <AuthComponent open={login} handleClose={this.handleAuthClose} />
              <SnackBarComponent
                handleClose={this.handleClose}
                visible={visible}
                type={type}
                msg={msg}
              />
            </Wrapper>
          </View>
        )}
      </ThemeContext.Consumer>
    );
  }
}

export default connect(mapStateToProps)(HymnFavorite);

const classes = StyleSheet.create({
  root: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  headerRight: {
    flex: 1,
    justifyContent: 'flex-end',
    marginHorizontal: 15,
    alignItems: 'center',
    flexDirection: 'row',
  },
  surface: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    elevation: 4,
  },
  left: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  bibleTypeFontSize: {
    fontSize: 15,
  },
  icon: {
    marginRight: 20,
  },
  Subheading: {
    fontSize: 18,
  },
  title: {flex: 1, justifyContent: 'flex-start'},
});
