import React from 'react';
import { View, Text } from 'react-native';
import HomeScreen from '../screens/HomeScreen';

export default function Index() {
  try {
    console.log("Rendering Index page");
    return <HomeScreen />;
  } catch (error) {
    console.error("Error rendering HomeScreen:", error);
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 18, color: 'red' }}>
          Error loading Home Screen: {error.message}
        </Text>
      </View>
    );
  }
}
