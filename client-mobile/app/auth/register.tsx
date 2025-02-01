import { AppContext } from "@/app/contexts/AppContext";
import API from "@/utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useRouter } from "expo-router";
import React, { useContext } from "react";
import { useState } from "react";
import { Text, View, StyleSheet, SafeAreaView, ActivityIndicator, Button, TouchableOpacity, StatusBar } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import globalStyles from '../../assets/styles/globalstyles';


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
        <View style={globalStyles.inputContainer}>
          <Text style={{fontSize: 36, color: "#666666", width: "100%", textAlign: "center", fontWeight: "bold"}}>Register</Text>
        
        <View>
        <TextInput style={globalStyles.input} placeholder="Name"  placeholderTextColor="#888"  value={formData.name} onChangeText={(text) => setFormData((prev) => ({ ...prev, name: text }))} />
            {errors.name && errors.name[0] && (
              <View>
                <Text style={globalStyles.errorText}>{errors.email[0]}</Text>
              </View>
            )}
        </View>
        <View>
        <TextInput style={globalStyles.input} placeholder="Email"  placeholderTextColor="#888"  value={formData.email} onChangeText={(text) => setFormData((prev) => ({ ...prev, email: text }))} />
            {errors.email && errors.email[0] && (
              <View>
                <Text style={globalStyles.errorText}>{errors.email[0]}</Text>
              </View>
            )}
        </View>
        <View >
          <TextInput style={globalStyles.input}  placeholder="Password"  secureTextEntry={true}
           placeholderTextColor="#888"  value={formData.password} onChangeText={(text) => setFormData((prev) => ({ ...prev, password: text }))}/>
          {errors.password && errors.password[0] && (
              <View>
                <Text style={globalStyles.errorText}>{errors.password[0]}</Text>
              </View>
            )}
        </View>
        <View >
          <TextInput style={globalStyles.input}  placeholder="Confirm Password"  secureTextEntry={true}
           placeholderTextColor="#888"  value={formData.password_confirmation} onChangeText={(text) => setFormData((prev) => ({ ...prev, password_confirmation: text }))}/>
        </View>
                  
        <TouchableOpacity
          onPress={handleRegister}
          disabled={isLoading}
          style={[
            globalStyles.button,
            isLoading && { backgroundColor: '#ccc' }, 
          ]}
        >
          <Text style={globalStyles.buttonText}>
            {isLoading ? "Registering..." : "Register"}
          </Text>
        </TouchableOpacity>
        <Text style={{fontSize: 16, color: "#666666", width: "100%", textAlign: "center"}}>
            or
          </Text>
        <TouchableOpacity
          onPress={() => router.push("/auth/login")}
          style={[globalStyles.button, {backgroundColor: '#1e1e1e'}]}>
          <Text style={globalStyles.buttonText}>
            Login
          </Text>
        </TouchableOpacity>


        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    margin: "5%",
    paddingTop: StatusBar.currentHeight,
    textAlign: "center",
  }
});
