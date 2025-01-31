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

export default function Login() {
    const context = useContext(AppContext);
    const router = useRouter();
    if (!context) {
      return <Text>Error: AppContext is not available</Text>;
    }

    const {setToken} = context;
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({
        email: '',
        password: '',
        general: ''
    });
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });



    const handleLogin = async () => {
        setIsLoading(true);
      
        try {
          const res = await API.post("/login", formData);
          const data = res.data;
      
          if (data.errors) {
            // Set form errors if they exist in the response
            setErrors(data.errors);
          } else {
            // Store token in AsyncStorage for persistence in React Native
            await AsyncStorage.setItem("token", data.token);
            setToken(data.token);
          }
      
          // Navigate to the homepage after successful login
          router.replace("/");
      
        } catch (error) {
          // Handle Axios errors
          if (axios.isAxiosError(error)) {
            console.error("Axios error:", error.response?.data || error.message);
            // Setting error messages from the response or a general error message
            setErrors(error.response?.data?.errors || { general: "Something went wrong" });
          } else {
            // Handle other unexpected errors
            console.error("Unexpected error:", error);

          }
        } finally {
          // Ensure loading state is reset whether successful or failed
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
          <TextInput style={styles.input} placeholder="Email" value={formData.email} onChangeText={(text) => setFormData((prev) => ({ ...prev, email: text }))} />
          { errors.email && <Text style={styles.errorText}>{errors.email[0]}</Text> }
          <TextInput style={styles.input} placeholder="Password" value={formData.password} onChangeText={(text) => setFormData((prev) => ({ ...prev, password: text }))}/>
          { errors.password && <Text style={styles.errorText}>{errors.password[0]}</Text> }
          <Button title={isLoading ? "Signing In..." : "Sign In"} onPress={handleLogin} disabled={isLoading}/>
          <Button title="Register" onPress={() => router.push("/auth/register")} />
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
