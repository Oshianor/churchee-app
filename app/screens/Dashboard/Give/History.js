import React, {Component} from 'react';
import {
  Surface,
  Caption,
  IconButton,
  Subheading,
  Colors,
  Paragraph,
  Avatar,
  Title,
} from 'react-native-paper';
import {
  View,
  Dimensions,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import axios from "axios";
import { api, publicToken } from "../../../api";
import moment from "moment";
import {ThemeContext} from '../../../context/ThemeContext';



const mapStateToProps = state => ({
  account: state.account,
});

const screen = Dimensions.get('screen');

class ViewEvent extends Component {
  state = {
    history: [],
    total: 0
  }


  async componentDidMount() {
    try {
      const { account } = this.props;
      const give = await axios.get(api.give, { headers: { "x-auth-token": account.token, publicToken } });

      this.setState({
        history: give.data.history,
        total: give.data.total
      })
    } catch (error) {
      console.log(error);
    }
  }
  

  render() {
    const { navigation} = this.props;
    const { history, total } = this.state;
    
    
    return (
      <ThemeContext.Consumer>
        {({theme, baseColor}) => (
          <View style={[classes.root, {backgroundColor: theme.background}]}>
            <Surface style={classes.total}>
              <View style={classes.topRoot}>
                <Paragraph>Total Giving</Paragraph>
                <TouchableOpacity style={classes.type}>
                  {/* <View style={classes.type}> */}
                  <Subheading style={classes.options}>All time</Subheading>
                  {/* <Icon name="arrow-drop-down" size={25} color="black" /> */}
                  {/* </View> */}
                </TouchableOpacity>
              </View>
              <Subheading style={[classes.largeFontSize, {color: baseColor}]}>
                ${total}
              </Subheading>
            </Surface>

            <Paragraph style={classes.Paragraph}>Giving History</Paragraph>
            <FlatList
              keyExtractor={item => item._id}
              data={history}
              renderItem={({item}) => (
                <Surface style={classes.surface}>
                  <Paragraph
                    style={[classes.bibleTypeFontSize, {color: baseColor}]}>
                    ${item.amount}
                  </Paragraph>
                  <Paragraph style={{textTransform: 'capitalize'}}>
                    {item.type.replace('_', ' ')}
                  </Paragraph>
                  <Caption>{moment(item.createdAt).format('MMM DD')}</Caption>
                </Surface>
              )}
            />
          </View>
        )}
      </ThemeContext.Consumer>
    );
  }
}

export default connect(mapStateToProps)(ViewEvent);

const classes = StyleSheet.create({
  root: {
    flex: 1,
    paddingVertical: 30,
    paddingHorizontal: 15,
  },
  headerRight: {
    flex: 1,
    justifyContent: 'flex-end',
    marginHorizontal: 15,
    alignItems: 'center',
    flexDirection: 'row',
  },
  history: {
    flex: 1,
  },
  surface: {
    marginVertical: 15,
    marginHorizontal: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
    elevation: 4,
  },
  bibleTypeFontSize: {
    fontSize: 15,
  },
  largeFontSize: {
    fontSize: 20,
  },
  type: {
    flex: 1,
    // marginLeft: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  total: {
    // flex: 1,
    marginVertical: 15,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'column',
    padding: 10,
    elevation: 4,
  },
  topRoot: {
    // flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  bottomRoot: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
  },
  options: {
    fontSize: 10,
  },
  title: {flex: 1, justifyContent: 'flex-start'},
});
