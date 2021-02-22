import React, {Component} from 'react';
import {
  Button,
  Title,
  Paragraph,
  TextInput
} from 'react-native-paper';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';
import {api, publicToken} from '../../../../api';
import {validateEmail} from '../../../../utils';
import {ThemeContext} from '../../../../context/ThemeContext';
// import DateTimePicker from '@react-native-community/datetimepicker';


const screen = Dimensions.get('screen');

const FormNewMember = ({ navigation: { navigate } }) => {
  const [loading, setLoading] = React.useState(false)
  const [value, setValue] = React.useState({
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    dob: new Date(),
    occupation: '',
    maritalStatus: '',
  });
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
          msg: 'First name is required',
        });
        return;
      }

      if (value.lastName === '') {
        setAlert({
          visible: true,
          type: 'w',
          msg: 'Last name is required',
        });
        return;
      }

      if (value.dob === '') {
        setAlert({
          visible: true,
          type: 'w',
          msg: 'Address is required',
        });
        return;
      }

      if (!validateEmail(value.email)) {
        setAlert({
          visible: true,
          type: 'w',
          msg: 'Email is required',
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

      if (value.maritalStatus === '') {
        setAlert({
          visible: true,
          type: 'w',
          msg: 'Marital status is required',
        });
        return;
      }

      setLoading(true);

      const newMember = await axios.post(api.form, {
        ...value,
        type: 'newMember'
      }, { headers: { publicToken } });

      console.log('newMember', newMember);
      setAlert({
        visible: true,
        type: 's',
        msg: newMember.data,
      });
      setLoading(false);
      setValue({
        email: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        dob: new Date(),
        occupation: '',
        maritalStatus: '',
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

  const setDate = (event, date) => {
    const dob = date || value.dob;

    // console.log('event, date', event, date);
    
    setValue({
      ...value,
      dob,
    });
  };

  const handleClose = () => {
    setAlert({
      visible: false,
      type: '',
      msg: '',
    });
  };

  return (
    <ThemeContext.Consumer>
      {({theme, baseColor}) => (
        <KeyboardAvoidingView
          style={{flex: 1, backgroundColor: theme.background}}
          behavior="height">
          <ScrollView contentContainerStyle={classes.root}>
            {/* <View style={classes.root}> */}
            <Title>We are Happy to have you..</Title>
            <Paragraph>
              Please fill the form below so we can get to know you.
            </Paragraph>

            <TextInput
              label="Email"
              dense={true}
              mode="outlined"
              value={value.email}
              onChangeText={email => setValue({...value, email})}
            />

            <TextInput
              label="First Name"
              dense={true}
              mode="outlined"
              value={value.firstName}
              onChangeText={firstName => setValue({...value, firstName})}
            />
            <TextInput
              label="Last Name"
              dense={true}
              mode="outlined"
              value={value.lastName}
              onChangeText={lastName => setValue({...value, lastName})}
            />

            <TextInput
              label="Phone Number"
              dense={true}
              mode="outlined"
              value={value.phoneNumber}
              onChangeText={phoneNumber => setValue({...value, phoneNumber})}
            />

            <RNPickerSelect
              onValueChange={maritalStatus =>
                setValue({...value, maritalStatus})
              }
              style={{
                inputIOS: {
                  ...pickerSelectStyles.inputIOS,
                  color: theme.text,
                },
                inputAndroid: {
                  ...pickerSelectStyles.inputAndroid,
                  color: theme.text,
                },
              }}
              placeholder="Marital Status"
              items={[
                {
                  label: 'Select Marital Status',
                  value: ''
                },
                {label: 'Single', value: 'single' },
                {label: 'Married', value: 'married' },
              ]}
              value={value.maritalStatus}
            />

            {/* <View>
              <Paragraph>Date Of Birth</Paragraph>
              <DateTimePicker
                value={value.dob}
                mode="date"
                // is24Hour={true}
                display="default"
                onChange={setDate}
              />
            </View> */}

            <TextInput
              label="Occupation"
              dense={true}
              mode="outlined"
              value={value.occupation}
              onChangeText={occupation => setValue({...value, occupation})}
            />

            <Button
              contentStyle={classes.innerButton}
              style={classes.button}
              mode="contained"
              disabled={loading}
              color={baseColor}
              dark={true}
              uppercase
              onPress={handleForm}
            >
              Sumbit
            </Button>
            {/* </View> */}
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </ThemeContext.Consumer>
  );
};

export default FormNewMember;

const classes = StyleSheet.create({
  root: {
    marginHorizontal: 20,
  },
  profile: {
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#4cd964',
  },
  img: {
    // flex: 1,
    marginTop: 30,
  },
  name: {
    fontSize: 18,
    // color: 'white',
    marginVertical: 20,
    fontWeight: '500',
  },
  bio: {
    textAlign: 'center',
  },
  buttonContent: {
    color: 'black',
  },
  increase: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    // marginVertical: 15,
    // width: screen.width / 2,
  },
  increaseText: {
    paddingHorizontal: 10,
  },
  accNameBody: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  accNameTextField: {
    width: screen.width / 2.4,
    height: 56,
  },
  Subheading: {
    fontWeight: '600',
  },
  surfaceSide: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sideTOp: {
    // padding: 20,
    marginVertical: 15,
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

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 18,
    marginTop: 5,
    paddingVertical: 12,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: 'grey',
    paddingHorizontal: 10,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 18,
    marginTop: 5,
    paddingVertical: 12,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: 'grey',
    paddingHorizontal: 10,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

