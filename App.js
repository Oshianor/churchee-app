import 'react-native-gesture-handler';
import React from 'react';
import {Provider} from 'react-redux';
import {
  ThemeContext,
  themes,
  baseColor,
  fontSize,
} from "./app/context/ThemeContext";
import store from './app/store';
import StartUp from './app/StartUp';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.toggleTheme = (status) => {
      this.setState((state) => ({
        theme: !status ? themes.light : themes.dark,
      }));
    };

    this.updateFontSize = (val) => {
      this.setState({
        fontSize: val,
      });
    };

    this.updateBaseColor = (val) => {
      this.setState({
        baseColor: val,
      });
    };

    // State also contains the updater function so it will
    // be passed down into the context provider
    this.state = {
      theme: themes.light,
      baseColor: baseColor,
      fontSize: fontSize,
      toggleTheme: this.toggleTheme,
      updateFontSize: this.updateFontSize,
      updateBaseColor: this.updateBaseColor,
    };
  }

  render() {
    return (
      <Provider store={store}>
        <ThemeContext.Provider value={this.state}>
          <StartUp />
        </ThemeContext.Provider>
      </Provider>
    );
  }
}

store.subscribe(() => {
  console.log('Store Changed, ', store.getState());
});

export default App;