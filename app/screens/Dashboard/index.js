import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {ThemeContext} from '../../context/ThemeContext';
import Wrapper from "../../components/Background"
import {Header} from '../../components/Card';
import { DailyVerse, Live } from '../../components/Modal';
import {useSelector, useDispatch} from 'react-redux';
import { feedbackAction } from "../../store/actions"
const { width, height } = Dimensions.get('screen');
import {api} from '../../api';
import axios from 'axios';

const Home = ({navigation: {navigate}}) => {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(null);
  const [value, setValue] = React.useState(null);
  const {church, live} = useSelector(({account}) => account);

  // console.log('open', open);
  // console.log('value', value);

  const handleData = async () => {
    try {
      dispatch(feedbackAction.launch({ loading: true }));
      const verse = await axios.get(api.dailyVerse, {
        headers: {publicToken: church?.publicToken},
      });

      console.log('verse', verse);
      setValue(verse.data.data);
      dispatch(feedbackAction.launch({loading: false}));

      setOpen("dailyVerse");


    } catch (error) {
      console.log('error', error);
      console.log('error', error.response);
    }
  };

  return (
    <ThemeContext.Consumer>
      {({theme}) => (
        <SafeAreaView
          style={[classes.root, {backgroundColor: theme.background}]}>
          <Wrapper>
            <ScrollView contentContainerStyle={classes.body}>
              <View style={classes.rootView}>
                <View style={classes.section}>
                  <Header
                    title="Live"
                    name="live"
                    disabled={!live}
                    onPress={() => setOpen('live')}
                  />
                  <Header
                    title="Daily Verse"
                    name="dailyVerse"
                    onPress={() => handleData()}
                  />
                </View>

                <View style={classes.section}>
                  <Header title="Sermon" name="sermon" route="Sermon" />
                  <Header
                    title="Devotion"
                    name="devotion"
                    route="Devotion"
                  />
                </View>

                <View style={classes.section}>
                  <Header title="Event" name="event" route="Event" />
                  <Header title="Media" name="media" route="Media" />
                </View>

                <View style={classes.section}>
                  <Header
                    title="Prayer Wall"
                    name="prayer"
                    route="PrayerRequest"
                  />
                  <Header title="Give" name="give" route="Give" />
                </View>

                <View style={classes.section}>
                  <Header title="Form" name="form" route="Form" />
                  <Header title="Hymn" name="hymn" route="Hymn" />
                </View>
              </View>
            </ScrollView>
            <DailyVerse
              open={open}
              value={value}
              handleClose={() => setOpen()}
            />
            <Live open={open} handleClose={() => setOpen()} />
          </Wrapper>
        </SafeAreaView>
      )}
    </ThemeContext.Consumer>
  );
};

const classes = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
  },
  swiper: {
    marginBottom: 10,
    height: height / 3.5,
  },
  body: {
    // flex: 1,
    marginHorizontal: 10,
  },
  rootView: {
    flex: 1,
    marginVertical: 10,
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 5,
  },
  surface: {
    padding: 8,
    height: height / 7.5,
    width: width / 2.2,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  img: {
    resizeMode: 'cover',
    height: height / 7.5,
    width: width / 2.2,
  },
});
export default Home;
