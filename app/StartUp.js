import React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import Navigation from './navigation';
import {
  configureFonts,
  DefaultTheme as PaperTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import {colors} from './theme';
import {FeedBack, Preloader} from './components/Feedback';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Platform, PermissionsAndroid} from 'react-native';
import axios from 'axios';
import {api} from './api';
import {ThemeContext} from "./context/ThemeContext";
import { accountAction } from "./store/actions"
import {navigationRef} from './RootNavigation';
import * as RootNavigation from './RootNavigation';

const StartUp = () => {
  const dispatch = useDispatch();
  const setting = useSelector(({setting}) => setting);

  React.useEffect(() => {
    handleGetChurch();
  }, []);

  const handleGetChurch = async () => {
    const church = await AsyncStorage.getItem("church");

    console.log('Uncut church', church);
    if (church) {
      dispatch(accountAction.updateChurchData(JSON.parse(church)));
    } else {
      RootNavigation.navigate('FindChurch');
    }
  }

  return (
    <ThemeContext.Consumer>
      {({theme, baseColor}) => (
        <PaperProvider
          theme={{
            ...DefaultTheme,
            roundness: 2,
            colors: {
              ...theme,
              // primary: 'black',
              accent: 'white',
              disabled: 'gray',
              placeholder: 'gray',
              backdrop: 'gray',
            },
            animation: {
              scale: 1.0,
            },
            roundness: 2,
            fonts: configureFonts(fontConfig),
          }}>
          <NavigationContainer
            ref={navigationRef}
            theme={{
              dark: theme.mode,
              colors: {
                primary: theme.primary,
                background: theme.background,
                card: theme.background,
                text: baseColor,
                border: theme.background,
              },
            }}>
            <Navigation />
          </NavigationContainer>
          <FeedBack />
          <Preloader />
        </PaperProvider>
      )}
    </ThemeContext.Consumer>
  );
};

export default StartUp;

const fontConfig = {
  web: {
    regular: {
      fontFamily: 'Roboto-Regular',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Roboto-Medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'Roboto-Light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'Roboto-Thin',
      fontWeight: 'normal',
    },
  },
  ios: {
    regular: {
      fontFamily: 'Roboto-Regular',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Roboto-Medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'Roboto-Light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'Roboto-Thin',
      fontWeight: 'normal',
    },
  },
  android: {
    regular: {
      fontFamily: 'Roboto-Regular',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Roboto-Medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'Roboto-Light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'Roboto-Thin',
      fontWeight: 'normal',
    },
  },
};

// const RNTheme = {
//   dark: theme.dark,
//   colors: {
//     ...DefaultTheme.colors,
//     primary: theme.dark ? 'rgb(255, 45, 85)' : colors.black,
//     background: theme.dark ? colors.black : colors.white,
//     card: theme.dark ? '#131313' : colors.white,
//     text: theme.dark ? colors.white : 'rgb(28, 28, 30)',
//     border: theme.dark ? colors.hr.dark : colors.hr.light,
//   },
// };

// const RNPTheme = {
//   dark: theme.dark,
//   colors: {
//     ...PaperTheme.colors,
//     primary: '#6200ee',
//     accent: '#03dac4',
//     background: theme.dark ? '#000' : 'rgb(255, 255, 255)',
//     surface: theme.dark ? '#131313' : 'white',
//     text: theme.dark ? '#fff' : 'black',
//     error: '#B00020',
//   },
//   animation: {
//     scale: 1.0,
//   },
//   roundness: 2,
//   fonts: configureFonts(fontConfig),
// };
