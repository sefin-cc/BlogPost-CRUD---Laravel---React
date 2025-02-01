import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { SymbolWeight } from "expo-symbols";
import React from "react";
import { OpaqueColorValue, StyleProp, ViewStyle } from "react-native";

// ✅ Add more mappings as needed
const MAPPING = {
  "house.rounded": "home",
  "plus.rounded": "add", // "plus" doesn't exist in MaterialIcons, use "add"
  "user.rounded": "person",
  "keyboardarrowleft.rounded": "arrow-back",
} as const; // ✅ Use `as const` to preserve strict typings

export type IconSymbolName = keyof typeof MAPPING;

interface IconSymbolProps {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<ViewStyle>;
  weight?: SymbolWeight;
}

export function IconSymbol({ name, size = 24, color, style }: IconSymbolProps) {
  const iconName = MAPPING[name];

  if (!iconName) {
    console.warn(`⚠️ Icon "${name}" not found in mapping. Update MAPPING.`);
    return null; // Return nothing if icon isn't mapped
  }

  return <MaterialIcons name={iconName} size={size} color={color} style={style} />;
}
