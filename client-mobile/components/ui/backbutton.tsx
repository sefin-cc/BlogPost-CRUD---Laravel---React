
import React from "react";
import { Pressable } from "react-native";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { router } from "expo-router";

export const  BackButton = () => {
    
    const handleBackPress = () => {
        router.back();  // This will navigate back to the previous screen
    };

  return (
        <Pressable style={{ marginHorizontal: 15 }} onPress={handleBackPress} >
            <IconSymbol
            name="keyboardarrowleft.rounded"
            size={30}
            color="grey"
            />
        </Pressable>
    );
}
