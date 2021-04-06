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
import {api, chatURL} from './api';
import {ThemeContext} from './context/ThemeContext';
import {accountAction, churchAction} from './store/actions';
import {navigationRef} from './RootNavigation';
import * as RootNavigation from './RootNavigation';
import SplashScreen from 'react-native-splash-screen';
import Geolocation from 'react-native-geolocation-service';
import WebSocket from './context/websocket';
// import io from 'socket.io-client';
import SockJS from 'sockjs-client'; // Note this line
import Stomp from 'stompjs';

const StartUp = () => {
  const dispatch = useDispatch();
  const [socket, setSocket] = React.useState(null);
  const {token} = useSelector(({account}) => account);
  const {
    theme,
    toggleTheme,
    updateBaseColor,
    updateFontSize,
    baseColor,
  } = React.useContext(ThemeContext);

  // console.log('socket', socket);

  React.useEffect(() => {
    connectSocket(token);
    getUser();
    handleGetChurch();
    requestLocationPermission();
    handleBackground();
    getLive();

    SplashScreen.hide();

    return () => socket && socket.disconnect();
  }, [token]);

  // React.useEffect(() => {
  //   connectSocket(token);
  // }, [token]);

  // const connectSocket = (token) => {
  //   try {

  //     if (!token) return;
  //     // const link = `${chatURL}`; 
  //     const s = io(chatURL, {
  //       path: '/chatSocket',
  //       transports: ['websocket'],
  //     });

  //     s.on('connect', () => {
  //       console.log('socket connected');
  //     });
  //     setSocket(s);
  //   } catch (error) {
  //     console.log('error socket', error);
  //   }
  // };


  const connectSocket = (token) => {
      const socket = new SockJS('http://localhost:8080/chat');
      const stompClient = Stomp.over(socket);
      const headers = {UserAuth: token};

      stompClient.connect(headers, (frame) => {

        console.log('Connected: ' + frame);
        setSocket(stompClient);
        // stompClient.subscribe(
        //   `/user/${user.username}/queue/messages`,
        //   console.log,
        //   headers,
        // );
      });
    };

  const handleGetChurch = async () => {
    const church = await AsyncStorage.getItem('church');
    const churchList = await AsyncStorage.getItem('churchList');

    // console.log('Uncut churchList', churchList);
    if (church) {
      dispatch(
        churchAction.setChurchData({
          church: JSON.parse(church),
          churchList: JSON.parse(churchList),
        }),
      );
      RootNavigation.navigate('Dashboard');
    } else {
      RootNavigation.navigate('Onboarding', {screen: 'FindChurch'});
    }
  };

  const getUser = async () => {
    const token = await AsyncStorage.getItem('token');
    const user = await AsyncStorage.getItem('user');
    dispatch(accountAction.setToken(token));
    dispatch(accountAction.setUserData(JSON.parse(user)));
  };

  const getLive = async () => {
    try {
      let church = await AsyncStorage.getItem('church');

      if (!church) return;

      church = JSON.parse(church);
      // console.log('church', church);

      const live = await axios.get(api.live, {
        headers: {publicToken: church?.publicToken},
      });

      // console.log('live', live);

      dispatch(accountAction.setAccountData({live: live.data.data}));
    } catch (error) {
      // console.log('error', error);
      // console.log('error', error.response);
    }
  };

  const requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      Geolocation.requestAuthorization('always');
      Geolocation.setRNConfiguration({
        skipPermissionRequests: false,
        authorizationLevel: 'whenInUse',
      });

      await handleLocation();
    }

    if (Platform.OS === 'android') {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
    }
    await handleLocation();
  };

  const handleLocation = async () => {
    Geolocation.getCurrentPosition(
      (position) => {
        // console.log('position', position);

        dispatch(
          accountAction.setAccountData({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }),
        );
      },
      (error) => {
        // See error code charts below.
        // console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  const handleBackground = async () => {
    try {
      let setting = await AsyncStorage.getItem('setting');

      if (JSON.parse(setting)) {
        toggleTheme(JSON.parse(setting).mode);
        updateBaseColor(JSON.parse(setting).color);
        updateFontSize(JSON.parse(setting).fontSize);
      }
    } catch (error) {
      // console.log('errorerror', error);
    }
  };

  return (
    <WebSocket.Provider value={socket}>
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
    </WebSocket.Provider>
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
