import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Text, View, StyleSheet, StatusBar, SafeAreaView, ActivityIndicator, Button, TouchableOpacity } from "react-native";
import API from "@/utils/api";
import { useLocalSearchParams, useRouter } from "expo-router";
import { AppContext } from "../contexts/AppContext";
import globalStyles from '../../assets/styles/globalstyles';

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

export default function ViewPost() {
  const context = useContext(AppContext);
  if (!context) {
    return <Text>Error: AppContext is not available</Text>;
  }
  const {user, token} = context;
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const { id } = useLocalSearchParams();

  const getPost = async () => {
    setIsLoading(true);
    try {
      const res = await API.get(`/posts/${id}`);
      if (res.status === 200) {
        setPost(res.data.post);
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

  const handleDelete = async () => {
    setIsLoadingDelete(true);
    if(!post?.user_id) return;
    try{
      if(user && user.id === post.user_id) {
        const res = await API.delete(`/posts/${id}`);

        const data = res.data;

        if (data.errors) {
          // Set form errors if they exist in the response
          console.error(data.errors);
        } else {
          router.replace(`/?refresh=${Date.now()}`);
        }
    }
    }catch(error){
      if (axios.isAxiosError(error)) {
          console.error("Error fetching post:", error.response?.data || error.message);
        } else {
          console.error("Unexpected error:", error);
        }
    } finally {
      setIsLoadingDelete(false);
    }
    
}

  useEffect(() => {
    getPost();
  }, []);

  return (
    <SafeAreaView style={globalStyles.container}>
      {isLoading ? (
        <View style={globalStyles.loading}>
          <ActivityIndicator size="large" color="#ff6347" />
          <Text>Loading...</Text>
        </View>
      ) : post ? (
        <View style={styles.postContainer}>
          <Text style={globalStyles.title}>{post.title}</Text>
          <Text>
            Created by {post.user?.name ?? "Unknown"} on{" "}
            {post.created_at ? new Date(post.created_at).toLocaleDateString() : "N/A"}
          </Text>
          <Text style={globalStyles.bodyText}>{post.body}</Text>

          {
            user && user.id === post.user_id &&
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => { router.push(`/updatepost?id=${post.id}`);}}
                disabled={isLoadingDelete}
                style={[
                  globalStyles.button
                ]}
              >
                <Text style={globalStyles.buttonText}>
                  Update
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleDelete}
                disabled={isLoadingDelete}
                style={[
                  globalStyles.button, 

                  { backgroundColor: isLoadingDelete ?  '#ccc'  : '#1e1e1e' }, 
                ]}
              >
                <Text style={globalStyles.buttonText}>
                  {isLoadingDelete ? "Deleting..." : "Delete"}
                </Text>
              </TouchableOpacity>
              
            </View>
          }


        </View>
      ) : (
        <View>
          <Text>No post found.</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  postContainer: {
    gap: 5,
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    gap: 10,
    paddingVertical: 15
  }
});


