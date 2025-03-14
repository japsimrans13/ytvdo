import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import LibraryScreen from '../screens/LibraryScreen';

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          // Use route.name for icon selection
          if (route.name === 'index') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'library') {
            iconName = focused ? 'library' : 'library-outline';
          } else {
            iconName = focused ? 'document' : 'document-outline'; // Fallback icon
          }
          
          // Return null if iconName is undefined to prevent crashes
          return iconName ? <Ionicons name={iconName} size={size} color={color} /> : null;
        },
        tabBarActiveTintColor: '#ff0000',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tabs.Screen 
        name="index" 
        options={{ 
          title: 'Download',
          headerTitle: 'YouTube Video Downloader'
        }}
      />
      <Tabs.Screen 
        name="library" 
        options={{ 
          title: 'My Videos',
          headerTitle: 'My Downloaded Videos'
        }}
      />
    </Tabs>
  );
}
