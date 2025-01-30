import CreatePost from "@/app/(tabs)/createPost";
import axios from "axios";
import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { Text, View, StyleSheet, StatusBar, SafeAreaView, FlatList, ActivityIndicator, Button, Modal } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { AppContext } from "../contexts/AppContext";

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



export default function Index() {
  const [post, setPost] = useState<Post[]>([]); 
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

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

  const handleRefresh = () => {
    setRefreshing(true);
    getPost();
    setRefreshing(false);
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
          <FlatList
            data={post}
            keyExtractor={(item) => item.id.toString()} 
            renderItem={({ item }) => ( 
              <View style={styles.postContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text>
                  Created by {item.user?.name ?? "Unknown"} on{" "}
                  {item.created_at ? new Date(item.created_at).toLocaleDateString() : "N/A"}
                </Text>
                <Text style={styles.bodyText}>{item.body}</Text>
              </View>
            )}
            ItemSeparatorComponent={() => <View style={{height:16}}></View>}
            ListEmptyComponent={<Text>No Post found</Text>}
            ListHeaderComponent={<Text style={styles.headerText}>Latest Post</Text>}
            refreshing={refreshing}
            onRefresh={handleRefresh}
          />
        )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "#f5f5f5",
    margin:"5%",
  },
  postContainer: {
    padding: 16,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
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

});
