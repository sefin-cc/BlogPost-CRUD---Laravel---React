import { AppContext } from "@/app/contexts/AppContext";
import API from "@/utils/api";
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


export default function UpdatePost( ) {
    const context = useContext(AppContext);
    if (!context) {
      return <Text>Error: AppContext is not available</Text>;
    }
    const {token} = context;
    const router = useRouter();
    const [post, setPost] = useState<Post[]>([]); 
    const [isLoading, setIsLoading] = useState(false);
    const [isPosting, setIsPosting] = useState(false);
    const [ errors, setErrors] = useState({
      title: '',
      body: '',
    });
    const [formData, setFormData] = useState({
        title: '',
        body: '',
    });

const handleCreate = async () => {
  setIsLoading(true);

  try {
    const res = await API.post("/posts", formData);
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
          <TextInput style={styles.input} placeholder="Post Title" value={formData.title} onChangeText={(text) => setFormData((prev) => ({ ...prev, title: text }))} />
          { errors.title && <Text style={styles.errorText}>{errors.title[0]}</Text> }
          <TextInput style={styles.input} placeholder="Post Body" value={formData.body} onChangeText={(text) => setFormData((prev) => ({ ...prev, body: text }))}/>
          { errors.body && <Text style={styles.errorText}>{errors.body[0]}</Text> }
          <Button title={isPosting ? "Posting..." : "Add Post"} onPress={handleCreate} disabled={isPosting}/>
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
