import React, {Component} from 'react';
import {Paragraph, Title, TextInput, FAB, Subheading} from 'react-native-paper';
import {
  View,
  Dimensions,
  StyleSheet,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import {api, publicToken} from '../../../../api';
import {ThemeContext} from '../../../../context/ThemeContext';
import { feedbackAction } from "../../../../store/actions";
import { Button } from "../../../../components/Button"


const AddNotes = ({navigation: {goBack}}) => {
  const dispatch = useDispatch();
  const {token} = useSelector(({account}) => account);
  const [value, setValue] = React.useState({
    title: '',
    body: '\n',
  });

  const handleAddNotes = async () => {
    try {
      Keyboard.dismiss();

      if (value.title === '') {
        dispatch(
          feedbackAction.launch({
            open: true,
            severity: 'w',
            msg: 'Title is required',
          }),
        );

        return;
      }

      if (value.body === '') {
        dispatch(
          feedbackAction.launch({
            open: true,
            severity: 'w',
            msg: 'Body is required',
          }),
        );

        return;
      }

      dispatch(feedbackAction.launch({loading: true}));

      const notes = await axios.post(
        api.note,
        {
          ...value
        },
        {
          headers: {'x-auth-token': token},
        },
      );

      console.log('notes', notes);

      dispatch(
        feedbackAction.launch({
          loading: false,
          severity: 's',
          open: true,
          msg: notes.data.msg,
        }),
      );

      goBack();
    } catch (error) {
      dispatch(
        feedbackAction.launch({
          loading: false,
          open: true,
          severity: 'w',
          msg: error.response.data.msg,
        }),
      );
      console.log('error', error);
      console.log('error', error.response);
    }
  };

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
            value={value.title}
            onChangeText={(title) => setValue({...value, title})}
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
            value={value.body}
            onChangeText={(body) => setValue({...value, body})}
          />
          {/* <Button
              contentStyle={classes.innerButton}
              mode="contained"
              // disabled={loading}
              color={baseColor}
              dark={true}
              style={classes.button}
              uppercase
              onPress={this.handlePrayrequest}>
              Save
            </Button> */}
          <Button
            label="Save Note"
            rootStyle={{marginVertical: 10}}
            onPress={handleAddNotes}
          />
        </KeyboardAvoidingView>
      )}
    </ThemeContext.Consumer>
  );
};

export default AddNotes;

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
