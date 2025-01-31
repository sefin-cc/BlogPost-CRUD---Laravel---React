import { Stack, useRouter } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { BackButton } from "@/components/ui/backbutton";

export default function PostLayout() {
  const context = useContext(AppContext);
  const router = useRouter();

  // State to track loading
  const [loading, setLoading] = useState(true);

  if (!context) {
    return <Text>Error: AppContext is not available</Text>;
  }

  const { token, user } = context;
  const [isLayoutReady, setIsLayoutReady] = useState(false);

  useEffect(() => {
    // Wait until the layout is ready
    setIsLayoutReady(true);
  }, []);

  useEffect(() => {
    if (isLayoutReady) {
      const checkAuthStatus = () => {
        if (!token && !user) {
          router.replace("/auth/login");
        }
        setLoading(false);
      };
      checkAuthStatus();
    }
  }, [isLayoutReady, token, user, router]);

  // Show loading spinner until authentication is checked
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ff6347" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }



  return (
    <Stack>
      <Stack.Screen
        name="viewpost"
        options={{
          headerShown: true,
          title: "View Post",
          headerLeft: () => (
            <BackButton />
          ),
        }}
      />
      <Stack.Screen
        name="updatepost"
        options={{
          headerShown: true,
          title: "Update Post",
          headerLeft: () => (
            <BackButton />
          ),
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#333",
  },
});
