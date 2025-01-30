import { IconSymbol } from '../../components/ui/IconSymbol';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

export default function TabLayout() {
//   const colorScheme = useColorScheme();

  return (
    <Tabs
    screenOptions={{
        headerShown: false, // Hide the header globally
        tabBarLabel: () => null,
        tabBarStyle: {
          backgroundColor: '#1e1e1e', // Background color of the tab bar
          borderTopWidth: 0, // Remove the border at the top
        },
        tabBarActiveTintColor: '#ff6347', // Active tab text/icon color
        tabBarInactiveTintColor: '#a9a9a9', // Inactive tab text/icon color
        tabBarLabelStyle: {
          fontSize: 14, // Adjust tab label font size
          fontWeight: 'bold', // Make labels bold
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.rounded"  color={color} />,
        }}
      />
      <Tabs.Screen
        name="createPost"
        options={{
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="plus.rounded" color={color} />,
        }}
      />
       <Tabs.Screen
        name="userSettings"
        options={{
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="user.rounded" color={color} />,
        }}
      />
    </Tabs>
  );
}
