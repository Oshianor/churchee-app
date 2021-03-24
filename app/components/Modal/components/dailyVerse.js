import React from 'react';
import {
  Surface,
  IconButton,
  Paragraph,
  Subheading,
} from 'react-native-paper';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Share,
  Clipboard,
  Modal,
} from 'react-native';



const DailyVerseModal = ({open, handleClose, value}) => {
  const [loading, setLoading] = React.useState(false);
  const [alert, setAlert] = React.useState({
    type: '',
    msg: '',
    visible: false,
  });

  const handleCopy = async () => {
    if (!value) return;
    Clipboard.setString(value.body);
    setAlert({
      visible: true,
      type: 's',
      msg: 'Copied to clipboard',
    });
  };

  const onShare = async () => {
    try {
      if (!value) return;

      const result = await Share.share({
        title: 'Verse of the day',
        message: value.body,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('result.activityType', result.activityType);

          // shared with activity type of result.activityType
        } else {
          // shared
          console.log('result-type.activityType', result.action);
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
        console.log('result-type.activityType', result.action);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  if (loading) {
    return null;
  } else {
    return (
      <View style={classes.root}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={open}
          // presentationStyle="formSheet"
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0,0,0,0.5)',
            }}>
            <Surface style={classes.surface}>
              <Subheading style={{ fontWeight: "600" }} >Verse of the day</Subheading>
              <Paragraph>{value ? value.body : ''}</Paragraph>
              <View style={classes.bottomRoot}>
                <IconButton icon="share" size={20} onPress={onShare} />
                <IconButton
                  icon="content-copy"
                  size={20}
                  onPress={handleCopy}
                />
              </View>
            </Surface>
            <View style={{marginTop: 25}}>
              <IconButton
                onPress={() => handleClose()}
                icon="cancel"
                size={35}
                color="white"
              />
            </View>
          </View>
        </Modal>
      </View>
    );
  }
};

export default DailyVerseModal;

const classes = StyleSheet.create({
  root: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'flex-start',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  surface: {
    // flex: 1,
    height: 130,
    padding: 15,
    borderRadius: 2,
    elevation: 1,
    // margin: 5,
  },
  type: {
    flex: 1,
    marginLeft: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topRoot: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  bottomRoot: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
  },
  bibleTypeFontSize: {
    fontSize: 13,
  },
});