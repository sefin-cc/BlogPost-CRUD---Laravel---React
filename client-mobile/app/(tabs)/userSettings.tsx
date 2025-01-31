import { Link, Stack, useRouter } from 'expo-router';
import React, { useContext } from 'react';
import { StatusBar, StyleSheet, Text, View} from 'react-native';
import { AppContext } from '../contexts/AppContext';
import API from '@/utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function UserSettings() {
  const context = useContext(AppContext);
  const router = useRouter();
  if (!context) {
    return <Text>Error: AppContext is not available</Text>;
  }
  const {user, setUser, setToken} = context;

  const handleLogout = async () => {
    try {
      await API.post("/logout");
  
      setUser(null);
      setToken(null);
      await AsyncStorage.removeItem("token");
  
      router.replace("/auth/login");
    } catch (error) {
      if (error instanceof Error) {
        console.error("Logout error:", error.message);
      } else {
        console.error("An unknown error occurred");
      }
    }
  };
  
  
  return (
    <View style={styles.container}>
        <Text>Welcome back </Text>
        <Text>{user.name}</Text>
        <Text>{user.email}</Text>
        <form onSubmit={handleLogout} >
          <button className="nav-link">Logout</button>
        </form>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: StatusBar.currentHeight,
  },
 
});
