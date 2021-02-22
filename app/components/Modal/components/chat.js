import React from 'react';
import {SafeAreaView, Modal, TouchableOpacity} from 'react-native';
import WebView from 'react-native-webview';
import constants from '../../../utils/constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../../../theme';
import {ActivityIndicator} from 'react-native-paper';

const Chat = ({open, setVisible}) => {
  const [loading, setLoading] = React.useState(false);

  const showSpinner = () => {
    setLoading(true);
  };

  const hideSpinner = () => {
    setLoading(false);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Modal visible={open}>
        <TouchableOpacity
          style={{justifyContent: 'center', alignItems: 'center'}}>
          <Icon
            style={{margin: 5, marginTop: 40}}
            size={35}
            name="close"
            onPress={() => {
              setVisible(false);
            }}
          />
        </TouchableOpacity>

        {loading && (
          <ActivityIndicator size="small" color={colors.primary.main} />
        )}

        <WebView
          source={{
            uri: `https://secure.livechatinc.com/licence/${constants.LICENSE_ID}/v2/open_chat.cgi`,
          }}
          onLoadStart={() => showSpinner()}
          onLoad={() => hideSpinner()}
        />
      </Modal>
    </SafeAreaView>
  );
};

export default Chat;
