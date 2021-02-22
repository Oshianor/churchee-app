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
  StyleSheet,
  ScrollView,
} from 'react-native';
import {ThemeContext} from '../../../../context/ThemeContext';





const HymnDetails = ({ route: { params } }) =>{
  const [item, setItem] = React.useState(params.item)

  // const { fontSize } = this.context
  const {fontSize} = React.useContext(ThemeContext); 


  const fslg = {
    fontSize: fontSize + 5,
    paddingVertical: 5,
  };
  const fsmd = {
    fontSize: fontSize + 2,
    paddingVertical: 5,
  };
  const fssm = {
    fontSize: fontSize,
    paddingVertical: 5,
  };

  return (
    <ThemeContext.Consumer>
      {({theme, baseColor}) => (
    <View style={{flex: 1, backgroundColor: theme.background}}>
      <ScrollView contentContainerStyle={classes.root}>
        {/* <Subheading style={[classes.heading, fslg]}>{item.title}</Subheading> */}
        {item.hymn.map((hymn, index) => (
          <React.Fragment key={hymn._id}>
            <Subheading style={[classes.subheading, fsmd]}>
              {hymn.type}
              {hymn.type !== 'chorus' && ' ' + (index + 1)}
            </Subheading>
            <Paragraph
              style={[
                hymn.type === 'chorus' ? classes.chorus : classes.paragraph,
                fssm,
              ]}>
              {hymn.body}
            </Paragraph>
          </React.Fragment>
        ))}

        {/* <Subheading style={classes.subheading}>Chorus</Subheading> */}
      </ScrollView>
    </View>
    )}
    </ThemeContext.Consumer>
  );
}

export default HymnDetails;

const classes = StyleSheet.create({
  root: {
    // flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  headerRight: {
    flex: 1,
    justifyContent: 'flex-end',
    marginHorizontal: 15,
    alignItems: 'center',
    flexDirection: 'row',
  },
  subheading: {
    paddingTop: 15,
    fontSize: 15,
    textAlign: 'left',
  },
  paragraph: {
    fontSize: 15,
    textAlign: 'left',
  },
  heading: {
    fontSize: 15,
    textAlign: 'center',
  },
  chorus: {
    fontStyle: 'italic',
    // color: "g"
  },
  title: {flex: 1, justifyContent: 'flex-start'},
});
