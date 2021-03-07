import React, {Component} from 'react';
import {
  Surface,
  Caption,
  Subheading,
  Paragraph,
  FAB,
} from 'react-native-paper';
import {
  View,
  Dimensions,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import Axios from 'axios';
import { api} from '../../../../api';
import moment from "moment";
import {ThemeContext} from '../../../../context/ThemeContext';


function mapStateToProps(state) {
  return {
    account: state.account,
  };
}


class Notes extends Component {
  state = {
    loading: true,
    notes: [],
    isRefreshing: false,
  };


  async componentDidMount() {
    try {
      const {account} = this.props;

      const notes = await Axios.get(api.note, {
        headers: { 'x-auth-token': account.token},
      });

      console.log('notes', notes);

      this.setState({
        notes: notes.data.data
      });
    } catch (error) {
      console.log('error', error);
      console.log('error', error.response);
    }
  }

  handleRefreshData = async () => {
    try {
      const {account} = this.props;

      this.setState({
        isRefreshing: true,
      });

      const notes = await Axios.get(api.note, {
        headers: { 'x-auth-token': account.token},
      });
      
      this.setState({
        isRefreshing: false,
        notes: notes.data.data,
      });

      console.log('handleRefreshData', this.state);
    } catch (error) {
      this.setState({
        isRefreshing: false,
      });
      console.log(error.response);
    }
  };


  render() {
    const { navigation} = this.props;
    const {notes, isRefreshing} = this.state;
    

    return (
      <ThemeContext.Consumer>
        {({theme, baseColor}) => (
      <View style={[classes.root, {backgroundColor: theme.background}]}>
        <FlatList
          contentContainerStyle={classes.container}
          data={notes}
          keyExtractor={item => item._id}
          extraData={this.state}
          refreshing={isRefreshing}
          onRefresh={this.handleRefreshData}
          renderItem={({item}) => (
            <Surface style={classes.surface}>
              <TouchableOpacity
                onPress={() => navigation.navigate('NoteDetailScreen', {item})}>
                <View style={classes.left}>
                  <Subheading style={classes.Subheading}>
                    {/* {item.title} */}
                    {item.title.length > 30
                      ? item.title.substring(0, 30) + '...'
                      : item.title}
                  </Subheading>
                  <Caption>{moment(item.createdAt).format('MMM DD')}</Caption>
                </View>
                <Paragraph style={classes.para}>
                  {item.body.replace(/(\r\n|\n|\r)/gm, ' ').length > 75
                    ? item.body
                        .replace(/(\r\n|\n|\r)/gm, ' ')
                        .substring(0, 75) + '...'
                    : item.body.replace(/(\r\n|\n|\r)/gm, ' ')}
                </Paragraph>
              </TouchableOpacity>
            </Surface>
          )}
        />
        <View style={classes.fab}>
          <FAB
            small
            icon="plus"
            color="white"
            style={{
              backgroundColor: baseColor,
            }}
            onPress={() => navigation.navigate('AddNoteScreen')}
          />
        </View>
      </View>
      )}
      </ThemeContext.Consumer>
    );
  }
}

export default connect(mapStateToProps)(Notes);

const classes = StyleSheet.create({
  root: {
    flex: 1,
    // paddingHorizontal: 5,
    // marginVertical: 15,
  },
  headerRight: {
    flex: 1,
    justifyContent: 'flex-end',
    marginHorizontal: 15,
    alignItems: 'center',
    flexDirection: 'row',
  },
  surface: {
    flex: 1,
    marginVertical: 10,
    marginHorizontal: 15,
    padding: 10,
    justifyContent: "space-between",
    // alignItems: 'center',
    elevation: 4,
  },
  left: {
    alignItems: 'center',
    // paddingHorizontal: 5,
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
    // position: 'absolute',
    // left: 0,
    // bottom: 0,
    // flexDirection: 'row',
    // justifyContent: 'flex-end',
  },
});
