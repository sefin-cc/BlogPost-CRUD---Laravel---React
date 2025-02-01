import { IconSymbol } from '../../components/ui/IconSymbol';
import { Tabs, useRouter } from 'expo-router';
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { Text, View , StyleSheet, ActivityIndicator} from 'react-native';
import { AppContext } from '../contexts/AppContext';

export default function TabLayout() {
  const context = useContext(AppContext);
  const router = useRouter();

  // State to track loading
  const [loading, setLoading] = useState(true);

  if (!context) {
    return <Text>Error: AppContext is not available</Text>;
  }

  const { token, user } = context;
  const [isLayoutReady, setIsLayoutReady] = useState(false);

  useEffect(() => {
    // Wait until the layout is ready
    setIsLayoutReady(true);
  }, []);
  
  useEffect(() => {
    if (isLayoutReady) {
      const checkAuthStatus = () => {
        if (!token && !user) {
          router.replace("/auth/login");
        }
        setLoading(false);
      };
      checkAuthStatus();
    }
  }, [isLayoutReady, token, user, router]);

  // Show loading spinner until authentication is checked
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ff6347" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }
  return (
    <Tabs
    screenOptions={{
        headerShown: false, 
        tabBarLabel: () => null,
        tabBarStyle: {
          backgroundColor: '#1e1e1e', 
          borderTopWidth: 0, 
        },
        tabBarActiveTintColor: '#ff6347', 
        tabBarInactiveTintColor: '#a9a9a9', 
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
          headerShown: true, 
          title: "Create Post",
          headerTitleAlign: "center", 
          headerStyle: { backgroundColor: "#1e1e1e" },
          headerTintColor: "#fff", 
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
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#333",
  },
});
