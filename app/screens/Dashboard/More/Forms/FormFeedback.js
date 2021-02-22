import React from 'react'
import {connect} from 'react-redux';
import {
  Button,
  Title,
  Paragraph,
  TextInput,
  Subheading
} from 'react-native-paper';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import {api, publicToken} from '../../../../api';
import {ThemeContext} from '../../../../context/ThemeContext';
// import {AirbnbRating} from 'react-native-ratings';


const FormConnection = () => {
	const [value, setValue] = React.useState({
    fullName: '',
    feedbackMistake: "",
    feedbackExcellent: "",
    feedbackKnow: "",
    feedbackWelcome: 5,
    feedbackPraise: 5,
    feedbackAnnouncemnts: 5,
    feedbackSermon: 5,
    feedbackOverall: 5,
    feedbackPrayer: 5,
  });
	  const [loading, setLoading] = React.useState(false);
    const [alert, setAlert] = React.useState({
      visible: false,
      type: '',
      msg: '',
    });


  const handleRating = (name, num) => {
    setValue({
      ...value,
      [name]: num
    })
  }


  const handleForm = async () => {
    try {
      setAlert({
        visible: false,
        msg: '',
      });

      setLoading(true);

      const newMember = await axios.post(api.form, {
        ...value,
        type: 'feedback',
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

    const reviews = [
      'Needs Improvement',
      'Adequate Service',
      'Good Service',
      'Met Expectation',
      'Service Exceeded Expectation',
    ];
    
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

            <View style={{marginTop: 30}} />

            <TextInput
              label="Name (optional)"
              dense={true}
              mode="outlined"
              style={classes.field}
              value={value.fullName}
              onChangeText={fullName => setValue({...value, fullName})}
            />

            <TextInput
              label="An obvious mistakes not to be repeated?"
              style={classes.field}
              multiline
              spellCheck={true}
              numberOfLines={5}
              maxLength={225}
              mode="outlined"
              value={value.feedbackMistake}
              onChangeText={feedbackMistake =>
                setValue({...value, feedbackMistake})
              }
            />

            <TextInput
              label="Any excellent points that should be repeated?"
              style={classes.field}
              multiline
              spellCheck={true}
              numberOfLines={5}
              maxLength={225}
              mode="outlined"
              value={value.feedbackExcellent}
              onChangeText={feedbackExcellent =>
                setValue({...value, feedbackExcellent})
              }
            />

            <TextInput
              label="Anythng else you would like us to know?"
              style={classes.field}
              multiline
              spellCheck={true}
              numberOfLines={5}
              maxLength={225}
              mode="outlined"
              value={value.feedbackKnow}
              onChangeText={feedbackKnow =>
                setValue({...value, feedbackKnow})
              }
            />

            {/* <View style={classes.rateRoot}>
              <Subheading style={classes.rateHeaderText}>
                Welcome visitors – (church engaged; made visitors welcome)
              </Subheading>
              <AirbnbRating
                count={5}
                reviews={reviews}
                reviewSize={12}
                defaultRating={5}
                size={30}
                onFinishRating={val => handleRating('feedbackWelcome', val)}
                reviewColor={baseColor}
                selectedColor={baseColor}
              />
            </View>

            <View style={classes.rateRoot}>
              <Subheading style={classes.rateHeaderText}>
                Praise & Worship – (Song selection, choir/musicians)
              </Subheading>
              <AirbnbRating
                count={5}
                reviews={reviews}
                reviewSize={12}
                defaultRating={5}
                onFinishRating={val => handleRating('feedbackPraise', val)}
                size={30}
                reviewColor={baseColor}
                selectedColor={baseColor}
              />
            </View>

            <View style={classes.rateRoot}>
              <Subheading style={classes.rateHeaderText}>
                Announcements – (Persuasive, brief and to the point,
                informative)
              </Subheading>
              <AirbnbRating
                count={5}
                reviews={reviews}
                onFinishRating={val =>
                  handleRating('feedbackAnnouncemnts', val)
                }
                reviewSize={12}
                defaultRating={5}
                size={30}
                reviewColor={baseColor}
                selectedColor={baseColor}
              />
            </View>

            <View style={classes.rateRoot}>
              <Subheading style={classes.rateHeaderText}>
                Sermon –(Clear, God-centered, focused, timely time, left
                members with a call to action)
              </Subheading>
              <AirbnbRating
                count={5}
                reviews={reviews}
                reviewSize={12}
                onFinishRating={val => handleRating('feedbackSermon', val)}
                defaultRating={5}
                size={30}
                reviewColor={baseColor}
                selectedColor={baseColor}
              />
            </View>

            <View style={classes.rateRoot}>
              <Subheading style={classes.rateHeaderText}>
                Overall Rating –(Considering ALL components of services flowed
                smoothly)
              </Subheading>
              <AirbnbRating
                count={5}
                reviews={reviews}
                reviewSize={12}
                defaultRating={5}
                onFinishRating={val => handleRating('feedbackOverall', val)}
                size={30}
                reviewColor={baseColor}
                selectedColor={baseColor}
              />
            </View>

            <View style={classes.rateRoot}>
              <Subheading style={classes.rateHeaderText}>
                Prayer ( Engaging, Meaningful)
              </Subheading>
              <AirbnbRating
                count={5}
                reviews={reviews}
                reviewSize={12}
                defaultRating={5}
                onFinishRating={val => handleRating('feedbackPrayer', val)}
                size={30}
                reviewColor={baseColor}
                selectedColor={baseColor}
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
  rateRoot: {
    marginVertical: 5
  },
  rateHeaderText: {
    textAlign: "center"
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