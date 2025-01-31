import { AppContext } from "@/app/contexts/AppContext";
import API from "@/utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useRouter } from "expo-router";
import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { Text, View, StyleSheet, StatusBar, SafeAreaView, FlatList, ActivityIndicator, Button } from "react-native";
import { TextInput } from "react-native-gesture-handler";

interface Post {
  id: string;
  user_id: string;
  title: string;
  body: string;
  created_at: string;
  user: {
    name: string;
  };
}

export default function Register() {
    const context = useContext(AppContext);
    const router = useRouter();
    if (!context) {
      return <Text>Error: AppContext is not available</Text>;
    }
    const {setToken} = context;
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    });



    const handleRegister = async () => {
        setIsLoading(true);
        try {
          const res = await API.post("/register", formData);  
          const data = res.data; 
      
          if (data.errors) {
            // Handle validation errors
            setErrors(data.errors);
          } else {
            // Save token to AsyncStorage and update the context
            await AsyncStorage.setItem("token", data.token);
            setToken(data.token);
            router.replace("/");  
          }
        } catch (error) {
          // Handle errors that might occur during the request (e.g., network issues)
          if (axios.isAxiosError(error)) {
            // For Axios errors (response from the server)
            console.error("Axios error:", error.response?.data || error.message);
          } else if (error instanceof Error) {
            // Handle unexpected JS errors
            console.error("Unexpected error:", error.message);
          } else {
            // In case the error type is unknown
            console.error("An unknown error occurred during registration");
          }
        } finally {
          setIsLoading(false);
        }
      };
  return (
    <SafeAreaView style={styles.container}>
        {isLoading ? (
          <View style={styles.loading}>
              <ActivityIndicator size="large" color="#0000ff" /> 
              <Text>Loading...</Text>
          </View>
          
        ) : (
        <View style={styles.inputContainer}>
            <TextInput style={styles.input} placeholder="Name" value={formData.name} onChangeText={(text) => setFormData((prev) => ({ ...prev, name: text }))} />
            { errors.name && <Text style={styles.errorText}>{errors.name[0]}</Text> }
          <TextInput style={styles.input} placeholder="Email" value={formData.email} onChangeText={(text) => setFormData((prev) => ({ ...prev, email: text }))} />
          { errors.email && <Text style={styles.errorText}>{errors.email[0]}</Text> }
          <TextInput style={styles.input} placeholder="Password" value={formData.password} onChangeText={(text) => setFormData((prev) => ({ ...prev, password: text }))}/>
          { errors.password && <Text style={styles.errorText}>{errors.password[0]}</Text> }
          <TextInput style={styles.input} placeholder="Password" value={formData.password_confirmation} onChangeText={(text) => setFormData((prev) => ({ ...prev, password_confirmation: text }))}/>
      
          <Button title={isLoading ? "Registering..." : "Register"} onPress={handleRegister} disabled={isLoading}/>
          
        </View> 
        )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin:"5%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  bodyText:{
    fontSize: 16,
    color: "#666666"
  },
  headerText:{
    fontSize: 24,
    marginBottom: 12,
    textAlign: "center"
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    gap: 5
  },
  inputContainer: {
    padding: 16,
    margin: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 8,
    padding: 8,
    borderRadius: 8,
  },
  errorContainer: {
    backgroundColor: "#FFC0CB",
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    margin: 16,
    alignItems: "center",
  },
  errorText: {
    color: "#D8000C",
    fontSize: 16,
    textAlign: "center",
  },

});
