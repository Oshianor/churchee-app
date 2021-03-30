import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Modal,
  SafeAreaView
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import { Surface, Subheading, Title } from "react-native-paper";
import { Button } from '../../Button';
// import { colors } from '../../../theme';
import { churchAction } from '../../../store/actions';
import BackButton from '../../../navigation/custom/BackButton';
import TitleButton from '../../../navigation/custom/TitleButton';
import { Radio } from '../../Radio';
import {ThemeContext} from '../../../context/ThemeContext';
import { colors } from '../../../theme';

const Reason = () => {
  const {isFilter} = useSelector(({church}) => church);
  const dispatch = useDispatch();
  const [selected, setSelected] = React.useState("");

  const selectedReason = (reas) => {
    setSelected(reas);
  }

  return (
    <ThemeContext.Consumer>
      {({theme}) => (
        <Modal animationType="slide" visible={isFilter}>
          <SafeAreaView
            style={[
              classes.root,
              {backgroundColor: theme.mode ? colors.black : colors.white},
            ]}>
            <View style={classes.surface}>
              <Title style={classes.title}>
                What is most important to you when joining a church
                congregation?
              </Title>
            </View>
            <View style={classes.bodyRoot}>
              <View style={classes.reasonItem}>
                <TouchableOpacity
                  onPress={() => selectedReason('longDistance')}
                  style={classes.reasonRadio}>
                  <Radio selected={selected === 'longDistance'} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => selectedReason('longDistance')}
                  style={classes.reasonText}>
                  <Subheading>Long distance</Subheading>
                </TouchableOpacity>
              </View>

              <View style={classes.reasonItem}>
                <TouchableOpacity
                  style={classes.reasonRadio}
                  onPress={() => selectedReason('bike')}>
                  <Radio selected={selected === 'bike'} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={classes.reasonText}
                  onPress={() => selectedReason('bike')}>
                  <Subheading>Bike’s faulty</Subheading>
                </TouchableOpacity>
              </View>

              <View style={classes.reasonItem}>
                <TouchableOpacity
                  style={classes.reasonRadio}
                  onPress={() => selectedReason('personalIssues')}>
                  <Radio selected={selected === 'personalIssues'} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={classes.reasonText}
                  onPress={() => selectedReason('personalIssues')}>
                  <Subheading>Personal issues</Subheading>
                </TouchableOpacity>
              </View>

              <View style={classes.reasonItem}>
                <TouchableOpacity
                  style={classes.reasonRadio}
                  onPress={() => selectedReason('busy')}>
                  <Radio selected={selected === 'busy'} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={classes.reasonText}
                  onPress={() => selectedReason('busy')}>
                  <Subheading>Busy</Subheading>
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <Button
                label="Done"
                rootStyle={classes.buttonRoot}
                onPress={() =>
                  dispatch(churchAction.setChurchData({isFilter: false}))
                }
              />
            </View>
          </SafeAreaView>
        </Modal>
      )}
    </ThemeContext.Consumer>
  );
}

export default Reason;



const classes = StyleSheet.create({
  root: {
    flex: 1,
    marginHorizontal: 20,
  },
  title: {
    fontSize: 20,
    textAlign: 'left',
  },
  surface: {
    flex: 1,
    flexDirection: 'row',
    height: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginVertical: 10,
  },
  bodyRoot: {
    flex: 5,
    justifyContent: 'flex-start',
    // marginHorizontal: 20,
  },
  buttonRoot: {
    marginVertical: 30,
  },
  reasonItem: {
    flexDirection: 'row',
    marginVertical: 15,
  },
  reasonRadio: {},
  reasonText: {
    marginLeft: 20,
  },
});