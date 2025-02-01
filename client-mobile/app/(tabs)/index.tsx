import CreatePost from "@/app/(tabs)/createPost";
import axios from "axios";
import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { Text, View, StyleSheet, StatusBar, SafeAreaView, FlatList, ActivityIndicator, Button, Modal, Pressable } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { AppContext } from "../contexts/AppContext";
import API from "@/utils/api";
import { router, useLocalSearchParams } from "expo-router";
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



export default function Index() {
  const [post, setPost] = useState<Post[]>([]); 
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { refresh } = useLocalSearchParams(); 

  const getPost = async () => {
    setIsLoading(true);
    try {
      const res = await API.get("/posts");
  
      if (res.status === 200) { 
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
  const handlePostPress = (id: string) => {
    router.push(`/viewpost?id=${id}`);
  };

  useEffect(() => {
    getPost();
  }, []);
  useEffect(() => {
    getPost();
  }, [refresh]); 
  return (
    <SafeAreaView style={globalStyles.container}>
        {isLoading ? (
          <View style={globalStyles.loading}>
              <ActivityIndicator size="large" color="#ff6347" /> 
              <Text>Loading...</Text>
          </View>
          
        ) : (
          <FlatList
            data={post}
            keyExtractor={(item) => item.id.toString()} 
            renderItem={({ item }) => ( 
              <Pressable  style={globalStyles.postContainer} onPress={() =>handlePostPress(item.id)}>
                <Text style={globalStyles.title}>{item.title}</Text>
                <Text>
                  Created by {item.user?.name ?? "Unknown"} on{" "}
                  {item.created_at ? new Date(item.created_at).toLocaleDateString() : "N/A"}
                </Text>
                <Text style={globalStyles.bodyText}>{item.body}</Text>
              </Pressable >
            )}
            ItemSeparatorComponent={() => <View style={{height:16}}></View>}
            ListEmptyComponent={<Text>No Post found</Text>}
            refreshing={refreshing}
            onRefresh={handleRefresh}
          />
        )}
    </SafeAreaView>
  );
}

