import { AppProvider } from "@/app/contexts/AppContext";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";



export default function RootLayout() {
 
  return (
    <AppProvider>
  
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(posts)"  options={{ headerShown: false }}/>
        
        {/* Authentication Screens */}
        
        <Stack.Screen name="auth/login" options={{ headerShown: false }} />
        <Stack.Screen name="auth/register" options={{ headerShown: false }} />
      
        {/* Not Found Screen */}
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </AppProvider>
  );
}

