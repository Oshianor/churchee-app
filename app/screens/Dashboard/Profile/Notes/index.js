import React, {Component} from 'react';
import {
  Surface,
  Caption,
  Subheading,
  Paragraph,
  FAB,
} from 'react-native-paper';
import {
  View,
  Dimensions,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import { api} from '../../../../api';
import moment from "moment";
import {ThemeContext} from '../../../../context/ThemeContext';
import {accountAction, feedbackAction} from '../../../../store/actions';
import {useSelector, useDispatch} from 'react-redux';


const Notes = ({navigation: { navigate }}) => {
  const dispatch = useDispatch();
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const {token, notes} = useSelector(({account}) => account);

  React.useEffect(() => {
    handleData();
  }, []);

  const handleData = async () => {
    try {
      const notes = await axios.get(api.note, {
        headers: {'x-auth-token': token},
      });

      console.log('notes', notes);

      dispatch(accountAction.setAccountData({notes: notes.data.data}));
    } catch (error) {
      console.log('error', error);
      console.log('error', error.response);
    }
  };

  const handleRefreshData = async () => {
    try {
      setIsRefreshing(true);

      const notes = await axios.get(api.note, {
        headers: {'x-auth-token': token},
      });

      dispatch(accountAction.setAccountData({notes: notes.data.data}));
      setIsRefreshing(false);

      console.log('handleRefreshData', state);
    } catch (error) {
      setIsRefreshing(false);
      console.log(error.response);
    }
  };

  return (
    <ThemeContext.Consumer>
      {({theme, baseColor}) => (
        <View style={[classes.root, {backgroundColor: theme.background}]}>
          <FlatList
            contentContainerStyle={classes.container}
            data={notes}
            keyExtractor={(item) => item._id}
            extraData={notes}
            refreshing={isRefreshing}
            onRefresh={handleRefreshData}
            renderItem={({item}) => (
              <Surface style={classes.surface}>
                <TouchableOpacity
                  onPress={() => navigate('NoteDetailScreen', item)}>
                  <View style={classes.left}>
                    <Subheading style={classes.Subheading}>
                      {/* {item.title} */}
                      {item.title.length > 30
                        ? item.title.substring(0, 30) + '...'
                        : item.title}
                    </Subheading>
                    <Caption>{moment(item.createdAt).format('MMM DD')}</Caption>
                  </View>
                  <Paragraph style={classes.para}>
                    {item.body.replace(/(\r\n|\n|\r)/gm, ' ').length > 75
                      ? item.body
                          .replace(/(\r\n|\n|\r)/gm, ' ')
                          .substring(0, 75) + '...'
                      : item.body.replace(/(\r\n|\n|\r)/gm, ' ')}
                  </Paragraph>
                </TouchableOpacity>
              </Surface>
            )}
          />
          <View style={classes.fab}>
            <FAB
              small
              icon="plus"
              color="white"
              style={{
                backgroundColor: baseColor,
              }}
              onPress={() => navigate('AddNoteScreen')}
            />
          </View>
        </View>
      )}
    </ThemeContext.Consumer>
  );
};

export default Notes;

const classes = StyleSheet.create({
  root: {
    flex: 1,
    // paddingHorizontal: 5,
    // marginVertical: 15,
  },
  headerRight: {
    flex: 1,
    justifyContent: 'flex-end',
    marginHorizontal: 15,
    alignItems: 'center',
    flexDirection: 'row',
  },
  surface: {
    flex: 1,
    marginVertical: 10,
    marginHorizontal: 15,
    padding: 10,
    justifyContent: "space-between",
    // alignItems: 'center',
    elevation: 4,
  },
  left: {
    alignItems: 'center',
    // paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  Subheading: {
    flex: 1,
    fontWeight: '500',
    padding: 0,
    margin: 0,
  },
  para: {
    fontSize: 12,
  },
  title: {flex: 1, justifyContent: 'flex-start'},
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    // position: 'absolute',
    // left: 0,
    // bottom: 0,
    // flexDirection: 'row',
    // justifyContent: 'flex-end',
  },
});
