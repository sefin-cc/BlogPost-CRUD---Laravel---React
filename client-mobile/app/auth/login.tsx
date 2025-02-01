import { AppContext } from "@/app/contexts/AppContext";
import API from "@/utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useRouter } from "expo-router";
import React, { useContext } from "react";
import { useState } from "react";
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, StatusBar } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import globalStyles from '../../assets/styles/globalstyles';

export default function Login() {
  const context = useContext(AppContext);
  const router = useRouter();
  if (!context) {
    return <Text>Error: AppContext is not available</Text>;
  }

  const {setToken} = context;
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string[]; password?: string[] }>({});
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
        <View style={globalStyles.inputContainer}>
          <Text style={{fontSize: 36, color: "#666666", width: "100%", textAlign: "center", fontWeight: "bold"}}>Login</Text>
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
                  
        <TouchableOpacity
          onPress={handleLogin}
          disabled={isLoading}
          style={[
            globalStyles.button,
            isLoading && { backgroundColor: '#ccc' }, 
          ]}
        >
          <Text style={globalStyles.buttonText}>
            {isLoading ? "Signing In..." : "Sign In"}
          </Text>
        </TouchableOpacity>
          <Text style={{fontSize: 16, color: "#666666", width: "100%", textAlign: "center"}}>
            or
          </Text>
        <TouchableOpacity
          onPress={() => router.push("/auth/register")}
          style={[globalStyles.button, {backgroundColor: '#1e1e1e'}]}>
          <Text style={globalStyles.buttonText}>
            Register
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
