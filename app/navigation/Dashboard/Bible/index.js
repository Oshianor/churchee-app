import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();

import BibleBook from '../../../screens/Dashboard/Bible';
import BibleChapter from '../../../screens/Dashboard/Bible/Chapter';
import BiblePassage from '../../../screens/Dashboard/Bible/Passage';
import BibleVerse from '../../../screens/Dashboard/Bible/Verse';

const Bible = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="BibleBookScreen" component={BibleBook} />
      <Stack.Screen name="BibleChapterScreen" component={BibleChapter} />
      <Stack.Screen name="BiblePassageScreen" component={BiblePassage} />
      <Stack.Screen name="BibleVerseScreen" component={BibleVerse} />
    </Stack.Navigator>
  );
};

export default Bible;
