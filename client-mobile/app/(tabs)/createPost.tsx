import { AppContext } from "@/app/contexts/AppContext";
import axios from "axios";
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

interface Props {
    setIsCreatePostModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CreatePost({setIsCreatePostModal}: Props) {
    const context = useContext(AppContext);
    if (!context) {
      return <Text>Error: AppContext is not available</Text>;
    }
    const {token} = context;
    const [post, setPost] = useState<Post[]>([]); 
    const [isLoading, setIsLoading] = useState(true);
    const [isPosting, setIsPosting] = useState(false);
    const [ errors, setErrors] = useState();
    const [formData, setFormData] = useState({
        title: '',
        body: '',
    });

  const getPost = async () => {
    setIsLoading(true);
  
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/posts");
  
      if (res.status === 200) { 
        console.log("Fetched Data:", res.data);
        setPost(res.data);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error fetching posts:", error.response?.data || error.message);
      } else {
        console.error("Unexpected error:", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = async () => {
    setIsLoading(true);
    const res = await fetch('http://127.0.0.1:8000/api/posts',{
        method: "post",
        headers:{
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
    });

    const data = await res.json();
    
    if(data.errors){
        //set error messages if the response returns "errors"
        setErrors(data.errors);
        setIsLoading(false);
    }else{
        // navigate('/');
    }
    setIsLoading(false);
}

  useEffect(() => {
    getPost();
  }, []);

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
          <TextInput style={styles.input} placeholder="Post Body" value={formData.body} onChangeText={(text) => setFormData((prev) => ({ ...prev, body: text }))}/>
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
