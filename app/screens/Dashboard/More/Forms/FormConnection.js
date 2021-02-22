import React from 'react'
import {connect} from 'react-redux';
import {
  Button,
  Title,
  Paragraph,
  TextInput,
  RadioButton,
	Text,
	Switch,
	Surface,
	Subheading
} from 'react-native-paper';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import {api, publicToken} from '../../../../api';
import {validateEmail} from '../../../../utils';
import {ThemeContext} from '../../../../context/ThemeContext';


const FormConnection = () => {
	const [value, setValue] = React.useState({
		firstName: "",
		lastName: "",
		phoneNumber: "",
		email: "",
		prayFor: "",
    comment: "",
    join: "Yes"
	});
	const [loading, setLoading] = React.useState(false);
  const [alert, setAlert] = React.useState({
    visible: false,
    type: '',
    msg: '',
  });

  const handleForm = async () => {
    try {
      setAlert({
        visible: false,
        msg: '',
      });

      if (value.firstName === '') {
        setAlert({
          visible: true,
          type: 'w',
          msg: 'First Name is required',
        });
        return;
      }
      
      if (value.lastName === '') {
        setAlert({
          visible: true,
          type: 'w',
          msg: 'Last Name is required',
        });
        return;
      }
      

      if (!validateEmail(value.email)) {
        setAlert({
          visible: true,
          type: 'w',
          msg: 'A valid Email is required',
        });
        return;
      }

      if (value.phoneNumber === '') {
        setAlert({
          visible: true,
          type: 'w',
          msg: 'Phone Number is required',
        });
        return;
      }

      setLoading(true);

      const newMember = await axios.post(api.form, {
        ...value,
        type: 'connectionCard',
      }, { headers: { publicToken } });

      console.log('newMember', newMember);
      setAlert({
        visible: true,
        type: 's',
        msg: newMember.data,
      });
      setLoading(false);
      setValue({
        fullName: '',
        phoneNumber: '',
        email: '',
        department: 'Usher Department',
        comment: '',
      });
      // navigation.navigate('FormScreen');
    } catch (error) {
      console.log('error', error);
      console.log('error', error.response);
      setLoading(false);

      setAlert({
        visible: true,
        type: 'w',
        msg: error.response.data,
      });
    }
  };
	return (
    <ThemeContext.Consumer>
      {({theme, baseColor}) => (
        <KeyboardAvoidingView
          style={{flex: 1, backgroundColor: theme.background}}
          behavior="height">
          <ScrollView contentContainerStyle={classes.root}>
            <Title>We would like to be connected to you...</Title>
            <Paragraph>
              Please fill the form below so we can get to know you.
            </Paragraph>
            <TextInput
              label="First Name"
              dense={true}
              mode="outlined"
              style={classes.field}
              value={value.firstName}
              onChangeText={firstName => setValue({...value, firstName})}
            />
            <TextInput
              label="Last Name"
              dense={true}
              style={classes.field}
              mode="outlined"
              value={value.lastName}
              onChangeText={lastName => setValue({...value, lastName})}
            />
            <TextInput
              label="Phone Number"
              style={classes.field}
              dense={true}
              mode="outlined"
              value={value.phoneNumber}
              onChangeText={phoneNumber => setValue({...value, phoneNumber})}
            />
            <TextInput
              dense={true}
              style={classes.field}
              label="Email"
              mode="outlined"
              value={value.email}
              onChangeText={email => setValue({...value, email})}
            />

            <View style={classes.select}>
              <Subheading>Would you like to join {churchName}</Subheading>
              <RadioButton.Group
                onValueChange={value => setJoin(value)}
                value={value.join}>
                <View style={classes.radio}>
                  <TouchableOpacity
                    onPress={() => setValue({...value, join: 'Yes'})}>
                    <Text>Yes</Text>
                  </TouchableOpacity>
                  <RadioButton
                    value="Yes"
                    color={baseColor}
                    status={value.join === 'Yes' ? 'checked' : 'unchecked'}
                  />
                </View>
                <View style={classes.radio}>
                  <TouchableOpacity
                    onPress={() => setValue({...value, join: 'No'})}>
                    <Text>No</Text>
                  </TouchableOpacity>
                  <RadioButton
                    value="No"
                    status={value.join === 'No' ? 'checked' : 'unchecked'}
                    color={baseColor}
                  />
                </View>
                <View style={classes.radio}>
                  <TouchableOpacity
                    onPress={() => setValue({...value, join: 'Not Yet'})}>
                    <Text>Not Yet</Text>
                  </TouchableOpacity>
                  <RadioButton
                    value="Not Yet"
                    status={
                      value.join === 'Not Yet' ? 'checked' : 'unchecked'
                    }
                    color={baseColor}
                  />
                </View>
              </RadioButton.Group>
            </View>

            <TextInput
              label="How can we pray for"
              style={classes.field}
              multiline
              spellCheck={true}
              numberOfLines={5}
              maxLength={225}
              mode="outlined"
              value={value.prayFor}
              onChangeText={prayFor => setValue({...value, prayFor})}
            />

            <TextInput
              label="Addition Comments"
              style={classes.field}
              multiline
              spellCheck={true}
              numberOfLines={5}
              maxLength={225}
              mode="outlined"
              value={value.comment}
              onChangeText={comment => setValue({...value, comment})}
            />

            <Button
              contentStyle={classes.innerButton}
              style={classes.button}
              mode="contained"
              disabled={loading}
              color={baseColor}
              dark={true}
              uppercase
              onPress={handleForm}>
              Sumbit
            </Button>
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </ThemeContext.Consumer>
  );
}

export default FormConnection


const classes = StyleSheet.create({
  root: {
    marginHorizontal: 20,
  },
  field: {
    marginVertical: 5,
  },
  select: {
		marginVertical: 5,
		flexDirection: "column",
		// flex: 1
	},
	radio: {
		// width: "100%",
		flexDirection: "row",
		alignItems: "center"
	},
  button: {
    width: 100,
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 0,
    marginVertical: 15,
  },
  innerButton: {
    height: 55,
    fontSize: 20,
  },
});