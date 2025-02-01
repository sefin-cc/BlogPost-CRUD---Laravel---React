
import API from "@/utils/api";
import axios from "axios";
import { useRouter } from "expo-router";
import React from "react";
import { useState } from "react";
import { Text, View, SafeAreaView, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import globalStyles from '../../assets/styles/globalstyles';



export default function CreatePost() {
    const router = useRouter();
    const [isPosting, setIsPosting] = useState(false);
    const [errors, setErrors] = useState<{ title?: string[]; body?: string[] }>({});
    const [formData, setFormData] = useState({
        title: '',
        body: '',
    });

const handleCreate = async () => {
  setIsPosting(true);

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
    setIsPosting(false);
  }
};

  return (
    <SafeAreaView style={globalStyles.container}>
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
          onPress={handleCreate}
          disabled={isPosting}
          style={[
            globalStyles.button,
            isPosting && { backgroundColor: '#ccc' }, 
          ]}
        >
          <Text style={globalStyles.buttonText}>
            {isPosting ? "Posting..." : "Add Post"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

