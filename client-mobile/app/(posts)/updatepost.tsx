import { AppContext } from "../contexts/AppContext";
import API from "@/utils/api";
import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { Text, View, StyleSheet, SafeAreaView, ActivityIndicator, Button, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import globalStyles from '../../assets/styles/globalstyles';


export default function UpdatePost( ) {
    const context = useContext(AppContext);
    if (!context) {
      return <Text>Error: AppContext is not available</Text>;
    }

    const { id } = useLocalSearchParams();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isUpdating, setisUpdating] = useState(false);
    const [errors, setErrors] = useState<{ title?: string[]; body?: string[] }>({});
    const [formData, setFormData] = useState({
        title: '',
        body: '',
    });

    const getPost = async () => {
      setIsLoading(true);
      try {
        const res = await API.get(`/posts/${id}`);
        if (res.status === 200) {
          setFormData({  title: res.data.post.title, body: res.data.post.body});
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Error fetching post:", error.response?.data || error.message);
        } else {
          console.error("Unexpected error:", error);
        }
      } finally {
        setIsLoading(false);
      }
    };
  

const handleUpdate = async () => {
  setisUpdating(true);

  try {
    const res = await API.put(`/posts/${id}`, formData);
    const data = res.data;

    if (data.errors) {
      // Set form errors if they exist in the response
      setErrors(data.errors);
    } else {
      setFormData({  title: '', body: ''});
      router.replace(`/?refresh=${Date.now()}`);
    }

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
    setisUpdating(false);
  }
};

  useEffect(() => {
    getPost();
  },[])


  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#ff6347" />
          <Text>Loading...</Text>
        </View>
      ) : (
        <View style={globalStyles.inputContainer}>
        <View>
        <TextInput style={globalStyles.input} placeholder="Post Title"  placeholderTextColor="#888"  value={formData.title} onChangeText={(text) => setFormData((prev) => ({ ...prev, title: text }))} />
            {errors.title && errors.title[0] && (
              <View>
                <Text style={globalStyles.errorText}>{errors.title[0]}</Text>
              </View>
            )}
        </View>
        <View >
          <TextInput style={globalStyles.input}  placeholder="Post Body"    multiline 
            numberOfLines={4}  placeholderTextColor="#888"  value={formData.body} onChangeText={(text) => setFormData((prev) => ({ ...prev, body: text }))}/>
          {errors.body && errors.body[0] && (
              <View>
                <Text style={globalStyles.errorText}>{errors.body[0]}</Text>
              </View>
            )}
        </View>
                  
        <TouchableOpacity
          onPress={handleUpdate}
          disabled={isUpdating}
          style={[
            globalStyles.button,
            isUpdating && { backgroundColor: '#ccc' }, 
          ]}
        >
          <Text style={globalStyles.buttonText}>
            {isUpdating ? "Updating..." : "Update Post"}
          </Text>
        </TouchableOpacity>
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
