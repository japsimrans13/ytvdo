import React from 'react';
import { View, Text } from 'react-native';
import LibraryScreen from '../screens/LibraryScreen';

export default function Library() {
  try {
    console.log("Rendering Library page");
    return <LibraryScreen />;
  } catch (error) {
    console.error("Error rendering LibraryScreen:", error);
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 18, color: 'red' }}>
          Error loading Library Screen: {error.message}
        </Text>
      </View>
    );
  }
}
