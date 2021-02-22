import React from 'react'
import {connect} from 'react-redux';
import {
  Button,
  Title,
  Paragraph,
  Divider,
  RadioButton,
	Text,
	Switch,
	Surface,
	Subheading,
  Headline
} from 'react-native-paper';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from 'react-native';
import {ThemeContext} from '../../../../context/ThemeContext';


const FormSurvey = () => {
	const [value, setValue] = React.useState({
		firstName: "",
		lastName: "",
		phoneNumber: "",
		email: "",
		pray: "",
		comment: ""
	});
	const [loading, setLoading] = React.useState(false);
	const [join, setJoin] = React.useState("no");


	return (
    <ThemeContext.Consumer>
      {({theme, baseColor}) => (
        <ScrollView contentContainerStyle={classes.root}>
          <Title>We would like to take a Survey...</Title>
          <Paragraph>Please help us fill out form below.</Paragraph>
          <Divider />

          <View style={{marginTop: 30}} />

          <Headline>Demographics</Headline>
          <Divider />

          <View style={classes.select}>
            <Subheading>* What age range are you?</Subheading>
            <RadioButton.Group
              onValueChange={value => setJoin(value)}
              value={join}>
              <View style={classes.radio}>
                <TouchableOpacity onPress={() => setJoin('below 18')}>
                  <Text>Below 18</Text>
                </TouchableOpacity>
                <RadioButton
                  value="yes"
                  color={baseColor}
                  status={join === 'yes' ? 'checked' : 'unchecked'}
                />
              </View>
              <View style={classes.radio}>
                <TouchableOpacity onPress={() => setJoin('18-30')}>
                  <Text>18-30</Text>
                </TouchableOpacity>
                <RadioButton
                  value="no"
                  status={join === 'no' ? 'checked' : 'unchecked'}
                  color={baseColor}
                />
              </View>
              <View style={classes.radio}>
                <TouchableOpacity onPress={() => setJoin('30-50')}>
                  <Text>30-50</Text>
                </TouchableOpacity>
                <RadioButton
                  value="30-50"
                  status={join === 'notYet' ? 'checked' : 'unchecked'}
                  color={baseColor}
                />
              </View>
            </RadioButton.Group>
          </View>

          <Divider />

          <View style={classes.select}>
            <Subheading>* Your Gender</Subheading>
            <RadioButton.Group
              onValueChange={value => setJoin(value)}
              value={join}>
              <View style={classes.radio}>
                <TouchableOpacity onPress={() => setJoin('Male')}>
                  <Text>Male</Text>
                </TouchableOpacity>
                <RadioButton
                  value="male"
                  color={baseColor}
                  status={join === 'male' ? 'checked' : 'unchecked'}
                />
              </View>
              <View style={classes.radio}>
                <TouchableOpacity onPress={() => setJoin('female')}>
                  <Text>Female</Text>
                </TouchableOpacity>
                <RadioButton
                  value="female"
                  status={join === 'female' ? 'checked' : 'unchecked'}
                  color={baseColor}
                />
              </View>
              <View style={classes.radio}>
                <TouchableOpacity onPress={() => setJoin('none')}>
                  <Text>Prefer Not to state</Text>
                </TouchableOpacity>
                <RadioButton
                  value="none"
                  status={join === 'none' ? 'checked' : 'unchecked'}
                  color={baseColor}
                />
              </View>
            </RadioButton.Group>
          </View>

          <Divider />

          <View style={classes.select}>
            <Subheading>* Marital Status</Subheading>
            <RadioButton.Group
              onValueChange={value => setJoin(value)}
              value={join}>
              <View style={classes.radio}>
                <TouchableOpacity onPress={() => setJoin('single')}>
                  <Text>Single</Text>
                </TouchableOpacity>
                <RadioButton
                  value="single"
                  color={baseColor}
                  status={join === 'single' ? 'checked' : 'unchecked'}
                />
              </View>
              <View style={classes.radio}>
                <TouchableOpacity onPress={() => setJoin('married')}>
                  <Text>Married</Text>
                </TouchableOpacity>
                <RadioButton
                  value="married"
                  status={join === 'married' ? 'checked' : 'unchecked'}
                  color={baseColor}
                />
              </View>
              <View style={classes.radio}>
                <TouchableOpacity
                  onPress={() => setJoin('Separated/Divorced')}>
                  <Text>Separated/Divorced</Text>
                </TouchableOpacity>
                <RadioButton
                  value="Separated/Divorced"
                  status={
                    join === 'Separated/Divorced' ? 'checked' : 'unchecked'
                  }
                  color={baseColor}
                />
              </View>
              <View style={classes.radio}>
                <TouchableOpacity onPress={() => setJoin('Widow/Widower')}>
                  <Text>Widow/Widower</Text>
                </TouchableOpacity>
                <RadioButton
                  value="Widow/Widower"
                  status={join === 'Widow/Widower' ? 'checked' : 'unchecked'}
                  color={baseColor}
                />
              </View>
            </RadioButton.Group>
          </View>

          <Divider />

          <View style={{marginTop: 30}} />

          <Headline>
            Identity with the Vision and Mission Statement of {churchName}{' '}
          </Headline>

          <Divider />

          <View style={classes.select}>
            <Subheading>
              * Have you noticed the Vision/Mission banner at the lobby?
            </Subheading>
            <RadioButton.Group
              onValueChange={value => setJoin(value)}
              value={join}>
              <View style={classes.radio}>
                <TouchableOpacity onPress={() => setJoin('yes')}>
                  <Text>Yes</Text>
                </TouchableOpacity>
                <RadioButton
                  value="yes"
                  color={baseColor}
                  status={join === 'yes' ? 'checked' : 'unchecked'}
                />
              </View>
              <View style={classes.radio}>
                <TouchableOpacity onPress={() => setJoin('No')}>
                  <Text>No</Text>
                </TouchableOpacity>
                <RadioButton
                  value="no"
                  status={join === 'no' ? 'checked' : 'unchecked'}
                  color={baseColor}
                />
              </View>
            </RadioButton.Group>
          </View>

          <Divider />

          <View style={classes.select}>
            <Subheading>
              * On a scale of 1-10, how would you rate your awareness and
              understanding of the mission and vision of the Church
            </Subheading>
            <RadioButton.Group
              onValueChange={value => setJoin(value)}
              value={join}>
              <View style={classes.radioReverseRoot}>
                <View style={classes.radioReverse}>
                  <TouchableOpacity onPress={() => setJoin('1')}>
                    <Text>1</Text>
                  </TouchableOpacity>
                  <RadioButton
                    value="1"
                    color={baseColor}
                    status={join === '1' ? 'checked' : 'unchecked'}
                  />
                </View>
                <View style={classes.radioReverse}>
                  <TouchableOpacity onPress={() => setJoin('2')}>
                    <Text>2</Text>
                  </TouchableOpacity>
                  <RadioButton
                    value="2"
                    status={join === '2' ? 'checked' : 'unchecked'}
                    color={baseColor}
                  />
                </View>
                <View style={classes.radioReverse}>
                  <TouchableOpacity onPress={() => setJoin('3')}>
                    <Text>3</Text>
                  </TouchableOpacity>
                  <RadioButton
                    value="3"
                    status={join === '3' ? 'checked' : 'unchecked'}
                    color={baseColor}
                  />
                </View>
                <View style={classes.radioReverse}>
                  <TouchableOpacity onPress={() => setJoin('3')}>
                    <Text>3</Text>
                  </TouchableOpacity>
                  <RadioButton
                    value="3"
                    status={join === '3' ? 'checked' : 'unchecked'}
                    color={baseColor}
                  />
                </View>
                <View style={classes.radioReverse}>
                  <TouchableOpacity onPress={() => setJoin('4')}>
                    <Text>4</Text>
                  </TouchableOpacity>
                  <RadioButton
                    value="4"
                    status={join === '4' ? 'checked' : 'unchecked'}
                    color={baseColor}
                  />
                </View>
                <View style={classes.radioReverse}>
                  <TouchableOpacity onPress={() => setJoin('5')}>
                    <Text>5</Text>
                  </TouchableOpacity>
                  <RadioButton
                    value="5"
                    status={join === '5' ? 'checked' : 'unchecked'}
                    color={baseColor}
                  />
                </View>
                <View style={classes.radioReverse}>
                  <TouchableOpacity onPress={() => setJoin('6')}>
                    <Text>6</Text>
                  </TouchableOpacity>
                  <RadioButton
                    value="6"
                    status={join === '6' ? 'checked' : 'unchecked'}
                    color={baseColor}
                  />
                </View>
                <View style={classes.radioReverse}>
                  <TouchableOpacity onPress={() => setJoin('7')}>
                    <Text>7</Text>
                  </TouchableOpacity>
                  <RadioButton
                    value="7"
                    status={join === '7' ? 'checked' : 'unchecked'}
                    color={baseColor}
                  />
                </View>
                <View style={classes.radioReverse}>
                  <TouchableOpacity onPress={() => setJoin('8')}>
                    <Text>8</Text>
                  </TouchableOpacity>
                  <RadioButton
                    value="8"
                    status={join === '8' ? 'checked' : 'unchecked'}
                    color={baseColor}
                  />
                </View>
                <View style={classes.radioReverse}>
                  <TouchableOpacity onPress={() => setJoin('9')}>
                    <Text>9</Text>
                  </TouchableOpacity>
                  <RadioButton
                    value="9"
                    status={join === '9' ? 'checked' : 'unchecked'}
                    color={baseColor}
                  />
                </View>
                <View style={classes.radioReverse}>
                  <TouchableOpacity onPress={() => setJoin('10')}>
                    <Text>10</Text>
                  </TouchableOpacity>
                  <RadioButton
                    value="10"
                    status={join === '10' ? 'checked' : 'unchecked'}
                    color={baseColor}
                  />
                </View>
              </View>
            </RadioButton.Group>
          </View>

          <Button
            contentStyle={classes.innerButton}
            style={classes.button}
            mode="contained"
            disabled={loading}
            color={baseColor}
            dark={true}
            uppercase
            // onPress={this.handleForm}
          >
            Sumbit
          </Button>
        </ScrollView>
      )}
    </ThemeContext.Consumer>
  );
}

export default FormSurvey


const classes = StyleSheet.create({
  root: {
    marginHorizontal: 20,
  },
  field: {
    marginVertical: 5,
  },
  select: {
    marginVertical: 5,
    flexDirection: 'column',
    // flex: 1
  },
  radio: {
    // width: "100%",
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioReverseRoot: {
    marginVertical: 2,
    justifyContent: "center",
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioReverse: {
    // width: "100%",
    flexDirection: 'column',
    alignItems: 'center',
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