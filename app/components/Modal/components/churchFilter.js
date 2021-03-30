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
import { Subheading, Title } from "react-native-paper";
import { Button } from '../../Button';
import { churchAction } from '../../../store/actions';
import { Radio } from '../../Radio';
import {ThemeContext} from '../../../context/ThemeContext';
import { colors } from '../../../theme';

const Reason = () => {
  const {isFilter} = useSelector(({church}) => church);
  const dispatch = useDispatch();
  const [selected, setSelected] = React.useState('thePeople');

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
              <List
                title="The people"
                name="thePeople"
                selected={selected}
                selectedReason={selectedReason}
              />
              <List
                title="Sermon"
                name="sermon"
                selected={selected}
                selectedReason={selectedReason}
              />
              <List
                title="Music"
                name="music"
                selected={selected}
                selectedReason={selectedReason}
              />
              <List
                title="Devotion"
                name="devotion"
                selected={selected}
                selectedReason={selectedReason}
              />
              <List
                title="Prayer"
                name="prayer"
                selected={selected}
                selectedReason={selectedReason}
              />
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


const List = ({selectedReason, name, title, selected}) => {
  return (
    <View style={classes.reasonItem}>
      <TouchableOpacity
        style={classes.reasonRadio}
        onPress={() => selectedReason(name)}>
        <Radio selected={selected === name} />
      </TouchableOpacity>
      <TouchableOpacity
        style={classes.reasonText}
        onPress={() => selectedReason(name)}>
        <Subheading>{title}</Subheading>
      </TouchableOpacity>
    </View>
  );
};



const classes = StyleSheet.create({
  root: {
    flex: 1,
    marginHorizontal: 20,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
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