import React, {Component} from 'react';
import {
  Surface,
  Caption,
  Title,
  Paragraph,
  IconButton,
  FAB,
  Portal,
  Provider,
} from 'react-native-paper';
import {
  View,
  Dimensions,
  StyleSheet,
  FlatList,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import Axios from 'axios';
import { api, publicToken } from '../../../../api';
import moment from "moment";
import {ThemeContext} from '../../../../context/ThemeContext';




function mapStateToProps(state) {
  return {
    account: state.account,
  };
}


class NoteDetail extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: <Paragraph style={classes.title}>Private Notes</Paragraph>,
    };
  };

  constructor(props) {
    super(props);
    
    this.redirect = null;
    this.state = {
      item: {},
      visible: false,
      type: '',
      msg: '',
      open: false,
    };
  }
  
  


  componentDidMount() {
    const { navigation} = this.props;

    const item = navigation.getParam('item', {});

    this.setState({
      item
    })
  }


  componentWillUnmount() {
    clearTimeout(this.redirect)
  }
  
  

  handleDeleteAlert = () => {
    Alert.alert(
      'Delete Note',
      'Are you sure you want to delete this note?',
      [
        {
          text: 'Yes, Please',
          // style: 'ok',
          onPress: () => this.handleDelete(),
        },
        {
          text: 'No, Thanks',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  };


  handleDelete = async () => {
    try {
      const { account, navigation } = this.props;
      const { item } = this.state;

      const deleteNote = await Axios.delete(api.note + "/" + item._id, { headers: { "x-auth-token": account.token, publicToken } });

      this.setState({
        visible: true,
        type: 's',
        msg: deleteNote.data,
      });

      this.redirect = setTimeout(() => {
        navigation.navigate('ProfileHomeScreen');        
      }, 3000);
    } catch (error) {
      this.setState({
        visible: true,
        type: 'w',
        msg: error.response.data,
      });
      console.log('error', error);
      console.log('error', error.response);
    }
  }

  handleClose = () => {
    this.setState({
      visible: false,
      type: '',
      msg: '',
    });
  };

  render() {
    const { navigation} = this.props;
    const {item} = this.state;
    
    return (
      <ThemeContext.Consumer>
        {({theme, baseColor}) => (
      <View style={[classes.root, {backgroundColor: theme.background}]}>
        <ScrollView contentContainerStyle={classes.container}>
          <Title>{item.title}</Title>
          <Paragraph style={classes.text}>{item.body}</Paragraph>
        </ScrollView>
        <Provider>
          <Portal>
            <FAB.Group
              open={this.state.open}
              icon={this.state.open ? 'expand-more' : 'unfold-more'}
              actions={[
                {
                  icon: 'delete',
                  // color: 'red',
                  style: {
                    backgroundColor: 'red',
                  },
                  label: 'Delete',
                  onPress: () => this.handleDeleteAlert(),
                },
                {
                  icon: 'edit',
                  label: 'Edit',
                  // color: 'yellow',
                  style: {
                    backgroundColor: 'yellow',
                  },
                  onPress: () => navigation.navigate('EditNoteScreen', {item}),
                },
              ]}
              onStateChange={({open}) => this.setState({open})}
              onPress={() => {
                if (this.state.open) {
                  // do something if the speed dial is open
                }
              }}
            />
          </Portal>
        </Provider>
      </View>
      )}
      </ThemeContext.Consumer>
    );
  }
}

export default connect(mapStateToProps)(NoteDetail);

const classes = StyleSheet.create({
  root: {
    padding: 10,
    flex: 1,
  },
  container: {
    // marginHorizontal: 10,
    flex: 0.9,
    // paddingHorizontal: 15,
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
    justifyContent: 'space-between',
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
});
