import axios from "axios";
import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, StatusBar, SafeAreaView, ActivityIndicator } from "react-native";
import API from "@/utils/api";
import { useLocalSearchParams } from "expo-router";

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
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useLocalSearchParams();

  const getPost = async () => {
    setIsLoading(true);
    try {
      const res = await API.get(`/posts/${id}`);
      if (res.status === 200) {
        console.log("Fetched Data:", res.data);
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
      ) : post ? (
        <View>
          <Text style={styles.title}>{post.title}</Text>
          <Text>
            Created by {post.user?.name ?? "Unknown"} on{" "}
            {post.created_at ? new Date(post.created_at).toLocaleDateString() : "N/A"}
          </Text>
          <Text style={styles.bodyText}>{post.body}</Text>
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
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "#f5f5f5",
    margin: "5%",
  },
  
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  bodyText: {
    fontSize: 16,
    color: "#666666",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    gap: 5,
  },
});
