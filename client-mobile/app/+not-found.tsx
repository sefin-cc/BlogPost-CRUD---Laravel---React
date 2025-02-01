import { Link, Stack } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View} from 'react-native';


export default function NotFoundScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Oops!' }} />
        <Text>This screen doesn't exist.</Text>
        <Link href="/(tabs)/index" style={styles.link}>
          <Text>Go to home screen!</Text>
        </Link>
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
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
