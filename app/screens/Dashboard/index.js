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
import {Header, Swiper} from '../../components/Card';
import { DailyVerse } from '../../components/Modal';
import {useSelector} from 'react-redux';
const { width, height } = Dimensions.get('screen');
import {api} from '../../api';
import axios from 'axios';

const Home = ({navigation: {navigate}}) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(null);
  const {church} = useSelector(({account}) => account);


  console.log('open', open);


  const handleData = async () => {
    try {
      const verse = await axios.get(api.dailyVerse, {
        headers: {publicToken: church?.publicToken},
      });

      console.log('verse', verse);
      setValue(verse.data.data);
      setOpen(true);
    } catch (error) {
      console.log('error', error);
      console.log('error', error.response);
    }
  };

  return (
    <ThemeContext.Consumer>
      {({theme, baseColor}) => (
        <SafeAreaView
          style={[classes.root, {backgroundColor: theme.background}]}>
          {/* <View style={classes.swiper}>
            <Swiper target="home" />
          </View> */}
          <Wrapper>
            <ScrollView contentContainerStyle={classes.body}>
              <View style={classes.rootView}>
                <View style={classes.section}>
                  <Header
                    title="Daily Verse"
                    name="verseSection"
                    onPress={() => handleData()}
                  />
                </View>

                <View style={classes.section}>
                  <Header title="Sermon" name="sermonSection" route="Sermon" />
                  <Header
                    title="Devotion"
                    name="devotionSection"
                    route="Devotion"
                  />
                </View>

                <View style={classes.section}>
                  <Header title="Event" name="eventSection" route="Event" />
                  <Header title="Media" name="mediaSection" route="Media" />
                </View>

                <View style={classes.section}>
                  <Header
                    title="Prayer Wall"
                    name="prayerSection"
                    route="PrayerRequest"
                  />
                  <Header title="Give" name="giveSection" route="Give" />
                </View>

                <View style={classes.section}>
                  <Header title="Form" name="formSection" route="Form" />
                  <Header title="Hymn" name="hymnSection" route="Hymn" />
                </View>
              </View>
            </ScrollView>
            <DailyVerse
              open={open}
              value={value}
              handleClose={() => setOpen(false)}
            />
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
