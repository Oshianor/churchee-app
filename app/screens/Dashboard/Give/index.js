import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Card, Surface, Subheading} from 'react-native-paper';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {Swiper} from '../../../components/Card';
import {give, publicToken, api} from '../../../api';
import WrapperComponent from '../../../components/Background';
import {ThemeContext} from '../../../context/ThemeContext';
import img from '../../../images';

const { width, height } = Dimensions.get('screen');

function mapStateToProps(state) {
  return {
    account: state.account,
  };
}


class Give extends Component {
  state = {
    loading: true,
    login: false,
    giveType: "",
  };

  handleAuthClose = () => {
    this.setState({
      login: false,
    });
  };


  handleOpenGive = giveType => async () => {
    const {account} = this.props;

    // const mid = account.user ? account.user._id : "";
    const token = account.token ? account.token : '';

    console.log('giveType');
    

    if (token) {
      Linking.openURL(
        `${give}?type=${giveType}&accessKey=${token}&cid=${publicToken}`,
      );
    } else {
      this.setState({
        login: true,
        giveType,
      });
    }
  };

  render() {
    const {navigation, account} = this.props;
    const {login, visible, type, msg, giveType} = this.state;

    // const mid = account.user ? account.user._id : "";
    const token = account.token ? account.token : '';

    console.log(`${give}?type=${giveType}&accessKey=${token}&cid=${publicToken}`);

    return (
      <ThemeContext.Consumer>
        {({theme, baseColor}) => (
          <SafeAreaView
            style={[classes.root, {backgroundColor: theme.background}]}>
            <View style={classes.swiper}>
              <Swiper target="give" />
            </View>
            <WrapperComponent>
              <ScrollView contentContainerStyle={classes.body}>
                <View style={classes.rootView}>
                  <View style={classes.section}>
                    <TouchableOpacity onPress={this.handleOpenGive('tithes')}>
                      <Surface style={classes.surface}>
                        <Card.Cover
                          style={classes.img}
                          source={
                            account.header && account.header.giveTithes
                              ? {
                                  uri: api.img + account.header.giveTithes,
                                }
                              : img.tithe
                          }
                        />
                      </Surface>
                      <Subheading>Tithes</Subheading>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={this.handleOpenGive('offerings')}>
                      <Surface style={classes.surface}>
                        <Card.Cover
                          style={classes.img}
                          source={
                            account.header && account.header.giveOfferrings
                              ? {
                                  uri: api.img + account.header.giveOfferrings,
                                }
                              : img.offering
                          }
                        />
                      </Surface>
                      <Subheading>Offerings</Subheading>
                    </TouchableOpacity>
                  </View>

                  <View style={classes.section}>
                    <TouchableOpacity onPress={this.handleOpenGive('vows')}>
                      <Surface style={classes.surface}>
                        <Card.Cover
                          style={classes.img}
                          source={
                            account.header && account.header.giveVows
                              ? {
                                  uri: api.img + account.header.giveVows,
                                }
                              : img.vows
                          }
                        />
                      </Surface>
                      <Subheading>Vows</Subheading>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={this.handleOpenGive('first_fruit')}>
                      <Surface style={classes.surface}>
                        <Card.Cover
                          style={classes.img}
                          source={
                            account.header && account.header.giveFirstFruit
                              ? {
                                  uri: api.img + account.header.giveFirstFruit,
                                }
                              : img.firstfruit
                          }
                        />
                      </Surface>
                      <Subheading>First Fruit</Subheading>
                    </TouchableOpacity>
                  </View>

                  <View style={classes.section}>
                    <TouchableOpacity
                      onPress={this.handleOpenGive('building_projects')}>
                      <Surface style={classes.surface}>
                        <Card.Cover
                          style={classes.img}
                          source={
                            account.header &&
                            account.header.giveBuildingProjects
                              ? {
                                  uri:
                                    api.img +
                                    account.header.giveBuildingProjects,
                                }
                              : img.building
                          }
                        />
                      </Surface>
                      <Subheading>Building Projects</Subheading>
                    </TouchableOpacity>

                    {/* user giv history */}
                    {account.token && (
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('GiveHistoryScreen')
                        }>
                        <Surface style={classes.surface}>
                          <Card.Cover
                            style={classes.img}
                            source={img.history}
                          />
                        </Surface>
                        <Subheading>History</Subheading>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              </ScrollView>
            </WrapperComponent>
          </SafeAreaView>
        )}
      </ThemeContext.Consumer>
    );
  }
}

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
    elevation: 4,
  },
  img: {
    resizeMode: 'cover',
    height: height / 7.5,
    width: width / 2.2,
  },
});
export default connect(mapStateToProps)(Give);
