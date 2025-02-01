import { useRouter } from 'expo-router';
import React, { useContext } from 'react';
import { Image, StyleSheet, Text, View} from 'react-native';
import { AppContext } from '../contexts/AppContext';
import API from '@/utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native';


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
    <Image
          source={{ uri: 'https://res.cloudinary.com/dqp0ejscz/image/upload/v1735899431/blank-profile-picture-973460_1280_idgyn3.png' }} 
          style={styles.img}
        />
      <Text style={styles.userInfoTextTitle} >{user.name}</Text>
      <Text style={styles.userInfoText} >{user.email}</Text>
      <TouchableOpacity
        onPress={handleLogout}
        style={styles.button}>
        <Text style={styles.buttonText}>
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  img:{
    width: 200, 
    height: 200, 
    borderRadius: 100, 
    margin: 20
  },
  userInfoTextTitle :{
    fontSize: 16,
    color: "#666666",
    fontWeight: "bold",
  },
  userInfoText: {
    fontSize: 16,
    color: "#666666",
  },
  button: {
    backgroundColor: '#ff6347',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 40
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: "bold",
  },
});