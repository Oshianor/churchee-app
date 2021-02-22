import React from 'react'
import {
  Button,
  Title,
  Paragraph,
  TextInput,
  RadioButton,
	Text,
  Subheading
} from 'react-native-paper';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import axios from 'axios';
import {api, publicToken} from '../../../../api';
import {validateEmail} from '../../../../utils';
import {ThemeContext} from '../../../../context/ThemeContext';



const FormConnection = () => {
	const [value, setValue] = React.useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    department: 'Usher Department',
    comment: '',
  });
	const [loading, setLoading] = React.useState(false);
  const [alert, setAlert] = React.useState({
    visible: false,
    type: '',
    msg: '',
  });
  const Department = ['Usher Department','Culture Department','Media Department','Public Relations Department', 'Hospitality Department','Prayer Department','Operations Department','Maintenance Department','Choir','Protocol / Pastoral Care', 'Community Outreach','Other'];


  const handleForm = async () => {
    try {
      setAlert({
        visible: false,
        msg: '',
      });

      if (value.fullName === '') {
        setAlert({
          visible: true,
          type: 'w',
          msg: 'Name is required',
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

      if (value.department === '') {
        setAlert({
          visible: true,
          type: 'w',
          msg: 'Department is required',
        });
        return;
      }

      setLoading(true);

      const newMember = await axios.post(api.form, {
        ...value,
        type: 'volunteer',
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
            <Title>We would like to be connected to you...</Title>
            <Paragraph>
              Please fill the form below so we can get to know you.
            </Paragraph>
            <TextInput
              label="Name"
              dense={true}
              mode="outlined"
              style={classes.field}
              value={value.fullName}
              onChangeText={fullName => setValue({...value, fullName})}
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
              <Subheading>
                What Department Would You Like To Serve In
              </Subheading>
              <RadioButton.Group
                onValueChange={department => setValue({...value, department})}
                value={value.department}>
                {Department.map(department => (
                  <View key={department} style={classes.radio}>
                    <TouchableOpacity
                      onPress={() => setValue({...value, department})}>
                      <Text>{department}</Text>
                    </TouchableOpacity>
                    <RadioButton
                      value={department}
                      color={baseColor}
                      status={
                        value.department === department
                          ? 'checked'
                          : 'unchecked'
                      }
                    />
                  </View>
                ))}
              </RadioButton.Group>
            </View>

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