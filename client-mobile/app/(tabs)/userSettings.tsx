import { Link, Stack } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View} from 'react-native';


export default function UserSettings() {
  return (
    <View style={styles.container}>
        <Text>UserSettings</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
 
});
