import React, {Component} from 'react';
import {Paragraph, Button, Title, TextInput, FAB} from 'react-native-paper';
import {
  View,
  Dimensions,
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView
} from 'react-native';
import {connect} from 'react-redux';
import Axios from 'axios';
import {api, publicToken} from '../../../../api';
import {ThemeContext} from '../../../../context/ThemeContext';



function mapStateToProps(state) {
  return {
    account: state.account,
    // setting: state.setting,
  };
}

const screen = Dimensions.get('screen');

class AddNotes extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: <Paragraph style={classes.title}>Add Notes</Paragraph>,
    };
  };

  constructor(props) {
    super(props);

    this.timer = null
    
    this.state = {
      title: '',
      body: '\n\n\n',
      loading: false,
      visible: false,
      msg: '',
      type: '',
    };
  }


  handleAddNotes = async () => {
    try {
      const {account, navigation} = this.props;
      const {title, body} = this.state;

      this.setState({
        loading: true
      })

      Keyboard.dismiss();


      if (title === "") {
        this.setState({
          visible: true,
          msg: 'Title is required',
          type: 'w',
        });

        return;
      }


      if (body === '') {
        this.setState({
          visible: true,
          msg: 'Body is required',
          type: 'w',
        });

        return;
      }

      const notes = await Axios.post(api.note, 
        {
          title,
          body
        },
        {
          headers: { 'x-auth-token': account.token, publicToken},
        },
      );

      console.log('notes', notes);

      this.setState({
        loading: false,
        visible: true,
        msg: notes.data,
        type: 's',
      });

      this.timer = setTimeout(() => {
        navigation.navigate('ProfileHomeScreen');
      }, 3000);
    } catch (error) {
      this.setState({
        loading: false,
        visible: true,
        msg: error.response.data,
        type: 'w',
      });
      console.log('error', error);
      console.log('error', error.response);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }
  


  handleClose = () => {
    this.setState({
      visible: false,
      msg: '',
      type: '',
    });
  }
  

  render() {
    const {navigation} = this.props;
    const {title, body, visible, type, msg, loading} = this.state;
    // const background = {
    //   backgroundColor: setting.background,
    // };
    return (
      <ThemeContext.Consumer>
        {({theme, baseColor}) => (
          <KeyboardAvoidingView
            style={[classes.root, {backgroundColor: theme.background}]}
            behavior="height"
            enabled>
            <TextInput
              label="Title"
              mode="outlined"
              spellCheck={true}
              autoFocus={true}
              value={title}
              onChangeText={title => this.setState({title})}
            />

            <TextInput
              mode="outlined"
              label="Notes"
              placeholder="Type your notes.."
              multiline
              style={classes.TextInput}
              spellCheck={true}
              numberOfLines={5}
              maxLength={1050}
              value={body}
              onChangeText={body => this.setState({body})}
            />
            <Button
              contentStyle={classes.innerButton}
              mode="contained"
              disabled={loading}
              color={baseColor}
              dark={true}
              style={classes.button}
              uppercase
              onPress={this.handlePrayrequest}>
              Save
            </Button>

            {/* <View style={classes.fab}>
              <FAB
                icon="save"
                disabled={loading}
                color="white"
                style={{
                  backgroundColor: baseColor,
                }}
                onPress={this.handleAddNotes}
              />
            </View> */}
          </KeyboardAvoidingView>
        )}
      </ThemeContext.Consumer>
    );
  }
}

export default connect(mapStateToProps)(AddNotes);

const classes = StyleSheet.create({
  root: {
    flex: 1,
    padding: 15,
  },
  headerRight: {
    flex: 1,
    justifyContent: 'flex-end',
    marginHorizontal: 15,
    alignItems: 'center',
    flexDirection: 'row',
  },
  innerButton: {
    height: 55,
    fontSize: 20,
  },
  button: {
    width: 100,
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 0,
    marginVertical: 15,
  },
  TextInput: {
    marginTop: 20
  },
  title: {flex: 1, justifyContent: 'flex-start'},
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
