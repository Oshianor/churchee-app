import React, {Component} from 'react';
import {
  Button,
  Title,
  Paragraph,
  TextInput,
  HelperText,
} from 'react-native-paper';
import {View, StyleSheet, KeyboardAvoidingView, ScrollView, Dimensions} from 'react-native';
// import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import {api, publicToken} from '../../../../api';
import {ThemeContext} from '../../../../context/ThemeContext';
import RNPickerSelect from 'react-native-picker-select';


const screen = Dimensions.get("screen");

class FormChildDedication extends Component {
  static navigationOptions = ({navigation}) => {
    // console.log('navigation', nav);

    return {
      headerTitle: (
        <Paragraph style={classes.title}>Child Dedication</Paragraph>
      ),
    };
  };

  constructor(props) {
    super(props);

    this.redirect = null
    
    this.state = {
      babyGender: '',
      fatherFirstName: '',
      fatherLastName: '',
      motherFirstName: '',
      motherLastName: '',
      babyFullName: "",
      date: new Date(),
      loading: false,
      visible: false,
      msg: '',
      type: 'w',
    };
  }

  componentWillUnmount() {
    clearTimeout(this.redirect);  
  }


  handleForm = async () => {
    try {
      const {
        babyGender,
        fatherFirstName,
        fatherLastName,
        motherFirstName,
        motherLastName,
        babyFullName,
        date
      } = this.state;
      const { navigation } = this.props;

      this.setState({
        visible: false,
        loading: true,
        msg: '',
      });

      if (fatherFirstName === '') {
        this.setState({
          visible: true,
          type: 'w',
          loading: false,
          msg: 'Father\'s First Name is required',
        });
        return;
      }

      if (fatherLastName === '') {
        this.setState({
          visible: true,
          type: 'w',
          loading: false,
          msg: "Father's Last Name is required",
        });
        return;
      }

      if (motherFirstName === '') {
        this.setState({
          visible: true,
          type: 'w',
          loading: false,
          msg: 'Mother\'s First Name is required',
        });
        return;
      }

      if (motherLastName === '') {
        this.setState({
          visible: true,
          type: 'w',
          loading: false,
          msg: 'Mother\'s Last Name is required',
        });
        return;
      }

      if (babyFullName === '') {
        this.setState({
          visible: true,
          type: 'w',
          loading: false,
          msg: 'Baby\'s Full Name is required',
        });
        return;
      }

      if (date === '') {
        this.setState({
          visible: true,
          type: 'w',
          loading: false,
          msg: 'Date is required',
        });
        return;
      }

      if (babyGender === '') {
        this.setState({
          visible: true,
          type: 'w',
          loading: false,
          msg: 'Gender is required',
        });
        return;
      }

      const childDedication = await axios.post(api.form, {
        babyGender,
        fatherFirstName,
        fatherLastName,
        motherFirstName,
        motherLastName,
        babyFullName,
        dateOfDedication: date,
        type: 'childDedication',
      }, { headers: { publicToken } });

      console.log('childDedication', childDedication);

      this.setState({
        visible: true,
        loading: false,
        type: 's',
        msg: childDedication.data,
      });

      this.redirect = setTimeout(() => {
        navigation.navigate("FormScreen")
      }, 3000);
    } catch (error) {
      console.log('error', error);
      console.log('error', error.response);
      this.setState({
        visible: true,
        loading: false,
        type: 'w',
        msg: error.response.data,
      });
    }
  };


  setDate = (event, date) => {
    date = date || this.state.date;

    this.setState({
      date,
    });
  };

  render() {
    const {navigation} = this.props;
    const {
      fatherFirstName,
      visible,
      msg,
      type,
      fatherLastName,
      motherFirstName,
      motherLastName,
      date,
      babyFullName,
      loading,
      babyGender,
    } = this.state;

    
    

    return (
      <ThemeContext.Consumer>
        {({theme, baseColor}) => (
      <KeyboardAvoidingView
        style={{flex: 1, backgroundColor: theme.background}}
        behavior="height">
        <ScrollView>
          <View style={classes.root}>
            <Title>We are Happy to have you..</Title>
            <Paragraph>
              Please fill the form below so we can get to know you.
            </Paragraph>
            <View style={classes.split}>
              <TextInput
                label="Father's First Name"
                dense={true}
                mode="outlined"
                style={classes.nameField}
                value={fatherFirstName}
                onChangeText={fatherFirstName =>
                  this.setState({fatherFirstName})
                }
              />
              <TextInput
                label="Father's Last Name"
                dense={true}
                mode="outlined"
                style={classes.nameField}
                value={fatherLastName}
                onChangeText={fatherLastName => this.setState({fatherLastName})}
              />
            </View>

            <View style={classes.split}>
              <TextInput
                label="Mother's First Name"
                dense={true}
                mode="outlined"
                style={classes.nameField}
                value={motherFirstName}
                onChangeText={motherFirstName =>
                  this.setState({motherFirstName})
                }
              />
              <TextInput
                label="Mother's Last Name"
                dense={true}
                mode="outlined"
                style={classes.nameField}
                value={motherLastName}
                onChangeText={motherLastName => this.setState({motherLastName})}
              />
            </View>

            <TextInput
              label="Baby's Full Name"
              dense={true}
              mode="outlined"
              value={babyFullName}
              onChangeText={babyFullName => this.setState({babyFullName})}
            />
            <HelperText>eg. Samson Raymon Bayo</HelperText>

            <RNPickerSelect
              onValueChange={babyGender => this.setState({babyGender})}
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
              placeholder="Baby's Gender"
              items={[
                {
                  label: "Baby's Gender",
                  value: '',
                  key: 'default',
                },
                {label: 'Male', value: 'male', key: 'male'},
                {label: 'Female', value: 'female', key: 'female'},
              ]}
              value={babyGender}
            />

            {/* <View>
              <Paragraph>Proposed date/time of dedication</Paragraph>
              <DateTimePicker
                value={date}
                mode="datetime"
                is24Hour={true}
                display="default"
                onChange={this.setDate}
              />
            </View> */}

            <Button
              contentStyle={classes.innerButton}
              style={classes.button}
              mode="contained"
              disabled={loading}
              color={baseColor}
              dark={true}
              uppercase
              onPress={this.handleForm}>
              Sumbit
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      )}
      </ThemeContext.Consumer>
    );
  }
}


export default FormChildDedication;
// export default connect(mapStateToProps)(FormChildDedication);

const classes = StyleSheet.create({
  root: {
    marginHorizontal: 15,
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
  split: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  nameField: {
    width: screen.width/2.2
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