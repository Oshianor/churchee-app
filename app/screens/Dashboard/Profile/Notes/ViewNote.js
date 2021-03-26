import React from 'react';
import {
  Surface,
  Caption,
  Title,
  Paragraph,
  IconButton,
  FAB,
  Portal,
  Provider,
} from 'react-native-paper';
import {
  View,
  Dimensions,
  StyleSheet,
  FlatList,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Axios from 'axios';
import { api } from '../../../../api';
import moment from "moment";
import {ThemeContext} from '../../../../context/ThemeContext';


const NoteDetail = ({route, navigation: {navigate}}) => {
  const dispatch = useDispatch();
  const item = route.params;

  console.log('item', item);
  const {
    token,
    church: {publicToken},
  } = useSelector(({account}) => account);
  const [open, setOpen] = React.useState(false);

  // constructor(props) {
  //   super(props);

  //   this.redirect = null;
  //   this.state = {
  //     item: {},
  //     visible: false,
  //     type: '',
  //     msg: '',
  //     open: false,
  //   };
  // }

  // React.useEffect(() => {

  // }, []);

  // componentWillUnmount() {
  //   clearTimeout(this.redirect)
  // }

  const handleDeleteAlert = () => {
    Alert.alert(
      'Delete Note',
      'Are you sure you want to delete this note?',
      [
        {
          text: 'Yes, Please',
          // style: 'ok',
          onPress: () => handleDelete(),
        },
        {
          text: 'No, Thanks',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  };

  const handleDelete = async () => {
    try {
      const deleteNote = await Axios.delete(api.note + '/' + item._id, {
        headers: {'x-auth-token': token, publicToken},
      });

      // this.setState({
      //   visible: true,
      //   type: 's',
      //   msg: deleteNote.data,
      // });
      dispatch(
        feedbackAction.launch({
          open: true,
          severity: 's',
          msg: deleteNote.data.msg,
        }),
      );

      navigate('ProfileHomeScreen');
    } catch (error) {
      dispatch(
        feedbackAction.launch({
          open: true,
          severity: 'w',
          msg: error.response.data.msg,
        }),
      );
      console.log('error', error);
      console.log('error', error.response);
    }
  };

  return (
    <ThemeContext.Consumer>
      {({theme, baseColor}) => (
        <View style={[classes.root, {backgroundColor: theme.background}]}>
          <ScrollView contentContainerStyle={classes.container}>
            <Title>{item?.title}</Title>
            <Paragraph style={classes.text}>{item?.body}</Paragraph>
          </ScrollView>
          {/* <Provider>
            <Portal>
              <FAB.Group
                open={open}
                icon={!open ? 'unfold-more-horizontal' : 'unfold-less-horizontal'}
                actions={[
                  {
                    icon: 'delete',
                    // color: 'red',
                    style: {
                      backgroundColor: 'red',
                    },
                    label: 'Delete',
                    onPress: () => handleDeleteAlert(),
                  },
                  {
                    icon: 'pencil',
                    label: 'Edit',
                    // color: 'yellow',
                    style: {
                      backgroundColor: 'yellow',
                    },
                    onPress: () => navigate('EditNoteScreen', {item}),
                  },
                ]}
                onStateChange={({open}) => setOpen(open)}
                onPress={() => {
                  // if (open) {
                  //   // do something if the speed dial is open
                  // }
                }}
              />
            </Portal>
          </Provider> */}
        </View>
      )}
    </ThemeContext.Consumer>
  );
};

export default NoteDetail;

const classes = StyleSheet.create({
  root: {
    padding: 10,
    flex: 1,
  },
  container: {
    // marginHorizontal: 10,
    flex: 0.9,
    // paddingHorizontal: 15,
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
    justifyContent: 'space-between',
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
});
